describe('MatrixTransform', function(){
	beforeEach(angular.mock.module('common'));
	var matrixTransform;
	
	beforeEach(inject(['MatrixTransform',function(_transform_){
		matrixTransform = _transform_
	}]))

	it('should transform a single point', function(){
		var point = [1, 1];
		var transform = [1, 2];
		expect(matrixTransform.transform(point, transform)).toEqual([2, 3]);

	});

	it('should transform a point with an array',function(){
		var point = [1, 1];
		var transform = [[1, 1], [2, 2]];
		var transformed = matrixTransform.transform(point, transform);
		expect(transformed).toContain([2, 2]);
		expect(transformed).toContain([3, 3]);

	})
})