import React, { useState, useEffect } from "react"
import ProductCard from "../ProductCard/ProductCard"
import "./InStock.css"
import { Typography, Pagination } from "@mui/material"
import { styled } from "@mui/system"

const CollectionContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "1rem",
})

export default function InStock() {
  const [inStock, setInStock] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(4)
  // TODO проверить все ли ок с фото после фикса карточки
  useEffect(() => {
    try {
      ;(async function (): Promise<void> {
        const response = await fetch(import.meta.env.VITE_URL + "stock/")
        if (response.status === 200) {
          const allStock = await response.json()
          setInStock(allStock)
        }
      })()
    } catch (err) {
      console.log(err)
    }
  }, [])

  const lastIndex = currentPage * itemsPerPage

  const firstIndex = lastIndex - itemsPerPage

  const currentItems = inStock.slice(firstIndex, lastIndex)

  const handlePageChange = (event, page) => {
    setCurrentPage(page)
  }

  return (
    <>
      <Typography variant="h3" textAlign="center">
        <strong>Stock Sale</strong>
      </Typography>
      <div className="arrivals-container">
        {currentItems.map((item) => (
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "25px",
          marginBottom: "25px",
        }}
      >
        <Pagination
          sx={{ alignItems: "center" }}
          count={Math.ceil(inStock.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          size="large"
          className="pagination"
        />
      </div>
    </>
  )
}
