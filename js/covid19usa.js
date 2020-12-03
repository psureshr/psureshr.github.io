(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [
		{
            id: "date",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "states",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "positive",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "negative",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "pending",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "hospitalizedCurrently",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "hospitalizedCumulative",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "inIcuCurrently",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "inIcuCumulative",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "onVentilatorCurrently",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "onVentilatorCumulative",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "recovered",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "dateChecked",
            dataType: tableau.dataTypeEnum.datetime
        },{
            id: "death",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "hospitalized",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "totalTestResults",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "lastModified",
            dataType: tableau.dataTypeEnum.datetime
        },{
            id: "total",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "posNeg",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "deathIncrease",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "hospitalizedIncrease",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "negativeIncrease",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "positiveIncrease",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "totalTestResultsIncrease",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "hash",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "covid19usa",
            alias: "Covid 19 USA data",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://api.covidtracking.com/v1/us/daily.json", function(resp) {
            var feat = resp,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "date":feat[i].date,
                    "states":feat[i].states, 
                    "positive":feat[i].positive,
                    "negative":feat[i].negative,
                    "pending":feat[i].pending,
                    "hospitalizedCurrently":feat[i].hospitalizedCurrently,
                    "hospitalizedCumulative":feat[i].hospitalizedCumulative,
                    "inIcuCurrently":feat[i].inIcuCurrently,
                    "inIcuCumulative":feat[i].inIcuCumulative,
                    "onVentilatorCurrently":feat[i].onVentilatorCurrently,
                    "onVentilatorCumulative":feat[i].onVentilatorCumulative,
                    "recovered":feat[i].recovered,
                    "dateChecked":feat[i].dateChecked,
                    "death":feat[i].death,
                    "hospitalized":feat[i].hospitalized,
                    "totalTestResults":feat[i].totalTestResults,
                    "lastModified":feat[i].lastModified,
                    "total":feat[i].total,
                    "posNeg":feat[i].posNeg,
                    "deathIncrease":feat[i].deathIncrease,
                    "hospitalizedIncrease":feat[i].hospitalizedIncrease,
                    "negativeIncrease":feat[i].negativeIncrease,
                    "positiveIncrease":feat[i].positiveIncrease,
                    "totalTestResultsIncrease":feat[i].totalTestResultsIncrease,
                    "hash":feat[i].hash
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Covid 19 USA"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
