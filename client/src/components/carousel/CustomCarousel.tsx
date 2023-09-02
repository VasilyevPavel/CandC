import React, { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Pagination, Navigation } from "swiper/core"
import "swiper/swiper-bundle.min.css"
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"
import ImageMagnifier from "../ImageMagnifier/ImageMagnifier"
import { CircularProgress } from "@mui/material"
import { Box } from "@mui/system"
import useMediaQuery from "@mui/material/useMediaQuery"

SwiperCore.use([Pagination, Navigation])

interface ImageData {
  id: number
  url: string
}

interface CustomCarouselProps {
  imageData: ImageData[]
}

export default function CustomCarousel({
  imageData,
}: CustomCarouselProps): JSX.Element {
  const [isImagesLoaded, setIsImagesLoaded] = useState<boolean>(false)

  useEffect(() => {
    let imagesLoadedCount = 0
    const totalImagesCount = imageData.length

    const handleImageLoad = () => {
      imagesLoadedCount++
      if (imagesLoadedCount === totalImagesCount) {
        setIsImagesLoaded(true)
      }
    }

    imageData.forEach((item) => {
      const img = new Image()
      img.src = item.url
      img.addEventListener("load", handleImageLoad)
    })

    return () => {
      imageData.forEach((item) => {
        const img = new Image()
        img.src = item.url
        img.removeEventListener("load", handleImageLoad)
      })
    }
  }, [imageData])

  if (!isImagesLoaded) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress sx={{ color: "black" }} />
      </Box>
    )
  }

  return (
    <Swiper
      slidesPerView={3}
      centeredSlides={true}
      spaceBetween={30}
      pagination={{
        type: "bullets",
      }}
      loop={true}
      slideToClickedSlide={true}
      className="mySwiper"
      breakpoints={{
        320: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
      }}
    >
      {imageData &&
        imageData.map((item) => (
          <SwiperSlide key={item.id} className="slide-container">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // height: "100%",
              }}
            >
              <ImageMagnifier
                src={item.url}
                width="auto"
                height="100%"
                style={{
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  )
}
