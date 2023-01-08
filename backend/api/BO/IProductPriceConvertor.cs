using api.Models;

namespace api.BO
{
    public interface IProductPriceConvertor
    {
        IEnumerable<ProductDTO> Convert(IEnumerable<Product> products, string currency);
        IEnumerable<ProductDTO> Convert(IEnumerable<Product> products);
    }
}
