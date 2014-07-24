angular.module('chessPieces').factory('Bishop', function(Piece, MovesCalculator, boardSize){
	function getMovesFrom(pos){
		return MovesCalculator.getAllDiagonalPositions(pos, boardSize);
	}

	return Piece('Bishop', {
		getMovesFrom : getMovesFrom
	});
});