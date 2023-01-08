namespace api.BO
{
    public class ShippingCostCalculator : IShippingCostCalculator
    {
        public decimal CalcByTotalCost(decimal totalcost)
        {
            if (totalcost <= 50)
                return 10m;
            else
                return 20m;
        }
    }
}