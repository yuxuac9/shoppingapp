using api.Models;

namespace api.DA
{
    public interface ICurrenciesDA
    {
        IEnumerable<Currency> GetCurrencies();
    }
}
