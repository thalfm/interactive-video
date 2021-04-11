import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Box, Button, Checkbox, Container, FormControlLabel, TextField,} from '@material-ui/core';
import {useForm} from "react-hook-form";
import {useSnackbar} from 'notistack'
import * as yup from '../../../yup';
import UploadFile from "../../../components/UploadFile";
import FileList from "../../../components/FileList";
import VideosModel from "../../../models/VideosModel";
import httpVideosApi from "../../../services/httpVideosApi";
import {useDispatch} from "react-redux";
import {Creators} from '../../../store/upload'
import SnackbarUpload from "../../../components/SnackbarUpload";
import io from "socket.io-client";

const validationSchema = yup.object().shape({
    titulo_video: yup.string()
        .label("Título")
        .required()
})

interface FileUpload {
    file?: File
    id: number,
    preview: string,
    name: string,
    url: string
}

interface FormVideoProps {
    id: number,
    setId: Function
}

const ON_UPLOAD_EVENT = "file-uploaded"

const RegisterVideo: React.FC<FormVideoProps> = (props) => {

    const classes = useStyles();
    const snackbar = useSnackbar();
    const {
        register,
        handleSubmit,
        errors,
        reset
    } = useForm({
        validationSchema,
    });

    const dispatch = useDispatch()

    const [files, setFiles] = useState<FileUpload[]>();
    const [idVideo, setIdVideo] = useState(0);
    const [active, setActive] = useState(true);
    const [clientId, setClientId] = useState<string>();
    const [total, setTotal] = useState<number>(0);

    const socket = React.useMemo<SocketIOClient.Socket>(
        () => io("http://0.0.0.0:3003/upload"),
        []
    );

    React.useEffect(() => {
        socket.on(ON_UPLOAD_EVENT,(progress: any) => {
            dispatch(Creators.progressAction({ value: progress}))
        });

        socket.on("connect", () => {
            console.log(`abriu a conexão: ${socket.id}` );
            dispatch(Creators.progressAction({ value: 0}))
            setClientId(socket.id);
        });
    }, [socket, dispatch]);

    useEffect(() => {
        setTotal(0)
        dispatch(Creators.progressAction({ value: 0}))

        if (props.id) {
            const findVideo = async (id: number) : Promise<VideosModel> => {
                return await httpVideosApi().findBy(id)
            }

            findVideo(props.id)
                .then(video => {
                    setIdVideo(props.id)
                    reset(video)
                    setActive(video.ativo)
                    setFiles([{
                        id: 1,
                        preview: video.nome_video,
                        name: 'image',
                        url: ''
                    }])
                });
        }
    }, [dispatch, props.id, reset])


    async function onSubmit(formData: Record<string, any>, event: any) {
        formData.id = idVideo
        formData.ativo = active ? 1 : 0
        snackbar.closeSnackbar('snackbar-upload')

        await httpVideosApi()
            .save(formData)
            .then((response) => {
                snackbar.enqueueSnackbar('Video salvo com sucesso, aguarde o upload', {
                    variant: 'success'
                });

                const video = response.data.data

                setIdVideo(video.id_videos as number)
                props.setId(video.id_videos);

                submitVideo(video)

                return response.data.data;
            })
            .catch((error) => {
                if (error.response) {
                    snackbar.enqueueSnackbar(error.response.data.message, {
                        variant: 'error'
                    });
                }
            })


    }

    const submitVideo = (video: VideosModel) => {
        if (!video.id_videos) {
            return;
        }

        if (!clientId) {
            return;
        }

        if (!files?.length || typeof files === "undefined" || !files[0].file) {
            return;
        }

        const params = {
            id_videos: video.id_videos,
            nome_video: files[0].file,
            socket_id: clientId
        }

        httpVideosApi().upload(params,{
            config: {
                headers: {
                    'content-type': 'multipart/form-data',
                    ignoreLoader: true
                }
            }
        })

        snackbar.enqueueSnackbar('', {
            key: 'snackbar-upload',
            persist: true,
            anchorOrigin: {
                vertical: "bottom",
                horizontal: "right"
            },
            content: (key, message) => (
                <SnackbarUpload id={key} total={total} />
            )
        })
    }

    const onUploadFiles = (files: any) => {
        const uploadedFiles = files.map((file: File) => ({
            file,
            name: file.name,
            preview: URL.createObjectURL(file),
            url: null
        }));
        const { size } = uploadedFiles.reduce((prev:any, next: any) => ({ size: prev.size + next.file.size }), { size: 0 })

        setTotal(size)

        setFiles(uploadedFiles);
    }

    const onDeleteFile = async (name: string) => {
        snackbar.closeSnackbar('snackbar-upload')

        if (files === undefined) {
            return;
        }
        const newFiles = files.filter(file => file.name !== name)
        setFiles(newFiles);
    };

    return (
        <Container>
            <form className={classes.marginTop} onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    name="titulo_video"
                    label="Título"
                    variant="outlined"
                    fullWidth
                    margin={"normal"}
                    inputRef={register}
                    error={errors.titulo_video !== undefined}
                    helperText={errors.titulo_video && errors.titulo_video.message}
                    InputLabelProps={{
                        shrink: true
                    }}
                />

                <UploadFile onUpload={onUploadFiles}/>
                {files !== undefined && !!files.length && (
                    <FileList files={files} onDelete={onDeleteFile}/>
                )}

                <FormControlLabel
                    control={
                        <Checkbox
                            name="is_active"
                            color="primary"
                            onChange={() => setActive(!active)}
                            checked={active}
                        />
                    }
                    label="Ativo"
                />

                <Box dir={"rtl"}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                    >Salvar</Button>
                </Box>
            </form>
        </Container>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        inputInline: {
            paddingRight: theme.spacing(2),
        },
        marginTop: {
            marginTop: theme.spacing(2),
        }
    }),
);

export default RegisterVideo;