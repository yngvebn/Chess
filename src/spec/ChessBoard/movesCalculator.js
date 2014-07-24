describe('MovesCalculator', function(){
	var movesCalculator;

	beforeEach(angular.mock.module('common'));

	beforeEach(inject(['MovesCalculator', function(_movesCalculator_){
		movesCalculator = _movesCalculator_;
	}]));

	it('should exist', function(){
		expect(movesCalculator).toBeDefined();
	})

	it('should calculate all radial moves from a 1_1 from a specified distance', function(){
		var expectedArray = [
			[0,0],
			[1,0],
			[2,0],
			[0,1],
			[2,1],
			[0,2],
			[1,2],
			[2,2]
		]
		var actualArray = movesCalculator.getAllRadialPositions([1, 1], 1);
		actualArray.sort();
		expectedArray.sort();
		expect(actualArray).toEqual(expectedArray);
	})
});