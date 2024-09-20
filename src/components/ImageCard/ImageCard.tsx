import { Image } from "../App/App.types";
import css from "./ImageCard.module.css";
type ImageCardProps = {
  image: Image;
  onClick: () => void;
};
const ImageCard = ({ image, onClick }: ImageCardProps) => (
  <div className={css.card} onClick={onClick}>
    <img
      src={image.urls.small}
      alt={image.alt_description}
      className={css.image}
    />
  </div>
);

export default ImageCard;
