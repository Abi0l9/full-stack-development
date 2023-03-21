import Diaries from "./components/Diaries";
import Form from "./components/Form";
import Header from "./components/Header";
import { DiaryFields } from "./formFields";

function App() {
  return (
    <div>
      <Header />
      <Form elements={DiaryFields} />
      <Diaries />
    </div>
  );
}

export default App;
