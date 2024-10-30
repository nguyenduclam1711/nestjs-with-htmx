import { get } from 'lodash';
import { ReactNode } from 'react';

type TableColumn<T> = {
  title: string;
  dataKey?: (string | number)[];
  className?: string;
  id?: string;
  render?: {
    render: (value: unknown, data: T) => ReactNode;
  }['render'];
};

export type TableProps<T> = {
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
        {columns.map((column, index) => (
          <th
            key={`table-header-${index}`}
            id={column.id}
            className={column.className}
          >
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
                    if (!render) {
                      return <td key={colKey}></td>;
                    }
                    return <td key={colKey}>{render(data, data)}</td>;
                  }
                  const renderData = get(data, dataKey);
                  if (render) {
                    return <td key={colKey}>{render(renderData, data)}</td>;
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
