using api.DA;
using api.Exceptions;
using api.Models;

namespace api.BO
{
    public class ProductPriceConvertor : IProductPriceConvertor
    {
        private readonly ICurrenciesDA _currenciesDA;
        public ProductPriceConvertor(ICurrenciesDA currenciesDA)
        {
            _currenciesDA = currenciesDA;
        }

        public IEnumerable<ProductDTO> Convert(IEnumerable<Product> products, string currency)
        {
            if(string.IsNullOrWhiteSpace(currency))
                throw new RestException(System.Net.HttpStatusCode.BadRequest, $"Invalid currency: {currency}");
            currency = currency.ToUpper();
            Currency? tempCurr = _currenciesDA.GetCurrencies().FirstOrDefault();
            if(tempCurr == null)
                throw new RestException(System.Net.HttpStatusCode.BadRequest, $"No currency data");
            if (!tempCurr.Rates.ContainsKey(currency))
                throw new RestException(System.Net.HttpStatusCode.BadRequest, $"Do not support convert to currency: {currency}");

            var res = new List<ProductDTO>();
            foreach (Product product in products)
            {
                res.Add(new ProductDTO() 
                { 
                    id = product.Id, 
                    price = Math.Round(product.Price * tempCurr.Rates[currency], 2), 
                    currency = currency,
                    image = product.Image,
                    title = product.Title
                });
            }
            return res;
        }

        public IEnumerable<ProductDTO> Convert(IEnumerable<Product> products)
        {
            var res = new List<ProductDTO>();
            foreach (Product product in products)
            {
                res.Add(new ProductDTO()
                {
                    id = product.Id,
                    price = product.Price,
                    currency = "AUS",
                    image = product.Image,
                    title = product.Title
                });
            }
            return res;
        }
    }
}
