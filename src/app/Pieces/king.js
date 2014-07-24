angular.module('chessPieces').factory('King', function(Piece, MovesCalculator){
	
	function getMovesFrom(pos){
		return MovesCalculator.getAllRadialPositions(pos, 1)
	}

	return Piece('King', {
		getMovesFrom : getMovesFrom
	});
});