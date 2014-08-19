angular.module('common').factory('MatrixTransform', function(){

	function isArrayOfPoints(obj){
		if( Object.prototype.toString.call( obj[0] ) === '[object Array]' ) {
		    return true;
		}
		return false;
	}		

	function transform(point, offset){
		if(isArrayOfPoints(offset)){
			var array = [];
			for (var i = offset.length - 1; i >= 0; i--) {
				var o = offset[i];
				array.push([point[0]+o[0], point[1]+o[1]]);
			};
			return array;
		}
		else{

			var newPoint = [point[0]+offset[0], point[1]+offset[1]];
			return newPoint;			
		}

	}

	return {
		transform: transform
	}

})