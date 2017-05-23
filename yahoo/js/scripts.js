$(document).ready(function(){

	$('#arrow1').click(function(){
		$('#page1,#page2').css ({
			'right':'100vh'
		});
	});

	$('#arrow2').click(function(){
		$('#page1', #page2).css({
			'right':'0vw'
		
		});
	})

	var userStockSavedIfAny = localStorage.getItem('lastSymbolSearched');

	if(userStockSavedIfAny) {
		var url =encodeURI(`http://query.yahooapis.com/v1/public/yql?q=env%20%27store://datatables.org/alltableswithkeys%27;select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22${symbol}%22)%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json`);
		
		$.getJSON(url,(thedataJSFound)=>{
			if(thedataJSFound.query.count > 1) {
				var stocksArray = thedataJSFound.query.results.quote;
				var newRow = '';
				for(let i = 0; i<stocksArray.length; i++) {
					newRow += buildStockRow(thedataJSFound[i]);
				}
			}else{
				var newRow = buildStockRow(thedataJSFound.query.results.quote);
			}

			$('#stock-ticker-body').append(newRow);
			$('#stock-table').DataTable();
		});

	}else{

			$('#stock-ticker-body').append(newRow);
	}
	



	$('.yahoo-finance-form').submit((event)=>{
		event.preventDefault();

		var symbol = $('#symbol').val();
		localStorage.setItem("lastSymbolSearched", symbol);

		var url =encodeURI(`http://query.yahooapis.com/v1/public/yql?q=env%20%27store://datatables.org/alltableswithkeys%27;select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22${symbol}%22)%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json`);
	
		$.getJSON(url,(thedataJSFound)=>{
				if(thedataJSFound.query.count > 1){
					var stocksArray = thedataJSFound.query.results.quote;
					var newRow = '';
					for(let i=0; i<stocksArray.length; i++){
						newRow += buildStockRow(stocksArray[i]);
					}

				}else {
					var newRow = buildStockRow(thedataJSFound.query.results.qoute);
				}

				$('#stock-ticker-body').append(newRow);
			});

		$('#stock-table').DataTable();

	});





	function buildStockRow(thedata){
		var newHTML = '';
			if(stockInfo.Change.indexOf('+') > -1) {
				var classChange = "success";

			} else {
				var classChange = "danger";
			}
			newHTML += '<tr>';
				newHTML += '<td>' + stockInfo.Symbol+'</td>';
				newHTML += '<td>' + stockInfo.Name+'</td>';
				newHTML += '<td>' + stockInfo.Ask+'</td>';
				newHTML += '<td>' + stockInfo.Bid+'</td>';
				newHTML += '<td class="bg-'+classChange+'">' + stockInfo.Change+'</td>';
			newHTML += '</tr>';
			
			return newHTML
		}

});

// 1. object is to add a new row
// 2. 