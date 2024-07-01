const BASE_URL = 'https://api.themoviedb.org/3';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzlmNzBiYzE3NWUwMzViYmNkMDVmYmI1MzI4OGE0NyIsIm5iZiI6MTcxOTgyNzUwMS40MTQ0NjQsInN1YiI6IjY2ODI3YWRiNzVlOWZhMmNmMzkyODAzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AoqxCfHRacX-JCzlco4jxf35-p5H1QysNjFGzcMi3w4'
  }
};

export const fetchTrendingMovies = async (page = 1) => {
  try {
    const response = await fetch(`${BASE_URL}/trending/movie/week?page=${page}`, options);
    if (!response.ok) {
      throw new Error('Failed to fetch trending movies');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${movieId}`, options);
    if (!response.ok) {
      throw new Error('Failed to fetch movie details');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const fetchConfiguration = async () => {
  try {
    const response = await fetch(`${BASE_URL}/configuration`, options);
    if (!response.ok) {
      throw new Error('Failed to fetch configuration');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching configuration:', error);
    throw error;
  }
};