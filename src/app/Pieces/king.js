angular.module('chessPieces').factory('King', function(Piece){
	var pawn = Object.create(Piece);
	pawn.name = 'King';
	return pawn;
});