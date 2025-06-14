import { useState } from 'react';
import css from './App.module.css';
import SearchBox from '../SearchBox/SearchBox';
import NoteList from '../NoteList/NoteList';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '../../services/noteService';
import Pagination from '../Pagination/Pagination';
import NoteModal from '../NoteModal/NoteModal';
import { BeatLoader } from 'react-spinners';

export default function App() {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 1000);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  const { data, isLoading } = useQuery({
    queryKey: ['notes', debouncedQuery, currentPage],
    queryFn: () => fetchNotes(debouncedQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  function handleSearchChange(newQuery: string) {
    setQuery(newQuery);
    setCurrentPage(1);
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={query} onSearch={handleSearchChange} />
        {data && data.notes.length > 0 && (
          <Pagination
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
        {isModalOpen && <NoteModal closeModal={closeModal} />}
      </header>
      {!data && isLoading && (
        <div className={css.beatloader}>
          <BeatLoader />
        </div>
      )}
      {data && !isLoading && <NoteList notes={data.notes} />}
    </div>
  );
}
