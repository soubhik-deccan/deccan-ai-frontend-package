import React from "react";
import { TPTableProps } from "./type";

const PTable: React.FC<TPTableProps> = ({
  label,
  data,
  columns,
  renderCell,
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="p-table-wrapper">
        {label && <div className="p-table-header">{label}</div>}
        <div className="p-table-component">
          <div className="p-table-no-data">No data available.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-table-wrapper">
      {label && <div className="p-table-header">{label}</div>}
      <div className="p-table-component">
        <table className="p-table">
          <thead className="p-table__header">
            <tr className="p-table__row">
              {columns.map((column) => (
                <th key={column.dataKey} className="p-table__header-cell">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="p-table__body">
            {data.map((item, index) => (
              <tr key={index} className="p-table__row">
                {columns.map((column) => (
                  <td key={column.dataKey} className="p-table__cell">
                    {renderCell
                      ? renderCell(column.dataKey, item[column.dataKey])
                      : item[column.dataKey]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PTable;
