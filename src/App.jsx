import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import MembershipVideos from "@/components/pages/MembershipVideos";
import MoneyInsights from "@/components/pages/MoneyInsights";
import Reviews from "@/components/pages/Reviews";
import MonetizationTips from '@/components/pages/MonetizationTips'
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
<Route path="/" element={<Layout />}>
            <Route index element={<MembershipVideos />} />
            <Route path="insights" element={<MoneyInsights />} />
            <Route path="monetization-tips" element={<MonetizationTips />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          style={{ zIndex: 9999 }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;