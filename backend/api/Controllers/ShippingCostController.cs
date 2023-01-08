using api.BO;
using api.DA;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ShippingCostController : ControllerBase
    {
        private readonly IShippingCostCalculator _shippingCostCalculator;
        public ShippingCostController(
            IShippingCostCalculator shippingCostCalculator)
        {
            _shippingCostCalculator = shippingCostCalculator;
        }

        [HttpGet("{totalcost}")]
        public decimal GetViaTotalCost(decimal totalcost)
        {
            return _shippingCostCalculator.CalcByTotalCost(totalcost);
        }
    }
}