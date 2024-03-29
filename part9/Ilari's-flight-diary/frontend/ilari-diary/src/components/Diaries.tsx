import { useEffect, useState } from "react";
import { NewDiaryEntries } from "../types";
import DiaryServices from "../services/diaries";

const Diaries = () => {
  const [diaries, setDiaries] = useState<NewDiaryEntries[]>([]);

  useEffect(() => {
    DiaryServices.getAll().then((data) => setDiaries(data));
  }, [diaries]);
  return (
    <div>
      <h2>Diary Entries</h2>
      <div>
        {diaries
          .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
          .map((diary) => (
            <div key={diary.id}>
              <h3>{diary.date}</h3>
              <p>
                visibility: {diary.visibility}
                <br />
                weather: {diary.weather}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Diaries;
