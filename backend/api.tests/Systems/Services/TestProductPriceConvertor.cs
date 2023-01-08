using api.BO;
using api.Controllers;
using api.DA;
using api.Models;
using api.tests.MockData;
using Moq;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace api.tests.Systems.Services
{
    /// <summary>
    /// I put tests in the same methods for simplicity, each assertion can be extracted as a test method
    /// </summary>
    public class TestProductPriceConvertor
    {
        IProductPriceConvertor _priceConvertor;
        public TestProductPriceConvertor()
        {
            // Arrange
            var currenciesDA = new Mock<ICurrenciesDA>();
            currenciesDA.Setup(da => da.GetCurrencies()).Returns(CurrenciesMockData.GetCurrencies());
            _priceConvertor = new ProductPriceConvertor(currenciesDA.Object);
        }

        [Fact]
        public void Convert_ShouldReturnTheSamePrice()
        {
            // Action
            var mockProducts = ProductsMockData.GetProducts();
            var mockProductsDic = new Dictionary<string, Product>();
            foreach (var product in mockProducts)
                mockProductsDic.Add(product.Id, product);
            var convertedToAUSObjs = _priceConvertor.Convert(mockProducts, "AUS");

            // Assert
            Assert.True(convertedToAUSObjs.All(convertedObj => convertedObj.price == mockProductsDic[convertedObj.id].Price), 
                "Product prices in AUS converting to AUS, the prices will stay the same");
        }

        [Fact]
        public void Convert_ShouldReturnDoubledPrice()
        {
            // Action
            var mockProducts = ProductsMockData.GetProducts();
            var mockProductsDic = new Dictionary<string, Product>();
            foreach (var product in mockProducts)
                mockProductsDic.Add(product.Id, product);
            var convertedToFOOObjs = _priceConvertor.Convert(mockProducts, "FOO");

            // Assert
            Assert.True(convertedToFOOObjs.All(convertedObj => convertedObj.price == mockProductsDic[convertedObj.id].Price * 2.0m),
                "Product prices in AUS converting to FOO(AUS -> FOO's exchange rate is 2.0m), the prices in AUS should be doubled");
        }
    }
}