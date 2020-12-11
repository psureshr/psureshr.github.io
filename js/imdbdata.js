(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [
		{
            id: "download",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "image",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "imdbid",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "largeimage",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "netflixid",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "rating",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "released",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "runtime",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "synopsis",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "title",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "type",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "unogsdate",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "imdbdata",
            alias: "IMDB data",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };


const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=%7Bquery%7D-!%7Bsyear%7D%2C%7Beyear%7D-!%7Bsnfrate%7D%2C%7Benfrate%7D-!%7Bsimdbrate%7D%2C%7Beimdbrate%7D-!%7Bgenreid%7D-!%7Bvtype%7D-!%7Baudio%7D-!%7Bsubtitle%7D-!%7Bimdbvotes%7D-!%7Bdownloadable%7D&t=ns&cl=%7Bclist%7D&st=adv&ob=%7Bsortby%7D&p=%7Bpage%7D&sa=%7Bandor%7D",
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "fcc5812ed3mshc168e211f982164p1cfc6cjsneed00bf357a1",
		"x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com"
	}
};


    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.ajax(settings).done(function (resp) {
            var feat = resp.ITEMS,
                tableData = [];
				
            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
					"download":feat[i].download,
					"image":feat[i].image,
					"imdbid":feat[i].imdbid,
					"largeimage":feat[i].largeimage,
					"netflixid":feat[i].netflixid,
					"rating":feat[i].rating,
					"released":feat[i].released,
					"runtime":feat[i].runtime
					"synopsis":feat[i].synopsis,
					"title":feat[i].title,
					"type":feat[i].type,
					"unogsdate":feat[i].unogsdate
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
            tableau.connectionName = "IMDB Data"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
