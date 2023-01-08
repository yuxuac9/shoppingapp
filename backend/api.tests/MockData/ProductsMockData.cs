using api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.tests.MockData
{
    public class ProductsMockData
    {
        public static IEnumerable<Product> GetProducts()
        {
            return new List<Product>()
            {
                new Product(){ Id = "1", Title = "Cake", Price = 4.99m }
            };
        }
    }
}
