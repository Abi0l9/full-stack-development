import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const createNew = async (object) => {
  const request = await axios.post(baseUrl, object);
  return request.data;
};

const updateVotes = async (id, vote) => {
  const request = await axios.patch(`${baseUrl}/${id}`, vote);
  return request.data;
};

// eslint-disable-next-line
export default { getAll, createNew, updateVotes };
