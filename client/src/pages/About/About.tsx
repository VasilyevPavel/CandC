import React, { useEffect, useRef, useState } from "react"
import { YMaps, Map, Placemark, ObjectManager } from "@pbe/react-yandex-maps"
import { Typography, Box, Grid } from "@mui/material"
import { styled } from "@mui/system"
import TelegramIcon from "@mui/icons-material/Telegram"
import MailOutlineIcon from "@mui/icons-material/MailOutline"
import PhoneIcon from "@mui/icons-material/Phone"
import "./About.styles.css"

export default function About() {
  const mapRef = useRef(null)
  const [mapCreated, setMapCreated] = useState(false)
  const [isTooltipVisible, setTooltipVisible] = useState(false)

  useEffect(() => {
    if (!window.ymaps || !mapRef.current || mapCreated) return

    window.ymaps.ready(() => {
      const map = new window.ymaps.Map(mapRef.current, {
        center: [56.316843, 43.98731],
        zoom: 20,
      })

      const placemark = new window.ymaps.Placemark(
        [56.316843, 43.98731],
        {},
        {
          balloonContent:
            "Адрес: Россия, г.Нижний Новгород, ул. Малая Покровская, 20",
        },
      )

      placemark.events.add("mouseenter", () => {
        if (!isTooltipVisible) {
          setTooltipVisible(true)
          map.balloon.open([56.316843, 43.98731], {
            contentBody:
              "Адрес: Россия, г.Нижний Новгород, ул. Малая Покровская, 20",
          })
        }
      })

      placemark.events.add("mouseleave", () => {
        if (isTooltipVisible) {
          setTooltipVisible(false)
          map.balloon.close()
        }
      })

      map.geoObjects.add(placemark)
      setMapCreated(true)
    })
  }, [isTooltipVisible, mapCreated])

  return (
    <div className="HeaderDiv">
      <div className="RootContainer">
        <div className="Container">
          <h1 className="HeaderName">
            <strong> О бренде</strong>
          </h1>
          <div>
            <p className="Info">
              <strong>Сape&Coat</strong> — бренд верхней одежды и костюмов
              лаконичного кроя был основан в 2017 году в Нижнем Новгороде.
            </p>
            <p className="Info">
              Бренд предоставляет флагманскую услугу — индивидуальный пошив
              изделий из сезонных коллекций бренда по персональным меркам с
              возможностью выбора ткани и фурнитуры.
            </p>
            <p className="Info">
              <strong>Основатель бренда</strong> Екатерина Киреева уделяет
              пристальное внимание деталям, крою и выбору материалов. Лично
              прорабатывает дизайн, конструкцию и технологию пошива каждой
              модели: от идеи до воплощения.
            </p>
            <p className="Info">
              <strong>Сape&Coat</strong> — это архитектурный крой, помноженный
              на дорогие и качественные материалы.
            </p>
            <p className="Info">
              В результате получаются изделия, балансирующие на грани классики и
              последних тенденций.
            </p>
            <Typography variant="h2" component="h2">
              Наши контакты:
            </Typography>
            <p className="Info">
              {window.innerWidth > 819 ? (
                <a
                  style={{ color: "black" }}
                  href="mailto:Cape.n.coat@gmail.com"
                >
                  <MailOutlineIcon /> Электронная почта: Cape.n.coat@gmail.com
                </a>
              ) : (
                <a
                  style={{ color: "black" }}
                  href="mailto:Cape.n.coat@gmail.com"
                >
                  <MailOutlineIcon /> Почта: Cape.n.coat@gmail.com
                </a>
              )}
            </p>
            <p className="Info">
              <a style={{ color: "black" }} href="https://t.me/@kkireva">
                <TelegramIcon /> Телеграм: @kkireva
              </a>
            </p>
            {window.innerWidth > 819 ? (
              <p className="Info">
                <PhoneIcon /> Номер телефона: +7(920)-119-99-19
              </p>
            ) : (
              <p className="Info">
                <PhoneIcon /> Телефон: +7(920)-119-99-19
              </p>
            )}

            <div className="Map" ref={mapRef}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
