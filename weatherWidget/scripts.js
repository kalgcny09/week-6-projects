$(document).ready(function(){
const weatherAPI = "http://api.openweathermap.org/data/2.5/weather";


	$('#weather-form').submit(function(event){
		event.preventDefault();
		var zipCode = $('#zip-code').val();
		var weatherData = weatherAPI + '?zip=' + zipCode + ',us&units=imperial&appid=' + apiKey;
		$.getJSON(weatherData, (weatherData)=> {
			var currentTemp = weatherData.main.temp;
			var temps = {
				curr: weatherData.main.temp,
				max: weatherData.main.temp_max,
				min: weatherData.main.temp_min,
			}
			var name = weatherData.name;
			var iconName = weatherData.weather[0].icon + '.png';
			var iconPic = '<img src="http://openweathermap.org/img/w/' + iconName +'">';

			var desc = weatherData.weather[0].description;
			var newHTML = '<div>The temperature in ' + name + ' is currently: </div';
			var degrees = '<div>' + currentTemp + '&deg;</div>';
		
			$('#temp-info').html(newHTML);
			$('#location-info').html(degrees);
			$('#weather-image').html(iconPic);
		console.log(weatherData);
		})
	})


	var assumedTemperature = 65;

	var currentPercent = 0;


});