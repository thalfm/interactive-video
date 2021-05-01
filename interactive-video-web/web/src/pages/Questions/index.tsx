import React, { useEffect, useState, useCallback } from 'react';
import { MUIDataTableColumn } from 'mui-datatables';
import { Box, Fab, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import RegisterQuestion from "./RegisterQuestion";
import Page from "../../components/Page";
import { BadgeNo, BadgeYes } from "../../components/Badge";
import FullModal from "../../components/FullModal";
import Table from "../../components/Table";
import httpQuestionsApi from "../../services/httpQuestionsApi";
import QuestionsModel from "../../models/QuestionsModel";

export const Questions = () => {
    const [id, setId] = useState(0);
    const [questions, setQuestions] = useState<QuestionsModel[]>([]);

    const fetchData = async () => {
        const questionsResult = await httpQuestionsApi().all()

        setQuestions(questionsResult)
    }

    const fetchDataMemoizedCallback = useCallback( () => {
        fetchData();
    },[fetchData]);

    useEffect(() => {
        fetchDataMemoizedCallback();
    }, []);

    const columnsDefinition: MUIDataTableColumn[] = [
        {
            name: 'descricao_pergunta',
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
            name: 'id_perguntas',
            label: 'Opções',
            options: {
                customBodyRender(value, tableMeta, updateValue) {
                    return (
                        <>
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

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setId(0);
        setOpen(true);
    };

    const handleEdit = (value: number) => {
        setId(value);
        setOpen(true);
    }

    const handleDelete = async (value: number) => {
        fetchData();
    }

    return (
        <Page title="Lista de Perguntas">
            <Box dir="rtl" style={{
                paddingBottom: 10
            }}>
                <Fab
                    variant="extended"
                    size="medium"
                    color="primary"
                    aria-label="adicionar"
                    onClick={handleClickOpen}
                >
                    <AddIcon />
                    Cadastrar
                </Fab>
            </Box>

            <Table
                columns={columnsDefinition}
                data={questions}
                title=""
            />

            <FullModal {...{ open, setOpen, title: `${id === 0 ? 'Cadastrar' : 'Editar'} Pergunta` ,onHandleClose:fetchData}}>
                <RegisterQuestion {...{ id, setId }} />
            </FullModal>

        </Page>
    );
};