import React, { ChangeEvent, MouseEvent, useState } from "react"
import "./SignUp.css"
import { TextField, Button, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { signUpUserThunk } from "../../app/thunkActionsAuth"
import { Link } from "react-router-dom"

export default function SignUp() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
  })
  const error = useSelector((state) => state.sessionSlice.error)

  const [errorMsg, setErrorMsg] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  //TODO в функцию ввести свой token и почту, с которой будем отправлять сообщение (https://www.youtube.com/watch?v=yP85ECOVMe8)

  function sendMail(full_name, email) {
    Email.send({
      SecureToken: "ef79f30f-8ef6-4205-979a-b8e46f36a527",
      To: email,
      From: "maxkosh1994@gmail.com",
      Subject: "Сообщение от команды Cape&Coat",
      Body: `Уважаемый(ая) ${full_name}, вы указали этот почтовый ящик (${email}) при регистрации на сайте Cape&Coat. Добро пожаловать и желаем вам приятно провести время на нашем сайте! С уважением, команда Cape&Coat!`,
    })
  }

  const handleSignUp = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (formData.full_name && formData.email && formData.password) {
      const resp = await dispatch(signUpUserThunk(formData))
      if (resp.message) {
        setErrorMsg(resp.response.data.message)
      } else {
        // TODO определить куда редирект после реги
        navigate(-2)
        sendMail(formData.full_name, formData.email)
      }
    }
  }

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSignUp}>
          <Typography variant="h3" textAlign="center">
            Создайте аккаунт
            {errorMsg && <p>{error}</p>}
            <TextField
              className="text-field"
              label="Имя и фамилия"
              name="full_name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              className="text-field"
              label="Email"
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
              label="Пароль"
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
              variant="text"
              color="primary"
              style={{
                backgroundColor: "black",
                color: "white",
              }}
            >
              Зарегистрироваться
            </Button>
            <p>
              Уже зарегистрированы?{" "}
              <Link to="/signin" className="redirect">
                Войдите в аккаунт
              </Link>
            </p>
          </Typography>
        </form>
      </div>
    </>
  )
}
