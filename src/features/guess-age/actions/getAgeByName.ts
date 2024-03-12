import axios from 'axios';

export const getAgeByName = async (name: string) => {
  try {
    const response = await axios.get(`https://api.agify.io?name=${name}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
