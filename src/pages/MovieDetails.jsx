import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "@/api/movies";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetails(movieId)
      .then((data) => setMovie(data))
      .catch((error) => console.error("Error fetching movie details:", error));
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="container mx-auto p-4">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>{movie.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-auto mb-2 rounded-md" />
            <p>{movie.overview}</p>
            <div className="flex items-center mt-2">
              <span className="mr-2">Rating:</span>
              <span>{movie.vote_average}</span>
            </div>
            <div className="flex items-center mt-2">
              <span className="mr-2">Release Date:</span>
              <span>{movie.release_date}</span>
            </div>
            <div className="flex items-center mt-2">
              <span className="mr-2">Genres:</span>
              <span>{movie.genres.map((genre) => genre.name).join(", ")}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MovieDetails;