import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import ResidentsPage from "./pages/ResidentPage";
import ReportsPage from "./pages/ReportsPage";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import DocumentsTab from "./DashboardPages/DocumentsTab";
import EstablishmentTab from "./DashboardPages/EstablishmentTab";
import ResidentTab from "./DashboardPages/ResidentTab";
import DashboardTab from "./DashboardPages/DashboardTab";
import PedicabTab from "./DashboardPages/PedicabTab";
import LuponTab from "./DashboardPages/LuponTab";
import BlotterTab from "./DashboardPages/BlotterTab";
import OrganizationTab from "./DashboardPages/OrganizationTab";
import ActivityTab from "./DashboardPages/ActivityTab";
import BrgyCertTab from "./DashboardPages/BrgyCertTab";
import ServicesTab from "./DashboardPages/ServicesTab";
import ClearanceTab from "./DashboardPages/ClearanceTab";
import BarangayOfficialsTab from "./DashboardPages/BarangayOfficialsTab";
import OrgChart from "./pages/OrgChart";
import ServicesPage from "./pages/ServicesPage";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="w-screen min-h-screen flex flex-col bg-white dark:bg-gray-900">
        <Navbar />
        <main className="flex-grow text-gray-900 dark:text-gray-100">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/residents" element={<ResidentsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/orgChart" element={<OrgChart />} />
            <Route path="/dashboard" element={<DashboardPage />}>
              <Route path="dashboard" element={<DashboardTab />} />
              <Route path="residents" element={<ResidentTab />} />
              <Route path="documents" element={<DocumentsTab />} />
              <Route path="establishments" element={<EstablishmentTab />} />
              <Route path="pedicabs" element={<PedicabTab />} />
              <Route path="lupon" element={<LuponTab />} />
              <Route path="blotters" element={<BlotterTab />} />
              <Route path="organizations" element={<OrganizationTab />} />
              <Route path="activities" element={<ActivityTab />} />
              <Route path="officials" element={<BarangayOfficialsTab />} />
              <Route path="services" element={<ServicesTab />}>
                <Route path="barangay-certificate" element={<BrgyCertTab />} />
                <Route path="barangay-clearance" element={<ClearanceTab />} />
              </Route>
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
