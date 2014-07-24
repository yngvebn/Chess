describe('Pawn', function(){
	beforeEach(angular.mock.module('chessPieces'));

	var piece;
	beforeEach(inject(['Pawn', function(_piece_){
		piece = new _piece_()
	}]))

	it('should have its name set correctly',function(){
		expect(piece.name).toBe('Pawn');
	});

	it('should be possible to get moves from a coordinate', function(){
		expect(piece.getMovesFrom).not.toThrow(new Error("Method not implemented"));
	});
});