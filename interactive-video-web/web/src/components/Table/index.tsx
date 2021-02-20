import React from 'react';
import MUIDataTable, { MUIDataTableProps } from 'mui-datatables';

const translation = {
  textLabels: {
    body: {
      noMatch: "Desculpe, nenhum resultado encontrado",
      toolTip: "Ordenar",
      columnHeaderTooltip: (column:any) => `Ordenar por ${column.label}`
    },
    pagination: {
      next: "Próxima página",
      previous: "Página anterior",
      rowsPerPage: "Linhas por página:",
      displayRows: "de",
    },
    toolbar: {
      search: "Procurar",
      downloadCsv: "Download CSV",
      print: "Imprimir",
      viewColumns: "Ver colunas",
      filterTable: "Filtrar tabela",
    },
    filter: {
      all: "Todos",
      title: "Filtro",
      reset: "Limpar",
    },
    viewColumns: {
      title: "Mostrar Colunas",
      titleAria: "Mostrar/Ocultar colunas da tabela",
    },
    selectedRows: {
      text: "linha(s) selecionada(s)",
      delete: "Apagar",
      deleteAria: "Apagar linha(s) seleciona(s)",
    },
  }
}
interface TableProps extends MUIDataTableProps { }
const Table: React.FC<TableProps> = (props) => {

  return (
    <MUIDataTable
      columns={props.columns}
      data={props.data}
      title={props.title}
      options={translation}
    />
  );
}

export default Table;