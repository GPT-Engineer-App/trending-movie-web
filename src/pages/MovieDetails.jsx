import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovieDetails } from "@/api/movies";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovieDetails(movieId)
      .then((data) => setMovie(data))
      .catch((error) => console.error("Error fetching movie details:", error));
  }, [movieId]);

  if (!movie) {
    return <div suppressHydrationWarning>Loading...</div>;
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="container mx-auto p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle suppressHydrationWarning>{movie.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-1/2 h-auto mb-2 rounded-md"
                suppressHydrationWarning
              />
              <p suppressHydrationWarning>{movie.overview}</p>
              <div className="flex items-center mt-2" suppressHydrationWarning>
                <span className="mr-2">Rating:</span>
                <span>{movie.vote_average}</span>
              </div>
              <div className="flex items-center mt-2" suppressHydrationWarning>
                <span className="mr-2">Release Date:</span>
                <span>{movie.release_date}</span>
              </div>
              <div className="flex items-center mt-2" suppressHydrationWarning>
                <span className="mr-2">Genres:</span>
                <span>{movie.genres.map((genre) => genre.name).join(", ")}</span>
              </div>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default MovieDetails;