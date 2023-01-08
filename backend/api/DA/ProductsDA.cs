using api.Models;

namespace api.DA
{
    public class ProductsDA : IProductsDA
    {
        public IEnumerable<Product> GetProducts()
        {
            return new List<Product>()
            {
                new Product(){ Id = "1", Title = "Cake", Price = 4.99m },
                new Product(){ Id = "2", Title = "Football", Price = 39.99m },
                new Product(){ Id = "3", Title = "Laptop", Price = 999.99m },
                new Product(){ Id = "4", Title = "IPhone", Price = 1499.99m }
            };
        }
    }
}
