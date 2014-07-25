describe('Pawn', function(){
	beforeEach(angular.mock.module('chess'));
	var pieceName = 'Pawn', piece, chessBoard, gameService;

	beforeEach(inject([pieceName, 'ChessBoard', 'GameService', function(_piece_, _ChessBoard_, _GameService_){
		piece = new _piece_();
		chessBoard = _ChessBoard_;
		gameService = _GameService_;

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
				chessBoard.placePiece([1, 1], piece);
		chessBoard.movePiece([1, 1], [1, 2])

		var moves = piece.getMovesFrom([1, 2]);
		moves.sort();
		expect(moves).toEqual([[1,3]]);
	})

	it('should have correct startpositions', function(){
		gameService.newGame({ whitePosition: 'top' });

		for(var i = 0; i< 8; i++){
			expect(chessBoard.pieceAt([i, 1]).name).toBe('Pawn');
			expect(chessBoard.pieceAt([i, 1]).color).toBe('white');
		}

		for(var i = 0; i< 8; i++){
			expect(chessBoard.pieceAt([i, 6]).name).toBe('Pawn');
			expect(chessBoard.pieceAt([i, 6]).color).toBe('black');
		}
	})
});