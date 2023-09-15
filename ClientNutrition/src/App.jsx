import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./zucca-theme.css";
import "./App.css";
import Home from "./Components/Home/Home";
import Calendar from "./Components/Calendar/Calendar";
import Create from "./Components/Create/Create";
import Login from "./Components/Login/Login";
import UserProfile from "./Components/UserProfile/UserProfile";
import NavBar from "./Components/NavBar/NavBar";
import NutritionistProfile from "./Components/NutritionistProfile/NutritionistProfile";
import AdminView from "./Components/AdminView/AdminView";
import NutriDetail from "./Components/AdminView/NutriDetail/NutriDetail";
import UsersDetail from "./Components/AdminView/UsersDetail/UsersDetail";
import TermsAndConditions from "./Components/TermsAndConditions/TermsAndConditions";
import NutriForm from "./Components/AdminView/NutriForm/NutriForm";
import Success from "./Components/Payment/Success";
import Cancel from "./Components/Payment/Cancel";
import Protected from './Components/Protected/Protected'
import Cloudinary from './Components/Cloudinary/Cloudinary'


const URL = "http://localhost:5173/";
axios.defaults.baseURL = URL;

function App() {

  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/appointments" element={
          <Protected roles={["user"]}>
            <UserProfile />
          </Protected>
        } />
        <Route path="/signup" element={<Create />}></Route>
        <Route path="/adminprofile" element={
          <Protected roles={["admin"]}>
            <AdminView />
          </Protected>
        } />
        <Route path="/adminprofile/nutriform" element={<NutriForm />}></Route>
        <Route
          path="/adminprofile/detail/:id"
          element={<NutriDetail />}
        ></Route>
        <Route
          path="/adminprofile/detail/users/:id"
          element={<UsersDetail />}
        ></Route>
        <Route path="/appointments/new" element={<Calendar/>}></Route>
        
        <Route path="/nutritionistprofile" element={
          <Protected roles={["nutritionist"]}>
            <NutritionistProfile />
          </Protected>
        }/>
        <Route
          path="/termsandconditions"
          element={<TermsAndConditions />}
        ></Route>
        <Route path="/success" element={<Success />}></Route>
        <Route path="/cancel" element={<Cancel />}></Route>
        {/* ruta para probar el cloudinary:
        <Route path="/cloudinary" element={<Cloudinary />}></Route> */}

      </Routes>
    </div>
  );
}

export default App;
