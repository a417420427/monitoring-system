import { initMonitor } from "../../sdk-monitor/src/index";

function App() {
  initMonitor({
    appId: "your-app-id",
    reportUrl: "http://localhost:3000/api/report",
    userId: "user-123",
    debug: true,
  });
  return <div></div>;
}

export default App;
