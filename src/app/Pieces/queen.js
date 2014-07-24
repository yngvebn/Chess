angular.module('chessPieces').factory('Queen', function(Piece){
	function getMovesFrom(pos){
		return [];
	}

	return Piece('Queen', {
		getMovesFrom : getMovesFrom
	});
});