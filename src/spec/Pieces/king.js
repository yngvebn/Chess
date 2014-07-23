describe('King', function(){
	beforeEach(angular.mock.module('chessPieces'));

	var piece;
	var chessBoard;
	beforeEach(inject(['King', function(_piece_){
		
		piece = new _piece_();
	}]))

	it('should have its name set correctly',function(){
		expect(piece.name).toBe('King');
	});

	it('should always be a new instance', inject(['King', function(King){
		var actual = new King();
		expect(piece).not.toBe(actual);
	}]))
});