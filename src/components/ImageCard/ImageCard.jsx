import css from "./ImageCard.module.css";

const ImageCard = ({ image, onClick }) => (
  <div className={css.card} onClick={onClick}>
    <img
      src={image.urls.small}
      alt={image.alt_description}
      className={css.image}
    />
  </div>
);

export default ImageCard;
