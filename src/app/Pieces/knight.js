angular.module('chessPieces').factory('Knight', function(Piece){

	function getMovesFrom(pos){

	}

	return Piece('Knight', {
		getMovesFrom : getMovesFrom
	});
});