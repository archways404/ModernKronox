import ICAL from 'node-ical' // Import the node-ical library

// Your iCalendar data as a string
const icalData = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//KronoX gruppen//KronoX 5.4.0.build-8407//EN
METHOD:PUBLISH
X-WR-CALNAME:KRONOX
BEGIN:VEVENT
DTSTART:20240126T091500Z
DTEND:20240126T110000Z
DTSTAMP:20240126T015243Z
UID:BokningsId_20231122_000000485
CREATED:20231122T092807Z
LAST-MODIFIED:20231122T092807Z
LOCATION:NI:A0411
SEQUENCE:1
STATUS:CONFIRMED
SUMMARY:Programme: TGIAA22h Coursegrp: Evaluation Methods for User Experience, 7.5 credits Course as part of programme,  50% day-time Sign: AG0834 Description: Optional: Introduction to Excel Activity type: Okänd
TRANSP:OPAQUE
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
END:VEVENT
BEGIN:VEVENT
DTSTART:20240129T141500Z
DTEND:20240129T160000Z
DTSTAMP:20240126T015243Z
UID:BokningsId_20231109_000002487
CREATED:20231109T135338Z
LAST-MODIFIED:20240112T111939Z
LOCATION:OR:D131
SEQUENCE:4
STATUS:CONFIRMED
SUMMARY:Programme: TGIAA22h TGSYA22h Coursegrp: Information Security, 7.5 credits Course as part of programme,  50% day-time Information Security, 7.5 credits Subject course,  50% day-time Sign: AO4800 Description: Lecture 3: Threat modeling and analysis Activity type: Okänd
TRANSP:OPAQUE
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
END:VEVENT
BEGIN:VEVENT
DTSTART:20240130T091500Z
DTEND:20240130T110000Z
DTSTAMP:20240126T015243Z
UID:BokningsId_20231122_000000487
CREATED:20231122T092832Z
LAST-MODIFIED:20231122T092832Z
LOCATION:NI:A0411
SEQUENCE:1
STATUS:CONFIRMED
SUMMARY:Programme: TGIAA22h Coursegrp: Evaluation Methods for User Experience, 7.5 credits Course as part of programme,  50% day-time Sign: AG0834 Description: Designing Experiments and Validity Activity type: Okänd
TRANSP:OPAQUE
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
END:VEVENT
BEGIN:VEVENT
DTSTART:20240131T121500Z
DTEND:20240131T140000Z
DTSTAMP:20240126T015243Z
UID:BokningsId_20231109_000002489
CREATED:20231109T135341Z
LAST-MODIFIED:20240112T111939Z
LOCATION:OR:D131
SEQUENCE:4
STATUS:CONFIRMED
SUMMARY:Programme: TGIAA22h TGSYA22h Coursegrp: Information Security, 7.5 credits Course as part of programme,  50% day-time Information Security, 7.5 credits Subject course,  50% day-time Sign: CTANJA Description: Lecture 4: Malicious software and application attacks Activity type: Okänd
TRANSP:OPAQUE
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
END:VEVENT
BEGIN:VEVENT
DTSTART:20240131T141500Z
DTEND:20240131T160000Z
DTSTAMP:20240126T015243Z
UID:BokningsId_20231122_000000489
CREATED:20231122T092857Z
LAST-MODIFIED:20231122T092857Z
LOCATION:NI:A0411
SEQUENCE:1
STATUS:CONFIRMED
SUMMARY:Programme: TGIAA22h Coursegrp: Evaluation Methods for User Experience, 7.5 credits Course as part of programme,  50% day-time Sign: AG0834 Description: Lecture: Performance &amp; issue based metrics Activity type: Okänd
TRANSP:OPAQUE
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
END:VEVENT
END:VCALENDAR
`

// Parse the iCalendar data
const jcalData = ICAL.parseICS(icalData)

// Extract and format event information
const formattedEvents = Object.values(jcalData)
  .filter((component) => component.type === 'VEVENT')
  .map((event) => {
    const startDate = new Date(event.start)
    const endDate = new Date(event.end)
    const location = event.location
    const summary = event.summary.replace('Programme: TGIAA22h Coursegrp: ', '') // Remove the unwanted part
    const description = summary.split('Description: ')[1] // Extract description from summary

    // Format the date and time in 24-hour format
    const startTime = startDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
    const endTime = endDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
    const time = `${startTime}-${endTime}`

    // Shorten the summary to text until the first ","
    const summaryParts = summary.split(',')
    const shortSummary = summaryParts[0].trim()

    // Remove the activity type from the description
    const shortDescription = description ? description.split('Activity type:')[0].trim() : ''

    return {
      day: startDate.toLocaleDateString('en-US', { weekday: 'short' }),
      date: startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      time,
      location,
      summary: shortSummary,
      description: shortDescription
    }
  })

console.log(formattedEvents)
