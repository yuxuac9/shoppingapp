using api.Models;

namespace api.DA
{
    public interface IProductsDA
    {
        IEnumerable<Product> GetProducts();
    }
}
