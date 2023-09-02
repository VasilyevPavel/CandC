import { Routes, Route, Link, Outlet } from "react-router-dom"
import LogoutIcon from "@mui/icons-material/Logout"
import { Button } from "@mui/material"
import SureModal from "../../components/accountComp/SureModal/SureModal"
import styles from "./Admin.module.css"
import { useState, useEffect } from "react"
import axios from "axios"

export default function Admin() {
  const [open, setOpen] = useState<boolean>(false)
  const handleOpen = () => setOpen(true)
  return (
    <>
      {window.innerWidth > 820 && (
        <div className={styles.headerDiv}>
          <h3 className={styles.headersText}>Администратор</h3>
          <h1>Мой аккаунт</h1>
          <h4 onClick={handleOpen} className={styles.headersText}>
            <LogoutIcon />
            Выйти из аккаунта
          </h4>
        </div>
      )}
      {window.innerWidth <= 820 && window.innerWidth > 550 && (
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
          <Link to="/admin/items">
            <Button className={styles.button} type="button">
              Добавить товар
            </Button>
          </Link>
          <Link to="/admin/catandcol">
            <Button className={styles.button} type="button">
              Добавить категорию или коллекцию
            </Button>
          </Link>
          <Link to="/admin/orders">
            <Button className={styles.button} type="button">
              Заказы
            </Button>
          </Link>
        </div>
      )}
      {window.innerWidth < 500 && (
        <div className={styles.routesDiv}>
          <Link to="/admin/iteam">
            <Button className={styles.button} type="button">
              Товары
            </Button>
          </Link>
          <Link to="/admin/catandcol">
            <Button className={styles.button} type="button">
              Кат.-Кол.
            </Button>
          </Link>
          <Link to="/admin/orders">
            <Button className={styles.button} type="button">
              Заказы
            </Button>
          </Link>
        </div>
      )}
      <SureModal open={open} setOpen={setOpen} />
      <Outlet />
    </>
  )
}
