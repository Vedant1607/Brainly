import "./App.css";
import Button from "./components/Button";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";

function App() {
  return (
    <div>
      <Button variant="secondary" text="Share Brain" startIcon={<ShareIcon/>}></Button>
      <Button variant="primary" text="Add Content" startIcon={<PlusIcon/>}></Button>
    </div>
  );
}

export default App;
