$(document).ready(function() {

    var initCurrency = $("#select_currency_1").val();
    var fromDate = $("#fromDate").val();
    var toDate = $("#toDate").val();

    var historicalValues = "https://freecurrencyapi.net/api/v2/historical?apikey=019e7eb0-7935-11ec-a3c5-bb07a300b220&base_currency=USD&date_from=2020-10-01&date_to=2022-01-24";
    //var historicalValues = "https://freecurrencyapi.net/api/v2/historical?apikey=019e7eb0-7935-11ec-a3c5-bb07a300b220";
    //historicalValues = historicalValues + "&base_currency=" + initCurrency + "&date_from=" + fromDate + "&date_to=" + toDate;
    $.ajax({
        contentType: "application/json",
        type: "GET",
        url: historicalValues,
        crossdomain: true,
        data: "",
        dataType: "json",
        success: function(asynCallResult) {
            dati = asynCallResult.data;
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
            lineSeries.setData([
              { time: '2019-04-11', value: 80.01 },
              { time: '2019-04-12', value: 96.63 },
              { time: '2019-04-13', value: 76.64 },
              { time: '2019-04-14', value: 81.89 },
              { time: '2019-04-15', value: 74.43 },
              { time: '2019-04-16', value: 80.01 },
              { time: '2019-04-17', value: 96.63 },
              { time: '2019-04-18', value: 76.64 },
              { time: '2019-04-19', value: 81.89 },
              { time: '2019-04-20', value: 74.43 },
          ]);

            // Make Chart Responsive with screen resize
            new ResizeObserver(entries => {
            if (entries.length === 0 || entries[0].target !== document.getElementById('diagram')) { return; }
            const newRect = entries[0].contentRect;
            chart.applyOptions({ height: newRect.height, width: newRect.width });
            }).observe(document.getElementById("diagram"));
        },
          error: function() {
            console.log("Freecurrency server not reachable");
        }
    });

    $("#val_1").on("input", function() {
        initCurrency = $("#select_currency_1").val();
        var finalCurrency = $("#select_currency_2").val();
        var quantity = $("#val_1").val();

        var endpointapi = "https://freecurrencyapi.net/api/v2/latest?apikey=019e7eb0-7935-11ec-a3c5-bb07a300b220";
        endpointapi = endpointapi + "&base_currency=" + initCurrency;
        if (!(initCurrency == finalCurrency)) {
            var result = "";
            $.ajax({
                contentType: "application/json",
                type: "GET",
                url: endpointapi,
                crossdomain: true,
                data: "",
                dataType: "json",
                success: function(asynCallResult) {
                    result = quantity * asynCallResult.data[finalCurrency];
                    
                    if(result == 0)     //per motivi estetici quando il campo di sopra è vuoto pongo svuoto (e non scrivo 0) in quello di sotto
                      result = null;

                    $("#val_2").val(result);
                },
                error: function() {
                    $("#val_2").val("");
                }
            });
        } else result = quantity;
    });
});