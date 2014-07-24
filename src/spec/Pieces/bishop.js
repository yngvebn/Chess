describe('Bishop', function(){
	beforeEach(angular.mock.module('chessPieces'));

	var piece;
	beforeEach(inject(['Bishop', function(_piece_){
		piece = new _piece_()
	}]))

	it('should have its name set correctly',function(){
		expect(piece.name).toBe('Bishop');
	});

	it('should be possible to get moves from a coordinate', function(){
		expect(piece.getMovesFrom).not.toThrow(new Error("Method not implemented"));
	});

	it('should return correct moves from a coordinate', function(){
		var moves = piece.getMovesFrom([4, 4]);
		expect(moves).toContain([3, 3]);
		expect(moves).toContain([5, 5]);
		expect(moves).toContain([5, 3]);
		expect(moves).toContain([3, 5]);
		expect(moves).not.toContain([4, 5]);
	})
});