import axios from "axios";
import type { CreateNote, Note } from "@/types/note";
// import { Category } from "@/types/category";

const API = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
export const getNotes = async (
  page?: number,
  perPage?: number,
  search?: string
): Promise<FetchNotesResponse> => {
  const res = await API.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      search,
    },
  });
  return res.data;
};

export const createNote = async (newNote: CreateNote): Promise<Note> => {
  const res = await API.post<Note>("/notes", newNote);
  return res.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const res = await API.delete<Note>(`/notes/${noteId}`);
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await API.get<Note>(`/notes/${id}`);
  return res.data;
};

// export const getCategory = async (categoryId?: string) => {
//   const res = await API.get<Category[]>("/notes", {
//     params: { categoryId },
//   });
//   return res.data;
// };

export const getCategory = async () => {
  const res = await API.get<Note[]>("/tags");
  return res.data;
};
