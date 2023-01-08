using api.Models;

namespace api.DA
{
    public class CurrenciesDA: ICurrenciesDA
    {
        public IEnumerable<Currency> GetCurrencies()
        {
            return new List<Currency>() { 
                new Currency() 
                { 
                    Base = "AUS", 
                    TimeStamp = DateTimeOffset.Parse("2023-01-01T12:00:00"), 
                    Rates = new Dictionary<string, decimal>() 
                    {
                        { "AUS", 1.0m },
                        { "USD", 0.678973m },
                        { "RMB", 4.737184m }
                    } 
                } 
            };
        }
    }
}
