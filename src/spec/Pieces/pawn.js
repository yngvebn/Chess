describe('Pawn', function(){
	beforeEach(angular.mock.module('chessPieces'));

	var piece;
	beforeEach(inject(['Pawn', function(_piece_){
		piece = _piece_
	}]))

	it('should have its name set correctly',function(){
		expect(piece.name).toBe('Pawn');
	});
});