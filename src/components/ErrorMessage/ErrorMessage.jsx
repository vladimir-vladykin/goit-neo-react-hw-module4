import styles from './ErrorMessage.module.css';

const ErrorMessage = () => {
  return <p className={styles.error}>Something when wrong, please try later</p>;
};

export default ErrorMessage;
