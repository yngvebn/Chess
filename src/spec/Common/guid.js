describe('GUID', function(){
	beforeEach(angular.mock.module('common'));

	it('should generate a unique id', inject['Guid', function(guid){
		var guid1 = guid();
		var guid2 = guid();
		expect(guid1).not.toEqual(guid2);
	}])
})