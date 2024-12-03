import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import idGenerator from '../utils/idGenerator.js'
import PDFDocument from 'pdfkit'
import axios from 'axios'
import urls from '../utils/urls.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, '..', 'db', 'printers.json')

let printers = []
const printersData = fs.readFileSync(dbPath, 'utf-8')
printers = printersData ? JSON.parse(printersData) : []

function checkReqId(printerId) {

  if (printerId === undefined) {
    return idGenerator.generateExtenseId(printers)
  }

  return printerId
}

async function addPrinter(req, res) {
  try {

    const { id, model, ipAddress, fusorStatus, level, observation } = req.body

    const printerData = {
      id: checkReqId(id),
      model: model,
      ipAddress: ipAddress,
      fusorStatus: fusorStatus,
      level: level,
      observation: observation
    }

    const printerExist = printers.some((printer) => printer.id == printerData.id)

    if (printerExist) {

      const existentPrinter = printers.find((printer) => printer.id == printerData.id)

      existentPrinter.model = printerData.model
      existentPrinter.ipAddress = printerData.ipAddress
      existentPrinter.fusorStatus = printerData.fusorStatus
      existentPrinter.level = printerData.level
      existentPrinter.observation = printerData.observation

    } else {
      printers.push(printerData)
    } 

    //send to google Sheets
    const sheetsResponse = await axios.post(`${urls.googleSheetsUrlPrinters}`, printerData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    res.status(200).json({
      message: 'Impressora cadastrada com sucesso!',
      data: {
        localDB: printerData,
        sheetsDB: sheetsResponse.data
      }
    })

    fs.writeFileSync(dbPath, JSON.stringify(printers, null, 2))

  } catch (error) {

    res.status(500).json({
      message: 'Erro ao cadastrar impressora'
    })

    console.error(error)
  }
}

function getPrinters(req, res) {
  try {

    res.status(200).json({
      message: 'success',
      data: printers
    })

  } catch (error) {
    res.status(500).json({
      message: 'erro ao listar impressoras'
    })

    console.error(error)
  }
}

function getPdfReport(req, res) {
  try {
    const doc = new PDFDocument({ margin: 30 })
    const filename = 'report.pdf'

    // Configura os cabeçalhos para download
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment filename=${filename}`)

    doc.pipe(res)

    // Título do relatório
    doc.fontSize(16).font('Helvetica-Bold').text('Relatório de Impressoras', { align: 'center' })
    doc.moveDown(1)

    // Definindo dimensões e margens da tabela
    const tableTop = 100 // Posição inicial da tabela
    const columnWidths = [60, 100, 80, 150, 150] // Largura de cada coluna
    const rowHeight = 20 // Altura das linhas
    let y = tableTop

    // Cabeçalhos da tabela
    const headers = ['Modelo', 'Endereço IP', 'Estado', 'Andar', 'Observação']

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
    printers.forEach((printer) => {
      const row = [
        printer.model,
        printer.ipAddress,
        printer.fusorStatus,
        printer.level,
        printer.observation,
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
  addPrinter,
  getPrinters,
  getPdfReport
}