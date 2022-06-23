// Your code here

function createEmployeeRecord(array) {
    return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
    }
}
//originally assigned the object to a variable but it was unnecessary. Object can just flow into next function.

function createEmployeeRecords(array) {
    return array.map(record => createEmployeeRecord(record))
}

const createTimeInEvent = function (record, dateStamp) {
    //can use destructuring const[date, hour] = timeIn.split(" ")
    const newRecord = Object.assign({}, record)
    const date = dateStamp.split(" ")[0]
    const hour = dateStamp.split(" ")[1]


    const timeInLog = {
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    }
    
    newRecord.timeInEvents.push(timeInLog) //brings external context in

    return newRecord
}

function createTimeOutEvent(record, dateStamp) {
    const newRecord = Object.assign({}, record)
    const date = dateStamp.split(" ")[0]
    const hour = dateStamp.split(" ")[1]


    const timeOutLog = {
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    }
    
    newRecord.timeOutEvents.push(timeOutLog) //brings external context in

    return newRecord
}

function hoursWorkedOnDate (record, date) { //need reference the date of the record and pull hours
    const inPunches = record.timeInEvents.find(inPunch => inPunch.date === date)
    const outPunches = record.timeOutEvents.find(outPunch => outPunch.date === date)

    return(outPunches.hour - inPunches.hour) / 100
}

function wagesEarnedOnDate (record, date) { //need to reference the date of the record and pull hours and wage and multiply
    return hoursWorkedOnDate(record, date) * record.payPerHour
}

function allWagesFor(record) { //need to reference all of the dates and all of the hours of the those dates, sum them and multiple by wage
    const availableDates = record.timeInEvents.map(function(inEvents) {
        return inEvents.date
    })
    const payOwed = availableDates.reduce(function(preDate, currentDate) {
        return wagesEarnedOnDate(record, preDate) + wagesEarnedOnDate(record, currentDate)
    })
    return payOwed
}

function calculatePayroll (recordsArr) { //reference all values of all dates worked by each employee, put in array, and sum the total wages
    return recordsArr.reduce((total, record) => {
        return total + allWagesFor(record)
    }, 0)
}