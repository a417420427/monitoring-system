import "antd/dist/reset.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { initMonitor } from "../../sdk-monitor/src";

// import '@/utils/performance'

initMonitor({
  projectId: 1,
  debug: true,
  apiKey: "mon_04a1a132e425c7e71531adac837791d8456a2576925594a6",
  reportUrl: "http://localhost:5173/api/report",
}).then(() => {

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
});
