using Microsoft.AspNetCore.Mvc;
using CivicConnect.API.Services;

namespace CivicConnect.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly PaymentService _paymentService;

        public PaymentController(PaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        // POST: api/Payment/create-order
        [HttpPost("create-order")]
        public IActionResult CreateOrder([FromBody] PaymentRequest request)
        {
            if (request.Amount <= 0)
                return BadRequest("Amount must be greater than 0");

            // Use the service to generate the ID (Just like your example!)
            string orderId = _paymentService.CreateMockOrder(request.Amount);

            return Ok(new { orderId = orderId });
        }
    }

    // DTO class for the request body
    public class PaymentRequest
    {
        public decimal Amount { get; set; }
    }
}