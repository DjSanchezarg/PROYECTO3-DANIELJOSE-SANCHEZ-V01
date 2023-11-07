import Index from "./Pages/Index";
import Historial from "./Pages/Historial";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Index />} />
          <Route path="/index" element={<Index />} /><Route path="/index" element={<Index />} />
          <Route path="/historial" element={<Historial />} />
          <Route path="/*" element={<h1>Page not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

