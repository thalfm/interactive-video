import React, {useEffect, useState} from "react";
import Page from "../../components/Page";
import {Box, Fab, IconButton} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Table from "../../components/Table";
import FullModal from "../../components/FullModal";
import RegisterCourse from "../Video/RegisterVideo";
import {MUIDataTableColumn} from "mui-datatables";
import {BadgeNo, BadgeYes} from "../../components/Badge";
import EditIcon from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import SyncAlt from "@material-ui/icons/SyncAlt";
import httpVideosApi from "../../services/httpVideosApi";
import VideosModel from "../../models/VideosModel";
import RelationQuestion from "./RelationQuestions";

const Video: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [openRelation, setOpenRelation] = useState(false);
    const [id, setId] = useState(0);
    const [videos, setVideos] = useState<VideosModel[]>([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const videosResult = await httpVideosApi().all()

        setId(0)
        setVideos(videosResult)
    }

    const columnsDefinition: MUIDataTableColumn[] = [
        {
            name: 'titulo_video',
            label: 'Título do vídeo'
        },
        {
            name: 'ativo',
            label: 'Ativo?',
            options: {
                customBodyRender(value: boolean, tableMeta, updateValue) {
                    return value ? <BadgeYes /> : <BadgeNo />
                }
            }
        },
        {
            name: 'id_videos',
            label: 'Opções',
            options: {
                customBodyRender(value, tableMeta, updateValue) {
                    return (
                        <>
                            <IconButton title={"Relacionar perguntas"} onClick={() => relationQuestions(value)}>
                                <SyncAlt />
                            </IconButton>
                            <IconButton title={'Editar'} onClick={() => handleEdit(value)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton title={'Remover'} onClick={() => handleDelete(value)}>
                                <Delete />
                            </IconButton>
                        </>
                    )

                }
            }
        }
    ]

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleEdit = (value: number) => {
        setId(value)
        setOpen(true);
    }

    const relationQuestions = (value: number) => {
        setId(value)
        setOpenRelation(true);
    }

    const handleDelete = async (value: number) => {
        fetchData();
    }
    return (
        <Page title={'Lista de videos'}>
            <Box dir="rtl" style={{
                paddingBottom: 10
            }}>
                <Fab
                    variant="extended"
                    size="medium"
                    color="primary"
                    aria-label="adicionar"
                    onClick={handleClickOpen}
                    classes={{
                        primary: '#000'
                    }}
                >
                    <AddIcon />
                    Cadastrar
                </Fab>
            </Box>

            <Table
                columns={columnsDefinition}
                data={videos}
                title=""
            />

            <FullModal {...{ open, setOpen, title: `${id === 0 ? 'Cadastrar' : 'Editar'} Videos` ,onHandleClose:fetchData}}>
                <RegisterCourse {...{ id, setId }} />
            </FullModal>

            <FullModal {...{ open: openRelation, setOpen: setOpenRelation, title: `Relacionar Videos e perguntas` }}>
                <RelationQuestion {...{ id, setId }} />
            </FullModal>
        </Page>
    );
}

export default Video;