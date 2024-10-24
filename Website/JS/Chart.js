
var date = new Date("2024-10-21");
var year = date.getFullYear();
var month = date.getMonth();
var day = date.getDate();
var hour = date.getHours();
var minute = date.getMinutes();
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const hours = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11",
            "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
var today = date.toISOString().split('T')[0] + " (" + weekdays[date.getDay()] + ")";
var dateUpdated = false;

const energyDayData = {
    labels: hours,
    datasets: [{
        label: "Energy usage ("+ today +")",
        data: [],
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1
    }]
};

const tempDayData = {
    labels: hours,
    datasets: [{
        label: "Temperature ("+ today +")",
        data: [],
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1
    }]
};

const ENERGYDAYCHART = document.getElementById("energyDayChart");
const TEMPDAYCHART = document.getElementById("tempDayChart");

console.log(ENERGYDAYCHART);


let energyDayChart = new Chart(ENERGYDAYCHART, {
    type: "line",
    data: energyDayData,
    options: {
        legend: {
            onClick: null
        }
    }
});
let tempDayChart = new Chart(TEMPDAYCHART, {
    type: "line",
    data: tempDayData,
    options: {
        legend: {
            onClick: null
        }
    }
});

function updateEnergyDayChart(){
    energyDayChart.data.datasets[0].data = window.sharedData.acPower;
    energyDayChart.update();
}

function updateTempDayChart(){
    tempDayChart.data.datasets[0].data = window.sharedData.roomTemperature;
    tempDayChart.update();
}

function updateCharts(){
    setInterval(() => {
        if(window.sharedData.time.length % 24 == 0 && window.sharedData.time.length != 0 && !dateUpdated){
            dateUpdated = true; 
        }
        if(window.sharedData.time.length % 24 == 1 && dateUpdated) {
            window.sharedData.acPower = [];
            window.sharedData.roomTemperature = [];
            date.setDate(date.getDate() + 1);
            today = date.toISOString().split('T')[0] + " (" + weekdays[date.getDay()] + ")";
            resetCharts();
            dateUpdated = false; 
        }
        updateEnergyDayChart();
        updateTempDayChart();
    }, 100);
}

updateCharts();

function resetCharts(){
    energyDayChart.reset();
    energyDayChart.data.datasets[0].label = "Energy usage ("+ today +")";
    energyDayChart.update(); 

    tempDayChart.reset();
    tempDayChart.data.datasets[0].label = "Temperature ("+ today +")";
    tempDayChart.update(); 
}


function timeSelect(evt, chartType) {
    var i, chartTab, timeTabButton;

    chartTab = document.getElementsByClassName("chartTab");
    for (i = 0; i < chartTab.length; i++) {
        chartTab[i].style.display = "none";
    }

    timeTabButton = document.getElementsByClassName("timeTabButton");
    for (i = 0; i < timeTabButton.length; i++) {
        timeTabButton[i].className = timeTabButton[i].className.replace(" active", "");
    }

    document.getElementById(chartType).style.display = "block";
    evt.currentTarget.className += " active";
}