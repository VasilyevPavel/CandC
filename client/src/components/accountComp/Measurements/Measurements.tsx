import React, { useEffect, useState } from "react"
import styles from "./measurements.module.css"
import { Button } from "@mui/material"
import ModalEditMeasurements from "../ModalEditMeasurements/ModalEditMeasurements"

export interface IUserMeasurements {
  id: number
  user_id: number
  height?: number
  bust?: number
  waist?: number
  hips?: number
  sleeve?: number
}

//TODO на 29 строчке орет в консоли fetch, если данных нет

export default function Measurements() {
  const [userMeasurements, setUserMeasurements] = useState<
    IUserMeasurements | undefined
  >(undefined)
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)

  useEffect(() => {
    const fetchMeasurementsData = async () => {
      try {
        const responseFetch = await fetch(
          `${import.meta.env.VITE_URL}account/profile/measurement`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          },
        )
        const response = await responseFetch.json()
        const { status } = await responseFetch

        if (status === 403 || status === 402 || status === 500) {
          console.log(response.message)
        }

        if (response && Object.keys(response).length > 0) {
          setUserMeasurements(response)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchMeasurementsData()
  }, [])

  return (
    <div className={styles.mainDiv}>
      <div className={styles.headerDiv}>
        <h2>Мои параметры</h2>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <div className={styles.liContainer}>
            <h5 className={styles.headerFive}>Ваш рост</h5>
            <div className={styles.pContainer}>
              <p className={styles.pFive}>{userMeasurements?.height}</p>
            </div>
          </div>
          <div className={styles.liContainer}>
            <h5 className={styles.headerFive}>Длина рукава</h5>
            <div className={styles.pContainer}>
              <p className={styles.pFive}>{userMeasurements?.hips}</p>
            </div>
          </div>
          <div className={styles.liContainer}>
            <h5 className={styles.headerFive}>Объём груди</h5>
            <div className={styles.pContainer}>
              <p className={styles.pFive}>{userMeasurements?.bust}</p>
            </div>
          </div>
          <div className={styles.liContainer}>
            <h5 className={styles.headerFive}>Обёем талии</h5>
            <div className={styles.pContainer}>
              <p className={styles.pFive}>{userMeasurements?.waist}</p>
            </div>
          </div>
          <div className={styles.liContainer}>
            <h5 className={styles.headerFive}>Объем бёдер</h5>
            <div className={styles.pContainer}>
              <p className={styles.pFive}>{userMeasurements?.sleeve}</p>
            </div>
          </div>
        </div>
        <ModalEditMeasurements
          open={open}
          setOpen={setOpen}
          userMeasurements={userMeasurements}
          setUserMeasurements={setUserMeasurements}
        />
      </div>
      <div className={styles.containerButton}>
        <Button
          className={styles.button}
          onClick={handleOpen}
          variant="contained"
          color="primary"
          type="submit"
          style={{
            backgroundColor: "black",
            color: "white",
          }}
        >
          Редактировать
        </Button>
      </div>
    </div>
  )
}
