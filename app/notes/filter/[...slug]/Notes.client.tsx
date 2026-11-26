"use client";

import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { getNotes } from "@/lib/api";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import css from "@/components/NotesPage/NotesPage.module.css";

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError, isFetching, isPlaceholderData } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => getNotes(page, 10, search),
    staleTime: 60 * 1000,
    placeholderData: keepPreviousData,
  });

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }
  if (isError) {
    return <p>Something went wrong.</p>;
  }

  return (
    <section className={css.app}>
      <div className={css.toolbar}>
        <SearchBox
          value={inputValue}
          onChange={value => {
            handleSearch(value);
            setInputValue(value);
          }}
        />
        {data && data.totalPages > 1 && (
          <Pagination totalPages={data.totalPages} currentPage={page} onPageChange={setPage} />
        )}
        <button type="button" className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </div>

      {isFetching && !isPlaceholderData && <p>Updating notes...</p>}
      {isPlaceholderData && <p>Loading next page...</p>}
      {data && <NoteList notes={data.notes} />}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </section>
  );
}
