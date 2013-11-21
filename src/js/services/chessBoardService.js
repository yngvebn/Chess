(function(){
	var serviceName = 'chessBoardService';
	angular.module(Global.AppName).service(serviceName, [ChessBoardService]);

	

	function ChessBoardService(){
		var service = {
			board: [],
			pieces: [],
			movePiece: movePiece

		};
			
	var pieces = {
			rook: {
				white: {letter: 'p', startpositions: [
					{ col: 0, row: 1},
					{ col: 1, row: 1},
					{ col: 2, row: 1},
					{ col: 3, row: 1},
					{ col: 4, row: 1},
					{ col: 5, row: 1},
					{ col: 6, row: 1},
					{ col: 7, row: 1}
				] },
				black: {letter: 'o', startpositions: [
					{ col: 0, row: 6},
					{ col: 1, row: 6},
					{ col: 2, row: 6},
					{ col: 3, row: 6},
					{ col: 4, row: 6},
					{ col: 5, row: 6},
					{ col: 6, row: 6},
					{ col: 7, row: 6}
				] }
			},
			knight: {
				white: {letter: 'h', startpositions: [{ col: 1, row: 0},{ col: 6, row: 0} ] },
				black: {letter: 'j', startpositions: [{ col: 1, row: 7},{ col: 6, row: 7} ] }	
			},
			king: {
				white: {letter: 'k', startpositions: [ { col: 4, row: 0} ] },
				black: {letter: 'l', startpositions: [ { col: 4, row: 7} ] }	
			},
			queen: {
				white: {letter: 'q', startpositions: [{ col: 3, row: 0} ] },
				black: {letter: 'w', startpositions: [{ col: 3, row: 7} ] }	
			},
			bishop: {
				white: {letter: 'b', startpositions: [{ col: 2, row: 0},{ col: 5, row: 0}  ] },
				black: {letter: 'n', startpositions: [{ col: 2, row: 7},{ col: 5, row: 7}  ] }	
			},
			tower: {
				white: { letter: 'r', startpositions: [{ col: 0, row: 0},{ col: 7, row: 0}  ]},
				black: { letter: 't', startpositions: [{ col: 0, row: 7} ,{ col: 7, row: 7} ]}	
			}

		}



		resetBoard();
		setUpStartPositions()
		return service;

		function movePiece(sourceCell, destinationCell){
			console.log('moving piece', sourceCell, destinationCell);
			var sourcePiece = service.board[sourceCell.row].cells[sourceCell.col].piece;
			service.board[destinationCell.row].cells[destinationCell.col].piece = sourcePiece;

			service.board[sourceCell.row].cells[sourceCell.col].piece = null;
		}

		function setUpStartPositions(){
			for(var p in pieces){
				var piece = pieces[p];
				var whiteStartPositions = piece.white.startpositions;
				var blackStartPositions = piece.black.startpositions;
				for(var pos in whiteStartPositions){
					var position = whiteStartPositions[pos];
					service.board[position.row].cells[position.col].piece = {
						letter: piece.white.letter,
						name: p
					}
				}
				for(var pos in blackStartPositions){
					var position = blackStartPositions[pos];
					service.board[position.row].cells[position.col].piece = {
						letter: piece.black.letter,
						name: p
					}
				}
			}
		}

		function resetBoard(){
			var board = [];
			var x = ['a', 'b', 'c','d','e','f','g','h'];
			for(var j = 0; j < 8; j++){
				var row = {
					index: j,
					cells: []
				}
				for (var i = 0; i < x.length; i++) {
					var letter = x[i];
					var cell = {
						row: j,
						col: i,
						letter: letter
					}
					row.cells.push(cell);
					
				}
				board.push(row);
			};
			service.board = board;
			console.log(service.board);
		}
	}

	ChessBoardService();
})();