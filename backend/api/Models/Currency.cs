namespace api.Models
{
    public class Currency
    {
        public Currency()
        {
            this.Rates = new Dictionary<string, decimal>();
        }
        public string Base { get; set; }
        public DateTimeOffset TimeStamp { get; set; }
        public Dictionary<string, decimal> Rates{ get; set; }
    }
}
