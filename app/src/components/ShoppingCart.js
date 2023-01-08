import { CartContext } from '../datacontext/CartContext'
import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from '@mui/system'
import { Typography, Button, Box } from '@mui/material'
import CartItem from '../components/CartItem'

function ShoppingCart() {
  const cartContext = useContext(CartContext)
  const totalQuantityInCart = cartContext.getTotalQuantity()
  const navigate = useNavigate()

  return (
    <>
      <Container sx={{ my: 5 }} maxWidth="sm">
        <Typography variant="h5">Shopping Basket</Typography>
        <Box
          m={1}
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Button
            variant="outlined"
            sx={{ mr: 1 }}
            onClick={() => {
              navigate('/')
            }}
          >
            Continue Shopping
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              cartContext.clearCart()
            }}
          >
            Clear Cart
          </Button>
        </Box>

        {totalQuantityInCart > 0 ? (
          <>
            <p>Items in your basket:</p>
            {cartContext.items.map((currentProduct, idx) => (
              <CartItem
                key={idx}
                id={currentProduct.id}
                quantity={currentProduct.quantity}
              ></CartItem>
            ))}

            <>
              <h3>Shipping fee</h3>
              <p></p>
              <p>${cartContext.shippingfee.toFixed(2)}</p>
              <hr></hr>
            </>

            <h2>
              Total: $
              {(cartContext.getTotalCost() + cartContext.shippingfee).toFixed(
                2,
              )}
            </h2>
            <Button
              variant="contained"
              onClick={() => {
                cartContext.clearCart()
                navigate('/thankyou')
              }}
            >
              Place Order
            </Button>
          </>
        ) : (
          <h2>There are no items in your cart!</h2>
        )}
      </Container>
    </>
  )
}

export default ShoppingCart
