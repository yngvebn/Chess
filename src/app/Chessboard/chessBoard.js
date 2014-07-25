angular.module('chess').factory('ChessBoard', function(boardSize){
	
	var service = {
		tiles: [],
		placePiece: placePiece,
		pieceAt: pieceAt,
		movePiece: movePiece,
		occupiedPositions: occupiedPositions
	}
	while(service.tiles.push([]) < boardSize);
	return service;

	function placePiece(position, piece){
		var x = position[0], y = position[1];

		piece.position =position;
		service.tiles[x][y] = piece;
	}

	function occupiedPositions(colors){
		var array = [];
		for(var x = 0; x< service.tiles.length; x++){
			var xtile = service.tiles[x];
			for(var y = 0; y< xtile.length; y++){
				if(xtile[y]){
					array.push([x, y]);
				}
			}
		}
		return array;
	}

	function movePiece(fromPosition, toPosition){
		var pieceAtPosition = pieceAt(fromPosition);

		if(_.isEmpty(pieceAtPosition)) throw Error("No piece at ["+fromPosition[0]+", "+fromPosition[1]+"]");

		service.tiles[fromPosition[0]][fromPosition[1]] = undefined;
		pieceAtPosition.move(toPosition);
	}

	function pieceAt(position){
		var x = position[0], y = position[1];
		var piece =  service.tiles[x][y];
		return piece || {};
	}

	
})