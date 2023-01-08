using api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.tests.MockData
{
    public class CurrenciesMockData
    {
        public static IEnumerable<Currency> GetCurrencies()
        {
            return new List<Currency>() {
                new Currency()
                {
                    Base = "AUS",
                    TimeStamp = DateTimeOffset.Parse("2023-01-01T12:00:00"),
                    Rates = new Dictionary<string, decimal>()
                    {
                        { "AUS", 1.0m },
                        { "FOO", 2.0m }
                    }
                }
            };
        }
    }
}
