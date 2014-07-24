angular.module('chessPieces').factory('Rook', function(Piece, MovesCalculator, boardSize){
	function getMovesFrom(pos){
		return _.chain(MovesCalculator.getAllVerticalPositions(pos, boardSize))
				.union(MovesCalculator.getAllHorizontalPositions(pos, boardSize))
				.uniq()
				.value();
	}

	return Piece('Rook', {
		getMovesFrom : getMovesFrom
	});
});