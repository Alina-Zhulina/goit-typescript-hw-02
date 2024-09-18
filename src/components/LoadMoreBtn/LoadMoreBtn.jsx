import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick, disabled }) => (
  <div className={css.buttonContainer}>
    <button onClick={onClick} className={css.loadMoreBtn} disabled={disabled}>
      Load More
    </button>
  </div>
);

export default LoadMoreBtn;
