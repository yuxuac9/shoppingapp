import { useContext } from 'react'
import React from 'react'
import { CartContext } from '../datacontext/CartContext'
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Badge,
  ButtonGroup,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

function ProductCard(props) {
  const cartContext = useContext(CartContext)
  const product = props.product
  const productQuantity = cartContext.getProductQuantity(product.id)

  return (
    <>
      <Grid item key={product.id} xs={12} sm={6} md={4}>
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardMedia
            component="img"
            sx={{
              pt: '20%',
            }}
            image={product.image}
            alt="random"
          />

          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
              <Badge color="secondary" badgeContent={productQuantity}>
                <label>{product.title}</label>
              </Badge>
            </Typography>
            <Typography>${product.price}</Typography>
          </CardContent>

          <CardActions>
            {productQuantity > 0 ? (
              <ButtonGroup>
                <Button
                  aria-label="reduce"
                  onClick={() => cartContext.removeOneFromCart(product.id)}
                >
                  <RemoveIcon fontSize="small" />
                </Button>
                <Button
                  aria-label="increase"
                  onClick={() => cartContext.addOneToCart(product.id)}
                >
                  <AddIcon fontSize="small" />
                </Button>
              </ButtonGroup>
            ) : (
              <Button
                onClick={() => {
                  cartContext.addOneToCart(product.id)
                }}
              >
                Add to Cart
              </Button>
            )}
          </CardActions>
        </Card>
      </Grid>
    </>
  )
}

export default ProductCard
