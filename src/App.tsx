import "./App.scss";
import { Form } from "./components/Form/Form";
import { Header } from "./components/Header/Header";
import { TaskList } from "./components/TaskList/TaskList";

function App(): JSX.Element {
  return (
    <div className="App">
      <Header />
      <Form />
      <TaskList />
    </div>
  );
}

export default App;
