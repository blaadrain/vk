import axios from 'axios';

export const fetchCatFact = async () => {
  try {
    const response = await axios.get('https://catfact.ninja/fact');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
