describe('Pawn', function(){
	beforeEach(angular.mock.module('chess'));

	var piece, chessBoard;
	beforeEach(inject(['Pawn', 'ChessBoard', function(_piece_, _ChessBoard_){
		piece = new _piece_();
		chessBoard = _ChessBoard_;
		chessBoard.placePiece([1, 1], piece);
	}]))

	it('should have its name set correctly',function(){
		expect(piece.name).toBe('Pawn');
	});

	it('should be possible to get moves from a coordinate', function(){
		expect(piece.getMovesFrom).not.toThrow(new Error("Method not implemented"));
	});

	it('should return correct moves from a coordinate', function(){
		var moves = piece.getMovesFrom([1, 1]);

		expect(moves).toContain([1, 2]);
		expect(moves).not.toContain([2, 1]);
	})

	it('should return special move on first move', function(){
		var moves = piece.getMovesFrom([1, 1]);
		expect(moves).toContain([1, 3]);
	})

	it('should not return special move on first move', function(){
		chessBoard.movePiece([1, 1], [1, 2])

		var moves = piece.getMovesFrom([1, 2]);
		moves.sort();
		expect(moves).toEqual([[1,3]]);
	})
});