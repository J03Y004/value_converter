$(document).ready(function() {
    $("#val_1").on("input", function() {
        let initCurrency = $("#select_currency_1").val();
        let finalCurrency = $("#select_currency_2").val();
        let quantity = $("#val_1").val();

        let endpointapi = "https://freecurrencyapi.net/api/v2/latest?apikey=019e7eb0-7935-11ec-a3c5-bb07a300b220";
        endpointapi = endpointapi + "&base_currency=" + initCurrency;
        if (!(initCurrency == finalCurrency)) {
            let result = "";
            $.ajax({
                contentType: "application/json",
                type: "GET",
                url: endpointapi,
                crossdomain: true,
                data: "",
                dataType: "json",
                success: function(asynCallResult) {
                    result = quantity * asynCallResult.data[finalCurrency];

                    if (result == 0) //per motivi estetici quando il campo di sopra è vuoto pongo svuoto (e non scrivo 0) in quello di sotto
                        result = null;

                    $("#val_2").val(result);
                },
                error: function() {
                    $("#val_2").val("");
                }
            });
        } else result = quantity;
    });

    $("#initDate, #finalDate").on("input", function() {
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
              graph(dataGraph);
          },
          error: function() {
              console.log("Freecurrency server not reachable");
          }
      });
  
    });
});

function graph(dataGraph) {
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
}