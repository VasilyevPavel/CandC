import React, { useState, useEffect } from "react"
import "./MainPage.css"
import ProductCard from "../../components/ProductCard/ProductCard"
import { Typography } from "@mui/material"
import { Link } from "react-router-dom"
import "swiper/swiper.min.css"
import "swiper/components/pagination/pagination.min.css"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core"

SwiperCore.use([Autoplay, Pagination, Navigation])

export default function MainPage() {
  const [inStock, setInStock] = useState([])

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

  return (
    <>
      <div className="main-container">
        <div className="vid-container">
          <video autoPlay loop muted className="vid">
            <source src="/IMG_6623.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="stock-container">
          <Typography
            style={{ textAlign: "center" }}
            variant="h1"
            component="h1"
          >
            SALE
          </Typography>
          <Swiper
            // className="mainPage"
            slidesPerView={3}
            spaceBetween={30}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              dynamicBullets: true,
            }}
            speed={2000}
            breakpoints={{
              200: {
                slidesPerView: 1,
              },
              320: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 3,
              },
            }}
          >
            {inStock.map((item) => (
              <SwiperSlide key={item.id}>
                <ProductCard
                  key={item.id}
                  id={item.id}
                  photo={item.Photos[0].photo}
                  name={item.name}
                  color={item.color}
                  price={item.price}
                  isFavorite={false}
                  isCart={false}
                  width={window.innerWidth < 830 ? "300px" : "360px"}
                  height={window.innerWidth < 500 ? "415px" : "486px"}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="blocks-container">
          <div className="collection-containerMain">
            <Link to="/catalog/collection">
              <img
                src={`${import.meta.env.VITE_COLLECTION_URL}IMG_8836.JPG`}
                alt=""
                className="image-main"
              />
              <Typography>
                <span className="text-img-main">Коллекция AW-2023</span>
              </Typography>
            </Link>
          </div>
          <div className="latest-container">
            <Link to="/new-arrivals">
              <img
                src={`${import.meta.env.VITE_CATEGORY_URL}coats.jpg`}
                alt=""
                className="image-main"
              />
              <Typography>
                <span className="text-img-main">Новые модели</span>
              </Typography>
            </Link>
          </div>
        </div>
        <div className="catalog-nav">
          <Link to="/catalog">
            <img src="./cat-main.jpg" alt="" className="img-to-cat" />
            <Typography>
              <span className="catalog-nav-text">Перейти в каталог</span>
            </Typography>
          </Link>
        </div>
      </div>
    </>
  )
}
