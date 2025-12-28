namespace CivicConnect.API.Services
{
    public class PaymentService
    {
        // This mimics the 'createOrder' method from your reference file
        public string CreateMockOrder(decimal amount)
        {
            // Instead of calling Razorpay, we generate a professional-looking ID
            // Format: "txn_" + timestamp + random string
            string txnId = "txn_" + DateTimeOffset.Now.ToUnixTimeSeconds() + "_" + Guid.NewGuid().ToString().Substring(0, 4);
            return txnId;
        }
    }
}