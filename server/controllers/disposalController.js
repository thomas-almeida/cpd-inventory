import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import PDFDocument, { file } from 'pdfkit'
import axios from 'axios'
import urls from "../utils/urls.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, '..', 'db', 'disposal.json')

let disposalDevices = []
const disposalDevicesData = fs.readFileSync(dbPath, 'utf-8')
disposalDevices = disposalDevicesData ? JSON.parse(disposalDevicesData) : []

async function sendForm(req, res) {
  try {

    const response = await axios.post(`${urls.googleSheetsUrl}`, req.body, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    disposalDevices.push(req.body)

    res.status(200).json({
      message: 'success',
      data: response.data,
      form: req.body
    })

    fs.writeFileSync(dbPath, JSON.stringify(disposalDevices, null, 2))

  } catch (error) {
    console.error('Erro ao enviar para o Google Apps Script:', error);
    res.status(500).json({ status: 'error', message: 'Erro ao enviar o formulário.' });
    console.log(error)
  }
}

async function getPdfReport(req, res) {
  try {

    const doc = new PDFDocument({ margin: 30 })
    const filename = 'disposal-report.pdf'

    // Configura os cabeçalhos para download
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment filename=${filename}`)

    doc.pipe(res)

    // Título do relatório
    doc.fontSize(16).font('Helvetica-Bold').text('Relatório de Descarte', { align: 'center' })
    doc.moveDown(1)

    // Definindo dimensões e margens da tabela
    const tableTop = 100 // Posição inicial da tabela
    const columnWidths = [60, 100, 80, 150, 150] // Largura de cada coluna
    const rowHeight = 20 // Altura das linhas
    let y = tableTop

    // Cabeçalhos da tabela
    const headers = ['Patrimônio', 'Modelo', 'Motivo', 'Peças', 'Observações', 'Responsável TI', 'Data']

    // Desenhar cabeçalhos
    doc.font('Helvetica-Bold').fontSize(10)
    headers.forEach((header, i) => {
      const x = 50 + columnWidths.slice(0, i).reduce((a, b) => a + b, 0)
      doc.text(header, x, y, { width: columnWidths[i], align: 'left' })
    })


    y += rowHeight // Avançar para a próxima linha

    // Linha divisória abaixo dos cabeçalhos
    //doc.moveTo(50, y - 5).lineTo(50 + columnWidths.reduce((a, b) => a + b, 0), y - 5).stroke()

    // Dados da tabela
    doc.font('Helvetica').fontSize(10)
    disposalDevices.forEach((printer) => {
      const row = [
        disposalDevices.patrimonio,
        disposalDevices.modelo,
        disposalDevices.motivo,
        disposalDevices.observacoes,
        disposalDevices.responsavelTI,
        disposalDevices.data,
      ]

      row.forEach((cell, i) => {
        const x = 50 + columnWidths.slice(0, i).reduce((a, b) => a + b, 0)
        doc.text(cell, x, y, { width: columnWidths[i], align: 'left' })
      })

      y += rowHeight

      // Verifica se é necessário quebrar a página
      if (y > doc.page.height - 50) {
        doc.addPage()
        y = tableTop // Reinicia a posição Y
      }
    })

    // Finalizar o documento PDF
    doc.end()

  } catch (error) {
    res.status(500).json({ message: 'Erro ao gerar o relatório PDF' })
    console.error(error)
  }
}

export default {
  sendForm,
  getPdfReport
}