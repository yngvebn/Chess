describe('Rook', function(){
	beforeEach(angular.mock.module('chessPieces'));

beforeEach(angular.mock.module('chess'));
	var pieceName = 'Rook', piece, chessBoard, gameService;
	
	beforeEach(inject([pieceName, 'ChessBoard', 'GameService', function(_piece_, _ChessBoard_, _GameService_){
		piece = new _piece_();
		chessBoard = _ChessBoard_;
		gameService = _GameService_;
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

	it('should have correct startpositions', function(){
		gameService.newGame({ whitePosition: 'top' });
		

		expect(chessBoard.pieceAt([0, 0]).name).toBe(pieceName);
		expect(chessBoard.pieceAt([0, 0]).color).toBe('white');

		expect(chessBoard.pieceAt([7, 0]).name).toBe(pieceName);
		expect(chessBoard.pieceAt([7, 0]).color).toBe('white');
		
		
		expect(chessBoard.pieceAt([0, 7]).name).toBe(pieceName);
		expect(chessBoard.pieceAt([0, 7]).color).toBe('black');

		expect(chessBoard.pieceAt([7, 7]).name).toBe(pieceName);
		expect(chessBoard.pieceAt([7, 7]).color).toBe('black');
		
	})
});