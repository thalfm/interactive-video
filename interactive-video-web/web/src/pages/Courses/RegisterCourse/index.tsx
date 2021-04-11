import React, {useState, useEffect} from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import {
    Button,
    TextField,
    Container,
    Box, FormControlLabel, Checkbox,
} from '@material-ui/core';
import {useForm} from "react-hook-form";
import {useSnackbar} from 'notistack'
import * as yup from '../../../yup';
import UploadFile from "../../../components/UploadFile";
import FileList from "../../../components/FileList";
import httpCoursesApi from "../../../services/httpCoursesApi";
import CoursesModel from "../../../models/CoursesModel";


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

const validationSchema = yup.object().shape({
    nome_curso: yup.string()
        .label("Título")
        .required(),
    descricao_curso: yup.string()
        .label("Descrição")
        .required()
        .max(200)
})

interface File {
    id: number,
    preview: string,
    name: string,
    url: string
}

interface FormCourseProps {
    id: number,
    setId: Function
}

const RegisterCourse: React.FC<FormCourseProps> = (props) => {

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

    const [files, setFiles] = useState<File[]>();
    const [idCourse, setIdCourse] = useState(0);
    const [active, setActive] = useState(true);

    useEffect(() => {
        if (props.id) {
            const findCourse = async (id: number) : Promise<CoursesModel> => {
                return await httpCoursesApi().findBy(id)
            }

            findCourse(props.id)
                .then(course => {
                    setIdCourse(props.id)
                    reset(course)
                    setActive(course.ativo)
                    setFiles([{
                        id: 1,
                        preview: course.imagem_curso,
                        name: 'image',
                        url: ''
                    }])
                });
        }
    }, [props.id])

    async function onSubmit(formData: Record<string, any>, event: any) {
        formData.id = idCourse
        formData.image = files
        formData.ativo = active ? 1 : 0

        const course = await httpCoursesApi()
            .save(formData)
            .then((response) => {
                snackbar.enqueueSnackbar('Curso salvo com sucesso', {
                    variant: 'success'
                });
                return response.data.data;
            })
            .catch((error) => {
                if (error.response) {
                    snackbar.enqueueSnackbar(error.response.data.message, {
                        variant: 'error'
                    });
                }
            })

        if (typeof course !== "undefined" && course.id_cursos > 0) {
            props.setId(course.id_cursos);
        }

    }

    const onUploadFiles = (files: any) => {
        const uploadedFiles = files.map((file: File) => ({
            file,
            name: file.name,
            preview: URL.createObjectURL(file),
            url: null
        }));
        setFiles(uploadedFiles);
    }

    const onDeleteFile = async (name: string) => {
        if (files === undefined) {
            return;
        }
        const newFiles = files.filter(file => file.name !== name)
        setFiles(newFiles);
    };

    const handleCourse = async (courseId: number | undefined) => {

    }

    return (
        <Container>

            <form className={classes.marginTop} onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    name="nome_curso"
                    label="Título"
                    variant="outlined"
                    fullWidth
                    margin={"normal"}
                    inputRef={register}
                    error={errors.nome_curso !== undefined}
                    helperText={errors.nome_curso && errors.nome_curso.message}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
                <TextField
                    name="descricao_curso"
                    label="Descrição"
                    variant="outlined"
                    multiline
                    fullWidth
                    rows={4}
                    inputRef={register}
                    error={errors.descricao_curso !== undefined}
                    helperText={errors.descricao_curso && errors.descricao_curso.message}
                    margin={"normal"}
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
                            name="ativo"
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

export default RegisterCourse;