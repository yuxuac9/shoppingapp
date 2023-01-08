using api.BO;
using api.Controllers;
using Moq;
using Xunit;

namespace api.tests.Systems.Services
{
    public class TestShippingCostCalculator
    {
        IShippingCostCalculator _shippingCostCalculator;
        public TestShippingCostCalculator()
        {
            _shippingCostCalculator = new ShippingCostCalculator();
        }

        [Fact]
        public void CalcByTotalCost_ShouldReturn20()
        {
            // Shipping cost for an order > $50 is $20
            Assert.Equal(20m, _shippingCostCalculator.CalcByTotalCost(51));
        }

        [Fact]
        public void CalcByTotalCost_Case1_ShouldReturn10()
        {
            // Shipping cost for an order < $50 is $10
            Assert.Equal(10m, _shippingCostCalculator.CalcByTotalCost(35));
        }

        [Fact]
        public void CalcByTotalCost_Case2_ShouldReturn10()
        {
            // Shipping cost for an order == $50 is $10
            Assert.Equal(10m, _shippingCostCalculator.CalcByTotalCost(50));
        }

        [Fact]
        public void CalcByTotalCost_Case3_ShouldReturn10()
        {
            // For an order == $0, still need to charge $10 shipping cost - for some free gifts need to ship
            Assert.Equal(10m, _shippingCostCalculator.CalcByTotalCost(0));
        }

        [Fact]
        public void CalcByTotalCost_Case4_ShouldReturn10()
        {
            // For an order < $0 (with refund), still need to charge $10 shipping cost - for some free gifts need to ship
            Assert.Equal(10m, _shippingCostCalculator.CalcByTotalCost(-1));
        }
    }
}