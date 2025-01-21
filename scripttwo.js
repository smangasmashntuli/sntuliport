const galleryImages = document.querySelectorAll('.introduction img');
let currentImageIndex = 0;

function showImage(index) {
    galleryImages.forEach((image, i) => {
        image.style.display = i === index ? 'block' : 'none';
    });
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    showImage(currentImageIndex);
}

showImage(currentImageIndex);
setInterval(nextImage, 2000);

// Initialize the chart
function initChart() {
    const chartData = getChartData();
    updateChart(chartData);
}

// Function to submit a vote and update chart data
function submitVote() {
    const name = document.getElementById('textident').value.trim();
    const chartData = getChartData();
    if (name.toLowerCase() !== "") {
        const lowerCaseName = name.toLowerCase();
        if (chartData.xValues.map(x => x.toLowerCase()).includes(lowerCaseName)) {
            const index = chartData.xValues.findIndex(x => x.toLowerCase() === lowerCaseName);
            chartData.yValues[index]++;
            if (chartData.yValues[index] > 20) chartData.yValues[index] = 20; // Limit to 20 on the Y-axis
        } else {
            chartData.xValues.push(name);
            chartData.yValues.push(1);
            chartData.barColors.push(getRandomColor());
        }

        updateChart(chartData);
        alert(`Your vote for: ${name} has been cast.`);
    } else {
        alert("Please enter the name of the car.");
    }
}

// Get chart data from localStorage or initialize if not found
function getChartData() {
    const storedData = localStorage.getItem('chartData');
    if (storedData) {
        return JSON.parse(storedData);
    } else {
        return { xValues: [], yValues: [], barColors: [] };
    }
}

// Update chart in the canvas with new data
function updateChart(chartData) {
    localStorage.setItem('chartData', JSON.stringify(chartData));

    new Chart("myChart", {
        type: "bar",
        data: {
            labels: chartData.xValues,
            datasets: [{
                label: 'Votes',
                backgroundColor: chartData.barColors,
                data: chartData.yValues
            }]
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: "Car Votes"
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: 20, // Set Y-axis maximum to 20
                        stepSize: 1
                    }
                }],
                xAxes: [{
                    ticks: {
                        autoSkip: false
                    }
                }]
            }
        }
    });
}

// Generate a random color for each new bar
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Initialize the chart on page load
initChart();
