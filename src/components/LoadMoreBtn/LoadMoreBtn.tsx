import css from "./LoadMoreBtn.module.css";

type LoadMoreBtnProps = {
  onClick: () => void;
  disabled?: boolean;
};

const LoadMoreBtn = ({ onClick, disabled = false }: LoadMoreBtnProps) => (
  <div className={css.buttonContainer}>
    <button onClick={onClick} className={css.loadMoreBtn} disabled={disabled}>
      Load More
    </button>
  </div>
);

export default LoadMoreBtn;
