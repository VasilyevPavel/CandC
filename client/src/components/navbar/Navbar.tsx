import React, { useEffect, useRef, useState } from "react"
import { styled, alpha, ThemeProvider, createTheme } from "@mui/material/styles"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import InputBase from "@mui/material/InputBase"
import Badge from "@mui/material/Badge"
import MenuItem from "@mui/material/MenuItem"
import Menu from "@mui/material/Menu"
import MenuIcon from "@mui/icons-material/Menu"
import Person2Icon from "@mui/icons-material/Person2"
import FavoriteIcon from "@mui/icons-material/Favorite"
import logo from "./logoStore.svg"
import { grey } from "@mui/material/colors"
import { AddShoppingCart } from "@mui/icons-material"
import { Link, useLocation } from "react-router-dom"
import useScrollTrigger from "@mui/material/useScrollTrigger"
import useMediaQuery from "@mui/material/useMediaQuery"
import SearchBar from "../SearchBar/SearchBar"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { useAppDispatch } from "../../app/hooks"
import { isUserLoginThunk, signInUserThunk } from "../../app/thunkActionsAuth"

import "./navbarStyle.css"
import {
  fetchFavouritesData,
  fetchItemData,
} from "../../app/thunkActionsFavourite"
import { checkCartItemThunk } from "../../app/thunkActionsCart"

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
    },
    error: {
      main: "#f44336",
    },
  },
})

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,

  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  width: "100%",
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.5, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}))

//! ЭТО ДЛЯ СКРОЛА ВНИЗ

const easeOutQuart = (progress) => 1 - Math.pow(1 - progress, 4)
const easeInQuart = (progress) => progress ** 4

const handleScrollAndHighlight = () => {
  const scrollToBottom = () => {
    const currentPosition = window.pageYOffset
    const targetPosition = document.body.scrollHeight
    const distance = targetPosition - currentPosition
    const duration = 1000
    const startTime = performance.now()

    const scrollStep = (timestamp) => {
      const elapsedTime = timestamp - startTime
      let progress = elapsedTime / duration

      if (progress < 0.5) {
        progress = easeInQuart(progress * 2) / 2
      } else {
        progress = easeOutQuart((progress - 0.5) * 2) / 2 + 0.5
      }

      const easing = progress
      window.scrollTo(0, currentPosition + distance * easing)

      if (elapsedTime < duration) {
        requestAnimationFrame(scrollStep)
      }
    }

    requestAnimationFrame(scrollStep)
  }

  setTimeout(scrollToBottom, 100)
}
//! ЭТО ДЛЯ СКРОЛА ВНИЗ

interface Props {
  window?: () => Window
  children: React.ReactElement
}

function ElevationScroll(props: Props) {
  const { children, window } = props
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  })
}

