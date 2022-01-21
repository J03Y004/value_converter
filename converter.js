$(document).ready(function() {

    var initCurrency = $("#select_currency_1").val();

    var historicalValues = "https://freecurrencyapi.net/api/v2/historical?apikey=019e7eb0-7935-11ec-a3c5-bb07a300b220&base_currency=USD&date_from=2020-10-01&date_to=2022-01-21";
    historicalValues = historicalValues + "&base_currency=" + initCurrency;
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
                width: 700,
                height: 400,
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
            lineSeries.setData(asynCallResult.data);
        },
        error: function() {

        }
    });

    $("#val_1").on("input", function() {
        var initCurrency = $("#select_currency_1").val();
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
                    $("#val_2").val(result);
                },
                error: function() {
                    $("#val_2").val("");
                }
            });
        } else result = quantity;
    });
});