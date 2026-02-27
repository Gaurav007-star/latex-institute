import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router";
import Home from "./Page/Home/Home";
import { AppSidebar } from "./components/custom/AppSidebar";
import Subscription from "./components/subscription/Subscription";
import Signin from "./components/Signup/Signup";
import ProtectedRoute from "./protectedRoute";
import Signup from "./components/Signup/Signup";
import SigninPage from "./Page/Signin/SigninPage";
import OrganizationPage from "./Page/Organization/OrganizationPage";
import Report from "./components/report/Report";
import SupportPage from "./Page/Support/SupportPage";
import { SidebarInset } from "./components/ui/sidebar";
import UserComponent from "./Page/User/UserComponent";

const Layout = () => {
  const location = useLocation();

  // Hide sidebar on /signin
  const hideSidebar =
    location.pathname === "/signup" || location.pathname === "/signin";

  return (
    <>
      {!hideSidebar && <AppSidebar />}
      <SidebarInset>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}>
            <Route index element={<Navigate to="organization" replace />} />
            <Route path="organization" element={<OrganizationPage />} />
            <Route path="report" element={<Report />} />
            <Route path="billing" element={<Subscription />} />
            <Route path="user" element={<UserComponent />} />
            <Route path="support" element={<SupportPage />} />
          </Route>
          <Route path="/signin" element={<SigninPage />} />
          <Route path="*" element={<ProtectedRoute><Navigate to="/organization" replace /></ProtectedRoute>} />

        </Routes>
      </SidebarInset>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

export default App;
