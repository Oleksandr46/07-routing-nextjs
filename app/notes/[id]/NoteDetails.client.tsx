"use client";
import css from "@/components/NoteDetails/NoteDetails.module.css";
import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }
  if (isError || !note) {
    return <p>Something went wrong.</p>;
  }
  const formatetDate =
    note.updatedAt !== note.createdAt
      ? `Updated at: ${note.updatedAt}`
      : `Created at: ${note.createdAt}`;

  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{formatetDate}</p>
        </div>
      </div>
    </main>
  );
}


// import { getStringNote } from "@/src/lib/api";
// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "next/navigation";

// const NoteDetailsClient = () => {
//   const { id } = useParams<{ id: string }>();
//   const {
//     data: note,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["note", id],
//     queryFn: () => getStringNote(id),
//     refetchOnMount: false,
//   });
//   if (isLoading) return <p>Loading...</p>;
//   if (error || !note) return <p>Some error..</p>;

// const formattedDate = note.updatedAt
//   ? `Updated at: ${note.updatedAt}`
//   : `Created at: ${note.createdAt}`;
//   return (
//     <main className={css.main}>
//       <div className={css.container}>
//         <div className={css.item}>
//           <div className={css.header}>
//             <h2>Note title</h2>
//           </div>
//           <p className={css.tag}>{note.tag}</p>
//           <p className={css.content}>Note content</p>
//           <p className={css.date}>Created date</p>
//         </div>
//       </div>
//     </main>
//   );
// };
// export default NoteDetailsClient;
