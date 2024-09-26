
//const exampleTimes = ["none", "none", "none", "none", "none", "none", "none", "none", "go", "none", "none", "none", "none", "none", "none", "none", "none", "come"];
let exampleTimes = new Map();
//exampleTimes.set("8", "go");
//exampleTimes.set("17", "come");
exampleTimes = generateRandomTimes()
const outputElement = document.getElementById("output");

function startOutput(){
    let ourAC = new AC(100, 20);
    var i = 1;                  //  set your counter to 1

    function timeLoop() {         //  create a loop function
      setTimeout(function() {   //  call a 3s setTimeout when the loop is called
            ourAC.calculateAC(i)
            printOutput(ourAC, i);   //  your code here
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

}

function printOutput(ourAC, time){
    const outputTime = document.createTextNode("Current time: " + time);
    const outputAC = document.createTextNode(" - AC is currently at " + ourAC.getPower() + "\n");

    outputElement.appendChild(outputTime);
    outputElement.appendChild(outputAC);
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