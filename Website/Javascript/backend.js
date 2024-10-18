
let exampleTemperature = [20, 19, 20, 22, 23, 25, 25, 27, 28, 29, 30, 31, 32, 34, 36, 35, 35, 34, 34, 32, 31, 29, 27, 25]

const outputElement = document.getElementById("output");


//create abject reachable from chart.js
window.sharedData = {
    acPower: [],
    roomTemperature: [],
    time: []
}; 

var weekQueue = [];
var exampleWeek = generateTypicalWeek();


function startOutput(){
    var dayIndex;
    ourRoom = new Room(20); 
    printOutput(ourRoom.getAC(), 0, ourRoom.getTemperature()); 
    function timeLoop(dayIndex) { 
        let tempPower = 100;
        setTimeout(function() { 
            tempPower = ourRoom.roomAC.getPower();
            ourRoom.updateAC(i, exampleWeek.get(dayIndex));
            ourRoom.updateTemp(i);
            if(tempPower != ourRoom.roomAC.getPower()) {
                printOutput(ourRoom.getAC(), i, ourRoom.getTemperature()); 
            }

            i++;                    
            if (i < 24) {           
                timeLoop();           
            }                 
        }, 1000)
    }
    
    //printOutput(ourRoom.getAC(), day, ourRoom.getTemperature()); 
    for (let dayIndex = 1; dayIndex <= 7; dayIndex++) {
        var i = 0;
        timeLoop(dayIndex);
    }
}

class AC{
    constructor(_power, _temperature){
        this.power = _power;
        this.temperature = _temperature;
    }

    calculateAC(time, dayData) {
        if(dayData.get(time) == "come"){
            this.power = 100;                } 
        else if(dayData.get(time) == "go"){
            this.power = 0;
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

    updateAC(time, dayData){
        this.roomAC.calculateAC(time, dayData);
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

function generateRandomTimes() {
    let exampleDay = new Map();
    let goTime = Math.floor(Math.random() * 22);
    exampleDay.set(goTime, "go");
    let comeTime = Math.floor(Math.random() * (24 - goTime - 1) + goTime + 1);
    exampleDay.set(comeTime, "come");
    return exampleDay;
}

function generateTypicalTimes(){
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
            exampleWeek.set(dayIndex, generateRandomTimes());
        } else {
            exampleWeek.set(dayIndex, generateTypicalTimes());
        }
    }
    return exampleWeek;
}
