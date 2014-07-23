describe('Chessboard', function(){
	var chessBoard;

	beforeEach(angular.mock.module('chess'));

	beforeEach(inject(function(_ChessBoard_){
		chessBoard = _ChessBoard_;
	}));

	it('should have correct number of tiles', function(){
			expect(chessBoard.tiles).toBe(64);
	});
});