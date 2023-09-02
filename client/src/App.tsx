import React, { useEffect } from "react"
import "./App.css"
import AppRouter from "./AppRouter"
import Footer from "./components/footer/Footer"
import Navbar from "./components/navbar/Navbar"
import Category from "./pages/Category/Category"
import About from "./pages/About/About"
import Item from "./pages/Item/Item"
import { useAppDispatch } from "./app/hooks"
import { isUserLoginThunk } from "./app/thunkActionsAuth"
import MyCookieConsent from "./components/cookieConsent/CookieConsent"

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="content-container">
        <AppRouter />
      </div>
      <Footer />

      <MyCookieConsent />
    </div>
  )
}

export default App
