
//const exampleTimes = ["none", "none", "none", "none", "none", "none", "none", "none", "go", "none", "none", "none", "none", "none", "none", "none", "none", "come"];
const exampleTimes = [[8, "go"], [17, "come"]];
const outputElement = document.getElementById("output");

function startOutput(){
    ourAC = new AC(100, 20);
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
        let i = 0;
        while(i < exampleTimes.length) {
            if(exampleTimes[i][0] == time){
                if(exampleTimes[i][1] == "come"){
                    this.power = 100;
                } else if(exampleTimes[i][1] == "go"){
                    this.power = 0;
                }
            }

            i++;
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
        return temperature;
    }

    lowerTemperature(temperatureAmount){
        this.temperature -= temperatureAmount
    }

}

function printOutput(ourAC, time){
    const outputTime = document.createTextNode("Current time: " + time.toString());
    const outputAC = document.createTextNode(" - AC is currently at " + ourAC.getPower() + "\n");

    outputElement.appendChild(outputTime);
    outputElement.appendChild(outputAC);
}