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
				pos[0] >= 0 && pos[1] >= 0;
	}


	function getDistance(from, to){
		var distance = [Math.abs(from[0]-to[0]), Math.abs(from[1]-to[1])];
		distance.sort();
		
		var path = getPath(from, to);
		var segment = _.find(path, function(pathSegment){ return pathSegment[0] == to[0] && pathSegment[1] == to[1]; });
		if(segment.length == 0){
			throw new Error("Invalid path");
		}
		/*if((from[0] - to[0] != from[1] - to[1]) && (from[0] != to[0] || from[1] != to[1])){
			
		}*/
		
		return Math.max(distance[0],distance[1]);
	}

	function makeValid(pos){
		if(pos[0] < 0) pos[0] = 0;
		if(pos[1] < 0) pos[1] = 0;
		if(pos[0] >= boardSize) pos[0] = boardSize-1;
		if(pos[1] >= boardSize) pos[1] = boardSize-1;
		
		return pos;
	}

	function getPath(from, to){
		//console.log('GetPath Called with ', from, to);
		var pathArray = [];
		var edges = [];
		/*from = makeValid(from);
		to = makeValid(to);*/

		var xOperator = from[0] < to[0] ? 1 : from[0] > to[0] ? -1 : 0;
		var yOperator = from[1] < to[1] ? 1 : from[1] > to[1] ? -1 : 0;
		var index = 0;
		pathSegment = from;
		pathArray.push(pathSegment);
		var toFound= false;
		while(index < 8){
			var pathSegment = [pathSegment[0]+xOperator, pathSegment[1]+yOperator];
			
			if(equals(pathSegment, to)){
				pathArray.push(pathSegment);
				toFound = true;
				break;
			}
			/*if(pathSegment[0] > 7 || pathSegment[1] > 7 || pathSegment[0] < 0 || pathSegment[1] < 0){
				break;
			}*/			
			if(!_.contains(pathArray, pathSegment)){
				pathArray.push(pathSegment);
			}
			index++;

		}
		var pathArray = _.reject(pathArray, function(segment){ return !isValidBoardPosition(segment); });
		if(!toFound){
			console.log(from, to, pathArray);
			throw new Error("Invalid path");
		}
		//console.log(pathArray);
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
		returnArray = _.chain(returnArray)
						.union(getPath(pos, [pos[0]-distance, pos[1]]))
						.union(getPath(pos, [pos[0]+distance, pos[1]]))
						.union(getPath(pos, [pos[0], pos[1]-distance]))
						.union(getPath(pos, [pos[0], pos[1]+distance]))
						.union(getPath(pos, [pos[0]+distance, pos[1]+distance]))
						.union(getPath(pos, [pos[0]-distance, pos[1]-distance]))
						.union(getPath(pos, [pos[0]+distance, pos[1]-distance]))
						.union(getPath(pos, [pos[0]-distance, pos[1]+distance]))
						.without(pos)
						.uniq(function(p){ return p[0]+'_'+p[1];}).value();

/*
		for(var x = 0-distance; x <= distance; x++)
			for(var y = 0-distance; y <= distance; y++){
				var newPos = [ pos[0] + x , pos[1] + y ];
				if(!equals(newPos, pos) && isValidBoardPosition(newPos)){ 
					returnArray.push(newPos);
				}
			}
*/
		return returnArray;
	}
})