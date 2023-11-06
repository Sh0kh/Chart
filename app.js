
const ctx = document.getElementById('Chart');

new Chart(ctx, {
  type: 'line',
  data: { datasets: [{
    type: 'line',
    label: 'Bar Dataset',
    data: [7, 12, 30, 18,25,13],
    tension: 0.5,
    borderColor: 'yellow',
    backgroundColor: 'red',
}, {
    type: 'line',
    label: 'Line Dataset',
    data: [5, 15, 14, 36,32,32],
    tension: 0.5,
    borderColor: 'rgb(75, 192, 192)',
    backgroundColor: 'blue',
}],
labels: ['Jan', 'Feb', 'Mar', 'Apr','May','Jun'],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});





const ctx2 = document.getElementById('myChart');
new Chart(ctx2, {
  type: 'line',
  data: {
    labels: ['1', '2', '3', '4', '5', '6','7','8','9',],
    datasets: [{
      label: '# of Votes',
      data: [0, 3, 1, 5, 0.5, 2.5,0,4.5,],
      borderWidth: 1,
      backgroundColor:'orange',
      borderColor:'white'
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

am5.ready(function() {


  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  var root = am5.Root.new("chartdiv");
  
  
  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  root.setThemes([
    am5themes_Animated.new(root)
  ]);
  
  
  // Create chart
  // https://www.amcharts.com/docs/v5/charts/xy-chart/
  var chart = root.container.children.push(am5xy.XYChart.new(root, {
    panX: false,
    panY: false,
    wheelX: "panX",
    wheelY: "zoomX"
  }));
  
  
  // Add cursor
  // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
  var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
    behavior: "zoomX"
  }));
  cursor.lineY.set("visible", false);
  
  var date = new Date();
  date.setHours(0, 0, 0, 0);
  var value = 100;
  
  function generateData() {
    value = Math.round((Math.random() * 10 - 5) + value);
    am5.time.add(date, "day", 1);
    return {
      date: date.getTime(),
      value: value
    };
  }
  
  function generateDatas(count) {
    var data = [];
    for (var i = 0; i < count; ++i) {
      data.push(generateData());
    }
    return data;
  }
  
  
  // Create axes
  // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
  var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
    maxDeviation: 0,
    baseInterval: {
      timeUnit: "day",
      count: 1
    },
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 60
    }),
    tooltip: am5.Tooltip.new(root, {})
  }));
  
  var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  }));
  
  
  // Add series
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
  var series = chart.series.push(am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    tooltip: am5.Tooltip.new(root, {
      labelText: "{valueY}"
    })
  }));
  
  // series.columns.template.setAll({ strokeOpacity: 0 })
  
  
  // // Add scrollbar
  // // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
  // chart.set("scrollbarX", am5.Scrollbar.new(root, {
  //   orientation: "horizontal"
  // }));
  
  var data = generateDatas(50);
  series.data.setAll(data);
  
  
  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  series.appear(1000);
  chart.appear(1000, 100);
  
  }); // end am5.ready()