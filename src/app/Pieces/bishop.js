angular.module('chessPieces').factory('Bishop', function(Piece){
	var pawn = Object.create(Piece);
	pawn.name = 'Bishop';
	return pawn;
});