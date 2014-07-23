angular.module('chessPieces').factory('Pawn', function(Piece){
	var pawn = Object.create(Piece);
	pawn.name = 'Pawn';
	return pawn;
});