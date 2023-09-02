import React, { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
} from "@mui/material"
import styles from "./Orders.module.css"
import ModalItemsInOrder from "../ModalItemsInOrder/ModalItemsInOrder"

export interface IItem {
  id: number
  category_id: number
  collection_id: number
  name: string
  care_instructions: string
  characteristics: string
  description: string
  color: string
  model_sizes: string
  photo: string
  price: number
  in_stock: boolean
  createdAt: Date
  updatedAt: Date
  isFavorite: boolean
}

export interface IOrder {
  id: number
  user_id: number
  total: number
  status: string
  address: string
  Items: Array<IItem>
  createdAt: Date
  updatedAt: Date
}

export default function Orders() {
  const [orders, setOrders] = useState<IOrder[]>([])
  const [openOrderId, setOpenOrderId] = useState<number | null>(null)
  const [info, setInfo] = useState("")

  const CustomTableRow = styled(TableRow)(({ theme }) => ({
    "&:last-child td, &:last-child th": {
      border: 0,
    },
    fontSize: theme.breakpoints.down("sm") ? "small" : "medium",
  }))

  const handleOrderClick = (orderId: number) => {
    setOpenOrderId(orderId)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseFetch = await fetch(
          `${import.meta.env.VITE_URL}account/profile/orders`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          },
        )
        const response = await responseFetch.json()
        const { status } = await responseFetch

        if (
          status === 403 ||
          status === 402 ||
          status === 203 ||
          status === 500
        ) {
          setInfo(response.message)
        }

        if (status === 200 && Array.isArray(response)) {
          setOrders(response)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className={styles.mainDiv}>
      {info?.length > 0 && <p>{info}</p>}
      {orders?.length > 0 ? (
        <>
          <div className={styles.headerDiv}>
            {window.innerWidth > 550 && <h2>Мои заказы</h2>}
            <p>Нажмите на заказ, чтобы посмотреть подробную информацию</p>
          </div>
          <TableContainer
            className={styles.TableContainer}
            sx={{ width: "50%" }}
            component={Paper}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontSize: "medium" }}>№</TableCell>
                  <TableCell sx={{ fontSize: "medium" }}>Дата</TableCell>
                  <TableCell sx={{ fontSize: "medium" }}>Стоимость</TableCell>
                  <TableCell sx={{ fontSize: "medium" }}>Статус</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders?.map((order) => (
                  <CustomTableRow // Use the CustomTableRow component here
                    key={order.id}
                    onClick={() => handleOrderClick(order.id)}
                  >
                    <TableCell>{order.id}</TableCell>
                    <TableCell>
                      {order.createdAt
                        .toString()
                        .slice(0, 10)
                        .replace(/-/g, ".")}
                    </TableCell>
                    <TableCell>{order.total.toLocaleString()}</TableCell>
                    <TableCell>{order.status}</TableCell>
                  </CustomTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {openOrderId !== null && (
            <ModalItemsInOrder
              open={true}
              setOpen={() => setOpenOrderId(null)}
              itemsInOrder={
                orders.find((order) => order.id === openOrderId)?.Items || []
              }
            />
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  )
}
