import React from "react"
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  styled,
} from "@mui/material"
import { Favorite, AddShoppingCart } from "@mui/icons-material"
import { useDispatch } from "react-redux"
import { category, toggleFavorite } from "../../../app/CategorySlice"

interface IProductCard {
  id: number
  photo: string
  name: string
  color: string
  price: number
  isFavorite: boolean
}

const RootIconButton = styled(IconButton)({
  color: "red",
})

export default function ProductCardInOrder({
  id,
  photo,
  name,
  color,
  price,
  isFavorite: initialIsFavorite,
}: IProductCard) {
  const dispatch = useDispatch()
  const [isFavorite, setIsFavorite] = React.useState(initialIsFavorite)

  const favoriteHandler = async (): Promise<void> => {
    setIsFavorite(!isFavorite)
    dispatch(
      toggleFavorite({
        id: id,
        isFavorite: !isFavorite,
      }),
    )
  }

  return (
    <Card sx={{ width: 250, height: 550, marginBottom: 5 }} id={id}>
      <CardMedia component="img" alt="Product Image" photo={photo} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <CardContent style={{ paddingBottom: "0px" }}>
          <Typography variant="h3" component="h1">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Цвет: {color}
          </Typography>
          <Typography variant="h3" component="p">
            Цена: {price.toLocaleString()} ₽
          </Typography>
        </CardContent>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: "10px",
          }}
        >
          <RootIconButton
            aria-label="Add to favorites"
            onClick={favoriteHandler}
          >
            <Favorite style={{ color: isFavorite ? "red" : "grey" }} />
          </RootIconButton>
          <IconButton aria-label="Add to cart">
            <AddShoppingCart />
          </IconButton>
        </div>
      </div>
    </Card>
  )
}
