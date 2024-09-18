const API_BASE_URL = process.env.NEXT_APP_API_BASE_URL || 'http://localhost:8000';

const getMovies = async () => {
  const response = await fetch(`${API_BASE_URL}/movies/`);
  const data = await response.json();
  return data;
};

export default getMovies;
