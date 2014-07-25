describe('MovesCalculator', function(){
	var movesCalculator;

	beforeEach(angular.mock.module('common'));

	beforeEach(inject(['MovesCalculator', function(_movesCalculator_){
		movesCalculator = _movesCalculator_;
	}]));

	it('should exist', function(){
		expect(movesCalculator).toBeDefined();
	})

	it('should throw error on invalid path', function(){
		function pathFunction(){
			movesCalculator.getPath([0, 0], [2, 3])
		}
		expect(movesCalculator.getPath([0, 0], [2, 3])).toEqual([]);
	})

	it('should not throw error on valid path', function(){
		function pathFunction(){
			movesCalculator.getPath([4, 4], [8, 8])
		};

		expect(pathFunction).not.toThrow("Invalid path");
	})

	it('should not throw error on valid path', function(){
		function pathFunction(){
			movesCalculator.getPath([3, 8], [3, 0])
		};

		expect(pathFunction).not.toThrow("Invalid path");
	});

	it('should calculate all diagonal moves from a point', function(){
		var expectedArray = [
			[0,0],
			[2,0],
			[0,2],
			[2,2]
		]
		expectedArray.sort();
		var actualArray = movesCalculator.getAllDiagonalPositions([1,1], 1);
		actualArray.sort();
		expect(actualArray).toEqual(expectedArray);
	})

	it('should calculate all vertical moves from a point', function(){
		var expectedArray = [
			[2,0],
			[2,1],
			[2,3],
			[2,4]
		]
		expectedArray.sort();
		var actualArray = movesCalculator.getAllVerticalPositions([2,2], 2);
		actualArray.sort();
		expect(actualArray).toEqual(expectedArray);
	})


	it('should calculate all horizontal moves from a point', function(){
		var expectedArray = [
			[0,2],
			[1,2],
			[3,2],
			[4,2]
		]
		expectedArray.sort();
		var actualArray = movesCalculator.getAllHorizontalPositions([2,2], 2);
		actualArray.sort();
		expect(actualArray).toEqual(expectedArray);
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
	});

	it('should calculate the distance between two lateral points', function(){
		expect(movesCalculator.getDistance([0, 0], [2, 0])).toBe(2);
	})

	it('should calculate the distance between two lateral points backwards', function(){
		expect(movesCalculator.getDistance([2, 0], [0, 0])).toBe(2);
	})


	it('should calculate the distance between two vertical points', function(){
		expect(movesCalculator.getDistance([0, 0], [0, 2])).toBe(2);
	})


	it('should calculate the distance between two vertical points backwards', function(){
		expect(movesCalculator.getDistance([0, 2], [0, 0])).toBe(2);
	})

	it('should calculate the distance between two diagonal points forwards', function(){
		expect(movesCalculator.getDistance([0, 0], [2, 2])).toBe(2);
	})

	it('should calculate the distance between two diagonal points backwards', function(){
		expect(movesCalculator.getDistance([2, 2], [0, 0])).toBe(2);
	})



	it('should not return positions outside the board', function(){
		expect(movesCalculator.getAllRadialPositions([0, 0], 1)).not.toContain([-1, 0]);
	});

	it('should not return positions outside the board', function(){
		expect(movesCalculator.getAllRadialPositions([7, 7], 1)).not.toContain([8, 7]);
	});

	it('should calculate path between two points straight forward', function(){
		var expectedArray = [
			[0, 0],
			[0, 1],
			[0, 2]
		];

		var actualArray = movesCalculator.getPath([0, 0], [0, 2]);
		actualArray.sort();
		expectedArray.sort();

		expect(actualArray).toEqual(expectedArray);
	});

	it('should calculate path between two points diagonally forward', function(){
		var expectedArray = [
			[0, 0],
			[1, 1],
			[2, 2]
		];

		var actualArray = movesCalculator.getPath([0, 0], [2, 2]);
		actualArray.sort();
		expectedArray.sort();

		expect(actualArray).toEqual(expectedArray);
	});


	it('should calculate path between two points diagonally backwards', function(){
		var expectedArray = [
			[0, 0],
			[1, 1],
			[2, 2]
		];

		var actualArray = movesCalculator.getPath([2, 2], [0, 0]);
		actualArray.sort();
		expectedArray.sort();

		expect(actualArray).toEqual(expectedArray);
	});


	it('should calculate path between two points straight backwards', function(){
		var expectedArray = [
			[0, 0],
			[0, 1],
			[0, 2]
		];

		var actualArray = movesCalculator.getPath([0, 2], [0, 0]);
		actualArray.sort();
		expectedArray.sort();

		expect(actualArray).toEqual(expectedArray);
	});

	it('should calculate path between two points straight laterally backwards', function(){
		var expectedArray = [
			[2, 0],
			[2, 1],
			[2, 2]
		];

		var actualArray = movesCalculator.getPath([2, 2], [2, 0]);
		actualArray.sort();
		expectedArray.sort();

		expect(actualArray).toEqual(expectedArray);
	});

	it('should calculate path between two points straight laterally forwards', function(){
		var expectedArray = [
			[2, 0],
			[2, 1],
			[2, 2]
		];

		var actualArray = movesCalculator.getPath([2, 0], [2, 2]);
		actualArray.sort();
		expectedArray.sort();

		expect(actualArray).toEqual(expectedArray);
	});
});