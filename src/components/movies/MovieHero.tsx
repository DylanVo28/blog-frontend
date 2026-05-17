import Link from "next/link";
import { Info, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBackdropUrl, getPosterUrl } from "@/lib/streaming";
import type { StreamingShowSummary } from "@/types/streaming.types";

interface MovieHeroProps {
  movie: StreamingShowSummary;
}

export function MovieHero({ movie }: MovieHeroProps) {
  const backdropUrl = getBackdropUrl(movie.imageSet) ?? getPosterUrl(movie.imageSet);
  const posterUrl = getPosterUrl(movie.imageSet);
  const year = movie.releaseYear ?? movie.firstAirYear;
  const rating = movie.rating ? (movie.rating / 10).toFixed(1) : null;

  return (
    <section className="relative min-h-[560px] overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 shadow-[0_40px_120px_-60px_rgba(0,0,0,1)]">
      {backdropUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={backdropUrl} alt="" className="absolute inset-0 h-full w-full object-cover opacity-55" />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-r from-[#08090b] via-[#08090b]/82 to-[#08090b]/10" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#08090b] to-transparent" />

      <div className="relative z-10 flex min-h-[560px] items-end px-5 py-8 sm:px-8 lg:px-12">
        <div className="grid w-full items-end gap-8 lg:grid-cols-[1fr_260px]">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex rounded-full border border-red-400/30 bg-red-500/15 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-red-100">
              Streaming Availability / Vietnam
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
                {movie.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-zinc-200">
                {rating ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-3 py-1 text-black">
                    <Star className="size-4 fill-current" />
                    {rating}
                  </span>
                ) : null}
                {year ? <span>{year}</span> : null}
                {movie.runtime ? <span>{movie.runtime} min</span> : null}
                <span className="rounded-full border border-white/15 px-3 py-1 uppercase">Movie</span>
              </div>
            </div>
            {movie.overview ? (
              <p className="line-clamp-3 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
                {movie.overview}
              </p>
            ) : null}
            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-red-600 text-white hover:bg-red-500">
                <Link href={`/movies/${movie.id}/watch`}>
                  <Play className="size-4 fill-current" />
                  Xem ngay
                </Link>
              </Button>
              <Button asChild className="border-white/15 bg-white/10 text-white hover:bg-white/15" variant="outline">
                <Link href={`/movies/${movie.id}`}>
                  <Info className="size-4" />
                  Xem chi tiet
                </Link>
              </Button>
            </div>
          </div>

          {posterUrl ? (
            <div className="hidden justify-self-end lg:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={posterUrl}
                alt={movie.title}
                className="aspect-[2/3] w-[240px] rounded-[1.5rem] border border-white/15 object-cover shadow-[0_35px_90px_-35px_rgba(220,38,38,0.85)]"
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
