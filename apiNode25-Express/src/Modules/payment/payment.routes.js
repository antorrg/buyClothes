import express from 'express'
import * as pay from './paymentController.js'

const paymentRoute = express.Router()

paymentRoute.post('/create-order', pay.createOrder)

paymentRoute.get('/success', (req, res) => res.send('anduve'))

paymentRoute.get('/webhook', (req, res) => res.send('webhook'))

export default paymentRoute
