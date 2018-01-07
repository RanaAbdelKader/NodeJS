const http = require('http')
const fs = require('fs')
const path = require('path')
const csv = require('csvtojson')

const csvFileName = path.join(__dirname, 'customer-data.csv')
const jsonFileName = path.join(__dirname, 'converted.json')

const fromCsvToJson = (csvFile, jsonFile) => {
  console.log('converting file ' + csvFile + ' to ' + jsonFile);
  let jsonData = []
  csv()
    .fromFile(csvFile)
    .on('json', (jsonObj) => {
      jsonData.push(jsonObj)
    })
    .on('done', (error) => {
      if(error)
        return console.error('Error '+error.message)
      // write to File
      fs.writeFileSync(jsonFile, JSON.stringify(jsonData))
      console.log('Done converting to file ' + jsonFile);
    })
}


fromCsvToJson(csvFileName, jsonFileName)
