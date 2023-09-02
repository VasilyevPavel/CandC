import React, { useState, useEffect, ChangeEvent } from "react"
import ProductCard from "../../components/ProductCard/ProductCard"
import styles from "./SearchPage.module.css"
import { Button, TextField } from "@mui/material"
import { IItem } from "../../components/accountComp/Orders/Orders"
import { useNavigate } from "react-router-dom"

export default function SearchPage() {
  const [allItems, setAllItems] = useState<IItem[]>([])
  const [input, setInput] = useState("")
  const navigate = useNavigate()
  const [info, setInfo] = useState("")
  const [isBorderVisible, setIsBorderVisible] = useState(false)

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseFetch = await fetch(
          import.meta.env.VITE_URL + `item/allItems`,
        )
        const { status } = await responseFetch
        const response = await responseFetch.json()

        if (status === 404 || status === 500) {
          setInfo(response.message)
        }

        if (status === 200) {
          setAllItems(response)
        }
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [input])

  const filteredItems: IItem[] = allItems.filter((item) => {
    return item.name.toLowerCase().includes(input.toLowerCase())
  })

  const handleGoBack = () => {
    navigate(-1)
  }

  const [isOpen, setIsOpen] = useState(true)

  const itemClickHandler = (e) => {
    setInput(e.target.textContent)
    setIsBorderVisible(false)
    setIsOpen(!isOpen)
  }

  const inputClickHandler = () => {
    setIsOpen(true)
    setIsBorderVisible(true)
  }

  const isMobile = window.innerWidth < 550

  return (
    <>
      <div className={styles.headerDiv}>
        <div style={{ width: isMobile ? "50%" : "70%" }}>
          <TextField
            autoComplete="off"
            value={input}
            className="text-field"
            label="Введите название товара"
            name="search"
            type="text"
            fullWidth
            margin="normal"
            onChange={changeHandler}
            onClick={inputClickHandler}
          ></TextField>
        </div>
        <ul
          className={styles.autocomplete}
          style={
            input.length > 0 && isBorderVisible && filteredItems.length > 0
              ? { border: "1px solid black" }
              : {}
          }
        >
          {input.length > 0 && isOpen
            ? filteredItems?.map((item) => (
                <li
                  className={styles.autocompleteItem}
                  onClick={itemClickHandler}
                  key={item.id}
                >
                  {item.name}
                </li>
              ))
            : null}
        </ul>
        <div style={{ width: isMobile ? "30%" : "15%" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleGoBack}
            style={{
              backgroundColor: "black",
              color: "white",
              width: "100%",
              borderRadius: "0",
              height: isMobile ? "55px" : "54px",
              marginBottom: isMobile ? "7px" : "8px",
            }}
          >
            Закрыть
          </Button>
        </div>
      </div>
      {filteredItems.length > 0 ? (
        <div className={styles.collectionContainer}>
          {info.length > 0 && <p>{info}</p>}
          {filteredItems.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              photo={item.Photos[0].photo}
              name={item.name}
              color={item.color}
              price={item.price}
              isFavorite={false}
              isCart={false}
              width={window.innerWidth < 830 ? "300px" : "400px"}
              height={window.innerWidth < 500 ? "415px" : "540px"}
            />
          ))}
        </div>
      ) : (
        <p>По вашему запросу ничего не найдено</p>
      )}
    </>
  )
}
