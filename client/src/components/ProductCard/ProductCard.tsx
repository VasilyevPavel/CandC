import { useEffect, useState } from "react"
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  styled,
} from "@mui/material"

import { toggleCart, toggleFavorite } from "../../app/CategorySlice"
import { RootState } from "../../app/store"
import { useNavigate } from "react-router"
import { fetchFavouritesData } from "../../app/thunkActionsFavourite"
import { getCartItemsThunk } from "../../app/thunkActionsCart"
import { useAppDispatch } from "../../app/hooks"
import { addCartItem } from "../../app/cartSlice"
import { removeItem, setLikedStatus } from "../../app/favouriteSlice"
import { useSelector } from "react-redux"
import "./ProductCard.css"
import AddTaskIcon from "@mui/icons-material/AddTask"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"
import FavoriteIcon from "@mui/icons-material/Favorite"

interface IProductCard {
  id: number
  photo: string
  name: string
  color: string
  price: number
  isFavorite: boolean
  isCart: boolean
  width?: string
  height?: string
}

const CardContentStyled = styled(CardContent)({
  paddingBottom: "0px",
})

//TODO Пропсы высоты и ширины применяются снизу, не нужно их хардкодить

export default function ProductCard({
  id,
  photo,
  name,
  color,
  price,
  isFavorite: initialIsFavorite,
  isCart: initialIsCart,
  width = "400px",
  height = "540px",
}: IProductCard) {
  const dispatch = useAppDispatch()

  const [favCard, setFavCard] = useState()

  const navigate = useNavigate()

  const [isFavorite, setIsFavorite] = useState(initialIsFavorite)
  const [isCart, setIsCart] = useState(initialIsCart)

  const favorites = useSelector(
    (state: RootState) => state.CategorySlice.favorites,
  )
  const itemsInCart = useSelector(
    (state: RootState) => state.CategorySlice.itemsInCart,
  )

  const favorites2 = useSelector(
    (state: RootState) => state.favouriteSlice.favourites,
  )
  const { user } = useSelector((state: RootState) => state.sessionSlice)

  // const isFavorites = favorites.includes(id)

  // const like = useSelector((state: RootState) => state.CategorySlice.favorites)

  const itemCardHandler = async (e): Promise<void> => {
    const targer = e.target
    if (!targer) return
    const parent = targer.closest(".conteiner-item").id

    //TODO поменять в навигации categoryName на :categoryName
    navigate(`/catalog/categoryName/${parent}`, { state: parent })
  }

  //! логика лайка

  const favoriteHandler = async (): Promise<void> => {
    setIsFavorite(!isFavorite)
    dispatch(toggleFavorite(id))
    try {
      if (!user) {
        navigate("/signin")
        return
      }
      if (isFavorite === false) {
        const response = await fetch(
          import.meta.env.VITE_URL + "favorite/add",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ id, photo, name, color, price, isFavorite }),
          },
        )
        if (response.status === 200) {
          const favorite = await response.json()
          setFavCard(favorite)
          dispatch(fetchFavouritesData(favorite))

          // Обновление счетчика лайков
          dispatch(setLikedStatus(true))
        }
      } else {
        const response = await fetch(
          import.meta.env.VITE_URL + "favorite/del",
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              id,
              photo,
              name,
              color,
              price,
              isFavorite,
            }),
          },
        )
        if (response.status === 200) {
          const favorite = await response.json()
          setFavCard(favorite)
          dispatch(removeItem(favorite.item_id))
          dispatch(setLikedStatus(false))
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  //! логика корзины

  const cartHandler = async (): Promise<void> => {
    setIsCart((prevIsCart) => !prevIsCart)
    dispatch(toggleCart(id))
    try {
      if (!user) {
        navigate("/signin")
        return
      }
      if (isCart === false) {
        const response = await fetch(
          import.meta.env.VITE_URL + "cart/item/add",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              id,
              photo,
              name,
              color,
              price,
              isFavorite,
              isCart,
            }),
          },
        )
        if (response.status === 200) {
          const inCart = await response.json()
          const itemInCart = inCart[0]
          setIsCart(itemInCart)
          dispatch(addCartItem(inCart))
        }
      } else {
        const response = await fetch(
          import.meta.env.VITE_URL + "cart/item/del",
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              id,
              photo,
              name,
              color,
              price,
              isFavorite,
              isCart,
            }),
          },
        )
        if (response.status === 200) {
          const delCart = await response.json()

          dispatch(removeItem(delCart))
          const updatedCartItems = await dispatch(getCartItemsThunk(user))
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  //! логика отображения компонентов на странице
  useEffect(() => {
    try {
      ;(async function (): Promise<void> {
        if (!user) {
          return
        }
        const response = await fetch(
          import.meta.env.VITE_URL + "cart/cartInCat",
          {
            method: "GET",
            credentials: "include",
          },
        )
        if (response.status === 200) {
          const allItemInCart = await response.json()
          const isProductInCart = allItemInCart.includes(id)
          setIsCart(isProductInCart)
        }
        dispatch(toggleCart(id))
      })()
    } catch (err) {
      console.log(err)
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) {
          return
        }
        const response = await fetch(import.meta.env.VITE_URL + "favorite", {
          method: "GET",
          credentials: "include",
        })
        if (response.status === 200) {
          const favorites = await response.json()
          const isProductFavorite = favorites.includes(id)
          setIsFavorite(isProductFavorite)
        }
        dispatch(toggleFavorite(id))
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [])

  return (
    <Card
      sx={{
        width: width,
        marginBottom: "15px",
      }}
      className="conteiner-item"
      id={id}
    >
      <CardMedia
        component="img"
        alt="Product Image"
        style={{ height: height }}
        image={`${import.meta.env.VITE_IMAGE_URL}${photo}`}
        className="card-media"
        onClick={itemCardHandler}
      />
      <Typography
        style={{ paddingLeft: "16px", paddingTop: "16px", margin: "0px" }}
        variant="h3"
        component="h1"
      >
        {name}
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <CardContentStyled>
          <Typography
            style={{ textAlign: "left" }}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            Цвет: {color}
          </Typography>
          <Typography style={{ textAlign: "left" }} variant="h3" component="p">
            Цена: {price?.toLocaleString().replace(/,\s?/g, " ")} ₽
          </Typography>
        </CardContentStyled>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: "10px",
          }}
        >
          <IconButton
            aria-label="Add to favorites"
            onClick={favoriteHandler}
            style={{ color: "black" }}
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
          </IconButton>
          <IconButton
            onClick={cartHandler}
            style={{ color: "black" }}
            aria-label="Add to cart"
          >
            {isCart ? <AddTaskIcon /> : <AddShoppingCartIcon />}
          </IconButton>
        </div>
      </div>
    </Card>
  )
}
