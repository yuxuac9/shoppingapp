using api.DA;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CurrenciesController : ControllerBase
    {
        private readonly ILogger<CurrenciesController> _logger;
        private readonly ICurrenciesDA _currenciesDA;
        public CurrenciesController(ILogger<CurrenciesController> logger,
            ICurrenciesDA currenciesDA)
        {
            _logger = logger;
            _currenciesDA = currenciesDA;
        }

        [HttpGet]
        public IEnumerable<string> Get()
        {
            return _currenciesDA.GetCurrencies().SelectMany(c => c.Rates.Keys).ToArray();
        }
    }
}