import Link from "next/link";

export default function MovieCard({ movie }) {
  return (
    <div className="rounded overflow-hidden shadow-lg">
      <div className="p-2">
        <h2 className="font-semibold">{movie.title}</h2>
        <p>{movie.release_date}</p>
        <Link
          href={`/movie/${movie.id}`}
          className="text-blue-500 hover:underline"
        >
          Details
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/no-poster.png"
            }
            alt={movie.title}
            className="w-full h-auto"
          />
        </Link>
      </div>
    </div>
  );
}
