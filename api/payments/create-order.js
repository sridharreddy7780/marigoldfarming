import { buildOrder, errorResponse, getRazorpay, insertOrder, requireMethod, sendJson, updateOrder } from '../_lib/orders.js'

export default async function handler(request, response) {
  try {
    requireMethod(request, 'POST')
    const order = buildOrder(request.body, 'razorpay')
    const { client, keyId } = getRazorpay()
    let saved = await insertOrder(order)
    let gatewayOrder
    try {
      gatewayOrder = await client.orders.create({
        amount: order.total * 100,
        currency: 'INR',
        receipt: order.orderId,
        notes: { order_id: order.orderId },
      })
      saved = await updateOrder(order.orderId, { gateway_order_id: gatewayOrder.id })
      if (!saved) throw new Error('Could not attach payment order to saved order.')
    } catch (error) {
      await updateOrder(order.orderId, {
        payment_status: 'failed',
        order_status: 'cancelled',
      }, '&payment_status=eq.pending').catch(() => {})
      throw error
    }
    sendJson(response, 201, {
      keyId,
      order: {
        orderId: saved.orderId,
        gatewayOrderId: gatewayOrder.id,
        amount: gatewayOrder.amount,
        currency: gatewayOrder.currency,
      },
    })
  } catch (error) {
    errorResponse(response, error)
  }
}