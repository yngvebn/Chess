(function(){
	var serviceName = 'chessBoardService';
	angular.module(Global.AppName).service(serviceName, [ChessBoardService]);

	function ChessBoardService(){
		var service = {
			board: [],
			pieces: [],

		};
		
		resetBoard();
		

		
		

		return service;
		function resetBoard(){
			var board = [];
			var x = ['a', 'b', 'c','d','e','f','g','h'];
			for(var j = 0; j < 8; j++){
				for (var i = 0; i < x.length-1; i++) {
					var letter = x[i];
					var cell = {
						row: j+1,
						col: i+1,
						letter: letter
					}
					board.push(cell);
				}
			};
			service.board = board;
			console.log(service.board);
		}

		

	}

	ChessBoardService();
})();