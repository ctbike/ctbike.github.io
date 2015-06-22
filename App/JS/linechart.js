	var schaden = [];
	var sattel = [];
	var licht = [];
	var lenker = [];
	var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	
	
	function getDamage()
{
	//TODO: Performance, load JSON only one time!
	$.ajax({
    dataType: "json",
    url: "Data/Chart/DamageReports.JSON",
    mimeType: "application/json",
    async:false,
    success: function(data){
			$.each(data, function(key, val) {
				for(var i = 0; i < val.typ.length; i++){
					if(val.typ[i]["typ"]=="Terminal Service"){
						schaden.push(val.typ[i]["count"]);
					}
					if(val.typ[i]["typ"]=="Sattel"){
						sattel.push(val.typ[i]["count"]);
					}
					if(val.typ[i]["typ"]=="Lichtkabel"){
						licht.push(val.typ[i]["count"]);
					}
					if(val.typ[i]["typ"]=="Lenker"){
						lenker.push(val.typ[i]["count"]);
					}
				}
			
			});
		}
	});
}

	
	
	
    google.setOnLoadCallback(drawChart);

    function drawChart() {
		
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Months');
      data.addColumn('number', 'Lichtkabel');
      data.addColumn('number', 'Sattel');
      data.addColumn('number', 'Terminal Services');
	  data.addColumn('number', 'Lenker');
	  
	  for(var i = 0; i < 12; i++){
		  data.addRow([months[i], licht[i], sattel[i], schaden[i], lenker[i]])
	  }

      var options = {
        chart: {
          title: 'Damage report of the whole year',
          subtitle: 'Ct-Bike Service'
        },
        width: 900,
        height: 500
      };

      var chart = new google.charts.Line(document.getElementById('linechart_material'));

      chart.draw(data, options);
    }
	
	function linechart(){
	getDamage();
	drawChart();

}