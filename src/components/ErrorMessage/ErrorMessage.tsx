import css from "./ErrorMessage.module.css";
type ErrorMessageProps = {
  message: string;
};
const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <div className={css.errorContainer}>
    <p className={css.errorMessage}>{message}</p>
  </div>
);

export default ErrorMessage;
