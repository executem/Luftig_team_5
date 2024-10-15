
//const exampleTimes = ["none", "none", "none", "none", "none", "none", "none", "none", "go", "none", "none", "none", "none", "none", "none", "none", "none", "come"];
let exampleTimes = new Map();
//exampleTimes.set("8", "go");
//exampleTimes.set("17", "come");
exampleTimes = generateTypicalTimes()
//let exampleTemperature = new Map();
let exampleTemperature = [20, 19, 20, 22, 23, 25, 25, 27, 28, 29, 30, 31, 32, 34, 36, 35, 35, 34, 34, 32, 31, 29, 27, 25]

const outputElement = document.getElementById("output");


//create abject reachable from chart.js
window.sharedData = {
    acPower: [],
    roomTemperature: [],
    time: []
}; 

function startOutput(){
    ourRoom = new Room(20);
    var i = 0;                 

    function timeLoop() { 
        exampleTimes = generateTypicalTimes()
    
        let tempPower = 100;
        setTimeout(function() { 
            tempPower = ourRoom.roomAC.getPower();
            ourRoom.updateAC(i)
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
    printOutput(ourRoom.getAC(), i, ourRoom.getTemperature()); 
    timeLoop();                  
}

class AC{
    constructor(_power, _temperature){
        this.power = _power;
        this.temperature = _temperature;
    }

    calculateAC(time) {
        if(exampleTimes.get(time) == "come"){
            this.power = 100;                } 
        else if(exampleTimes.get(time) == "go"){
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

    updateAC(time){
        this.roomAC.calculateAC(time);
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
    let goTimes = [];
    let comeTimes = [];

    for (let i = 0; i < 3; i++) {
        let goTime = Math.floor(Math.random() * 22);
        let comeTime = Math.floor(Math.random() * (24 - goTime - 1) + goTime + 1);
        goTimes.push(goTime);
        comeTimes.push(comeTime);
    }

    comeTimes.push(23);
    goTimes.push(7); 

    goTimes.sort((a, b) => a - b);
    comeTimes.sort((a, b) => a - b);

    goTimes.forEach(time => exampleDay.set(time, "go"));
    comeTimes.forEach(time => exampleDay.set(time, "come"));

    return exampleDay;
}

function generateTypicalTimes(){
    let exampleDay = new Map();
    let goTimes = [8]; 
    let comeTimes = [17]; 

    for (let i = 0; i < 2; i++) {
        let goTime = 8 + Math.floor(Math.random() * 3) - 1; 
        let comeTime = 17 + Math.floor(Math.random() * 4) - 1; 
        goTimes.push(goTime);
        comeTimes.push(comeTime);
    }

    comeTimes.push(23); 
    goTimes.push(7); 

    goTimes.sort((a, b) => a - b);
    comeTimes.sort((a, b) => a - b);

    goTimes.forEach(time => exampleDay.set(time, "go"));
    comeTimes.forEach(time => exampleDay.set(time, "come"));

    return exampleDay;
}

function generateTypicalDays(){
    let exampleDays = new Map();
    for (let day = 1; day <= 10; day++) {
        if (day % 7 === 6 || day % 7 === 0) { //kolla om de e helg
            exampleDays.set(day, generateRandomTimes());
        } else {
            exampleDays.set(day, generateTypicalTimes());
        }
    }
    return exampleDays;
}
