$(document).ready(function(){
	const apiBaseUrl = 'http://api.themoviedb.org/3';
	const imageBaseUrl = 'http://image.tmdb.org/t/p/';
	const nowPlayingUrl = apiBaseUrl + '/movie/now_playing?api_key=' + apiKey;
	$.getJSON(nowPlayingUrl, (nowPlayingData)=>{
	
		var nowPlayingHTML = '';
		for(let i =0; i < nowPlayingData.results.length; i++){
			var posterUrl = imageBaseUrl + 'w300' + nowPlayingData.results[i].poster_path;
			nowPlayingHTML += '<div class="col-sm-4">';
				nowPlayingHTML += `<img src="${posterUrl}">`;
			nowPlayingHTML +=`</div>`;
		}
		$('#movie-grid').html(nowPlayingHTML);
		
	})

	$('#movie-form').submit((event)=>{
		event.preventDefault();
		var userInput = $('#search-input').val();
		$('#search-input').val('');
		var safeUserInput = encodeURI(userInput);
		var searchUrl = apiBaseUrl + '/search/movie?query='+ safeUserInput + '&api_key=' +apiKey;
		$.getJSON(searchUrl, (searchMovieData)=>{
			var searchMovieHTML = getHTML(searchMovieData)
			$('#movie-grid').html(searchMovieHTML);


		})

	})

	function getHTML(data) {
	var newHTML = '';
		for(let i =0; i < data.results.length; i++){
			var posterUrl = imageBaseUrl + 'w300' + data.results[i].poster_path;
			nowPlayingHTML += '<div class="col-sm-4">';
				nowPlayingHTML += `<img src="${posterUrl}">`;
			nowPlayingHTML +=`</div>`;
		}

	return newHTML
	}


})

