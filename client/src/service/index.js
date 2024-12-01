import axios from 'axios'
import baseUrl from '../utils/baseUrl.js'

const addPrinter = async (payload) => {
  const response = await axios.post(`${baseUrl.localhostUrl}/add-printer`, payload)
  return response.data
}

const getPrinters = async () => {
  const response = await axios.get(`${baseUrl.localhostUrl}/get-printers`)
  return response.data
}

const getPdfReport = async () => {

  const response = await axios.get(`${baseUrl.localhostUrl}/get-pdf-report`, {
    responseType: 'blob',
  })

  const url = window.URL.createObjectURL(new Blob([response.data]))

  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'relatório_impressoras_staclara.pdf')
  document.body.appendChild(link)
  link.click()
  link.parentNode.removeChild(link)

}

export default {
  addPrinter,
  getPrinters,
  getPdfReport
}