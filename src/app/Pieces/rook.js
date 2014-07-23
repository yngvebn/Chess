angular.module('chessPieces').factory('Rook', function(Piece){
	var pawn = Object.create(Piece);
	pawn.name = 'Rook';
	return pawn;
});