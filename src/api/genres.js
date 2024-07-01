const BASE_URL = 'https://api.themoviedb.org/3';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzlmNzBiYzE3NWUwMzViYmNkMDVmYmI1MzI4OGE0NyIsIm5iZiI6MTcxOTgyNzUwMS40MTQ0NjQsInN1YiI6IjY2ODI3YWRiNzVlOWZhMmNmMzkyODAzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AoqxCfHRacX-JCzlco4jxf35-p5H1QysNjFGzcMi3w4'
  }
};

export const fetchGenres = async () => {
  try {
    const response = await fetch(`${BASE_URL}/genre/movie/list`, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch genres. Status: ${response.status} ${response.statusText}. Please check your API key or network connection.`);
    }
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};