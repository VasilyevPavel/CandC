import React from "react"
import { IItem, IOrders } from "../Orders/Orders"
import { Box, Modal } from "@mui/material"
import ProductCardInOrder from "../ProductCardInOrder/ProductCardInOrder"
import ProductCard from "../../ProductCard/ProductCard"

interface IModalItemsInOrderProps {
  open: boolean
  setOpen: (open: boolean) => void
  itemsInOrder: IItem[]
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: window.innerWidth > 550 ? 470 : 284,
  height: window.innerWidth > 550 ? 575 : 545,
  overflowX: "auto",
  overflowY: "none",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 10,
  p: window.innerWidth > 820 ? 2 : 2,
}

export default function ModalItemsInOrder({
  open,
  setOpen,
  itemsInOrder,
}: IModalItemsInOrderProps) {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {window.innerWidth < 550
          ? itemsInOrder?.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                photo={item.Photos[0].photo}
                name={item.name}
                isFavorite={true}
                isCart={false}
                color={item.color}
                price={item.price}
                width="260px"
                height="415px"
              />
            ))
          : itemsInOrder?.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                photo={item.Photos[0].photo}
                name={item.name}
                isFavorite={true}
                isCart={false}
                color={item.color}
                price={item.price}
                width="400px"
                height="540px"
              />
            ))}
      </Box>
    </Modal>
  )
}