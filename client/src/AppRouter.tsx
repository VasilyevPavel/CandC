import React, { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import Account from "./pages/Account/Account"
import SignIn from "./components/auth/SignIn"
import SignUp from "./components/auth/SignUp"
import Catalog from "./pages/catalogue/Catalog"
import Profile from "./components/accountComp/Profile/Profile"
import Favorites from "./components/accountComp/Favorites/Favorites"
import Measurements from "./components/accountComp/Measurements/Measurements"
import Orders from "./components/accountComp/Orders/Orders"
import MainPage from "./pages/mainpage/MainPage"
import About from "./pages/About/About"
import CollectionPage from "./components/collection/CollectionPage"
import NewArrivalsPage from "./components/newarrivals/NewArrivalsPage"
import Admin from "./pages/Admin/Admin"
import { useSelector } from "react-redux"
import { RootState } from "./app/store"
import CartPage from "./pages/Cart/CartPage"
import Category from "./pages/Category/Category"
import { useAppDispatch } from "./app/hooks"
import { isUserLoginThunk } from "./app/thunkActionsAuth"
import SearchPage from "./pages/SearchPage/SearchPage"
import Item from "./pages/Item/Item"
import InStock from "./components/instock/InStock"
import Order from "./components/admin/Order"
import AdminItem from "./components/admin/Item"
import CatAndCol from "./components/admin/CatAndCol"
import FAQ from "./pages/FAQ/FAQ"
import NotFound from "./components/NotFound/NotFound"
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy"

export default function AppRouter() {
  const dispatch = useAppDispatch()

  const user = useSelector((state) => state.sessionSlice.user)
  const isAdmin = useSelector((state: RootState) => state.sessionSlice.isAdmin)

  useEffect(() => {
    dispatch(isUserLoginThunk())
  }, [user])

  //TODO вложенный роут в каталоге

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/home" element={<MainPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:categoryName" element={<Category />} />
        <Route path="/catalog/categoryName/:id" element={<Item />} />
        <Route path="/account" element={user ? <Account /> : <SignIn />}>
          <Route
            path="/account/favorites"
            element={user ? <Favorites /> : <SignIn />}
          />
          <Route
            path="/account/measurements"
            element={user ? <Measurements /> : <SignIn />}
          />
          <Route
            path="/account/profile"
            element={user ? <Profile /> : <SignIn />}
          />
          <Route
            path="/account/orders"
            element={user ? <Orders /> : <SignIn />}
          />
        </Route>
        <Route path="/admin" element={isAdmin ? <Admin /> : <SignIn />}>
          <Route
            path="/admin/items"
            element={isAdmin ? <AdminItem /> : <SignIn />}
          />
          <Route
            path="/admin/catandcol"
            element={isAdmin ? <CatAndCol /> : <SignIn />}
          />
          <Route
            path="/admin/orders"
            element={isAdmin ? <Order /> : <SignIn />}
          />
        </Route>
        <Route path="/catalog/collection" element={<CollectionPage />} />
        <Route path="/new-arrivals" element={<NewArrivalsPage />} />
        <Route path="/sale" element={<InStock />} />
        <Route path="/cart" element={user ? <CartPage /> : <SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
