/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import fetch from 'node-fetch'
import iconv from 'iconv-lite'
import cheerio from 'cheerio'

async function main() {
  try {
    const url =
      'https://schema.mau.se/setup/jsp/Schema.jsp?startDatum=today&slutDatum=2024-01-31&sprak=EN&sokMedAND=true&forklaringar=true&resurser=p.TGIAA22h'
    const response = await fetch(url)
    const body = await response.text()

    const $ = cheerio.load(body)
    const tableData = []

    $('td.commonCell').each((index, element) => {
      const cellText = $(element).text().trim()
      // Add the text of each cell to the tableData array
      tableData.push(cellText)
    })

    console.log(tableData)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

main()
