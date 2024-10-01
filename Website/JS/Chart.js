
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const day = date.getDate();
const hour = date.getHours();
const minute = date.getMinutes();
var today = date.toISOString().split('T')[0];





const data2 = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    datasets: [{
        label: "Energy usage ("+ year +")",
        data: [0, 10, 5, 2, 20, 30, 45, 50, 60, 50, 55, 55],
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1
    }]
};

const data = {
    labels: ["00", "02", "04", "06", "08", "10", "12", "14", "16", "18", "20", "22"],
    datasets: [{
        label: "Energy usage ("+ today +")",
        data: [1, 2, 4, 3, 1, 3, 5, 3, 1, 3, 5, 3],
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1
    }]
};

const CHART = document.getElementById("lineChart");
const CHART2 = document.getElementById("lineChart2");

console.log(CHART);


let lineChart = new Chart(CHART, {
    type: "line",
    data: data,
    options: {
        legend: {
            onClick: null
        }
    }
});
let lineChart2 = new Chart(CHART2, {
    type: "line",
    data: data2,
    options: {
        legend: {
            onClick: null
        }
    }
});

function openChart(evt, chartType) {
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


