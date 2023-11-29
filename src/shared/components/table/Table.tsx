import TableAntd, { TableProps } from "antd/es/table";

function Table<RecordType extends object = any>(props: TableProps<RecordType>) {
  return <TableAntd {...props} />;
}

export default Table;
