angular.module('chess').factory('GameService', function(King, Queen, Bishop, Knight, Rook, Pawn, ChessBoard){
	var GameService = {};

	GameService.newGame = function(options){
		var opts = {
			whitePosition: 'top'
		}

		angular.extend(opts, options);
		var topColor = opts.whitePosition == 'top' ? 'white' : 'black';
		var bottomColor = opts.whitePosition == 'top' ?  'black' : 'white';
		
		// Pawns
		for(var i = 0; i<8; i++){
			ChessBoard.placePiece([i, 1], new Pawn(topColor));
			ChessBoard.placePiece([i, 6], new Pawn(bottomColor));
		}

		// Bishops
		ChessBoard.placePiece([2, 0], new Bishop(topColor));
		ChessBoard.placePiece([2, 7], new Bishop(bottomColor));

		ChessBoard.placePiece([5, 0], new Bishop(topColor));
		ChessBoard.placePiece([5, 7], new Bishop(bottomColor));

		// Kings
		ChessBoard.placePiece([4, 0], new King(topColor));
		ChessBoard.placePiece([4, 7], new King(bottomColor));

		// Queens
		ChessBoard.placePiece([3, 0], new Queen(topColor));
		ChessBoard.placePiece([3, 7], new Queen(bottomColor));

		// Knights
		ChessBoard.placePiece([1, 0], new Knight(topColor));
		ChessBoard.placePiece([1, 7], new Knight(bottomColor));

		ChessBoard.placePiece([6, 0], new Knight(topColor));
		ChessBoard.placePiece([6, 7], new Knight(bottomColor));


		// Rooks
		ChessBoard.placePiece([0, 0], new Rook(topColor));
		ChessBoard.placePiece([0, 7], new Rook(bottomColor));

		ChessBoard.placePiece([7, 0], new Rook(topColor));
		ChessBoard.placePiece([7, 7], new Rook(bottomColor));


			
			
	}


	return GameService;
})