import React, { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import CategoryList from "./CategoryList"
import Category from "../Category/Category"
import "./Catalog.css"

export default function Catalog() {
  const [allCategories, setAllCategories] = useState([])

  useEffect(() => {
    try {
      ;(async function (): Promise<void> {
        const response = await fetch(
          import.meta.env.VITE_URL + "catalog/categories",
          {
            credentials: "include",
          },
        )
        if (response.status === 200) {
          const allCategs = await response.json()
          setAllCategories(allCategs)
        }
      })()
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <>
      <div className="catalogue-container">
        {allCategories.map((cat) => (
          <CategoryList
            key={cat.id}
            id={cat.id}
            imageUrl={`${import.meta.env.VITE_CATEGORY_URL}${cat.photo}`}
            linkText={cat.name}
            allCategory={allCategories}
          />
        ))}
      </div>
    </>
  )
}
