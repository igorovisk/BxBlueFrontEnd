import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import IndexPage from "./pages/IndexPage/IndexPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import RegisterPageIndex from "./pages/RegisterPage/RegisterPage";

import "./styles/index.css";
import PrivateRoute from "./routes";
import WalletPage from "./pages/WalletPage/WalletPage";
import SummaryPage from "./pages/SummaryPage/SummaryPage";

function App() {
   return (
      <BrowserRouter>
         <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
         />
         <Routes>
            <Route path="/" element={<IndexPage />}></Route>

            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPageIndex />}></Route>
            <Route path="*" element={<IndexPage />}></Route>

            {/* PRIVATE ROUTES ONLY IF LOGGED */}

            <Route
               path="/profile"
               element={
                  <PrivateRoute>
                     <ProfilePage />
                  </PrivateRoute>
               }
            ></Route>

            <Route
               path="/home"
               element={
                  <PrivateRoute>
                     <HomePage />
                  </PrivateRoute>
               }
            ></Route>
            <Route
               path="/wallet"
               element={
                  <PrivateRoute>
                     <WalletPage />
                  </PrivateRoute>
               }
            ></Route>
            <Route
               path="/summary"
               element={
                  <PrivateRoute>
                     <SummaryPage />
                  </PrivateRoute>
               }
            ></Route>
         </Routes>
      </BrowserRouter>
   );
}

export default App;
