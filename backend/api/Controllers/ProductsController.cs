using api.BO;
using api.DA;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductPriceConvertor _priceConvertor;
        private readonly ILogger<ProductsController> _logger;
        private readonly IProductsDA _productsAccessor;
        public ProductsController(ILogger<ProductsController> logger,
                                    IProductPriceConvertor priceConvertor,
                                    IProductsDA productsAccessor)
        {
            _priceConvertor = priceConvertor;
            _logger = logger;
            _productsAccessor = productsAccessor;
        }

        [HttpGet]
        public IEnumerable<ProductDTO> Get()
        {
            IEnumerable<Product> products = _productsAccessor.GetProducts();
            return this._priceConvertor.Convert(products);
        }

        [HttpGet("{currency}")]
        public IEnumerable<ProductDTO> GetViaCurrency(string currency)
        {
            IEnumerable<Product> products = _productsAccessor.GetProducts();
            return this._priceConvertor.Convert(products, currency);
        }
    }
}