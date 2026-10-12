import { errorResponse, requireMethod, sendJson } from '../_lib/orders.js'

export default function handler(request, response) {
  try {
    requireMethod(request, 'GET')
    const mode = process.env.PAYMENT_MODE || 'test'
    const keyId = process.env.RAZORPAY_KEY_ID || ''
    const keySecret = process.env.RAZORPAY_KEY_SECRET || ''
    const storageReady = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
    const webhookReady = Boolean(process.env.RAZORPAY_WEBHOOK_SECRET)
    const keyMatchesMode = mode === 'test'
      ? keyId.startsWith('rzp_test_')
      : mode === 'live' && process.env.VERCEL_ENV === 'production' && keyId.startsWith('rzp_live_')
    const missing = []
    if (!keyId || !keySecret || !keyMatchesMode) missing.push('Razorpay test credentials')
    if (!storageReady) missing.push('Supabase order storage')
    if (!webhookReady) missing.push('Razorpay webhook signing secret')

    sendJson(response, 200, {
      available: missing.length === 0,
      mode: mode === 'live' && keyMatchesMode ? 'live' : 'test',
      missing,
    })
  } catch (error) {
    errorResponse(response, error)
  }
}