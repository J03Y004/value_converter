$(document).ready(function() {
    
    //gets current date
    Date.prototype.toDateInputValue = (function() {
        var local = new Date(this);
        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        return local.toJSON().slice(0,10);
    });

    document.getElementById('finalDate').value = "01-01-2017";
    document.getElementById('finalDate').value = new Date().toDateInputValue();     //assigns current date to the final date input area

    //historicalGraph();

    $("#val_1, #select_currency_1, #select_currency_2").on("input", function() {
        let initCurrency = $("#select_currency_1").val();       //gets the input currency actually chosen
        let finalCurrency = $("#select_currency_2").val();      //gets the output currency acctually chosen
        let quantity = $("#val_1").val();                       //gests the quantity of money to convert

        let endpointapi = "https://freecurrencyapi.net/api/v2/latest?apikey=019e7eb0-7935-11ec-a3c5-bb07a300b220";
        endpointapi = endpointapi + "&base_currency=" + initCurrency;
        if (!(initCurrency == finalCurrency)) {
            let result = "";
            $.ajax({        //asynchronous call
                contentType: "application/json",
                type: "GET",
                url: endpointapi,
                crossdomain: true,
                data: "",
                dataType: "json",
                success: function(asynCallResult) {
                    result = quantity * asynCallResult.data[finalCurrency];

                    if (result == 0)        //in order to estethical reasons when the upper input area is void I set to void (instead than 0) the bottom area too
                        result = null;

                    $("#val_2").val(result);
                },
                error: function() {
                    $("#val_2").val("");
                }
            });
        } else result = quantity;
    });

    $("#initDate, #finalDate, #select_currency_1, #select_currency_2").on("input", function() {
        let initDate = $("#initDate").val();
        let finalDate = $("#finalDate").val();
        let initCurrency = $("#select_currency_1").val();
        let finalCurrency = $("#select_currency_2").val();

        let historicalValues = "https://freecurrencyapi.net/api/v2/historical?apikey=019e7eb0-7935-11ec-a3c5-bb07a300b220";
        historicalValues = historicalValues + "&base_currency=" + initCurrency + "&date_from=" + initDate + "&date_to=" + finalDate;

        $.ajax({
          contentType: "application/json",
          type: "GET",
          url: historicalValues,
          crossdomain: true,
          data: "",
          dataType: "json",
          success: function(asynCallResult) {
              let dati = asynCallResult.data;
              let dataGraph = [];
              for (const data in dati) {
                  dataGraph.push({time: data, value: dati[data][finalCurrency]})
              }
              generateGraph(dataGraph);
          },
          error: function() {
              console.log("Freecurrency server not reachable");
          }
      });
  
    });
});

function generateGraph(dataGraph) {
    $("#diagram").empty();
    const chart = LightweightCharts.createChart(document.getElementById('diagram'), {
        width: document.getElementById('diagram').offsetWidth,
        height: document.getElementById('diagram').offsetHeight,
        layout: {
            backgroundColor: 'rgb(17, 17, 39)',
            textColor: 'rgba(255, 255, 255, 0.9)',
        },
        grid: {
            vertLines: {
                color: 'rgb(41, 44, 58)',
            },
            horzLines: {
                color: 'rgb(41, 44, 58)',
            },
        },
        crosshair: {
            mode: LightweightCharts.CrosshairMode.Normal,
        },
        priceScale: {
            borderColor: 'rgba(197, 203, 206, 0.8)',
        },
        timeScale: {
            borderColor: 'rgba(197, 203, 206, 0.8)',
        },
    });
    const lineSeries = chart.addLineSeries();
    lineSeries.setData(dataGraph);

    // Make Chart Responsive with screen resize
    new ResizeObserver(entries => {
        if (entries.length === 0 || entries[0].target !== document.getElementById('diagram')) { return; }
        const newRect = entries[0].contentRect;
        chart.applyOptions({ height: newRect.height, width: newRect.width });
    }).observe(document.getElementById("diagram"));

    function historicalGraph() {
        let initDate = $("#initDate").val();
        let finalDate = $("#finalDate").val();
        let initCurrency = $("#select_currency_1").val();
        let finalCurrency = $("#select_currency_2").val();

        let historicalValues = "https://freecurrencyapi.net/api/v2/historical?apikey=019e7eb0-7935-11ec-a3c5-bb07a300b220";
        historicalValues = historicalValues + "&base_currency=" + initCurrency + "&date_from=" + initDate + "&date_to=" + finalDate;

        $.ajax({
          contentType: "application/json",
          type: "GET",
          url: historicalValues,
          crossdomain: true,
          data: "",
          dataType: "json",
          success: function(asynCallResult) {
              let dati = asynCallResult.data;
              let dataGraph = [];
              for (const data in dati) {
                  dataGraph.push({time: data, value: dati[data][finalCurrency]})
              }
              generateGraph(dataGraph);
          },
          error: function() {
              console.log("Freecurrency server not reachable");
          }
      });
  
    }
}