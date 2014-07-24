angular.module('chessPieces').factory('Pawn', function(Piece){
	function getMovesFrom(pos){
		return [];
	}


	return Piece('Pawn', {
		getMovesFrom : getMovesFrom
	});
});