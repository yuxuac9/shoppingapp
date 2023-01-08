using api.Models;

namespace api.BO
{
    public interface IShippingCostCalculator
    {
        decimal CalcByTotalCost(decimal totalcost);
    }
}
