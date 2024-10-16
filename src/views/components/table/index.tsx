import { get } from 'lodash';
import { ReactNode } from 'react';

type TableColumn<T> = {
  title: string;
  dataKey?: (string | number)[];
  className?: string;
  id?: string;
  render?: (data: T) => ReactNode;
};

type TableProps<T> = {
  columns: TableColumn<T>[];
  dataSource?: T[];
  className?: string;
  bodyId?: string;
};

function Table<T>(props: TableProps<T>) {
  const { columns, dataSource, className, bodyId } = props;
  return (
    <table className={`table table-zebra ${className}`}>
      <thead>
        {columns.map((column) => (
          <th id={column.id} className={column.className}>
            {column.title}
          </th>
        ))}
      </thead>
      <tbody id={bodyId}>
        {!!dataSource &&
          dataSource.map((data, rowIndex) => {
            return (
              <tr key={`row-${rowIndex}`}>
                {columns.map((column, colIndex) => {
                  const { dataKey, render } = column;
                  const colKey = `col-${rowIndex}-${colIndex}`;
                  if (!dataKey) {
                    return <td key={colKey}></td>;
                  }
                  const renderData = get(data, dataKey);
                  if (render) {
                    return <td key={colKey}>{render(renderData)}</td>;
                  }
                  return <td key={colKey}>{renderData}</td>;
                })}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

export default Table;
