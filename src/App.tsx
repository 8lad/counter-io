import "./App.scss";
import { Form } from "./components/Form";
import { Header } from "./components/Header";
import { TaskList } from "./components/TaskList";

function App() {
  return (
    <div className="App">
      <Header />
      <Form />
      <TaskList />
    </div>
  );
}

export default App;
