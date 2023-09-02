import { useState, useEffect } from "react"
import { formDataCategoryAxios, categoryDataFetch } from "./HTTP/adminApi"
import styles from "./Category.module.css"
import { Button, TextField } from "@mui/material"
import InfoModal from "./InfoModal"

export default function Category() {
  const [files, setFile] = useState()
  const [descript, setDescription] = useState({})
  const [message, setMessage] = useState("")
  const [open, setOpen] = useState(false)

  const changeHandlerFiles = (e) => {
    setFile({ ...files, photos: e.target.files })
  }

  const changeHandlerDescription = (e) => {
    setDescription({ ...descript, [e.target.name]: e.target.value })
  }

  const submit = async (e) => {
    try {
      e.preventDefault()
      const formData = new FormData()
      for (let key in files.photos) {
        formData.append("photos", files.photos[key])
      }
      formData.append("description", JSON.stringify(descript))
      const val = await Object.fromEntries(formData.entries())
      const response = await formDataCategoryAxios(formData, setMessage)
      setOpen(true)
      setTimeout(() => {
        setMessage("")
        setOpen(false)
      }, 1000)
      e.target.reset()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className={styles.mainDiv}>
        <div className={styles.headerDiv}>
          <h2>Добавить категорию</h2>
        </div>
        <div className={styles.mainContainer}>
          <div className={styles.container}>
            <form onSubmit={submit} enctype="multipart/form-data">
              <div className={styles.liContainer}>
                <h5 className={styles.headerFive}>Название категории</h5>
                <div className={styles.pContainer}>
                  <TextField
                    autoComplete="off"
                    required
                    placeholder="Category"
                    onChange={changeHandlerDescription}
                    name="name"
                    type="text"
                    className={styles.pFive}
                  />
                </div>
              </div>
              <div className={styles.liContainer}>
                <h5 className={styles.headerFive}>Фото обложки категории</h5>
                <label htmlFor="fileCatInput" className={styles.customButton}>
                  Выберите файл
                </label>
                <input
                  required
                  id="fileCatInput"
                  filename={files}
                  onChange={changeHandlerFiles}
                  type="file"
                  accept="image/*"
                  className={styles.inputCatFile}
                />
              </div>
              <div className={styles.containerButton}>
                <Button
                  className={styles.button}
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{
                    backgroundColor: "black",
                    color: "white",
                  }}
                >
                  Добавить
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <InfoModal info={message} open={open} setOpen={setOpen} />
    </>
  )
}
