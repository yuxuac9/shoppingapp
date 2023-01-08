import { useContext } from 'react'
import { ProductsContext } from '../datacontext/ProductsContext'
import ProductCard from '../components/ProductCard'
import React from 'react'
import { Container } from '@mui/system'
import { Grid, Typography} from '@mui/material'
function Store() {
  const productsContext = useContext(ProductsContext)
  const products = productsContext.products
  return (
    <>
      <Container sx={{ py: 5 }} maxWidth="md">
        <Typography variant="h5">Products</Typography>
        <Grid container spacing={4}>
          {products.map((product, idx) => (
              <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default Store
