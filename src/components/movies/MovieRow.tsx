import type { StreamingShowSummary } from "@/types/streaming.types";
import { MovieCard } from "@/components/movies/MovieCard";

interface MovieRowProps {
  title: string;
  movies: StreamingShowSummary[];
}

export function MovieRow({ title, movies }: MovieRowProps) {
  if (!movies.length) {
    return null;
  }

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.35em] text-red-300/80">Cinema row</p>
          <h2 className="mt-1 text-2xl font-black tracking-tight text-white">{title}</h2>
        </div>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {movies.map((movie) => (
          <div key={movie.id} className="w-[150px] shrink-0 sm:w-[180px] lg:w-[200px]">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </section>
  );
}
