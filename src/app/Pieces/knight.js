angular.module('chessPieces').factory('Knight', function(Piece){
	var pawn = Object.create(Piece);
	pawn.name = 'Knight';
	return pawn;
});