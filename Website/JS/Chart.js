
const data2 = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [{
        label: "Energy usage (current year)",
        data: [0, 10, 5, 2, 20, 30, 45],
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1
    }]
};

const data = {
    labels: ["00", "02", "04", "06", "08", "10", "12", "14", "16", "18", "20", "22"],
    datasets: [{
        label: "Energy usage (today)",
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
});
let lineChart2 = new Chart(CHART2, {
    type: "line",
    data: data2,
});


