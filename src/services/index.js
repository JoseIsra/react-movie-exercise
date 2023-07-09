const URL = 'https://www.omdbapi.com/';
const API_KEY = '4fc5848d';

export async function searchMovies({ search }) {
  try {
    const response = await fetch(`${URL}?apikey=${API_KEY}&s=${search}`);
    const json = await response.json();
    return json.Search;
  } catch (error) {
    throw new Error('Error searching movie 😞');
  }
}
