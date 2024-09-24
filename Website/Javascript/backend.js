
const exampleTimes = ["none", "none", "none", "none", "none", "none", "none", "none", "go", "none", "none", "none", "none", "none", "none", "none", "none", "come"];
//const exampleTimes = [[8, "go"], [17, "come"]];
const outputElement = document.getElementById("output");

function startOutput(){
    ourAC = new AC(100, 20);
    var i = 1;                  //  set your counter to 1

    function timeLoop() {         //  create a loop function
      setTimeout(function() {   //  call a 3s setTimeout when the loop is called
            ourAC.calculateAC(i)   //  your code here
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
        printOutput(time);
    }

}

class Room{
    constructor(_temperature){
        this.temperature = _temperature;
    }

    getTemperature() {
        return temperature;
    }

    lowerTemperature(temperatureAmount){
        this.temperature -= temperatureAmount
    }

}

function printOutput(time){
    const outputTime = document.createTextNode("Current time: " + time.toString());
    let outputAC = document.createTextNode(" \n");
    if(exampleTimes[time] == "go"){
        outputAC = document.createTextNode(" - User left, turning AC off" + " \n");
    } else if(exampleTimes[time] == "come"){
        outputAC = document.createTextNode(" - User entered, turning AC on" + " \n");
    } else{
        outputAC = document.createTextNode(" - Nothing happend \n");
    }

    console.log(exampleTimes[time]);
    outputElement.appendChild(outputTime);
    outputElement.appendChild(outputAC);
}