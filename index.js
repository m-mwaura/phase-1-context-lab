// Create a single employee record
let createEmployeeRecord = function ([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
};

// Create multiple employee records
let createEmployeeRecords = function (records) {
    return records.map(createEmployeeRecord);
};

// Add a "TimeIn" event to an employee record
let createTimeInEvent = function (dateStamp) {
    let [date, hour] = dateStamp.split(' ');

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    });

    return this;
};

// Add a "TimeOut" event to an employee record
let createTimeOutEvent = function (dateStamp) {
    let [date, hour] = dateStamp.split(' ');

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    });

    return this;
};

// Calculate hours worked on a specific date
let hoursWorkedOnDate = function (soughtDate) {
    let inEvent = this.timeInEvents.find(e => e.date === soughtDate);
    let outEvent = this.timeOutEvents.find(e => e.date === soughtDate);

    if (!inEvent || !outEvent) {
        throw new Error(`Missing time events for date: ${soughtDate}`);
    }

    return (outEvent.hour - inEvent.hour) / 100;
};

// Calculate wages earned on a specific date
let wagesEarnedOnDate = function (dateSought) {
    let hoursWorked = hoursWorkedOnDate.call(this, dateSought);
    return parseFloat((hoursWorked * this.payPerHour).toFixed(2));
};

// Calculate total wages for all eligible dates
let allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(e => e.date);

    const totalWages = eligibleDates.reduce((total, date) => {
        return total + wagesEarnedOnDate.call(this, date);
    }, 0);

    return totalWages;
};

// Find an employee by first name
let findEmployeeByFirstName = function (srcArray, firstName) {
    return srcArray.find(rec => rec.firstName === firstName);
};

// Calculate the total payroll for all employees
let calculatePayroll = function (arrayOfEmployeeRecords) {
    return arrayOfEmployeeRecords.reduce((totalPayroll, employee) => {
        return totalPayroll + allWagesFor.call(employee);
    }, 0);
};
