/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import fetch from 'node-fetch'
import iconv from 'iconv-lite'
import cheerio from 'cheerio'

async function main() {
  try {
    const url =
      'https://schema.mau.se/setup/jsp/Schema.jsp?startDatum=today&slutDatum=2024-02-31&sprak=EN&sokMedAND=true&forklaringar=true&resurser=p.TGIAA22h'
    const response = await fetch(url)
    const body = await response.text()

    const $ = cheerio.load(body)
    const rawData = []

    $('td.commonCell').each((index, element) => {
      const cellText = $(element).text().trim()
      // Add the text of each cell to the tableData array
      rawData.push(cellText)
    })

    //console.log(rawData)
    const validDays = ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön']
    const dateRegex = /^\d{1,2}\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)$/
    const timeRegex = /^\d{1,2}:\d{2}-\d{1,2}:\d{2}$/
    const roomRegex = /^[A-Z]{2}:[A-Z0-9]+$/

    const scheduleEntries = []
    let currentEntry = { day: '', date: '', time: '', courseTitle: '', room: '' }
    let lastDay = ''
    let lastDate = ''
    let lastProcessedType = ''

    rawData.forEach((item) => {
      const trimmedItem = item.trim()

      // Process day
      if (validDays.includes(trimmedItem)) {
        if (currentEntry.day) {
          scheduleEntries.push(currentEntry)
        }
        lastDay = trimmedItem
        lastDate = ''
        currentEntry = { day: trimmedItem, date: '', time: '', courseTitle: '', room: '' }
        lastProcessedType = 'day'
      }
      // Process date
      else if (dateRegex.test(trimmedItem)) {
        lastDate = trimmedItem
        currentEntry.date = trimmedItem
        lastProcessedType = 'date'
      }
      // Process time
      else if (timeRegex.test(trimmedItem)) {
        if (currentEntry.time) {
          // If there's already a time for the current entry, push it and start a new entry
          scheduleEntries.push(currentEntry)
          currentEntry = {
            day: lastDay,
            date: lastDate,
            time: trimmedItem,
            courseTitle: '',
            room: ''
          }
        } else {
          currentEntry.time = trimmedItem
        }
        lastProcessedType = 'time'
      }
      // Process course title
      else if (lastProcessedType === 'time') {
        currentEntry.courseTitle = trimmedItem.split(',')[0].trim()
        lastProcessedType = 'courseTitle'
      }
      // Process room
      else if (lastProcessedType === 'courseTitle' && roomRegex.test(trimmedItem)) {
        currentEntry.room = trimmedItem
        lastProcessedType = 'room'
      }
    })

    // Check if there's an unprocessed entry after the loop
    if (currentEntry.day && (currentEntry.date || currentEntry.time || currentEntry.courseTitle)) {
      scheduleEntries.push(currentEntry)
    }

    console.log(scheduleEntries)

  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

main()
