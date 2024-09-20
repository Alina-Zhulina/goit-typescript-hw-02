import Modal from "react-modal";
import css from "./ImageModal.module.css";
import { Image } from "../App/App.types";

Modal.setAppElement("#root");
type ImageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  image: Image | null;
};

const ImageModal = ({ isOpen, onClose, image }: ImageModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.modal}
      overlayClassName={css.overlay}
      closeTimeoutMS={300}
    >
      {image && (
        <div className={css.modalContent}>
          <img
            src={image.urls.regular}
            alt={image.alt_description}
            className={css.modalImage}
          />
          <p>By {image.user.name}</p>
          <p>{image.likes} Likes</p>
        </div>
      )}
    </Modal>
  );
};

export default ImageModal;
