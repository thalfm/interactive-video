import React, {useEffect, useState} from "react"
import Page from "../../components/Page"
import {Box, Fab, IconButton} from "@material-ui/core"
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'
import Table from "../../components/Table"
import FullModal from "../../components/FullModal"
import {BadgeNo, BadgeYes} from "../../components/Badge"
import {MUIDataTableColumn} from "mui-datatables"
import RegisterCourse from "./RegisterCourse"
import httpCoursesApi from "../../services/httpCoursesApi"
import CoursesModel from "../../models/CoursesModel"
import SyncAlt from "@material-ui/icons/SyncAlt";
import RelationVideos from "./RelationVideos";

const Courses: React.FC = () => {
    const [open, setOpen] = useState(false)
    const [openRelation, setOpenRelation] = useState(false);
    const [id, setId] = useState(0)
    const [courses, setCourses] = useState<CoursesModel[]>([])

    useEffect(() => {
        fetchData()
    },  [])

    const fetchData = async () => {
        const coursesResult = await httpCoursesApi().all()

        setCourses(coursesResult)
    }

    const relationVideos = (value: number) => {
        setId(value)
        setOpenRelation(true);
    }

    const columnsDefinition: MUIDataTableColumn[] = [
        {
            name: 'nome_curso',
            label: 'Nome'
        },
        {
            name: 'descricao_curso',
            label: 'Descrição'
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
            name: 'id_cursos',
            label: 'Opções',
            options: {
                customBodyRender(value, tableMeta, updateValue) {
                    return (
                        <>
                            <IconButton title={"Relacionar videos"} onClick={() => relationVideos(value)}>
                                <SyncAlt />
                            </IconButton>
                            <IconButton onClick={() => handleEdit(value)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(value)}>
                                <Delete />
                            </IconButton>
                        </>
                    )

                }
            }
        }
    ]

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleEdit = (value: number) => {
        setId(value)
        setOpen(true)
    }

    const handleDelete = async (value: number) => {
        fetchData()
    }

    return (
        <Page title={'Lista de cursos'}>
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
                data={courses}
                title=""
            />

            <FullModal {...{ open, setOpen, title: `${id === 0 ? 'Cadastrar' : 'Editar'} Cursos` ,onHandleClose:fetchData}}>
                <RegisterCourse {...{ id, setId }} />
            </FullModal>

            <FullModal {...{ open: openRelation, setOpen: setOpenRelation, title: `Relacionar Cursos e videos` }}>
                <RelationVideos {...{ id, setId }} />
            </FullModal>
        </Page>
    )
}

export default Courses