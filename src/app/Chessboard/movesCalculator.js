angular.module('common').factory('MovesCalculator', function(boardSize){
	return {
		getAllRadialPositions: getAllRadialPositions,
		getPath: getPath,
		getDistance: getDistance,
		getAllDiagonalPositions: getAllDiagonalPositions,
		getAllVerticalPositions: getAllVerticalPositions,
		getAllHorizontalPositions: getAllHorizontalPositions
	}

	function equals(pos, otherPos){
		return pos[0] == otherPos[0] && pos[1] == otherPos[1];
	}

	function isValidBoardPosition(pos){
		return pos[0] < boardSize &&
				pos[1] < boardSize &&
				pos[0] >= 0 &&
				pos[1] >= 0;
	}

	function getDistance(from, to){
		var distance = [Math.abs(from[0]-to[0]), Math.abs(from[1]-to[1])];
		distance.sort();
		if(distance[0] % distance[1] !== 0){
			throw Error("Invalid path");
		}
		
		return Math.max(distance[0],distance[1]);
	}

	function getPath(from, to){
		var pathArray = [];
		var edges = [];
		edges.push(from);
		edges.push(to);
		edges.sort();

		var distance = getDistance(from, to);

		for(var i = 0; i<=distance; i++){
			var pathSegment = [0,0];
			if(edges[0][0] == edges[1][0]){
				// lateral movement
				pathSegment[0] = edges[0][0];
			}
			else{
				pathSegment[0] = edges[0][0]+i;
			}

			if(edges[0][1] == edges[1][1]){
				// vertical movement
				pathSegment[1] = edges[0][1];
			}
			else{
				pathSegment[1] = edges[0][1]+i;	
			}
			pathArray.push(pathSegment);
		}
		
		return pathArray;
	}

	function getAllVerticalPositions(pos, distance){
		return _.chain(getAllRadialPositions(pos, distance))
				.filter(function(item) { return item[0] == pos[0]})
				.value();
	}

	function getAllHorizontalPositions(pos, distance){
		return _.chain(getAllRadialPositions(pos, distance))
				.filter(function(item) { return item[1] == pos[1]})
				.value();
	}

	function getAllDiagonalPositions(pos, distance){
		return _.chain(getAllRadialPositions(pos, distance))
				.filter(function(item) { return item[0] != pos[0] && item[1] != pos[1]})
				.value();
	}

	function getAllRadialPositions(pos, distance){
		var returnArray = [];
		var maxXValue = boardSize;
		var maxYValue = boardSize;
		for(var x = 0-distance; x <= distance; x++)
			for(var y = 0-distance; y <= distance; y++){
				var newPos = [ pos[0] + x , pos[1] + y ];
				if(!equals(newPos, pos) && isValidBoardPosition(newPos)){ 
					returnArray.push(newPos);
				}
			}

		return returnArray;
	}
})