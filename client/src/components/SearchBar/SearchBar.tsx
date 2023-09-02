import React from "react"
import SearchIcon from "@mui/icons-material/Search"
import IconButton from "@mui/material/IconButton"
import { Link } from "react-router-dom"
import { useMediaQuery } from "@mui/material"

//todo доделать для мобильной версии

interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"))

  return (
    <>
      <IconButton
        component={Link}
        to="/search"
        size="large"
        aria-label="search"
        color="inherit"
        sx={{
          padding: isMobile ? "3px" : "8px",
        }}
      >
        <SearchIcon />
      </IconButton>
    </>
  )
}

export default SearchBar
