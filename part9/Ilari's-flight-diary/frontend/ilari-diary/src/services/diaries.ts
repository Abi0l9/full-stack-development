import axios from "axios";
import { NewDiaryEntries } from "../types";
const baseUrl: string = "http://localhost:3001/api/diaries";

const getAll = () => {
  const request = axios
    .get<NewDiaryEntries[]>(baseUrl)
    .then((data) => data.data);
  return request;
};

const AddDiary = (obj: NewDiaryEntries) => {
  const request = axios
    .post<NewDiaryEntries[]>(baseUrl, obj)
    .then((data) => data);
  return request;
};

// eslint-disable-next-line
export default { getAll, AddDiary };
