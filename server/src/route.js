import { Router } from "express"
import printerController from "../controllers/printerController.js"
import disposalController from "../controllers/disposalController.js"

const api = Router()

// Endpoints
api.post('/add-printer', printerController.addPrinter)
api.get('/get-printers', printerController.getPrinters)
api.get('/get-pdf-report', printerController.getPdfReport)
api.post('/send-disposal-form', disposalController.sendForm)

export default api