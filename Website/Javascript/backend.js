
let exampleTemperature = [20, 19, 20, 22, 23, 25, 25, 27, 28, 29, 30, 31, 32, 34, 36, 35, 35, 34, 34, 32, 31, 29, 27, 25]

const outputElement = document.getElementById("output");


//create abject reachable from chart.js
window.sharedData = {
    acPower: [],
    roomTemperature: [],
    time: []
}; 

var dayIndex = 1;
var weekQueue = generateWeekList(4);
var ACStartingTimeMap = new Map();
for (let dayIndex = 1; dayIndex <= 7; dayIndex++) {
    ACStartingTime = Math.floor(algorithm(weekQueue, dayIndex));
    //console.log(ACStartingTime);
    ACStartingTimeMap.set(dayIndex, ACStartingTime);
}
var exampleWeek = generateTypicalWeek();
//var tempRoom = new Room(20);

function startOutput(){
    var i = 0;
    ourRoom = new Room(20); 
    printOutput(ourRoom.getAC(), 0, ourRoom.getTemperature()); 
    function timeLoop(dayIndex) { 
        let tempPower = 100;
        let tempIsHome = true;
        setTimeout(function() { 
            tempPower = ourRoom.getAC().getPower(); // change to getters on rows
            tempIsHome = ourRoom.getAC().getIsHome();
            //console.log(ACStartingTimeMap.get(dayIndex));
            ourRoom.updateAC(i, exampleWeek.get(dayIndex), ACStartingTimeMap.get(dayIndex));
            ourRoom.updateTemp(i);
            if(tempPower != ourRoom.getAC().getPower()) {
                printOutput(ourRoom.getAC(), i, ourRoom.getTemperature()); 
            }
            //outputElement.appendChild(document.createTextNode(ourRoom.getAC().getIsHome()))
            if(tempIsHome != ourRoom.getAC().getIsHome()) {
                printOutput(ourRoom.getAC(), i, ourRoom.getTemperature());
            }

            i++;                    
            if (i < 24) {           
                timeLoop(dayIndex);           
            }                 
        }, 1000)
    }
    
    //printOutput(ourRoom.getAC(), day, ourRoom.getTemperature()); 
    /*for (let dayIndex = 1; dayIndex <= 7; dayIndex++) {
        var i = 0;
        timeLoop(dayIndex);
    }*/
    timeLoop(dayIndex);

    dayIndex %= 7;
    dayIndex += 1;
    if (dayIndex = 1){
        weekQueue.push(exampleWeek);
        weekQueue.shift();
        exampleWeek = generateTypicalWeek();
    }
}

class AC{
    constructor(_power, _temperature){
        this.power = _power;
        this.temperature = _temperature;
        this.isHome = true;
    }

    getIsHome() {
        return this.isHome;
    }

    setIsHome(isHome) {
        this.isHome = isHome;
    }

    calculateAC(time, dayData, ACStartingTime) {
        if(dayData.get(time) == "come"){
            this.power = 100;    
            this.isHome = true;  
            //outputElement.appendChild("average:" + document.createTextNode(ACStartingTime-1))         
        }
        else if(dayData.get(time) == "go"){
            this.power = 0;
            this.isHome = false;
        }
        else if (time == ACStartingTime - 1){
            this.power = 100;    
            //outputElement.appendChild(document.createTextNode("yo"))
        }
        
    }

    getPower(){
        return this.power;
    }

    getTemp(){
        return this.temperature
    }

}

class Room{
    constructor(_temperature){
        this.temperature = _temperature;
        this.roomAC = new AC(100,20);
    }

    getTemperature() {
        return this.temperature;
    }

    lowerTemperature(temperatureAmount){
        this.temperature -= temperatureAmount
    }

    updateTemp(time){
        let desiredTemp = this.roomAC.getTemp();
        if(this.temperature - desiredTemp > 0 && this.roomAC.getPower() != 0){
            this.temperature = Math.floor((this.temperature - (this.roomAC.getPower()/100)*(this.temperature - 18)*0.5)*10)/10;
            if(this.temperature < desiredTemp){
                this.temperature = desiredTemp;
            }
        }
        else{
            this.temperature = Math.floor((this.temperature + (exampleTemperature[time] - this.temperature)*0.25) * 10)/10;
            if(this.temperature > this.roomAC.getTemp() && this.roomAC.getPower() == 100){
                this.temperature = this.roomAC.getTemp();
            }
        }
    }

    updateAC(time, dayData, ACStartingTime){
        this.roomAC.calculateAC(time, dayData, ACStartingTime);
        window.sharedData.acPower.push(this.roomAC.getPower());
        window.sharedData.roomTemperature.push(this.getTemperature());
        window.sharedData.time.push(time);
    }

    getAC(){
        return this.roomAC;
    }

}


function printOutput(ourAC, time, temperature){
    outputElement.appendChild(document.createTextNode("Current time: " + time + ":00 - "));
    const outputTime = document.createTextNode("Current temp: " + temperature + " - ");
    const outputAC = document.createTextNode("AC is currently at " + ourAC.getPower() + "\n");

    outputElement.appendChild(outputTime);
    outputElement.appendChild(outputAC);
}

function GenerateRandomDay() {
    let exampleDay = new Map();
    let goTime = Math.floor(Math.random() * 22);
    exampleDay.set(goTime, "go");
    let comeTime = Math.floor(Math.random() * (24 - goTime - 1) + goTime + 1);
    exampleDay.set(comeTime, "come");
    return exampleDay;
}

function generateTypicalDay(){
    let exampleDay = new Map();
    let goTime = 8 + Math.floor(Math.random() * 3) - 1; 
    exampleDay.set(goTime, "go");
    let comeTime = 17 + Math.floor(Math.random() * 4) - 1; 
    exampleDay.set(comeTime, "come");
    return exampleDay;
}

function generateTypicalWeek(){
    let exampleWeek = new Map();
    for (let dayIndex = 1; dayIndex <= 7; dayIndex++) {
        if (dayIndex % 7 === 6 || dayIndex % 7 === 0) { //kolla om de e helg
            exampleWeek.set(dayIndex, GenerateRandomDay());
        } else {
            exampleWeek.set(dayIndex, generateTypicalDay());
        }
    }
    return exampleWeek;
}

function generateWeekList(weekAmount){
    let weekList = [];
    for (let monthIndex = 1; monthIndex <= weekAmount; monthIndex++) {
        weekList.push(generateTypicalWeek());
    }
    return weekList;
}

function algorithm(listOfWeeks, dayIndex){
    var sumOfComeTimes = 0;
    for(let i = 0; i < listOfWeeks.length; i++) {
        dayData = listOfWeeks[i].get(dayIndex)
        for(let time = 0; time < 24; time++){
            if(dayData.get(time) == "come"){
                sumOfComeTimes += time;
            }
        }
    }
    averageComeTime = sumOfComeTimes / listOfWeeks.length;
    //console.log(averageComeTime);
    return averageComeTime;
}