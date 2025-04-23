/*import { MercadoPagoConfig, Payment, Preference } from 'mercadopago'
import { v4 as uuidv4 } from 'uuid'
import env from '../../Configs/envConfig.js'

// Configurar Mercado Pago con tu `accessToken`
const idempotKey = uuidv4()
const client = new MercadoPagoConfig({
  accessToken: env.MpAccesToken,
  options: {
    timeout: 5000,
    idempotencyKey:idempotKey 
  }
})
const requestOptions = {
  idempotencyKey: idempotKey 
}
// Crear una instancia de `Payment`
const payment = new Payment(client)

export const createOrder = async (req, res) => {
  try {
    // Construcción del body
    const body = {
      transaction_amount: 1240.34, // Monto de la transacción
      description: 'visa',
      payment_method_id: 'visa', // Método de pago
      payer: {
        email: 'antoniorodrigueztkd@gmail.com' // Email de prueba
      }
    }

    // Realizar la solicitud de pago con el idempotencyKey
    const response = await payment.create({
      body, requestOptions
    })

    console.log('Pago exitoso: ', response)
    res.status(200).json(response)
  } catch (error) {
    console.error('Error en la request: ', error)
    res.status(error.status || 500).json({ error: error.message })
  }
}*/

import { MercadoPagoConfig, Preference } from 'mercadopago'
import env from '../../Configs/envConfig.js'

const client = new MercadoPagoConfig({ accessToken: env.MpAccesToken })
const preference = new Preference(client)

export const createOrder = async (req, res) => {
  try {
    const body = {
      items: [
        {
          title: 'Producto de prueba',
          quantity: 1,
          unit_price: 1240.34,
          currency_id: 'ARS'
        }
      ],
      payer: {
        email: 'test_user_1719653549@testuser.com' // Email de test
      },
      back_urls: {
        success: 'http://localhost:4000/payment/success',
        failure: 'http://localhost:4000/payment/failure',
        pending: 'http://localhost:4000/payment/pending'
      },
      auto_return: 'approved'
    }

    const response = await preference.create({ body })
    console.log('Preference creada:', response)

    res.status(200).json({ init_point: response.init_point }) // URL para redirigir al usuario
  } catch (error) {
    console.error('Error creando preference:', error)
    res.status(error.status || 500).json({ error: error.message })
  }
}
