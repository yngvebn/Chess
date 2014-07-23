describe('Piece', function(){
	var piece;

	beforeEach(angular.mock.module('chessPieces'));

	beforeEach(inject(function(_Piece_){
		piece = _Piece_;
	}));

	it('should not have a name set by default', function(){
		expect(piece.name).toBe('');
	});
});