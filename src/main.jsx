import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
//import TextExpender from "./TextExpender";
import App from "./App.jsx";
//import StarsRating from "./StarsRating.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {/* <StarsRating maxRating={10} fillColor="yellow" />
    <StarsRating
      maxRating={4}
      fillColor="green"
      message={["Terrible", "Bad", "Good", "Amezing"]}
    /> */}
    {/* <TextExpender /> */}
  </StrictMode>,
);
