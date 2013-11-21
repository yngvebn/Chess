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
				] }, allowedMoves: [
					{
						col: 0, row: 1, onlyIfAvailable: true
					},
					{
						col: 0, row: 2, firstTimeOnly: true, onlyIfAvailable: true
					},
					{
						col: 1, row: 1, onlyIfOccupied: true
					},
					{
						col: -1, row: 1, onlyIfOccupied: true
					}
				]
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
				black: {letter: 'n', startpositions: [{ col: 2, row: 7},{ col: 5, row: 7}  ] },
				allowedMoves:[
				
					{ col: 1, row: 1 },
					{ col: 2, row: 2 },
					{ col: 3, row: 3 },
					{ col: 4, row: 4 },
					{ col: 5, row: 5 },
					{ col: 6, row: 6 },
					{ col: 7, row: 7 },
					{ col: 8, row: 8 },
					{ col: 1, row: -1 },
					{ col: 2, row: -2 },
					{ col: 3, row: -3 },
					{ col: 4, row: -4 },
					{ col: 5, row: -5 },
					{ col: 6, row: -6 },
					{ col: 7, row: -7 },
					{ col: 8, row: -8 },
					{ col: -1, row: 1 },
					{ col: -2, row: 2 },
					{ col: -3, row: 3 },
					{ col: -4, row: 4 },
					{ col: -5, row: 5 },
					{ col: -6, row: 6 },
					{ col: -7, row: 7 },
					{ col: -8, row: 8 },
					{ col: -1, row: -1 },
					{ col: -2, row: -2 },
					{ col: -3, row: -3 },
					{ col: -4, row: -4 },
					{ col: -5, row: -5 },
					{ col: -6, row: -6 },
					{ col: -7, row: -7 },
					{ col: -8, row: -8 }
				]
			},
			tower: {
				white: { letter: 'r', startpositions: [{ col: 0, row: 0},{ col: 7, row: 0}  ]},
				black: { letter: 't', startpositions: [{ col: 0, row: 7} ,{ col: 7, row: 7} ]}	
			}

		}



		resetBoard();
		setUpStartPositions()

		var getIntermediateCells = function(source, destination){
			
		}
		
		var pieceInPath = function(source, destination){
			var positionsInPath = getIntermediateCells(source, destination);
		}

		var isAllowedMove = function(source, destination){
			var piece = pieces[source.piece.name];
			var direction = source.piece.color == 'white' ? 1 : -1; 
			var isFirstTimeMove = !source.piece.history;
			var isMoveAllowed = false;
			var offset = {
				col: destination.col - source.col,
				row: destination.row - source.row
			};
			if(!piece.canSkipPieces && pieceInPath(source, destination)){
				return false;
			}
			for(var allowedMove in piece.allowedMoves){
				var move = piece.allowedMoves[allowedMove]
				var moveOffset = {
					col: move.col,
					row: move.row * direction
				};
				if(JSON.stringify(moveOffset) === JSON.stringify(offset)){
					isMoveAllowed = true;
					if(move.firstTimeOnly){
						isMoveAllowed =  (move.firstTimeOnly && isFirstTimeMove);
					}
					if(move.onlyIfOccupied){
						isMoveAllowed = (move.onlyIfOccupied && destination.piece);
					}
					if(move.onlyIfAvailable){
						isMoveAllowed = !destination.piece;
					}
				}
			}
			if(!isMoveAllowed) return false;
			if(destination.piece)
			{
				if(source.piece.color === destination.piece.color) return false;
			}
			return true;
		}

		return service;

		function movePiece(sourceCell, destinationCell){
			var source = service.board[sourceCell.row].cells[sourceCell.col];
			var destination = service.board[destinationCell.row].cells[destinationCell.col];
			if(!isAllowedMove(source, destination)) return false;
			
			var piece = source.piece;
			piece.history = piece.history || [];
			piece.history.push({
				source: sourceCell, destination: destinationCell
			});
			destination.piece = piece;

			source.piece = null;

			return true;
		}

		function setUpStartPositions(){
			for(var p in pieces){
				var piece = pieces[p];
				var whiteStartPositions = piece.white.startpositions;
				var blackStartPositions = piece.black.startpositions;
				for(var pos in whiteStartPositions){
					var position = whiteStartPositions[pos];
					service.board[position.row].cells[position.col].piece = {
						color: 'white',
						letter: piece.white.letter,
						name: p
					}
				}
				for(var pos in blackStartPositions){
					var position = blackStartPositions[pos];
					service.board[position.row].cells[position.col].piece = {
						color: 'black',
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