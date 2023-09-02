import React, { ChangeEvent, MouseEvent, useState } from "react"
import "./SignUp.css"
import { TextField, Button, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router"
import { isUserLoginThunk, signInUserThunk } from "../../app/thunkActionsAuth"
import { Link } from "react-router-dom"
import { RootState } from "../../app/store"
import { startSession } from "../../app/sessionSlice"

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const error = useSelector((state) => state.sessionSlice.error)

  const [errorMsg, setErrorMsg] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSignIn = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (formData.email && formData.password) {
      const resp = await dispatch(signInUserThunk(formData))
      if (resp.message) {
        setErrorMsg(resp.response.data.message)
      } else {
        if (resp.isAdmin) {
          navigate("/admin/orders")
        } else {
          if (location.pathname === "/cart") {
            navigate("/cart")
          } else {
            navigate(-1)
          }
        }
      }
    }
  }

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSignIn}>
          <Typography variant="h3" align="center">
            Войдите в аккаунт
            {errorMsg && <p>{error}</p>}
            <TextField
              className="text-field"
              placeholder="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              className="text-field"
              placeholder="Пароль"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{
                backgroundColor: "black",
                color: "white",
              }}
            >
              Войти
            </Button>
            <p>
              Еще не зарегистрированы?{" "}
              <Link to="/signup" className="redirect">
                Создайте аккаунт
              </Link>
            </p>
          </Typography>
        </form>
      </div>
    </>
  )
}
