import React from 'react'
import CartProvider from './datacontext/CartContext'
import ProductsProvider from './datacontext/ProductsContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Store from './pages/Store'
import NavBar from './components/Navbar'
import CheckOut from './pages/CheckOut'
import ThankYou from './pages/ThankYou'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
function App() {
  const theme = createTheme()
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProductsProvider>
        <CartProvider>
          <BrowserRouter>
            <NavBar></NavBar>
            <Routes>
              <Route index element={<Store />} />
              <Route path="checkout" element={<CheckOut />} />
              <Route path="thankyou" element={<ThankYou />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </ProductsProvider>
    </ThemeProvider>
  )
}

export default App
