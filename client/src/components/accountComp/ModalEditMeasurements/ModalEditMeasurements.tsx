import React, { ChangeEvent, useEffect, useState } from "react"
import { Box, Button, Modal, TextField } from "@mui/material"
import { IUserMeasurements } from "../Measurements/Measurements"
import styles from "./ModalEditMeasurements.module.css"

const ModalEditMeasurements: React.FC<IModalEditMeasurementsProps> = ({
  open,
  setOpen,
  userMeasurements,
  setUserMeasurements,
}) => {
  const [inputsUserMeasurements, setInputsUserMeasurements] =
    useState<IInputsUserMeasurements>({
      height: userMeasurements?.height,
      hips: userMeasurements?.hips,
      bust: userMeasurements?.bust,
      waist: userMeasurements?.waist,
      sleeve: userMeasurements?.sleeve,
    })

  const [info, setInfo] = useState("")

  useEffect(() => {
    setInputsUserMeasurements({
      height: userMeasurements?.height,
      hips: userMeasurements?.hips,
      bust: userMeasurements?.bust,
      waist: userMeasurements?.waist,
      sleeve: userMeasurements?.sleeve,
    })
  }, [userMeasurements])

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputsUserMeasurements({
      ...inputsUserMeasurements,
      [event.target.name]: event.target.value,
    })
  }

  const handleClose = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const responseFetch = await fetch(
        `${import.meta.env.VITE_URL}account/profile/editMeasurements`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(inputsUserMeasurements),
        },
      )
      const response = await responseFetch.json()
      const { status } = await responseFetch

      if (status === 404 || status === 500) {
        setInfo(response.message)
      }

      if (status === 200) {
        setInfo(response.message)
        setUserMeasurements({
          ...userMeasurements,
          ...inputsUserMeasurements,
        })
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
              label="Ваш рост"
              name="height"
              type="number"
              value={inputsUserMeasurements?.height || ""}
              fullWidth
              margin="normal"
              onChange={changeHandler}
            />
            <TextField
              autoComplete="off"
              className="text-field"
              label="Длина рукава"
              name="hips"
              type="number"
              value={inputsUserMeasurements?.hips || ""}
              fullWidth
              margin="normal"
              onChange={changeHandler}
            />
            <TextField
              autoComplete="off"
              className="text-field"
              label="Объём груди"
              name="bust"
              type="number"
              value={inputsUserMeasurements?.bust || ""}
              fullWidth
              margin="normal"
              onChange={changeHandler}
            />
            <TextField
              autoComplete="off"
              className="text-field"
              label="Обёем талии"
              name="waist"
              type="number"
              value={inputsUserMeasurements?.waist || ""}
              fullWidth
              margin="normal"
              onChange={changeHandler}
            />
            <TextField
              autoComplete="off"
              className="text-field"
              label="Объем бёдер"
              name="sleeve"
              type="number"
              value={inputsUserMeasurements?.sleeve || ""}
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

export default ModalEditMeasurements
