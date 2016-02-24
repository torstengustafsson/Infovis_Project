
//Load data
function loadData(value) {

    dataset = "Data/Swedish_Election_" + value + ".csv";
    d3.csv(dataset, function(data) {
        createMajorityList(data);
        dataset = data;
    });
    

    //Load the topojson data with "svenska kommuner"
    d3.json("data/swe_mun.topojson", function(error, sweden) {
        var mun = topojson.feature(sweden, sweden.objects.swe_mun).features;
        //console.log(mun);
        draw(mun);
    });
}

//stores region and it's majority party
var majParty = [];

//Build a list  with the region name, and which party has majority there, plus the percentage
function createMajorityList(data) {
	
    majParty = [];
	var k = 0;
	var listIndex = 0;
	
	while (k < data.length) {
	
		var majority = data[k].parti;
		var votePerc = parseFloat(data[k].procent);
		var region = formatString(data[k].region);
	
		for (var i = k; i < k+11; i++) {
			
			if(parseFloat(data[i].procent) > votePerc) {	
				majority = data[i].parti;
				votePerc = data[i].procent;
			}
		}
		
		majParty[listIndex] = {region, majority, votePerc};
		
		k += 11;
		listIndex++;
	}
}