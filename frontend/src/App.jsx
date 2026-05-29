import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Alerts from "./pages/Alerts";
import Insights from "./pages/Insights";
import Analytics from "./pages/Analytics";
import Suppliers from "./pages/Suppliers";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/alerts" element={<Alerts />} />

        <Route path="/insights" element={<Insights />} />

        <Route path="/analytics" element={<Analytics />} />

        {/* <Route path="/suppliers" element={<Suppliers />} />

        <Route path="/settings" element={<Settings />} /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;