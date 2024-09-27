
//const exampleTimes = ["none", "none", "none", "none", "none", "none", "none", "none", "go", "none", "none", "none", "none", "none", "none", "none", "none", "come"];
let exampleTimes = new Map();
//exampleTimes.set("8", "go");
//exampleTimes.set("17", "come");
exampleTimes = generateRandomTimes()
const outputElement = document.getElementById("output");

function startOutput(){
    ourRoom = new Room(28);
    var i = 1;                  //  set your counter to 1

    function timeLoop() {         //  create a loop function
      setTimeout(function() { 
            outputElement.appendChild(document.createTextNode("Current temp: " + ourRoom.getTemperature() + " - "));
            ourRoom.updateAC(i.toString())
            ourRoom.updateTemp();
            printOutput(ourRoom.getAC(), i);   //  your code here
        i++;                    //  increment the counter
        if (i < 24) {           //  if the counter < 10, call the loop function
          timeLoop();             //  ..  again which will trigger another 
        }                       //  ..  setTimeout()
      }, 1000)
    }
    
    timeLoop();                   //  start the loop
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

}

function printOutput(ourAC, time){
    const outputTime = document.createTextNode("Current time: " + time);
    const outputAC = document.createTextNode(" - AC is currently at " + ourAC.getPower() + "\n");

    outputElement.appendChild(outputTime);
    outputElement.appendChild(outputAC);
}

function generateRandomTimes(){
    exampleDay = new Map();
    goTime = Math.floor(Math.random() * 22);
    exampleDay.set(goTime, "go");
    comeTime = Math.floor(Math.random() * (24 - goTime - 1) + goTime + 1);
    exampleDay.set(comeTime, "come");
    return exampleDay;
}

function generateRandomDays(){
    exampleDays = new Map();
    for(let day = 1; day <= 10; day++) {
        exampleDays.set(day, generateRandomTimes);
    }
    return exampleDays;
}
