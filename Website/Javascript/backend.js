
//const exampleTimes = ["none", "none", "none", "none", "none", "none", "none", "none", "go", "none", "none", "none", "none", "none", "none", "none", "none", "come"];
let exampleTimes = new Map();
//exampleTimes.set("8", "go");
//exampleTimes.set("17", "come");
exampleTimes = generateRandomTimes()
const outputElement = document.getElementById("output");


//create abject reachable from chart.js
window.sharedData = {
    acPower: [],
    roomTemperature: [],
    time: [],
    text: []
    
}; 
var promptUpdateFunction = null;
function initPromptBox(promptFunc){
promptUpdateFunction = promptFunc; 
}
function updatePromptBox(text){
promptUpdateFunction(text);
}


function startOutput(){
    let ourRoom = new Room(28);
    var i = 1;                 

    function timeLoop() {     
      setTimeout(function() { 
            outputElement.appendChild(document.createTextNode("Current temp: " + ourRoom.getTemperature() + " - "));
            ourRoom.updateAC(i)
            ourRoom.updateTemp();
            printOutput(ourRoom.getAC(), i); 
        i++;                    
        if (i < 24) {           
          timeLoop();   
                 
        }                       
      }, 1000)
    }
    
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

    updateTemp(){
        let desiredTemp = this.roomAC.getTemp();
        if(this.temperature - desiredTemp > 0 && this.roomAC.getPower() != 0){
            this.temperature = Math.floor((this.temperature - (this.roomAC.getPower()/100)*(this.temperature - 18)*0.5)*10)/10;
            if(this.temperature < desiredTemp){
                this.temperature = desiredTemp;
            }
        }
        else{
            this.temperature = Math.floor((this.temperature + (30 - this.temperature)*0.25) * 10)/10;
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


function printOutput(ourAC, time){
    const outputTime = document.createTextNode("Current time: " + time);
    const outputAC = document.createTextNode(" - AC is currently at " + ourAC.getPower() + "\n");

    outputElement.appendChild(outputTime);
    outputElement.appendChild(outputAC);
}
var acceptFunction = doNothing;
var declineFunction = doNothing;
function doNothing(){};
function promptCallback(bool){
    if(bool){
        outputElement.appendChild(document.createTextNode("Changes accepted!"));
        acceptFunction();
    } else{
        outputElement.appendChild(document.createTextNode("Changes declined!"));
        declineFunction();
    }

    
}
function generateRandomTimes(){
    let exampleDay = new Map();
    let goTime = Math.floor(Math.random() * 22);
    exampleDay.set(goTime, "go");
    let comeTime = Math.floor(Math.random() * (24 - goTime - 1) + goTime + 1);
    exampleDay.set(comeTime, "come");
    return exampleDay;
}

function generateRandomDays(){
    let exampleDays = new Map();
    for(let day = 1; day <= 10; day++) {
        exampleDays.set(day, generateRandomTimes);
    }
    return exampleDays;
}
