async function chartData() {
  raceOfFugitives = [];
  numberOfFugitives = [];
  await fetch("https://api.fbi.gov/wanted/v1/list")
    .then((response) => response.json())
    .then((data) => {
      // get top 10?
      // const race = data.items.race_raw;
      items = data.items;
      race_index = {};
      for (i = 0; i < items.length; i++) {
        if (items[i].race == null) {
          continue;
        }
        if (!race_index[items[i].race]) {
          console.log(!race_index[items[i].race]);
          console.log(items[i].race);
          race_index[items[i].race] = raceOfFugitives.length;
          raceOfFugitives.push(items[i].race);
          numberOfFugitives.push(0);
        }
        numberOfFugitives[race_index[items[i].race]] += 1;
        console.log(numberOfFugitives[race_index[items[i].race]]);
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
  console.log(raceOfFugitives);
  console.log(numberOfFugitives);
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
