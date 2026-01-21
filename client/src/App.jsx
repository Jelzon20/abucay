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
import BarangayOfficialsTab from "./DashboardPages/BarangayOfficialsTab";
import ServicesPage from "./pages/ServicesPage";
import Footer from "./components/Footer";
import LuponMemberTab from "./DashboardPages/LuponMemberTab";
import BrgyDisputesTab from "./DashboardPages/BrgyDisputesTab";
import BarangayInstitutionsTab from "./DashboardPages/BarangayInstitutionsTab";
import BarangayInstitution from "./pages/BarangayInstitution";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoutes";
import Layout from "./components/Layout";
import { useDispatch, useSelector } from "react-redux";
import ContactUs from "./pages/ContactUsPage";
import ContactRequestsTab from "./DashboardPages/ContactRequestsTab";

function App() {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <Router>
      <Routes>
        {/* Public route */}

        {/* {currentUser ? <Route path="/signin" element={<Login />} /> : <></>} */}
        <Route path="/signin" element={<Login />} />

        {/* Layout route (Navbar + Footer) */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          {/* Protected routes */}
          <Route element={<PrivateRoute />}>
            {/* Main pages */}
            <Route path="/residents" element={<ResidentsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/bbi" element={<BarangayInstitution />} />
            <Route path="/contact-us" element={<ContactUs />} />

            {/* Dashboard with nested routes */}
            <Route path="/dashboard" element={<DashboardPage />}>
              <Route index element={<DashboardTab />} />
              <Route path="dashboard" element={<DashboardTab />} />
              <Route path="residents" element={<ResidentTab />} />
              <Route
                path="barangayInstitutions"
                element={<BarangayInstitutionsTab />}
              />
              <Route path="documents" element={<DocumentsTab />} />
              <Route path="establishments" element={<EstablishmentTab />} />
              <Route path="pedicabs" element={<PedicabTab />} />
              <Route path="lupon" element={<LuponTab />} />
              <Route path="brgyDisputes" element={<BrgyDisputesTab />} />
              <Route path="luponMembers" element={<LuponMemberTab />} />
              <Route path="blotters" element={<BlotterTab />} />
              <Route path="organizations" element={<OrganizationTab />} />
              <Route path="activities" element={<ActivityTab />} />
              <Route path="officials" element={<BarangayOfficialsTab />} />
              <Route path="contactRequests" element={<ContactRequestsTab />} />

              {/* Services sub-route */}
              <Route path="services" element={<ServicesTab />}>
                <Route path="request-new" element={<BrgyCertTab />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
