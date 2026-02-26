import React, { useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import Home from "./Page/Home/Home";
import { AppSidebar } from "./components/custom/AppSidebar";
import Subscription from "./components/subscription/Subscription";
import Signin from "./components/Signup/Signup";
import ProtectedRoute from "./protectedRoute";
import Signup from "./components/Signup/Signup";
import SigninPage from "./Page/Signin/SigninPage";
import Student from "./Page/User/UserComponent";
import OrganizationPage from "./Page/Organization/OrganizationPage";
import Report from "./components/report/Report";
import SupportPage from "./Page/Support/SupportPage";

const Layout = () => {
  const location = useLocation();

  // Hide sidebar on /signin
  const hideSidebar =
    location.pathname === "/signup" || location.pathname === "/signin";

  return (
    <>
      {!hideSidebar && <AppSidebar />}
      <Routes>
        <Route path="/" element={<Home />}>
          {/* 
          <Route
            path="view"
            element={
              <ProtectedRoute>
                <UserView />
              </ProtectedRoute>
            }
          />
          <Route
            path="user_edit"
            element={
              <ProtectedRoute>
                <UserEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="user_subscription"
            element={
              <ProtectedRoute>
                <UserBilling />
              </ProtectedRoute>
            }
          />
          <Route
            path="user_analytics"
            element={
              <ProtectedRoute>
                <UserAnalytics />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="sub_promo"
            element={
              <ProtectedRoute>
                <OfferPromo />
              </ProtectedRoute>
            }
          /> */}
          <Route path="organization" element={<OrganizationPage />} />
          <Route path="report" element={<Report />} />
          <Route path="billing" element={<Subscription />} />
          <Route path="user" index element={<Student />} />
          <Route path="support" index element={<SupportPage />} />


          {/* <Route
            path="order"
            element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            }
          /> */}
        </Route>

        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/signin" element={<SigninPage />} />
      </Routes>
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
