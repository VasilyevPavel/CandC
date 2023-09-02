import React from "react"
import "./NotFound.css"
import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="err-container">
      <h3 className="err-msg">Упс! Такой страницы сейчас не существует</h3>
      <div className="err-btn-container">
        <button className="err-btn">
          <Link to="/home">Вернуться на главную</Link>
        </button>
        <button className="err-btn">
          <Link to="/catalog">Посмотреть каталог</Link>
        </button>
      </div>
    </div>
  )
}
