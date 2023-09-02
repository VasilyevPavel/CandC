import React, { useState, useEffect } from "react"
import ProductCard from "../ProductCard/ProductCard"
import "./NewArrivalsPage.css"
import { Typography } from "@mui/material"

export default function NewArrivalsPage() {
  const [newArrivalsItems, setNewArrivalsItems] = useState([])
  // TODO проверить все ли ок с фото после фикса карточки
  useEffect(() => {
    try {
      ;(async function (): Promise<void> {
        const response = await fetch(
          import.meta.env.VITE_URL + "catalog/new-arrivals",
        )
        if (response.status === 200) {
          const collection = await response.json()
          setNewArrivalsItems(collection)
        }
      })()
    } catch (err) {
      console.log(err)
    }
  }, [])
  return (
    <>
      <Typography>
        <p className="arrivals-text">
          <strong>Новинки</strong>{" "}
        </p>
      </Typography>
      <div className="arrivals-container">
        {newArrivalsItems.map((item) => (
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
    </>
  )
}
