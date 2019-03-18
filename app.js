var ajax = new XMLHttpRequest();
ajax.onreadystatechange = function(){
    if(this.readyState === 4){
        if(this.status === 200){
            var response = JSON.parse(this.response);
            
            var weatherData = [];
            
            for(var i=0; i<5; i++){
                var data = response.list[i];

                var date = new Date(data.dt_txt);
                var hour = date.getHours() + ".00";

                var weather = data.weather[0].description;

                var temperature = Math.round(data.main.temp - 273.15).toFixed(0) + "°C";

                var windSpeed = data.wind.speed.toFixed(1);

                var row = [hour, weather, temperature, windSpeed];

                weatherData.push(row);
            }
            
            var table = document.getElementById("weather-table");
    
    var tableBody = document.createElement("tbody");
    
    for(var i=0; i<5; i++){
        var row = document.createElement("tr");
        
        for(var j=0; j<4; j++){
            var cell = document.createElement("td");
            
            var cellText = document.createTextNode(weatherData[i][j]);
            
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        
        tableBody.appendChild(row);
    }
    
            table.appendChild(tableBody);
            
        }
    }
}



var city = 'nynashamn';

var apikey = "3188498cea0e7379063bd166021128ac";

ajax.open('GET', 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&APPID=' + apikey, true);

ajax.send();

var cityInput = document.getElementById("cityInput");

function generateTimeTable(){
    
    var existingTable = document.getElementsByClassName("time-table")[0];
    var parent = existingTable.parentNode;
    parent.removeChild(existingTable);
    
    var tableDiv = document.getElementById("table-div");
    
    
    var table = document.createElement("table");
    table.className = "table table-striped time-table";
    
    var tableHead = document.createElement("thead");
    tableHead.className = "thead-dark";
    
    var row = document.createElement("tr");
    
    var th1 = document.createElement("th");
    var th1Text = document.createTextNode("Nr");
    th1.appendChild(th1Text);
    row.appendChild(th1);
    
    var th2 = document.createElement("th");
    var th2Text = document.createTextNode("Avgår");
    th2.appendChild(th2Text);
    row.appendChild(th2);
    
    var th3 = document.createElement("th");
    var th3Text = document.createTextNode("Ankommer");
    th3.appendChild(th3Text);
    row.appendChild(th3);
    
    tableHead.appendChild(row);
    table.appendChild(tableHead);
    
    var tableBody = document.createElement("tbody");
    
    for(var i=0; i<3; i++){
        var row = document.createElement("tr");
        
        for(var j=0; j<3; j++){
            var cell = document.createElement("td");
            var cellText = document.createTextNode(i*4+j+1);
            
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        
        tableBody.appendChild(row);
    }
    
    var caption = document.createElement("p");
    var text = document.createTextNode("Inga problem i trafiken");
    
    caption.appendChild(text);
    tableBody.appendChild(caption);
    
    var city = cityInput.value;
    var info = document.createElement("p");
    info.className = "text-muted";
    const text2 = document.createTextNode("Åker från: " + city);
    
    info.appendChild(text2);
    tableBody.appendChild(info);
    
    table.appendChild(tableBody);
    
    tableDiv.appendChild(table);
    }

var button = document.getElementById("button");



button.addEventListener('click', (event) => {
                       
    generateTimeTable();
    event.preventDefault();

});

cityInput.addEventListener('submit', (event) => {
                       
    generateTimeTable();
    event.preventDefault();

});  