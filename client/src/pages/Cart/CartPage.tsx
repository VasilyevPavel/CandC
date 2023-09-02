import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react"
import { Button, Container, Grid, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import "./CartPage.css"
import { delCartItemThunk, getCartItemsThunk } from "../../app/thunkActionsCart"
import { Link, useNavigate } from "react-router-dom"
import { getCartItems } from "../../app/cartSlice"

export default function CartPage() {
  const user = useSelector((state) => state.sessionSlice.user)
  const name = useSelector((state) => state.sessionSlice.name)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [cartItemsList, setCartItemsList] = useState([])
  const [delError, setDelError] = useState("")
  const [cartTotal, setCartTotal] = useState(0)
  const [promocode, setPromocode] = useState("")
  const [promocodeErr, setPromocodeErr] = useState("")
  const [discount, setDiscount] = useState(0)
  const [addressInputs, setAddressInputs] = useState({
    city: "",
    street: "",
    number: "",
    flat: "",
  })
  const [commentsInput, setCommentsInput] = useState("")
  const [orderStatus, setOrderStatus] = useState("")
  const [selectedDelivery, setSelectedDelivery] = useState("")
  const [deliveryCost, setDeliveryCost] = useState(0)
  const [userMeasurements, setUserMeasurements] = useState(undefined)

  function sendMail(name, user, order) {
    Email.send({
      SecureToken: "ef79f30f-8ef6-4205-979a-b8e46f36a527",
      To: user,
      From: "maxkosh1994@gmail.com",
      Subject: "Сообщение от команды Cape&Coat",
      Body: `Уважаемый(ая) ${name}, вы указали этот почтовый ящик (${user}) при оформлении заказа на сайте Cape&Coat. ${order}`,
    })
  }
  const emptyCart = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_URL}cart/emptyCart/${user}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      },
    )
    const re = await response.json()
    if (re.success) {
      setCartItemsList([])
    }
  }
  const createOrder = async (data) => {
    const response = await fetch(`${import.meta.env.VITE_URL}order/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    })
    const re = await response.json()
    if (re.message === "Что-то пошло не так, попробуйте позже") {
      setOrderStatus(re.message)
      setTimeout(() => {
        setOrderStatus("")
      }, 2000)
    } else {
      setOrderStatus(re.message)
      // TODO либо убрать таймаут
      // но тогда будет меняться на долю секунды кнопка на "заказ создан блабла"
      setTimeout(() => {
        emptyCart()
        dispatch(getCartItems([]))
        navigate("/account/orders")
      }, 2000)
      sendMail(name, user, re.message)
    }
  }
  const fetchMeasurementsData = async () => {
    try {
      const responseFetch = await fetch(
        `${import.meta.env.VITE_URL}account/profile/measurement`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        },
      )
      const response = await responseFetch.json()
      if (
        response.message ===
          "Произошла ошибка при поиске данных пользователя" ||
        response.message === "Вы еще не заполняли свои данные" ||
        response.error
      ) {
        setUserMeasurements(undefined)
      } else if (response && Object.keys(response).length > 0) {
        setUserMeasurements(response)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartItems = await dispatch(getCartItemsThunk(user))
        setCartItemsList(cartItems)
      } catch (err) {
        console.log(err)
      }
    }
    fetchCartItems()
  }, [dispatch, user])

  useEffect(() => {
    const subtotal = cartItemsList.reduce((sum, item) => sum + item.price, 0)
    const updatedTotal = subtotal - discount + deliveryCost
    setCartTotal(updatedTotal)
  }, [cartItemsList, discount, deliveryCost])

  useEffect(() => {
    if (selectedDelivery === "showroom") {
      setDeliveryCost(0)
    } else {
      setDeliveryCost(300)
      // TODO подключить API почты россии для расчета доставки?
    }
  }, [selectedDelivery])

  useEffect(() => {
    fetchMeasurementsData()
  }, [])

  const handleDeleteItemFromCart = async (itemId) => {
    try {
      const data = { itemId, user }
      await dispatch(delCartItemThunk(data))
      const updatedCartItems = await dispatch(getCartItemsThunk(user))
      setCartItemsList(updatedCartItems)
    } catch (err) {
      console.log(err)
      setDelError("Не получилось удалить товар, попробуйте позже.")
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddressInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleDeliveryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedDelivery(e.target.value)
  }

  const handleCreateOrder = () => {
    if (selectedDelivery !== "") {
      let addressString
      if (selectedDelivery === "post") {
        addressString = `${addressInputs.city}, ${addressInputs.street} дом ${addressInputs.number}, квартира ${addressInputs.flat}`
      } else {
        addressString = "Нижний Новгород, ул. Малая Покровская, 20"
      }
      const orderData = {
        user,
        cartItemsList,
        cartTotal,
        addressString,
        commentsInput,
      }
      if (addressString.length > 18 && userMeasurements) {
        createOrder(orderData)
      } else if (!userMeasurements) {
        setOrderStatus("Пожалуйста, введите свои мерки")
        setTimeout(() => {
          setOrderStatus("")
        }, 2000)
      } else {
        setOrderStatus("Пожалуйста, заполните адрес доставки")
        setTimeout(() => {
          setOrderStatus("")
        }, 2000)
      }
    } else {
      setOrderStatus("Пожалуйста, выберите способ доставки")
      setTimeout(() => {
        setOrderStatus("")
      }, 2000)
    }
  }

  const handleCommentChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setCommentsInput(e.target.value)
  }

  const handlePromocodeChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setPromocode(e.target.value.trim())
  }

  const handleApplyPromocode = async (e: MouseEvent<HTMLButtonElement>) => {
    const subtotal = cartItemsList.reduce((sum, item) => sum + item.price, 0)
    if (promocode) {
      const isValidPromo = await fetch(
        `${import.meta.env.VITE_URL}cart/promocode/${promocode}`,
      )
      const response = await isValidPromo.json()
      if (isValidPromo.status === 200) {
        const disc = (response.percent / 100) * subtotal
        setDiscount(disc)
      } else {
        setPromocodeErr(response.message)
        setTimeout(() => {
          setPromocodeErr("")
        }, 1000)
        setCartTotal(subtotal)
      }
    } else {
      setPromocodeErr("Вы не ввели промокод")
    }
  }

  return (
    <>
      {cartItemsList.length === 0 ? (
        <>
          {orderStatus && <p className="order-status-cart">{orderStatus}</p>}
          <p className="empty-cart-msg">
            Сейчас в вашей корзине пусто.{" "}
            <Link to="/catalog">Загляните в каталог</Link>
          </p>
        </>
      ) : (
        <>
          <div className="container-xs">
            <section className="order">
              <div className="order__form">
                <h1 className="header-item-cart">
                  Корзина:&nbsp;<span>{cartItemsList.length} товаров</span>
                </h1>
                <p className="error-msg-cart">{delError}</p>
                <section className="order__block order__block--basket">
                  {cartItemsList.map((item) => (
                    <div className="basket-item" key={item.id}>
                      <div className="basket-item__left">
                        <div></div>
                        <Link
                          to={`/catalog/categoryName/${item.id}`}
                          rel="noopener noreferrer"
                        >
                          <img
                            src={`${import.meta.env.VITE_IMAGE_URL}${
                              item.Photos[0].photo
                            }`}
                          />
                        </Link>
                      </div>
                      <div className="basket-item__right">
                        <div className="basket-item__content basket-item__content--center">
                          <Link
                            to={`/catalog/categoryName/${item.id}`}
                            className="basket-item__title"
                          >
                            {item.name}
                          </Link>
                          <button
                            className="button basket-item__delete-button button--icon"
                            type="button"
                            onClick={() => handleDeleteItemFromCart(item.id)}
                          >
                            <img
                              src="delicon.png"
                              alt=""
                              width="22"
                              height="22"
                            />
                          </button>
                        </div>
                        <div className="basket-item__content basket-item__content--end">
                          <div className="basket-item__properties">
                            <div>{item.color}</div>
                          </div>
                        </div>
                        <div className="basket-item__content basket-item__content--center">
                          <div className="basket-item__prices">
                            <div className="item-prices">
                              <span className="item-prices__price">
                                {item.price.toLocaleString()} &#8381;
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </section>
                <section className="order__block order__block--deliveries">
                  <h2 className="header-item-cart">Ваши мерки</h2>
                  <div className="form-block">
                    <label
                      className="checkbox checkbox--bordered checkbox--active checkbox--radio checkbox--right"
                      modelmodifiers="[object Object]"
                    >
                      <>
                        {userMeasurements ? (
                          <span className="checkbox__label">
                            <span className="checkbox__header">
                              Рост: {userMeasurements.height}см, рукав:{" "}
                              {userMeasurements.sleeve}см, грудь:{" "}
                              {userMeasurements.bust}см, талия:{" "}
                              {userMeasurements.waist}см, бедра:{" "}
                              {userMeasurements.hips}см, желаемая длина изделия:{" "}
                              {userMeasurements.length}см
                            </span>
                            <span className="checkbox__description">
                              Измените ваши данные в{" "}
                              <Link to="/account/measurements">
                                личном кабинете
                              </Link>
                            </span>
                          </span>
                        ) : (
                          <span className="checkbox__label">
                            <span className="checkbox__header">
                              Заполните ваши данные в{" "}
                              <Link to="/account/measurements">
                                личном кабинете
                              </Link>
                            </span>
                          </span>
                        )}
                      </>
                    </label>
                  </div>
                </section>
                <section className="order__block order__block--deliveries">
                  <h2 className="header-item-cart">Комментарии к заказу</h2>
                  <div className="form-block comment-cart">
                    <label
                      className="checkbox checkbox--bordered checkbox--active checkbox--radio checkbox--right"
                      modelmodifiers="[object Object]"
                    >
                      <div className="form-control">
                        <label className="form-control__label form-control__label--visible">
                          Укажите желаемую длину изделия или другие пожелания
                        </label>
                        <textarea
                          role="text"
                          title="Комментарии"
                          placeholder=""
                          name="comments"
                          rows="5"
                          cols="50"
                          className="form-control__control"
                          onChange={handleCommentChange}
                        />
                        <div className="form-control__messages"></div>
                      </div>
                    </label>
                  </div>
                </section>
                <section className="order__block order__block--deliveries">
                  <h2 className="header-item-cart">Способ доставки</h2>
                  <div className="form-block">
                    <label
                      className="checkbox checkbox--bordered checkbox--active checkbox--radio checkbox--right"
                      modelmodifiers="[object Object]"
                    >
                      <input
                        hidden=""
                        role="radio"
                        type="radio"
                        name="delivery"
                        value="post"
                        className="checkbox-icon"
                        onChange={handleDeliveryChange}
                      />
                      <span className="checkbox__label">
                        <span className="checkbox__header">
                          Доставка Почтой России
                        </span>
                        <span className="checkbox__description">
                          <strong>от 300 рублей</strong>, от 3 дней
                        </span>
                      </span>
                    </label>
                    <div className="delivery-service">
                      <div className="delivery-service__form">
                        <div>
                          <div className="input-location">
                            <div className="form-control">
                              <label className="form-control__label ">
                                Город
                              </label>
                              <input
                                role="text"
                                title="Город"
                                placeholder=""
                                name="city"
                                className="form-control__control"
                                onChange={handleInputChange}
                              />
                              <div className="form-control__messages"></div>
                            </div>
                            <div className="form-control">
                              <label className="form-control__label form-control__label--visible">
                                Улица
                              </label>
                              <input
                                role="text"
                                title="Улица*"
                                placeholder=""
                                name="street"
                                className="form-control__control"
                                onChange={handleInputChange}
                              />
                              <div className="form-control__messages"></div>
                            </div>
                          </div>
                          <div className="input-group">
                            <div className="input-location">
                              <div className="form-control form-control--disabled">
                                <label className="form-control__label form-control__label--visible">
                                  Дом
                                </label>
                                <input
                                  role="text"
                                  title="Дом"
                                  name="number"
                                  placeholder=""
                                  className="form-control__control"
                                  onChange={handleInputChange}
                                  disabled=""
                                />
                                <div className="form-control__buttons"></div>
                                <div className="form-control__messages"></div>
                              </div>
                            </div>
                            <div className="form-control form-control--disabled">
                              <label className="form-control__label form-control__label--visible">
                                Квартира/Офис
                              </label>
                              <input
                                role="text"
                                name="flat"
                                title="Квартира/Офис"
                                placeholder=""
                                className="form-control__control"
                                onChange={handleInputChange}
                                disabled=""
                              />
                              <div className="form-control__buttons"></div>
                              <div className="form-control__messages"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-block">
                    <label
                      className="checkbox checkbox--bordered checkbox--radio checkbox--right"
                      modelmodifiers="[object Object]"
                    >
                      <input
                        hidden=""
                        role="radio"
                        type="radio"
                        name="delivery"
                        value="showroom"
                        className="checkbox-icon"
                        onChange={handleDeliveryChange}
                      />
                      <span className="checkbox__label">
                        <span className="checkbox__header">
                          Забрать в шоу-руме
                        </span>
                        <span className="checkbox__description">
                          <strong>Бесплатно</strong>
                        </span>
                      </span>
                    </label>
                  </div>
                </section>
              </div>
              <div className="order__block order__block--summary">
                <h1 className="header-item-cart">Ваш заказ</h1>
                <p className="order__description order__description--online-payment">
                  <input
                    className="promocode-input"
                    type="text"
                    placeholder="Промокод"
                    onChange={handlePromocodeChange}
                  />
                </p>
                {promocodeErr && (
                  <p className="error-msg-cart pc-err">{promocodeErr}</p>
                )}
                <button
                  className="button button--block button--bordered"
                  onClick={handleApplyPromocode}
                >
                  Применить
                </button>
                <div className="order-summary">
                  <div className="summary">
                    <div className="order-summary__row">
                      <span>Товары ({cartItemsList.length}):</span>
                      <div className="item-prices">
                        <span className="item-prices__price">
                          {cartItemsList
                            .reduce((sum, item) => sum + item.price, 0)
                            .toLocaleString()}{" "}
                          &#8381;
                        </span>
                      </div>
                    </div>
                    <div className="order-summary__row">
                      <span>Скидка:</span>
                      <div className="item-prices">
                        <span className="item-prices__price">
                          {discount.toLocaleString()} &#8381;
                        </span>
                      </div>
                    </div>
                    <div className="order-summary__row">
                      <span>Доставка:</span>
                      <div className="item-prices">
                        <span className="item-prices__price">
                          {deliveryCost.toLocaleString()} &#8381;
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-summary order-summary--total">
                  <div className="order-summary__row">
                    <span>Итого:</span>
                    <div className="item-prices">
                      <span className="item-prices__price item-prices__price--old">
                        {cartTotal.toLocaleString()} &#8381;
                      </span>
                    </div>
                  </div>
                </div>
                {!orderStatus && (
                  <button
                    className="button button--block button--big button--bordered order__button"
                    onClick={() => {
                      handleCreateOrder()
                    }}
                  >
                    <span className="button__content">Оформить заказ</span>
                  </button>
                )}
                {orderStatus && (
                  <p className="order-status-cart">{orderStatus}</p>
                )}
                {/* нужна ли нам эта сряка-кряка? <p className="order__description">
              <small>
                Нажимая на кнопку "Оформить заказ" я подтверждаю своё согласие с{" "}
                <a href="/information/privacy-policy/#policy">
                  Политикой конфиденциальности
                </a>
                , <a href="/information/rules">Правилами работы магазина</a>,{" "}
                <a href="/information/privacy-policy/#rules">
                  Правилами обработки персональных данных
                </a>{" "}
                и{" "}
                <a href="/information/loyalty/rules">
                  Правилами участия в программе лояльности
                </a>
                .
              </small>
            </p> */}
              </div>
            </section>
          </div>
        </>
      )}
    </>
  )
}
