import React, { ChangeEvent, useEffect, useState } from "react"
import { Box, Button, Modal, TextField } from "@mui/material"
import { IUserInfo } from "../Profile/Profile"
import styles from "./ModalEditInfo.module.css"

const ModalEditInfo: React.FC<IModalEditInfoProps> = ({
  open,
  setOpen,
  userInfo,
  setUserInfo,
}) => {
  const [inputsUserInfo, setInputsUserInfo] = useState<IInputsUserInfo>({
    full_name: userInfo?.full_name,
    phone: userInfo?.phone,
    address: userInfo?.address,
    telegram: userInfo?.telegram,
  })

  const [info, setInfo] = useState("")

  useEffect(() => {
    setInputsUserInfo({
      full_name: userInfo?.full_name,
      phone: userInfo?.phone,
      address: userInfo?.address,
      telegram: userInfo?.telegram,
    })
  }, [userInfo])

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputsUserInfo({
      ...inputsUserInfo,
      [event.target.name]: event.target.value,
    })
  }

  const handleClose = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const responseFetch = await fetch(
        `${import.meta.env.VITE_URL}account/profile/editInfo`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(inputsUserInfo),
        },
      )
      const response = await responseFetch.json()
      const { status } = await responseFetch

      if (status === 403 || status === 404 || status === 500) {
        setInfo(response.message)
      }

      if (status === 200) {
        setInfo(response.message)
        setUserInfo({ ...userInfo, ...inputsUserInfo })
        setTimeout(() => {
          setOpen(false)
          setInfo("")
        }, 2000)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: window.innerWidth < 820 ? 300 : 400,
          bgcolor: "#eee",
          border: "2px solid #000",
          boxShadow: 24,
          p: window.innerWidth < 820 ? 1 : 4,
        }}
        className={styles.customModal}
      >
        <form onSubmit={handleClose}>
          <div className={styles.formDiv}>
            {info.length > 0 && <p>{info}</p>}
            <TextField
              autoComplete="off"
              className="text-field"
              label="ФИО"
              name="full_name"
              type="text"
              value={inputsUserInfo?.full_name || ""}
              fullWidth
              margin="normal"
              required
              onChange={changeHandler}
            />
            <TextField
              autoComplete="off"
              className="text-field"
              label="Адрес (Город, улица, дом, квартира, индекс)"
              name="address"
              type="text"
              value={inputsUserInfo?.address || ""}
              fullWidth
              margin="normal"
              onChange={changeHandler}
            />
            <TextField
              autoComplete="off"
              className="text-field"
              label="Номер телефона"
              name="phone"
              type="text"
              value={inputsUserInfo?.phone || ""}
              fullWidth
              margin="normal"
              onChange={changeHandler}
            />
            <TextField
              autoComplete="off"
              className="text-field"
              label="Ваш Telegram"
              name="telegram"
              type="text"
              value={inputsUserInfo?.telegram || ""}
              fullWidth
              margin="normal"
              onChange={changeHandler}
            />
            <Button
              className={styles.button}
              type="submit"
              variant="contained"
              color="primary"
              style={{
                backgroundColor: "black",
                color: "white",
              }}
            >
              Сохранить
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  )
}

export default ModalEditInfo
