async function chartData(str) {
  raceOfFugitives = [];
  numberOfFugitives = [];
  await fetch("https://api.fbi.gov/wanted/v1/list")
    .then((response) => response.json())
    .then((data) => {
      items = data.items;
      race_index = {};
      for (i = 0; i < items.length; i++) {
        if (items[i].race == null) {
          continue;
        }
        items[i].race =
          items[i].race.charAt(0).toUpperCase() + items[i].race.slice(1);
        if (race_index[items[i].race] === undefined) {
          race_index[items[i].race] = raceOfFugitives.length;
          raceOfFugitives.push(items[i].race);
          numberOfFugitives.push(0);
        }
        numberOfFugitives[race_index[items[i].race]] += 1;
      }
    });
  chartDemographics(raceOfFugitives, numberOfFugitives);
}
function chartDemographics(raceOfFugitives, numberOfFugitives) {
  const ctx = document.getElementById("myChart");
  var chart = Chart.getChart("myChart");

  if (chart != undefined) {
    chart.destroy();
  }
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: raceOfFugitives,
      datasets: [
        {
          label: "Race of Suspects",
          data: numberOfFugitives,
        },
      ],
    },
  });
}
window.onload = function () {
  chartData();
  chartDemographics();
};
