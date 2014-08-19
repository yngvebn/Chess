angular.module('chessPieces').factory('Knight', function(Piece, ChessBoard, MovesCalculator, MatrixTransform){

	function getAllKnightPositions(fromPosition){
		return MatrixTransform.transform(fromPosition, [
			[2, 1], 
			[2, -1],
			[-2, -1],
			[-2, 1],
			[1, -2],
			[1, 2],
			[-1, 2],
			[-1, -2]]);
	}

	function getMovesFrom(pos){
		return _.chain(getAllKnightPositions(pos))
				.without(ChessBoard.occupiedPositions([this.color])).value();
	}

	return Piece('Knight', {
		getMovesFrom : getMovesFrom
	});
});