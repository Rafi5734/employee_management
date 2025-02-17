import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HeroUIProvider } from "@heroui/react";
import { BrowserRouter, Routes, Route } from "react-router";
import CommonLayout from './layouts/CommonLayout.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import TableData from './pages/tableData/TableData.jsx';



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeroUIProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CommonLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/table" element={<TableData />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HeroUIProvider>
  </StrictMode>
);
