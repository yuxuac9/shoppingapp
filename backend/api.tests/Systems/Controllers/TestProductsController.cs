using api.BO;
using api.Controllers;
using api.DA;
using api.Models;
using api.tests.MockData;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace api.tests.Systems.Controllers
{
    public class TestProductsController
    {
        [Fact]
        public void Get_ShouldReturnNonEmptyProductsInAUS()
        {
            // Arrange
            var currenciesDA = new Mock<ICurrenciesDA>();
            currenciesDA.Setup(da => da.GetCurrencies()).Returns(CurrenciesMockData.GetCurrencies());
            var priceConvertor = new ProductPriceConvertor(currenciesDA.Object);

            var productsDA = new Mock<IProductsDA>();
            productsDA.Setup(da => da.GetProducts()).Returns(ProductsMockData.GetProducts());

            var logger = new Mock<ILogger<ProductsController>>();
            var productsController = new ProductsController(logger.Object, priceConvertor, productsDA.Object);

            // Action
            var result = productsController.Get();

            // Assert
            Assert.True(result is IEnumerable<ProductDTO>);
            Assert.True(result.Count() > 0);
            Assert.True(result.All(p => p.currency.Equals("AUS")));
        }

        [Fact]
        public void GetViaCurrency_ShouldReturnNonEmptyProductsInFOO()
        {
            // Arrange
            var currenciesDA = new Mock<ICurrenciesDA>();
            currenciesDA.Setup(da => da.GetCurrencies()).Returns(CurrenciesMockData.GetCurrencies());
            var priceConvertor = new ProductPriceConvertor(currenciesDA.Object);

            var productsDA = new Mock<IProductsDA>();
            productsDA.Setup(da => da.GetProducts()).Returns(ProductsMockData.GetProducts());

            var logger = new Mock<ILogger<ProductsController>>();
            var productsController = new ProductsController(logger.Object, priceConvertor, productsDA.Object);

            // Action
            var result = productsController.GetViaCurrency("FOO");

            // Assert
            Assert.True(result is IEnumerable<ProductDTO>);
            Assert.True(result.Count() > 0);
            Assert.True(result.All(p => p.currency.Equals("FOO")));
        }
    }
}