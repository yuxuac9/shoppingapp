import React from 'react'
import { createContext, useState, useContext } from 'react'
import { ProductsContext } from './ProductsContext'
import { useEffect } from 'react'
import agent from '../api/agent'

export const CartContext = createContext({
  items: [],
  shippingfee: 0,
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
  getTotalQuantity: () => {},
  getProductData: () => {},
  clearCart: () => {},
})

export function CartProvider({ children }) {
  const cart_data_key = 'shoppingapp_cart'
  const [cartProducts, setCartProducts] = useState(getInitialState)
  const [shippingfee, setShippingFee] = useState(0)
  const productsContext = useContext(ProductsContext)
  const totalCost = getTotalCost()

  // update shippfee based on totalCost
  useEffect(() => {
    agent.ShippingCost.get(totalCost).then((resp) => {
      setShippingFee(resp)
    })
  }, [totalCost])

  // update cart data in localstorage based on cartProducts
  useEffect(() => {
    localStorage.setItem(cart_data_key, JSON.stringify(cartProducts))
  }, [cartProducts])

  function getProductQuantity(id) {
    const product = cartProducts.find((p) => p.id === id)
    if (product === undefined) return 0
    return product.quantity
  }

  function addOneToCart(id) {
    const quantity = getProductQuantity(id)
    if (quantity === 0) {
      // cartProducts + a new product
      setCartProducts([
        ...cartProducts,
        {
          id: id,
          quantity: 1,
        },
      ])
    } else {
      setCartProducts(
        cartProducts.map(
          (product) =>
            product.id === id
              ? { ...product, quantity: product.quantity + 1 } // find a match, update quantity
              : product, // not a match
        ),
      )
    }
  }

  function removeOneFromCart(id) {
    const quantity = getProductQuantity(id)
    if (quantity === 1) deleteFromCart(id)
    else {
      setCartProducts(
        cartProducts.map(
          (product) =>
            product.id === id
              ? { ...product, quantity: product.quantity - 1 } // find a match, update quantity
              : product, // not a match
        ),
      )
    }
  }

  function deleteFromCart(id) {
    setCartProducts((cardProducts) =>
      cardProducts.filter((product) => product.id !== id),
    )
  }

  function getTotalCost() {
    let totalCost = 0
    cartProducts.map((cartItem) => {
      const productData = getProductData(cartItem.id)
      if (productData) totalCost += productData.price * cartItem.quantity
      return totalCost
    })
    return totalCost
  }

  function getProductData(id) {
    return productsContext.products.find((p) => p.id === id)
  }

  function getTotalQuantity() {
    let totalCnt = cartProducts.reduce(
      (tempSum, cartItem) => tempSum + cartItem.quantity,
      0,
    )
    return totalCnt
  }

  function clearCart() {
    setCartProducts([])
  }

  function getInitialState() {
    const cartData = localStorage.getItem(cart_data_key)
    return cartData ? JSON.parse(cartData) : []
  }

  // context instance
  const contextValue = {
    items: cartProducts,
    shippingfee: shippingfee,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
    getTotalQuantity,
    getProductData,
    clearCart,
  }

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  )
}

export default CartProvider
