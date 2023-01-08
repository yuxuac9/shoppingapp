import { CartContext } from '../datacontext/CartContext'
import { useContext } from 'react'
import React from 'react'
import { Button, Grid, ButtonGroup, Typography } from '@mui/material'
import { Box } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

function CartItem(props) {
  const cartContext = useContext(CartContext)
  const id = props.id
  const quantity = props.quantity
  const productData = cartContext.getProductData(id)

  return (
    <>
      {productData ? (
        <Grid>
        <Box
        component="img"
        sx={{
          height: 150,
          width: 224,
          maxHeight: { xs: 150, md: 106 },
          maxWidth: { xs: 224, md: 160 },
        }}
        alt={productData.title}
        src={productData.image}
      />
          <Box>
            <Typography variant="h6">{productData.title}</Typography>
          </Box>
          <Box>
            <p>{quantity} total</p>
            <p>${(quantity * productData.price).toFixed(2)}</p>
          </Box>
          <Box
            m={1}
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <ButtonGroup variant="outlined" size="small">
              <Button
                aria-label="reduce"
                onClick={() => cartContext.removeOneFromCart(id)}
              >
                <RemoveIcon fontSize="small" />
              </Button>
              <Button
                aria-label="increase"
                onClick={() => cartContext.addOneToCart(id)}
              >
                <AddIcon fontSize="small" />
              </Button>
              <Button
                color="error"
                aria-label="remove"
                onClick={() => cartContext.deleteFromCart(id)}
              >
                Remove
              </Button>
            </ButtonGroup>
          </Box>
          <hr></hr>
        </Grid>
      ) : (
        <Grid>
          <Box>
            <Typography variant="h6">Product id={id} is not available now</Typography>
          </Box>
          <Box
            m={1}
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <ButtonGroup variant="outlined" size="small">
              <Button
                color="error"
                aria-label="remove"
                onClick={() => cartContext.deleteFromCart(id)}
              >
                Remove
              </Button>
            </ButtonGroup>
          </Box>
          <hr></hr>
        </Grid>
      )}
    </>
  )
}

export default CartItem
