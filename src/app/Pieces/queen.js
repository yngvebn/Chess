angular.module('chessPieces').factory('Queen', function(Piece){
	var pawn = Object.create(Piece);
	pawn.name = 'Queen';
	return pawn;
});