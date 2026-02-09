# Paystack Setup Instructions

## How to Configure Your Paystack Public Key

1. **Get your Paystack Public Key:**
   - Go to [Paystack Dashboard](https://dashboard.paystack.com/#/settings/developer)
   - Navigate to Settings → API Keys & Webhooks
   - Copy your **Public Key** (starts with `pk_`)

2. **Add your Public Key to the Checkout Page:**
   - Open `app/checkout/page.tsx`
   - Find the line that says:
     ```typescript
     const PAYSTACK_PUBLIC_KEY = 'YOUR_PAYSTACK_PUBLIC_KEY'
     ```
   - Replace `YOUR_PAYSTACK_PUBLIC_KEY` with your actual public key

3. **Example:**
   ```typescript
   const PAYSTACK_PUBLIC_KEY = 'pk_test_xxxxxxxxxxxxxxxxxxxxx'
   ```

## Testing

- Use test keys for development (starts with `pk_test_`)
- Use live keys for production (starts with `pk_live_`)
- Test cards are available in your Paystack dashboard

## Important Notes

- Never commit your secret keys to version control
- The public key is safe to use in client-side code
- For production, consider using environment variables

