import React from 'react';
import DropDown from '../DropDown';

export default function index({ actions, columns = [], items = [] }) {
  return (
    <table className="mt-4 table table-striped table-hovered">
      <thead className="thead-dark">
        <tr>
          {columns.map((column) => (
            <th key={column.name}>{column.value}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            {columns.map((column) => {
              if (column.render) {
                return column.render(item[column.name]);
              }

              return (
                <td key={column.name}>
                  {item[column.name]}
                </td>
              );
            })}
            <td>
              <DropDown actions={actions} item={item} title="Actions" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}