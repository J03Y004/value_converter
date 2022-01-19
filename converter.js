$(document).ready(function() {

    $("#convert").click(function() {
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
                    $("val_2").html(result);
                },
                error: function() {
                    $("val_2").html("Server not reachable");
                }
            });
        } else result = quantity;
    }); //END VISUALIZZAUTENTI  
});