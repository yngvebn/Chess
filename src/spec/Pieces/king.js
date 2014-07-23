describe('King', function(){
	beforeEach(angular.mock.module('chessPieces'));

	var piece;
	var chessBoard;
	beforeEach(inject(['King', function(_piece_){
		piece = _piece_();
	}]))

	it('should have its name set correctly',function(){
		expect(piece.name).toBe('King');
	});
});