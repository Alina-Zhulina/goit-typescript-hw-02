import css from "./ErrorMessage.module.css";

const ErrorMessage = ({ message }) => (
  <div className={css.errorContainer}>
    <p className={css.errorMessage}>{message}</p>
  </div>
);

export default ErrorMessage;
