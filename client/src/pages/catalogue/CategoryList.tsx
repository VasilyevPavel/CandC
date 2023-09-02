import React, { useEffect, useState } from "react"
import { Link, Route, Routes, useParams, useNavigate } from "react-router-dom"
import "./Catalog.css"
import Category from "../Category/Category"
import axios from "axios"

export default function CategoryList({ id, imageUrl, linkText, allCategory }) {
  const navigate = useNavigate()
  const [englishName, setEnglishName] = useState("")

  useEffect(() => {
    const translateToEnglish = async () => {
      try {
        const response = await axios.get(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
            linkText,
          )}&langpair=ru|en`,
        )

        if (
          response.data.responseData &&
          response.data.responseData.translatedText
        ) {
          setEnglishName(response.data.responseData.translatedText)
        } else {
          setEnglishName("")
        }
      } catch (error) {
        console.error("Translation error:", error)
        setEnglishName("")
      }
    }

    translateToEnglish()
  }, [linkText])

  const categoryHandler = (e) => {
    const target = e.target
    if (!target) return // Проверка наличия целевого элемента
    const parent = target.closest(".container-category").id
    navigate(`/catalog/${englishName}`, { state: parent })
  }

  return (
    <div className="container-category" onClick={categoryHandler} id={id}>
      <div className="link">
        <img src={imageUrl} className="image" alt={linkText} />
        <span className="link-text">{linkText}</span>
      </div>
    </div>
  )
}
