import Link from "next/link";
import { Star } from "lucide-react";
import { getPosterUrl } from "@/lib/streaming";
import type { StreamingShowSummary } from "@/types/streaming.types";

interface MovieCardProps {
  movie: StreamingShowSummary;
}

export function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = getPosterUrl(movie.imageSet);
  const year = movie.releaseYear ?? movie.firstAirYear;
  const rating = movie.rating ? (movie.rating / 10).toFixed(1) : null;

  return (
    <Link href={`/movies/${movie.id}`} className="group block min-w-0">
      <article className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.04] shadow-[0_20px_60px_-35px_rgba(0,0,0,0.9)] transition duration-300 hover:-translate-y-1 hover:border-red-400/40 hover:shadow-[0_24px_70px_-28px_rgba(220,38,38,0.72)]">
        <div className="relative aspect-[2/3] overflow-hidden bg-zinc-900">
          {posterUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={posterUrl}
              alt={movie.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800 px-4 text-center text-sm text-zinc-500">
              No poster
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-3">
            {rating ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-2 py-1 text-[0.7rem] font-black text-black">
                <Star className="size-3 fill-current" />
                {rating}
              </span>
            ) : null}
          </div>
        </div>
        <div className="space-y-1 p-3">
          <h3 className="line-clamp-2 text-sm font-bold text-white">{movie.title}</h3>
          <p className="text-xs font-medium text-zinc-400">{year ?? "Unknown year"}</p>
        </div>
      </article>
    </Link>
  );
}
