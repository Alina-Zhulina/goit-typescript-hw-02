import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import "./App.css";

const getPhotos = async (query, page = 1) => {
  const ACCESS_KEY = "Qj9TW4kBDIFCARi3Q-8HnUMK5qyrbemsk9V8q8X8rr0";
  const per_page = 20;
  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query,
        page,
        per_page,
        client_id: ACCESS_KEY,
      },
    });
    const { results, total } = response.data;
    return {
      per_page,
      photos: results,
      total_results: total,
    };
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.error : "An error occurred"
    );
  }
};

function App() {
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [isEmpty, setIsEmpty] = useState(false);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(false);

  useEffect(() => {
    if (!searchQuery || !shouldFetch) return;

    const fetchImages = async () => {
      setLoader(true);
      try {
        const { per_page, photos, total_results } = await getPhotos(
          searchQuery,
          page
        );
        if (page === 1 && !photos.length) {
          setIsEmpty(true);
        } else {
          setImages((prevImages) => [...prevImages, ...photos]);
          setIsVisible(page < Math.ceil(total_results / per_page));
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoader(false);
        setShouldFetch(false);
      }
    };

    fetchImages();
  }, [searchQuery, page, shouldFetch]);

  const handleSearchQueryChange = () => {
    setSearchQuery(inputValue);
    setShouldFetch(true);
    setImages([]);
    setPage(1);
    setIsEmpty(false);
    setIsVisible(true);
    setInputValue("");
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    setShouldFetch(true);
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <SearchBar
        query={inputValue}
        onChange={setInputValue}
        onSubmit={handleSearchQueryChange}
      />
      {error && <ErrorMessage message={error} />}
      {isEmpty && !error && <p>No results found.</p>}
      <ImageGallery images={images} onImageClick={openModal} />
      {loader && <Loader />}
      {isVisible && images.length > 0 && !loader && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      <ImageModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        image={selectedImage}
      />
    </div>
  );
}

export default App;
