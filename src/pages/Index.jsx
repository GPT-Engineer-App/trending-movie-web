import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchTrendingMovies } from "@/api/movies";
import { fetchGenres } from "@/api/genres"; // Assuming there's an API to fetch genres

const Index = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortOption, setSortOption] = useState("title");

  useEffect(() => {
    fetchTrendingMovies()
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching trending movies:", error));

    fetchGenres()
      .then((data) => setGenres(data))
      .catch((error) => console.error("Error fetching genres:", error));
  }, []);

  const handleSortChange = (value) => {
    setSortOption(value);
    const sortedMovies = [...movies].sort((a, b) => {
      if (value === "title") {
        return a.title.localeCompare(b.title);
      } else if (value === "rating") {
        return b.vote_average - a.vote_average;
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
              <Card key={movie.id} className="shadow-lg">
                <CardHeader>
                  <CardTitle>{movie.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-auto mb-2 rounded-md" />
                  <p>{movie.overview}</p>
                  <div className="flex items-center mt-2">
                    <span className="mr-2">Rating:</span>
                    <Rating movieId={movie.id} initialRating={movie.vote_average} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

const Rating = ({ movieId, initialRating }) => {
  const [rating, setRating] = useState(initialRating);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    // Here you would also send the new rating to your backend or API
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`cursor-pointer ${star <= rating ? "text-yellow-500" : "text-gray-400"}`}
          onClick={() => handleRatingChange(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Index;