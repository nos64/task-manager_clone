import React from 'react';
import styles from './Board.module.scss';
import { RiEditLine, RiDeleteBin6Line } from 'react-icons/ri';

type BoardProops = {
  item: { _id: string; title: string; description: string };
};

const Board: React.FC<BoardProops> = ({ item }) => {
  return (
    <div className={styles.board}>
      <div className={styles.boardContent}>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.description}>{item.description}</p>
      </div>
      <div className={styles.boardBtns}>
        <RiEditLine className={styles.boardBtn} />
        <RiDeleteBin6Line className={styles.boardBtn} />
      </div>
    </div>
  );
};

export default Board;
