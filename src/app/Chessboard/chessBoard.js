angular.module('chess').factory('ChessBoard', function(){
	
	var service = {
		tiles: [],
		placePiece: placePiece,
		pieceAt: pieceAt
	}
	service.tiles = getEmptyChessBoard();
	return service;

	function getEmptyChessBoard(){
		var t = [];
		for(var x = 0; x < 8; x++){
			for(var y = 0; y < 8; y++){
				t[x] = t[x] || [];
				t[x][y] = t[x][y] || {};
			}
		}
		return t;
	}

	function placePiece(position, piece){
		var x = position[0], y = position[1];

		piece.position =position;
		 service.tiles[x][y] = piece;
	}

	function pieceAt(position){
		var x = position[0], y = position[1];
		return  service.tiles[x][y];
	}

	
})