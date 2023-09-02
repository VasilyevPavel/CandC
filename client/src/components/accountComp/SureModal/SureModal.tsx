import React, { useState } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Modal from "@mui/material/Modal"
import styles from "./SureModal.module.css"
import {
  isUserLoginThunk,
  signOutUserThunk,
} from "../../../app/thunkActionsAuth"
import { useDispatch } from "react-redux"
import { checkSession } from "../../../app/sessionSlice"

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: window.innerWidth < 820 ? 300 : 400,
  height: window.innerWidth < 820 ? 190 : 250,
  bgcolor: "#eee",
  border: "1px solid #000",
  boxShadow: 10,
  p: window.innerWidth < 820 ? 2 : 5,
}

interface ISureModal {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function SureModal({ open, setOpen }: ISureModal) {
  const dispatch = useDispatch()
  const [info, setInfo] = useState("")

  const logOutHandler = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    try {
      await dispatch(signOutUserThunk())
      setInfo("Вы вышли из аккаунта")
      setOpen(false)
      dispatch(checkSession(false))
    } catch (Error) {
      console.log(Error)
    }
  }

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className={styles.mainContainer}>
          {info.length > 0 && <p>{info}</p>}
          <div className={styles.questionContainer}>
            <h3>Вы уверены, что хотите выйти из аккаунта?</h3>
          </div>
          <div className={styles.buttonContainer}>
            <Button
              onClick={() => setOpen(false)}
              className={styles.button}
              type="submit"
              variant="contained"
              color="primary"
              style={{
                backgroundColor: "red",
                color: "white",
              }}
            >
              Отмена
            </Button>
            <Button
              onClick={logOutHandler}
              className={styles.button}
              type="submit"
              variant="contained"
              color="primary"
              style={{
                backgroundColor: "black",
                color: "white",
              }}
            >
              Выйти
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  )
}
