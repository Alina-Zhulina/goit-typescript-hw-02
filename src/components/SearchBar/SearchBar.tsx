import { FaSearch } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";
import { FormEvent } from "react";
type SearchBarProps = {
  query: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

const SearchBar = ({ query, onChange, onSubmit }: SearchBarProps) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (query.trim() === "") {
      toast.error("Please enter a search query.");
      return;
    }
    onSubmit();
  };

  return (
    <header className={css.searchbar}>
      <Toaster />
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          className={css.input}
        />
        <button type="submit" className={css.button}>
          <FaSearch />
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
