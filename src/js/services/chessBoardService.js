(function(){
	var serviceName = 'chessBoardService';
	angular.module(Global.AppName).service(serviceName, ['pieces', ChessBoardService]);

	function ChessBoardService(pieces){
		var service = {
			board: [],
			pieces: [],
			movePiece: movePiece,
			isCheckMate: isCheckMate

		};
	
		var getPath = function(s, d){
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
			var positionsInPath = getPath(source, destination);
			for (var i = positionsInPath.length - 1; i >= 0; i--) {
				var pos = positionsInPath[i]
				if(service.board[pos.row].cells[pos.col].piece) return true;
			};
		}

		var findKingPosition = function(color){
			for (var row = service.board.length - 1; row >= 0; row--) {
				for (var col = service.board[row].cells.length - 1; col >= 0; col--) {
					var piece = service.board[row].cells[col].piece;
					if(piece){
						if(piece.color == color && piece.name == 'king')
							return service.board[row].cells[col];
					}
				};
				
			};
		}

		var piecePositions = {};

		var recalculatePiecePositions = function(color){
			if(!color){
				recalculatePiecePositions('black');
				recalculatePiecePositions('white');
				return;
			}
			var pieces = [];
			for (var row = service.board.length - 1; row >= 0; row--) {
				for (var col = service.board[row].cells.length - 1; col >= 0; col--) {
					var piece = service.board[row].cells[col].piece;
					if(piece){
						if(piece.color == color)
						{
							pieces.push(service.board[row].cells[col]);
						}
					}
				};
				
			};
			piecePositions[color] = pieces;
		}

		var getAllPiecePositions = function(color){
			
			return piecePositions[color];
		}

		var willCauseSelfCheck = function(source, destination)
		{
		
			var pieceCurrentlyInDestination = destination.piece;
			var pieceCurrentlyInSource = source.piece;

			destination.piece = source.piece;
			source.piece = null;
			
			var sourcePiece = pieceCurrentlyInSource;
			var piece = pieces[sourcePiece.name];

			var kingPosition = findKingPosition(sourcePiece.color);
			
			var opposingColor = sourcePiece.color == 'white' ? 'black' : 'white';
			var wouldCauseCheck = false;
			var opposingPiecePositions = getAllPiecePositions(opposingColor);
			for (var i = opposingPiecePositions.length - 1; i >= 0; i--) {
				if(isAllowedMove(opposingPiecePositions[i], kingPosition)) {
					
					wouldCauseCheck = true;
				}
			};

			destination.piece = pieceCurrentlyInDestination;
			source.piece = pieceCurrentlyInSource;

			
			return wouldCauseCheck;
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
						if(!isFirstTimeMove) return false;
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
			if(!piece.canSkipPieces){
				if(pieceInPath(source, destination)) return false;
			}
			if(destination.piece)
			{
				if(source.piece.color === destination.piece.color) return false;
			}
			return true;
		}

		function getCell(row, col){
			return service.board[row].cells[col];
		}
		function recalculateAvailableMoves(){
			var start = new Date().getTime();

			var blackPieces = getAllPiecePositions('black');
			var whitePieces = getAllPiecePositions('white');
			var allPieces = blackPieces.concat(whitePieces);
			for (var i = allPieces.length - 1; i >= 0; i--) {
				var source = allPieces[i];
				source.piece.possibleMoves = [];

				for(var row = 0; row < 8; row++){
					for(var col = 0; col < 8; col++){
						var destination = getCell(row, col);

						if(isAllowedMove(source, destination)  && !willCauseSelfCheck(source, destination)){
							source.piece.possibleMoves.push(destination);
						}
					};
				}
			}
			
			var end = new Date().getTime();
			var time = end - start;

			console.log('recalculateAvailableMoves ' + time);
		}

		resetBoard();
		setUpStartPositions();
		
		recalculatePiecePositions();
		recalculateAvailableMoves();
		return service;
		function isCheckMate(destinationCell){
			var destination = service.board[destinationCell.row].cells[destinationCell.col];
			var colorOfMovedPiece = destination.piece.color;
			var opposingColor = colorOfMovedPiece == 'white' ? 'black' : 'white';

			var pieces = getAllPiecePositions(opposingColor);
			for (var i = pieces.length - 1; i >= 0; i--) {
				if(pieces[i].piece.possibleMoves.length > 0) return false;
			};
			return true;
		}

		function movePiece(sourceCell, destinationCell){
			var source = service.board[sourceCell.row].cells[sourceCell.col];
			var destination = service.board[destinationCell.row].cells[destinationCell.col];
			if(!isAllowedMove(source, destination)) return false;
			
			var piece = source.piece;
			piece.history = piece.history || [];
			piece.history.push({
				source: sourceCell, destination: destinationCell
			});
			if(willCauseSelfCheck(source, destination)){
				return false;
			}
			
			destination.piece = piece;

			source.piece = null;

			setTimeout(function(){
				recalculatePiecePositions();
				recalculateAvailableMoves();
				}, 10);
			


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
						name: p,
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