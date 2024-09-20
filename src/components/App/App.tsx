import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import { ApiResponse, FetchResponse, Image } from "./App.types";

const getPhotos = async (
  query: string,
  page: number = 1
): Promise<FetchResponse> => {
  const ACCESS_KEY = "Qj9TW4kBDIFCARi3Q-8HnUMK5qyrbemsk9V8q8X8rr0";
  const per_page = 20;
  try {
    const { data } = await axios.get<ApiResponse>(
      "https://api.unsplash.com/search/photos",
      {
        params: {
          query,
          page,
          per_page,
          client_id: ACCESS_KEY,
        },
      }
    );
    const { results, total } = data;
    return {
      per_page,
      photos: results,
      total_results: total,
    };
  } catch (error: any) {
    throw new Error(
      error.response ? error.response.data.error : "An error occurred"
    );
  }
};

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [images, setImages] = useState<Image[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);

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
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoader(false);
        setShouldFetch(false);
      }
    };

    fetchImages();
  }, [searchQuery, page, shouldFetch]);

  const handleSearchQueryChange = (): void => {
    setSearchQuery(inputValue);
    setShouldFetch(true);
    setImages([]);
    setPage(1);
    setIsEmpty(false);
    setIsVisible(true);
    setInputValue("");
  };

  const handleLoadMore = (): void => {
    setPage((prevPage) => prevPage + 1);
    setShouldFetch(true);
  };

  const openModal = (image: Image): void => {
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
