import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { fetchTrendingMovies } from "@/api/movies";
import { fetchGenres } from "@/api/genres"; // Assuming there's an API to fetch genres
import { motion } from "framer-motion";
import Rating from "@/components/Rating";

const Index = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortOption, setSortOption] = useState("title");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrendingMovies(page, 20) // Increase the number of movies fetched per request
      .then((data) => setMovies((prevMovies) => [...prevMovies, ...data]))
      .catch((error) => console.error("Error fetching trending movies:", error));

    fetchGenres()
      .then((data) => setGenres(data))
      .catch((error) => console.error("Error fetching genres:", error));
  }, [page]);

  const handleSortChange = (value) => {
    setSortOption(value);
    const sortedMovies = [...movies].sort((a, b) => {
      if (value === "title") {
        return a.title.localeCompare(b.title);
      } else if (value === "rating") {
        return b.vote_average - a.vote_average;
      } else if (value === "popularity") {
        return b.popularity - a.popularity;
      }
      return 0;
    });
    setMovies(sortedMovies);
  };

  const handleGenreChange = (value) => {
    setSelectedGenre(value);
  };

  const filteredMovies = selectedGenre
    ? movies.filter((movie) => movie.genre_ids.includes(parseInt(selectedGenre)))
    : movies;

  const loadMoreMovies = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleViewMore = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  useEffect(() => {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl text-center mb-4">Trending Movies</h1>
          <div className="flex justify-between mb-4">
            <Select onValueChange={handleSortChange}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="popularity">Popularity</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={handleGenreChange}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by Genre" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((genre) => (
                  <SelectItem key={genre.id} value={genre.id.toString()}>
                    {genre.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <ScrollArea className="h-[500px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMovies.map((movie) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle>{movie.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-auto mb-2 rounded-md" />
                      <p>{movie.overview}</p>
                      <div className="flex items-center mt-2">
                        <span className="mr-2">Rating:</span>
                        <Rating initialRating={movie.vote_average} />
                      </div>
                      <Button onClick={() => handleViewMore(movie.id)} className="mt-2">View More</Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
          <div className="flex justify-center mt-4">
            <Button onClick={loadMoreMovies}>Load More</Button>
          </div>
        </div>
      </div>
    );
  }, []);

  return null;
};

export default Index;