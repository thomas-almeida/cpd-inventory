
import urls from "../utils/urls.js"
import axios from 'axios'

async function sendForm(req, res) {
  try {
    const response = await axios.post(`${urls.googleSheetsUrl}`, req.body, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // Retorna a resposta do Google Apps Script para o frontend
    res.status(200)(response.data)
  } catch (error) {
    console.error('Erro ao enviar para o Google Apps Script:', error);
    res.status(500).json({ status: 'error', message: 'Erro ao enviar o formulário.' });
  }
}

export default {
  sendForm
}