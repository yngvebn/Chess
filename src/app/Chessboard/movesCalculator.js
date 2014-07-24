angular.module('common').factory('MovesCalculator', function(){
	return {
		getAllRadialPositions: getAllRadialPositions
	}

	function equals(pos, otherPos){
		return pos[0] == otherPos[0] && pos[1] == otherPos[1];
	}

	function getAllRadialPositions(pos, distance){
		var returnArray = [];

		for(var x = 0-distance; x <= distance; x++)
			for(var y = 0-distance; y <= distance; y++){
				var newPos = [ pos[0] + x , pos[1] + y ];
				if(!equals(newPos, pos)) returnArray.push(newPos);
			}

		return returnArray;
	}
})