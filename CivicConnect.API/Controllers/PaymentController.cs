using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;

namespace CivicConnect.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public PaymentController(IConfiguration configuration)
        {
            _configuration = configuration;
            StripeConfiguration.ApiKey = _configuration["Stripe:SecretKey"];
        }

        [HttpPost("create-checkout-session")]
        public ActionResult CreateCheckoutSession([FromBody] PaymentRequest request)
        {
            var options = new SessionCreateOptions
            {
                PaymentMethodTypes = new List<string> { "card" },
                LineItems = new List<SessionLineItemOptions>
                {
                    new SessionLineItemOptions
                    {
                        PriceData = new SessionLineItemPriceDataOptions
                        {
                            UnitAmount = (long)(request.Amount * 100),
                            Currency = "inr",
                            ProductData = new SessionLineItemPriceDataProductDataOptions
                            {
                                Name = "Donation",
                            },
                        },
                        Quantity = 1,
                    },
                },
                Mode = "payment",
                // Redirect user here after payment
                SuccessUrl = $"http://localhost:5173/payment-success?amount={request.Amount}&purpose={Uri.EscapeDataString(request.Purpose)}&session_id={{CHECKOUT_SESSION_ID}}",
                CancelUrl = "http://localhost:5173/donate",
            };

            var service = new SessionService();
            Session session = service.Create(options);

            return Ok(new { url = session.Url });
        }
    }

    public class PaymentRequest
    {
        public decimal Amount { get; set; }
        public string Purpose { get; set; }
    }
}