export default function Navbar() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"))

  const location = useLocation()
  const isHomePage = location.pathname === "/home"

  const dispatch = useAppDispatch()
  const isUserLogin = useSelector(
    (state: RootState) => state.sessionSlice.session,
  )

  const user = useSelector((state: RootState) => state.sessionSlice.user)
  const isAdmin = useSelector((state: RootState) => state.sessionSlice.isAdmin)

  const favouriteItems = useSelector(
    (state: RootState) => state.favouriteSlice.favourites,
  )
  const cartItems = useSelector((state: RootState) => state.cartSlice.cartItems)

  const [amountOfLikes, setAmountOfLikes] = useState(0)
  const [amountOfCartItem, setAmountOfCartItem] = useState(0)

  useEffect(() => {
    if (isUserLogin) {
      // dispatch(fetchItemData())
      dispatch(fetchFavouritesData())
      dispatch(checkCartItemThunk())
    }
  }, [isUserLogin, user, dispatch])

  useEffect(() => {
    dispatch(isUserLoginThunk())
  }, [dispatch])

  useEffect(() => {
    setAmountOfLikes(favouriteItems.length)
  }, [favouriteItems])

  useEffect(() => {
    setAmountOfCartItem(cartItems.length)
  }, [cartItems])

  const iconColour = grey[900]

  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = "primary-search-account-menu"
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* Меню профиля */}
    </Menu>
  )

  const mobileMenuId = "primary-search-account-menu-mobile"
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        style={{ fontSize: "24px", fontFamily: "Ysabeau Infant" }}
        component={Link}
        to="/about"
        onClick={handleMobileMenuClose}
      >
        О бренде
      </MenuItem>
      <MenuItem
        style={{ fontSize: "24px", fontFamily: "Ysabeau Infant" }}
        component={Link}
        to="/account/favorites"
        onClick={handleMobileMenuClose}
      >
        Избранное
      </MenuItem>
      <MenuItem
        style={{ fontSize: "24px", fontFamily: "Ysabeau Infant" }}
        component={Link}
        to="/catalog"
        onClick={handleMobileMenuClose}
      >
        Каталог
      </MenuItem>
      <MenuItem
        style={{ fontSize: "24px", fontFamily: "Ysabeau Infant" }}
        component={Link}
        to="/catalog/collection"
        onClick={handleMobileMenuClose}
      >
        Коллекция
      </MenuItem>
      <MenuItem
        style={{ fontSize: "24px", fontFamily: "Ysabeau Infant" }}
        component={Link}
        to="/sale"
        onClick={handleMobileMenuClose}
      >
        {" "}
        Sale
      </MenuItem>
      <MenuItem
        style={{ fontSize: "24px", fontFamily: "Ysabeau Infant" }}
        component={Link}
        to="/FAQ"
        onClick={handleMobileMenuClose}
      >
        FAQ
      </MenuItem>
      <MenuItem
        style={{ fontSize: "24px", fontFamily: "Ysabeau Infant" }}
        onClick={() => {
          handleScrollAndHighlight()
          handleMobileMenuClose()
        }}
      >
        Контакты
      </MenuItem>
    </Menu>
  )

  const isScreenSmall = useMediaQuery((theme) => theme.breakpoints.down(375))

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <ElevationScroll>
          <AppBar
            component="nav"
            sx={{
              minHeight: 70,
            }}
          >
            <Toolbar
              sx={{
                padding: "16px 5px",
              }}
            >
              <Box
                component={Link}
                to="/home"
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                }}
              >
                <img
                  src={logo}
                  alt="Logo"
                  style={{
                    width: "200px",
                    height: "30px",
                    objectFit: "cover",
                  }}
                />
              </Box>

              <Box sx={{ flexGrow: 1 }} />

              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                }}
              >
                <SearchBar />
                <IconButton
                  component={Link}
                  to={
                    isUserLogin
                      ? isAdmin
                        ? "/admin/orders"
                        : "/account/profile"
                      : "/signin"
                  }
                  size="large"
                  sx={{ color: iconColour, padding: "8px" }}
                >
                  <Person2Icon />
                </IconButton>
                <IconButton
                  component={Link}
                  to="/account/favorites"
                  size="large"
                  aria-label="show 17 new notifications"
                  sx={{ color: iconColour, padding: "8px" }}
                >
                  <Badge badgeContent={amountOfLikes} color="error">
                    <FavoriteIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  component={Link}
                  to={isUserLogin ? "/cart" : "/signin"}
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  sx={{ color: iconColour, padding: "8px" }}
                >
                  <Badge badgeContent={amountOfCartItem} color="error">
                    <AddShoppingCart />
                  </Badge>
                </IconButton>
              </Box>

              <Box
                sx={{
                  display: { xs: "flex", md: "none" },
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  sx={{ color: iconColour, padding: "8px" }}
                >
                  <MenuIcon />
                </IconButton>
                <Box
                  component={Link}
                  to="/home"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <img
                    src={logo}
                    alt="Logo"
                    style={{
                      width: "200px",
                      height: "30px",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <SearchBar />
                  <IconButton
                    component={Link}
                    to={
                      isUserLogin
                        ? isAdmin
                          ? "/admin/orders"
                          : "/account/profile"
                        : "/signin"
                    }
                    size="large"
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    sx={{
                      color: iconColour,
                      padding: isMobile ? "3px" : "10px",
                    }}
                  >
                    <Badge color="error">
                      <Person2Icon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    component={Link}
                    to={isUserLogin ? "/cart" : "/signin"}
                    size="large"
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    sx={{
                      color: iconColour,
                      padding: isMobile ? "3px" : "10px",
                      paddingRight: "15px",
                    }}
                  >
                    <Badge badgeContent={amountOfCartItem} color="error">
                      <AddShoppingCart />
                    </Badge>
                  </IconButton>
                </div>
              </Box>
            </Toolbar>
            <Box
              sx={{
                display: {
                  xs: "none",
                  color: iconColour,
                  md: "flex",
                  justifyContent: "center",
                  height: "10px",
                  // marginBottom: "15px",
                },
              }}
            >
              <MenuItem
                sx={{
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
                component={Link}
                to="/about"
              >
                <p className="nav-menu">О бренде</p>
              </MenuItem>
              <MenuItem
                sx={{
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
                component={Link}
                to="/catalog"
              >
                <p className="nav-menu">Каталог</p>
              </MenuItem>
              <MenuItem
                sx={{
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
                component={Link}
                to="/catalog/collection"
              >
                <p className="nav-menu">Коллекция</p>
              </MenuItem>
              <MenuItem
                sx={{
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
                component={Link}
                to="/sale"
              >
                <p className="nav-menu">Sale</p>
              </MenuItem>
              <MenuItem
                sx={{
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
                component={Link}
                to="/FAQ"
              >
                <p className="nav-menu">FAQ</p>
              </MenuItem>
              <MenuItem
                sx={{
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                <p onClick={handleScrollAndHighlight} className="nav-menu">
                  Контакты
                </p>
              </MenuItem>
            </Box>
          </AppBar>
        </ElevationScroll>
        <Toolbar sx={isHomePage ? {} : { height: 130 }} />
      </Box>
      {renderMobileMenu}
      {renderMenu}
    </>
  )
}
