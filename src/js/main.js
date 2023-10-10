const chartBars = document.querySelectorAll(".chart__chartbar");
const chartBox = document.querySelector(".chart__box");

const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
const currentDay = (new Date).getDay()

const createChartItemContent = (data, maxAmount) => {
    const chartItem = document.createElement("div");
    chartItem.classList.add("chart__item");
	const chartBar = document.createElement("div");
	chartBar.classList.add("chart__chartbar");
    chartBar.style.height = data.amount / maxAmount * 130 + 'px';

    const chartAmount = document.createElement('p');
    chartAmount.classList.add('chart__amount');
    chartAmount.textContent = '$' + data.amount
    chartBar.appendChild(chartAmount)

	const chartDayOfTheWeek = document.createElement("p");
	chartDayOfTheWeek.classList.add("chart__dayoftheweek");
	chartDayOfTheWeek.textContent = data.day;
    chartItem.appendChild(chartBar);
    chartItem.appendChild(chartDayOfTheWeek);
    chartBox.appendChild(chartItem);

    if (dayNames[currentDay] === data.day) {
        chartBar.classList.add('chart__chartbar--current')
    }

    chartBar.addEventListener('mouseenter', () => chartAmount.classList.add('chart__amount--hover'));
    chartBar.addEventListener('mouseout', () => chartAmount.classList.remove('chart__amount--hover'))
};

fetch("../data.json")
	.then((response) => {
		return response.json();
	})
	.then((data) => {
        const maxAmount = Math.max(...data.map(item => item.amount));
		data.map((item) => createChartItemContent(item, maxAmount));
	});
