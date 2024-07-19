import React from 'react';
import styles from './Table.module.css';

const Table = ({ dados, onRead, onEdit, onDelete }) => {    
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.th}>ID</th>
          <th className={styles.th}>Name</th>
          <th className={styles.th}>Subcategoria</th>
          <th className={styles.th}>Ações</th>
        </tr>
      </thead>
      <tbody>
        {dados.map((item) => (
          <tr key={item.id_category}>
            <td className={styles.td}>{item.id_category}</td>
            <td className={styles.td}>{item.name}</td>
            <td className={styles.td}>{item.subcategory.name}</td>
            <td className={styles.td}>
            <button className={styles.button} onClick={() => onRead(item.id_category)}>Visualizar</button>
              <button className={styles.button} onClick={() => onEdit(item.id_category)}>Editar</button>
              <button className={styles.button} onClick={() => onDelete(item.id_category)}>Deletar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
