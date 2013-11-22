(function(){
	var serviceName = 'chessBoardService';
	angular.module(Global.AppName).service(serviceName, ['pieces', ChessBoardService]);

	function ChessBoardService(pieces){
		var service = {
			board: [],
			pieces: [],
			movePiece: movePiece

		};
	
		resetBoard();
		setUpStartPositions()

		var getIntermediateCells = function(s, d){
			var source = {
				col: s.col,
				row: s.row
			};
			var destination = {
				col: d.col,
				row: d.row
			};
			var path = [];
			var current = source;
			while(JSON.stringify(destination) != JSON.stringify(current)){
				var row = destination.row == source.row ? source.row : 
					(destination.row > source.row ? current.row+1 : current.row-1);
				var col = destination.col == source.col ? source.col : (destination.col > source.col ? current.col+1 : current.col-1);
				var cell = {
					col: col,
					row: row
				};
				if(JSON.stringify(destination) != JSON.stringify(cell) && JSON.stringify(source) != JSON.stringify(cell))
					path.push(cell);
				current = cell;
			}
			return path;
		}

		var pieceInPath = function(source, destination){
			var positionsInPath = getIntermediateCells(source, destination);
			for (var i = positionsInPath.length - 1; i >= 0; i--) {
				var pos = positionsInPath[i]
				if(service.board[pos.row].cells[pos.col].piece) return true;
			};
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
					} else
					if(move.onlyIfOccupied){
						isMoveAllowed = (move.onlyIfOccupied && destination.piece);
					} else
					if(move.onlyIfAvailable){
						isMoveAllowed = !destination.piece;
					}
				}
			}
			if(!isMoveAllowed) return false;
			if(!piece.canSkipPieces){
				if(pieceInPath(source, destination)) return false;
			}
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
		}
	}

	ChessBoardService();
})();