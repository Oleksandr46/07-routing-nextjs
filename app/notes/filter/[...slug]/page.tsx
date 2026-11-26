import { getNotes } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { Suspense } from "react";

type Props = {
  params: Promise<{ slug: string[] }>;
};

async function Notes() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, ""],
    queryFn: () => getNotes(1, 10, ""),
  });

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient />
      </HydrationBoundary>
    </main>
  );
}

export default function NotesPage() {
  return (
    <Suspense fallback={<p>Loading, please wait...</p>}>
      <Notes />
    </Suspense>
  );
}
