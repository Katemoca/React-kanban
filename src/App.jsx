import Kanban from "./components/Kanban/Kanban";
import "./App.css";

function App() {
  return (
    <div style={{ padding: "50px" }}>
      <h1
        style={{
          marginBottom: "20px",
          textAlign: "center",
          color: "black",
          fontFamily: "Poppins",
          fontSize: "50px",
        }}>
        Kanban UI
      </h1>
      <Kanban />
    </div>
  );
}

export default App;
