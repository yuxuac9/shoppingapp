import * as React from 'react'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import agent from '../api/agent'
import { useContext } from 'react'
import { ProductsContext } from '../datacontext/ProductsContext'

export default function CurrencySelect() {
  const [currencies, setCurrencies] = React.useState([])
  const productsContext = useContext(ProductsContext)
  const setCurrency = productsContext.setCurrency

  React.useEffect(() => {
    agent.Currencies.get().then((res) => {
      setCurrencies(res)
    })
  }, [])

  const handleChange = (event) => {
    setCurrency(event.target.value)
  }

  return (
    <>
      <Select
        id="currency-select"
        value={productsContext.currency}
        label="Currency"
        onChange={handleChange}
        size='small'
        sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
      >
        {currencies.map((item, idx) => (
          <MenuItem key={item} value={item}>{item}</MenuItem>
        ))}
      </Select>
    </>
  )
}
