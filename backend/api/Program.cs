using api.BO;
using api.DA;
using api.Middlewares;

namespace api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers();
            builder.Services.AddScoped<IProductPriceConvertor, ProductPriceConvertor>();
            builder.Services.AddScoped<IShippingCostCalculator, ShippingCostCalculator>();
            builder.Services.AddScoped<ICurrenciesDA, CurrenciesDA>();
            builder.Services.AddScoped<IProductsDA, ProductsDA>();
            builder.Services.AddCors(opt => opt.AddPolicy(name: "allowOrigins", 
                policy => 
                {
                    policy.WithOrigins(builder.Configuration.GetValue<string>("AllowOrigin"));
                }));

            var app = builder.Build();
            // Configure the HTTP request pipeline.
            app.UseMiddleware<ErrorHandlingMiddleware>();
            app.UseHttpsRedirection();
            app.UseCors("allowOrigins");
            app.UseAuthorization();
            app.MapControllers();
            app.Run();
        }
    }
}