angular.module('chessPieces').factory('Pawn', function(Piece){
	
	function getMovesFrom(pos){
		var resultArray = [];
		resultArray.push([pos[0], pos[1]+1]);
		if(this.history.length == 0){
			resultArray.push([pos[0], pos[1]+2]);
		}
		return resultArray;
	}


	return Piece('Pawn', {
		getMovesFrom : getMovesFrom
	});
});