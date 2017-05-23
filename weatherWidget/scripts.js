$(document).ready(function(){
const weatherAPI = "http://api.openweathermap.org/data/2.5/weather";


	$('#weather-form').submit(function(event){
		event.preventDefault();
		var zipcCode = $('#zip-code').val();
		var weatherData = weatherAPI + '?zip=' + zipcCode + ',us&units=imperial&appid=' + apiKey;
		$.getJSON(weatherData, (weatherData)=> {
			var currentTemp = weatherData.main.temp;
			var temps = {
				curr: weatherData.main.temp,
				max: weatherData.main.temp_max,
				min: weatherData.main.temp_min,
			}
			var name = weatherData.name;
			var icon = weatherData.weather[0].icon + '.png';
			var desc = weatherData.weather[0].description;
			var newHTML = '<img src="http://openweathermap.org/img/w/' + icon +'">';
			newHTML += '<div>The Temp in ' + name + ' is currently '+ currentTemp + '&deg;</div>'
			$('#temp-info').html(newHTML)

		console.log(weatherData);
		})
	})


	var canvas = $('#weather-canvas');
	var context = canvas[0].getContext('2d');

	var assumedTemperature = 65;

	var currentPercent = 0;
	function animateCircle(currentArc){
		//Inner Circle
		context.fillStyle = "#ccc";
		context.beginPath();
		context.arc(155,75,70,Math.PI*0,Math.PI*2);
		context.fill();

		//Outer Line
		context.lineWidth = 5;
		context.strokeColor = '#ffff00'
		context.beginPath();
		context.arc(155,75,75,Math.PI*1.5,(Math.PI* 2 * currentArc) + Math.PI *1.5);
		context.stroke();

		//Update current percentage
		currentPercent++
		if(currentPercent < assumedTemperature) {
			requestAnimationFrame(function(){
				animateCircle(currentPercent/100);
			})

		}

	}

	animateCircle();

});