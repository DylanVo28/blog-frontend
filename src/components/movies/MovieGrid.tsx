import type { StreamingShowSummary } from "@/types/streaming.types";
import { MovieCard } from "@/components/movies/MovieCard";

interface MovieGridProps {
  movies: StreamingShowSummary[];
}

export function MovieGrid({ movies }: MovieGridProps) {
  if (!movies.length) {
    return (
      <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-6 py-12 text-center text-zinc-400">
        Chua co phim de hien thi.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
