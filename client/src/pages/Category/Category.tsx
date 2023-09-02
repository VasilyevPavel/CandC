import { useEffect, useState } from "react"

import ProductCard from "../../components/ProductCard/ProductCard"
import { useDispatch, useSelector } from "react-redux"
import { category, categoryClear } from "../../app/CategorySlice"
import { RootState } from "../../app/store"
import { useLocation } from "react-router"
import { styled } from "@mui/system"

const ContainerOneCard = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
})

const Header = styled("h3")({
  marginBottom: "20px",
  textAlign: "center",
})

const ProductCardsContainer = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
  gap: "5px",
  marginBottom: "15px",
})

export default function Category() {
  const [catName, setCatName] = useState("")
  const location = useLocation().state
  const dispatch = useDispatch()

  const card = useSelector(
    (state: RootState) => state.CategorySlice.categoryItems,
  )

  useEffect(() => {
    try {
      ;(async function (): Promise<void> {
        const response = await fetch(
          import.meta.env.VITE_URL + `category/${location}`,
          {
            credentials: "include",
          },
        )
        if (response.status === 200) {
          const result = await response.json()
          dispatch(categoryClear())

          result.forEach((el) => {
            el.Items.forEach((item) => {
              const photos = item.Photos // Массив фотографий
              const firstPhoto = photos[0]?.photo || "" // Получение первой фотографии или пустой строки, если фотография отсутствует

              dispatch(
                category({
                  id: item.id,
                  photo: firstPhoto,
                  name: item.name,
                  color: item.color,
                  price: item.price,
                  categoryName: item.categoryName,
                  isFavorite: false,
                  isCart: false,
                }),
              )
            })
            setCatName(el.name)
          })
        }
      })()
    } catch (err) {
      console.log(err)
    }
  }, [])

  const renderProductCards = card.map((item) => (
    <ProductCard
      key={item.id}
      id={item.id}
      photo={item.photo}
      name={item.name}
      color={item.color}
      price={item.price}
      isFavorite={item.isFavorite}
      isCart={item.isCart}
      width={window.innerWidth < 830 ? "300px" : "400px"}
      height={window.innerWidth < 500 ? "415px" : "540px"}
    />
  ))

  return (
    <>
      <ContainerOneCard>
        <Header>{catName}</Header>
        <ProductCardsContainer>{renderProductCards}</ProductCardsContainer>
      </ContainerOneCard>
    </>
  )
}
