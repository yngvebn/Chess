describe('Knight', function(){
	beforeEach(angular.mock.module('chess'));
	var pieceName = 'Knight', piece, chessBoard, gameService;
	
	beforeEach(inject([pieceName, 'ChessBoard', 'GameService', function(_piece_, _ChessBoard_, _GameService_){
		piece = new _piece_();
		chessBoard = _ChessBoard_;
		gameService = _GameService_;
	}]))

	it('should have its name set correctly',function(){
		expect(piece.name).toBe('Knight');
	});

	it('should be possible to get moves from a coordinate', function(){
		expect(piece.getMovesFrom).not.toThrow(new Error());
	})


	it('should have correct startpositions', function(){
		gameService.newGame({ whitePosition: 'top' });
		

		expect(chessBoard.pieceAt([1, 0]).name).toBe(pieceName);
		expect(chessBoard.pieceAt([1, 0]).color).toBe('white');

		expect(chessBoard.pieceAt([6, 0]).name).toBe(pieceName);
		expect(chessBoard.pieceAt([6, 0]).color).toBe('white');
		
		
		expect(chessBoard.pieceAt([1, 7]).name).toBe(pieceName);
		expect(chessBoard.pieceAt([1, 7]).color).toBe('black');

		expect(chessBoard.pieceAt([6, 7]).name).toBe(pieceName);
		expect(chessBoard.pieceAt([6, 7]).color).toBe('black');
		
	})
});