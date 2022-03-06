import axios from "axios";

const fetchData = async (page: number) => {
  const url = `https://jsonplaceholder.typicode.com/posts?_page=${page}`;

  try {
    const response = await axios.get(url);
    return response;
  } catch (e) {
    return e;
  }
};

export { fetchData };
