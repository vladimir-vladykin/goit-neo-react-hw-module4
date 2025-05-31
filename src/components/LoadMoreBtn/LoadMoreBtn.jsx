import styles from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onClick }) => {
  return (
    <div className={styles.button_container}>
      <button onClick={onClick}>Load more</button>
    </div>
  );
};

export default LoadMoreBtn;
