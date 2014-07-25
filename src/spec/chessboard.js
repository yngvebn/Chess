describe('Chessboard', function(){
	var chessBoard, king;

	beforeEach(angular.mock.module('chess'));

	beforeEach(inject(['King',  'ChessBoard', function(_king_, _ChessBoard_){
		chessBoard = _ChessBoard_;
		king = _king_;
	}]));

	it('should have correct number of tiles', function(){
			expect(chessBoard.tiles.length).toBe(8);
	});

	it('should be possible to place a piece', function(){
		chessBoard.placePiece([1, 1], new king());

		expect(chessBoard.pieceAt([1, 1]).name).toBe('King');
	});

	it('should set the current position on the piece', function(){
		var piece = new king();

		chessBoard.placePiece([1, 1], piece);

		expect(piece.position).toEqual([1, 1]);
	})

	it('should return the correct piece', inject(['Queen', function(queen){
		chessBoard.placePiece([1, 1], new king());

		expect(chessBoard.pieceAt([1, 1])).not.toBe(queen);
	}]))
});