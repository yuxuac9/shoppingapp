import axios from 'axios'

axios.defaults.baseURL = 'https://localhost:5001/api' //process.env.REACT_APP_API_BASE_URL;

const requests = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  del: (url) => axios.delete(url).then(responseBody),
  postForm: (url, file) => {
    let formData = new FormData()
    formData.append('File', file)
    return axios
      .post(url, formData, {
        headers: { 'Content-type': 'multipart/form-data' },
      })
      .then(responseBody)
  },
}

const responseBody = (response) => response.data

const Products = {
  getall: (currency) => {
    var res = requests.get(`/products/${currency}`)
    return res
  },
}

const ShippingCost = {
  get: (totalCost) => {
    var res = requests.get(`/shippingcost/${totalCost}`)
    return res
  },
}

const Currencies = {
  get: (totalCost) => {
    var res = requests.get(`/currencies/`)
    return res
  },
}

export default {
  Products,
  ShippingCost,
  Currencies
}
