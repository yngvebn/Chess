angular.module('chessPieces').factory('King', function(Piece, ChessBoard, MovesCalculator){
	
	function getMovesFrom(pos, chessBoard){
		return _.chain(MovesCalculator.getAllRadialPositions(pos, 1))
				.without(ChessBoard.occupiedPositions([this.color])).value();
	}

	return Piece('King', {
		getMovesFrom : getMovesFrom
	});
});