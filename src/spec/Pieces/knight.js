describe('Knight', function(){
	beforeEach(angular.mock.module('chessPieces'));

	var piece;
	beforeEach(inject(['Knight', function(_piece_){
		piece = new _piece_();
	}]))

	it('should have its name set correctly',function(){
		expect(piece.name).toBe('Knight');
	});
});