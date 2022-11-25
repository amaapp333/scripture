import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Button from "@mui/material/Button";

function MyApp() {
  return <Button variant="contained">Login</Button>;
}

ReactDOM.createRoot(document.querySelector("#app")).render(
  <React.StrictMode>
    <MyApp />
  </React.StrictMode>
);
