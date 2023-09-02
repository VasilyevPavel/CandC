import React, { useState } from "react"
import { Link, Outlet } from "react-router-dom"
import { Button } from "@mui/material"
import styles from "./Account.module.css"
import LogoutIcon from "@mui/icons-material/Logout"
import SureModal from "../../components/accountComp/SureModal/SureModal"

export default function Account() {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)

  return (
    <div className={styles.mainDiv}>
      {window.innerWidth > 550 && (
        <div className={styles.headerDiv}>
          <h1>Мой аккаунт</h1>
          <h4 onClick={handleOpen} className={styles.headersText}>
            <LogoutIcon />
            Выйти из аккаунта
          </h4>
        </div>
      )}
      {window.innerWidth < 550 && <></>}
      {window.innerWidth > 500 && (
        <div className={styles.routesDiv}>
          <Link to="/account/favorites">
            <Button className={styles.button}>Избранное</Button>
          </Link>
          <Link to="/account/measurements">
            <Button className={styles.button} type="button">
              Мои параметры
            </Button>
          </Link>
          <Link to="/account/profile">
            <Button className={styles.button} type="button">
              Мои данные
            </Button>
          </Link>
          <Link to="/account/orders">
            <Button className={styles.button} type="button">
              Заказы
            </Button>
          </Link>
        </div>
      )}
      {window.innerWidth < 550 && (
        <div className={styles.mobileDiv}>
          <h4 onClick={handleOpen} className={styles.headersText}>
            <LogoutIcon />
            Выйти из аккаунта
          </h4>
          <div className={styles.routesDiv}>
            <Link to="/account/favorites">
              <Button className={styles.button}>Избранное</Button>
            </Link>
            <Link to="/account/measurements">
              <Button className={styles.button} type="button">
                Параметры
              </Button>
            </Link>
            <Link to="/account/profile">
              <Button className={styles.button} type="button">
                Данные
              </Button>
            </Link>
            <Link to="/account/orders">
              <Button className={styles.button} type="button">
                Заказы
              </Button>
            </Link>
          </div>
        </div>
      )}
      <SureModal open={open} setOpen={setOpen} />
      <Outlet />
    </div>
  )
}
