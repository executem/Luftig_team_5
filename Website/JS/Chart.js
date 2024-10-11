
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const day = date.getDate();
const hour = date.getHours();
const minute = date.getMinutes();
var today = date.toISOString().split('T')[0];





const energyYearData = {
    labels: [],
    datasets: [{
        label: "Energy usage ("+ year +")",
        data: [],
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1
    }]
};

const tempYearData = {
    labels: [],
    datasets: [{
        label: "Temperature ("+ year +")",
        data: [],
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1
    }]
};

const energyDayData = {
    labels: [],
    datasets: [{
        label: "Energy usage ("+ today +")",
        data: [],
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1
    }]
};

const tempDayData = {
    labels: [],
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
const ENERGYYEARCHART = document.getElementById("energyYearChart");
const TEMPYEARCHART = document.getElementById("tempYearChart");

console.log(ENERGYDAYCHART);
console.log(ENERGYYEARCHART);


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
let energyYearChart = new Chart(ENERGYYEARCHART, {
    type: "line",
    data: energyYearData,
    options: {
        legend: {
            onClick: null
        }
    }
});
let tempYearChart = new Chart(TEMPYEARCHART, {
    type: "line",
    data: tempYearData,
    options: {
        legend: {
            onClick: null
        }
    }
});

function updateEnergyDayChart(){
    energyDayChart.data.labels = window.sharedData.time;
    energyDayChart.data.datasets[0].data = window.sharedData.acPower;
    energyDayChart.update();
}

function updateTempDayChart(){
    tempDayChart.data.labels = window.sharedData.time;
    tempDayChart.data.datasets[0].data = window.sharedData.roomTemperature;
    tempDayChart.update();
}

function updateEnergyYearChart(){
    energyYearChart.data.labels = window.sharedData.time;
    energyYearChart.data.datasets[0].data = window.sharedData.acPower;
    energyYearChart.update();
}

function updateTempYearChart(){
    tempYearChart.data.labels = window.sharedData.time;
    tempYearChart.data.datasets[0].data = window.sharedData.roomTemperature;
    tempYearChart.update();
}

function updateCharts(){
    setInterval(updateEnergyDayChart, 1000);
    setInterval(updateEnergyYearChart, 1000);
    setInterval(updateTempDayChart, 1000);
    setInterval(updateTempYearChart, 1000);
}

updateCharts();

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

/*function openChart(evt, chartType) {
    var i, dataChart, dataSwitchButton;

    dataChart = document.getElementsByClassName("dataChart");
    for (i = 0; i < dataChart.length; i++) {
        dataChart[i].style.display = "none";
    }

    dataSwitchButton = document.getElementsByClassName("dataSwitchButton");
    for (i = 0; i < dataSwitchButton.length; i++) {
        dataSwitchButton[i].className = dataSwitchButton[i].className.replace(" active", "");
    }

    document.getElementById(chartType).style.display = "block";
    evt.currentTarget.className += " active";
}*/

