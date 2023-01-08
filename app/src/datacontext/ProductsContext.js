import React from 'react'
import { createContext, useState, useEffect } from 'react'
import agent from '../api/agent'
export const ProductsContext = createContext()

function ProductsProvider({ children }) {
  const currency_key = 'shoppingapp_currency'
  const [products, setProducts] = useState([])
  const [currency, setCurrency] = useState(getInitialCurrency)
  const [productsSet, setProductsSet] = useState(new Set())

  function getInitialCurrency() {
    const val = localStorage.getItem(currency_key)
    return val ? val : 'AUS'
  }

  useEffect(() => {
    localStorage.setItem(currency_key, currency)
    agent.Products.getall(currency).then((resp) => {
      setProducts(resp)
    })
  }, [currency])

  useEffect(() => {
    var set = new Set(products.map(p=>p.id));
    setProductsSet(set);
  }, [products])

  return (
    <ProductsContext.Provider
      value={{ products, currency, setCurrency, productsSet }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export default ProductsProvider
