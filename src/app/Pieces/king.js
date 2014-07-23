angular.module('chessPieces').factory('King', function(Piece){
	return function(){
		var pawn = Object.create(Piece);
		pawn.name = 'King';
		return pawn;	
	}
});