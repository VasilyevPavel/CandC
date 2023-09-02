import React, { useEffect, useState } from "react"
import styles from "./Profile.module.css"
import { Button } from "@mui/material"
import ModalEditInfo from "../ModalEditInfo/ModalEditInfo"

export interface IUserInfo {
  id: number
  email: string
  password?: string
  phone: string
  full_name: string
  address?: string
  telegram?: string
  admin?: boolean
}

export default function Profile() {
  const [open, setOpen] = useState<boolean>(false)
  const handleOpen = () => setOpen(true)

  const [userInfo, setUserInfo] = useState<IUserInfo | undefined>(undefined)

  useEffect(() => {
    const fetchUserInfoData = async () => {
      try {
        const responseFetch = await fetch(
          `${import.meta.env.VITE_URL}account/profile/info`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          },
        )
        const response = await responseFetch.json()
        if (response && Object.keys(response).length > 0) {
          setUserInfo(response)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchUserInfoData()
  }, [])

  return (
    <div className={styles.mainDiv}>
      <div className={styles.headerDiv}>
        <h2>Личные данные</h2>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <div className={styles.liContainer}>
            <h5 className={styles.headerFive}>Электронная почта</h5>
            <div className={styles.pContainer}>
              <p className={styles.pFive}>{userInfo?.email}</p>
            </div>
          </div>
          <div className={styles.liContainer}>
            <h5 className={styles.headerFive}>ФИО</h5>
            <p className={styles.pFive}>{userInfo?.full_name}</p>
          </div>
          <div className={styles.liContainer}>
            <h5 className={styles.headerFive}>Адрес</h5>
            <div className={styles.pContainer}>
              <p className={styles.pFive}>{userInfo?.address}</p>
            </div>
          </div>
          <div className={styles.liContainer}>
            <h5 className={styles.headerFive}>Номер телефона</h5>
            <div className={styles.pContainer}>
              <p className={styles.pFive}>{userInfo?.phone}</p>
            </div>
          </div>
          <div className={styles.liContainer}>
            <h5 className={styles.headerFive}>Ваш Telegram</h5>
            <div className={styles.pContainer}>
              <p className={styles.pFive}>{userInfo?.telegram}</p>
            </div>
          </div>
        </div>
        <ModalEditInfo
          open={open}
          setOpen={setOpen}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
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
