import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Container, Typography, Box } from '@mui/material'
function ThankYou() {
  const navigate = useNavigate()
  return (
    <>
      <Container sx={{ mt: 5 }} maxWidth="md">
        <Typography variant="h3">Thank you for your purchase!</Typography>
        <br></br>
        <Box>
          <Button
            variant="outlined"
            onClick={() => {
              navigate('/')
            }}
          >
            Continue Shopping
          </Button>
        </Box>
      </Container>
    </>
  )
}

export default ThankYou
