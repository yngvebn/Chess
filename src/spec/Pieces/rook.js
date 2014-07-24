describe('Rook', function(){
	beforeEach(angular.mock.module('chessPieces'));

	var piece;
	beforeEach(inject(['Rook', function(_piece_){
		piece = new _piece_()
	}]))

	it('should have its name set correctly',function(){
		expect(piece.name).toBe('Rook');
	});

	it('should be possible to get moves from a coordinate', function(){
		expect(piece.getMovesFrom).not.toThrow(new Error("Method not implemented"));
	});

	it('should return correct moves from a coordinate', function(){
		var moves = piece.getMovesFrom([4, 4]);
		expect(moves).toContain([4, 5]);
		expect(moves).toContain([4, 6]);
		expect(moves).toContain([5, 4]);
		expect(moves).toContain([2, 4]);
		expect(moves).not.toContain([5, 5]);
	})
});