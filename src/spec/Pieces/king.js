describe('King', function(){
	beforeEach(angular.mock.module('chess'));
	var pieceName = 'King', piece, chessBoard, gameService;
	
	beforeEach(inject([pieceName, 'ChessBoard', 'GameService', function(_piece_, _ChessBoard_, _GameService_){
		piece = new _piece_();
		chessBoard = _ChessBoard_;
		gameService = _GameService_;
	}]))

	it('should have its name set correctly',function(){
		expect(piece.name).toBe('King');
	});

	it('should always be a new instance', inject(['King', function(King){
		var actual = new King();
		expect(piece).not.toBe(actual);
	}]));

	it('should be possible to get moves from a coordinate', function(){
		expect(piece.getMovesFrom).not.toThrow(new Error("Method not implemented"));
	});

	it('should return correct moves from a coordinate', function(){
		var moves = piece.getMovesFrom([4, 4]);
		expect(moves).toContain([4, 3]);
		expect(moves).toContain([5, 4]);
	})


	it('should have correct startpositions', function(){
		gameService.newGame({ whitePosition: 'top' });
		
		expect(chessBoard.pieceAt([4, 0]).name).toBe(pieceName);
		expect(chessBoard.pieceAt([4, 0]).color).toBe('white');

		expect(chessBoard.pieceAt([4, 7]).name).toBe(pieceName);
		expect(chessBoard.pieceAt([4, 7]).color).toBe('black');
	})

	it('should have not have any available moves from new board', function(){
		/*gameService.newGame({ whitePosition: 'top' });

		var piece = chessBoard.pieceAt([4, 7]);

		expect(piece.getMovesFromCurrentPosition()).toBe([[]]);*/
	})
});