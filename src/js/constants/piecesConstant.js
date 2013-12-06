(function(){
	var constantId = 'pieces';


	var pieces = {
			rook: {
				white: {letter: 'p', startpositions: [
					{ col: 0, row: 1},
					{ col: 1, row: 1},
					{ col: 2, row: 1},
					{ col: 3, row: 1},
					{ col: 4, row: 1},
					{ col: 5, row: 1},
					{ col: 6, row: 1},
					{ col: 7, row: 1}
				] },
				black: {letter: 'o', startpositions: [
					{ col: 0, row: 6},
					{ col: 1, row: 6},
					{ col: 2, row: 6},
					{ col: 3, row: 6},
					{ col: 4, row: 6},
					{ col: 5, row: 6},
					{ col: 6, row: 6},
					{ col: 7, row: 6}
				] }, allowedMoves: [
					{
						col: 0, row: 1, onlyIfAvailable: true, restrictDirection: -1
					},
					{
						col: 0, row: 2, firstTimeOnly: true, onlyIfAvailable: true, restrictDirection: -1
					},
					{
						col: 1, row: 1, onlyIfOccupied: true, restrictDirection: -1
					},
					{
						col: -1, row: 1, onlyIfOccupied: true, restrictDirection: -1
					},
                    {
                        col: 0, row: -1, onlyIfAvailable: true, restrictDirection: 1
                    },
                    {
                        col: 0, row: -2, firstTimeOnly: true, onlyIfAvailable: true, restrictDirection: 1
                    },
                    {
                        col: 1, row: -1, onlyIfOccupied: true, restrictDirection: 1
                    },
                    {
                        col: -1, row: -1, onlyIfOccupied: true, restrictDirection: 1
                    }
				], specialMoves: [
					{
						name: 'EnPassent',
						
						onMove: function(board, to, piece){
							board.takePieceAtCoords({
								col: to.col,
								row: to.row-piece.direction
							})
						},
						getPossibleMoves: function(position, board){
							var piece = board.findPieceByCoords(position);
							function hasPassentPiece(position){
								var lastMove = _.last(board.history);
								if(!lastMove) return false;
								if(lastMove.to.col == position.col && lastMove.to.row == position.row)
								{
									if(!lastMove.firstTimeOnly) return false;
									if(lastMove.piece.name != 'rook') return false;

									return true;
								}
								return false;
							}
							var possibleMoves = [];
							if(!board.findPieceByCoords({ col: position.col -1, row: position.row + piece.direction }))
								if(hasPassentPiece({ col: position.col -1, row: position.row})) possibleMoves.push({ col: position.col -1, row: position.row + piece.direction, onMove: this.onMove });
							
							if(!board.findPieceByCoords({ col: position.col +1, row: position.row + piece.direction }))	
								if(hasPassentPiece({ col: position.col +1, row: position.row})) possibleMoves.push({ col: position.col +1, row: position.row + piece.direction, onMove: this.onMove });;

							return possibleMoves;
						}
					}
				]
			},
			knight: {
				white: {letter: 'h', startpositions: [{ col: 1, row: 0},{ col: 6, row: 0} ] },
				black: {letter: 'j', startpositions: [{ col: 1, row: 7},{ col: 6, row: 7} ] },
				canSkipPieces: true,
				allowedMoves:[
					{ col: 1, row: 2 },
					{ col: -1, row: 2 },
					{ col: 1, row: -2 },
					{ col: -1, row: -2 },
					{ col: 2, row: 1 },
					{ col: -2, row: 1 },
					{ col: 2, row: -1 },
					{ col: -2, row: -1 },
				]
			},
			king: {
				white: {letter: 'k', startpositions: [ { col: 4, row: 0} ] },
				black: {letter: 'l', startpositions: [ { col: 4, row: 7} ] },
				allowedMoves:[
					{ col: 1, row: 1 },
					{ col: -1, row: 1 },
					{ col: 1, row: -1 },
					{ col: -1, row: -1 },
					{ col: 0, row: -1 },
					{ col: 0, row: 1 },
					{ col: 1, row: 0 },
					{ col: -1, row: 0 },
				], specialMoves: [
					{
						name: 'Castling',
						
						onMove: function(board, to, piece){
							var row = to.row;
							var tower = {};
							if(to.col == 2){
								tower = board.findPieceByCoords({ row: row, col: 0});
							}
							else{
								tower = board.findPieceByCoords({ row: row, col: 7});	
							}
							var forceMovePosition = { row: row, col: (tower.position.col == 0 ? 3 : 5) };
							board.movePiece(tower, forceMovePosition, true);
						},
						getPossibleMoves: function(position, board){
							var piece = board.findPieceByCoords(position);
							var possibleMoves = [];
							if(piece.history.length > 0) return possibleMoves;

							// find tower
							var row = piece.position.row;
							var towers = [ board.findPieceByCoords({ col: 0, row: row }), board.findPieceByCoords({ col: 7, row: row}) ];
							for (var i = towers.length - 1; i >= 0; i--) {
								var tower = towers[i];
								if(tower && tower.history.length == 0){
									if(tower.position.col == 0){
										possibleMoves.push({ col: 2, row: row, onMove: this.onMove});
									}
									else{
										possibleMoves.push({ col: 6, row: row, onMove: this.onMove});
									}
								}
							};

							// if tower has history, return empty



							return possibleMoves;
						}
					}
				]
			},
			queen: {
				white: {letter: 'q', startpositions: [{ col: 3, row: 0} ] },
				black: {letter: 'w', startpositions: [{ col: 3, row: 7} ] },
				allowedMoves:[
					{ col: 0, row: 1},
					{ col: 0, row: 2},
					{ col: 0, row: 3},
					{ col: 0, row: 4},
					{ col: 0, row: 5},
					{ col: 0, row: 6},
					{ col: 0, row: 7},
					{ col: 0, row: 8},
					{ col: 1, row: 0},
					{ col: 2, row: 0},
					{ col: 3, row: 0},
					{ col: 4, row: 0},
					{ col: 5, row: 0},
					{ col: 6, row: 0},
					{ col: 7, row: 0},
					{ col: 0, row: -1},
					{ col: 0, row: -2},
					{ col: 0, row: -3},
					{ col: 0, row: -4},
					{ col: 0, row: -5},
					{ col: 0, row: -6},
					{ col: 0, row: -7},
					{ col: 0, row: 8},
					{ col: -1, row: 0},
					{ col: -2, row: 0},
					{ col: -3, row: 0},
					{ col: -4, row: 0},
					{ col: -5, row: 0},
					{ col: -6, row: 0},
					{ col: -7, row: 0},
					{ col: 1, row: 1 },
					{ col: 2, row: 2 },
					{ col: 3, row: 3 },
					{ col: 4, row: 4 },
					{ col: 5, row: 5 },
					{ col: 6, row: 6 },
					{ col: 7, row: 7 },
					{ col: 8, row: 8 },
					{ col: 1, row: -1 },
					{ col: 2, row: -2 },
					{ col: 3, row: -3 },
					{ col: 4, row: -4 },
					{ col: 5, row: -5 },
					{ col: 6, row: -6 },
					{ col: 7, row: -7 },
					{ col: 8, row: -8 },
					{ col: -1, row: 1 },
					{ col: -2, row: 2 },
					{ col: -3, row: 3 },
					{ col: -4, row: 4 },
					{ col: -5, row: 5 },
					{ col: -6, row: 6 },
					{ col: -7, row: 7 },
					{ col: -8, row: 8 },
					{ col: -1, row: -1 },
					{ col: -2, row: -2 },
					{ col: -3, row: -3 },
					{ col: -4, row: -4 },
					{ col: -5, row: -5 },
					{ col: -6, row: -6 },
					{ col: -7, row: -7 },
					{ col: -8, row: -8 }
				]
			},
			bishop: {
				white: {letter: 'b', startpositions: [{ col: 2, row: 0},{ col: 5, row: 0}  ] },
				black: {letter: 'n', startpositions: [{ col: 2, row: 7},{ col: 5, row: 7}  ] },
				allowedMoves:[
				
					{ col: 1, row: 1 },
					{ col: 2, row: 2 },
					{ col: 3, row: 3 },
					{ col: 4, row: 4 },
					{ col: 5, row: 5 },
					{ col: 6, row: 6 },
					{ col: 7, row: 7 },
					{ col: 8, row: 8 },
					{ col: 1, row: -1 },
					{ col: 2, row: -2 },
					{ col: 3, row: -3 },
					{ col: 4, row: -4 },
					{ col: 5, row: -5 },
					{ col: 6, row: -6 },
					{ col: 7, row: -7 },
					{ col: 8, row: -8 },
					{ col: -1, row: 1 },
					{ col: -2, row: 2 },
					{ col: -3, row: 3 },
					{ col: -4, row: 4 },
					{ col: -5, row: 5 },
					{ col: -6, row: 6 },
					{ col: -7, row: 7 },
					{ col: -8, row: 8 },
					{ col: -1, row: -1 },
					{ col: -2, row: -2 },
					{ col: -3, row: -3 },
					{ col: -4, row: -4 },
					{ col: -5, row: -5 },
					{ col: -6, row: -6 },
					{ col: -7, row: -7 },
					{ col: -8, row: -8 }
				]
			},
			tower: {
				white: { letter: 'r', startpositions: [{ col: 0, row: 0},{ col: 7, row: 0}  ]},
				black: { letter: 't', startpositions: [{ col: 0, row: 7} ,{ col: 7, row: 7} ]},
				allowedMoves:[
					{ col: 0, row: 1},
					{ col: 0, row: 2},
					{ col: 0, row: 3},
					{ col: 0, row: 4},
					{ col: 0, row: 5},
					{ col: 0, row: 6},
					{ col: 0, row: 7},
					{ col: 0, row: 8},
					{ col: 1, row: 0},
					{ col: 2, row: 0},
					{ col: 3, row: 0},
					{ col: 4, row: 0},
					{ col: 5, row: 0},
					{ col: 6, row: 0},
					{ col: 7, row: 0},
					{ col: 0, row: -1},
					{ col: 0, row: -2},
					{ col: 0, row: -3},
					{ col: 0, row: -4},
					{ col: 0, row: -5},
					{ col: 0, row: -6},
					{ col: 0, row: -7},
					{ col: 0, row: 8},
					{ col: -1, row: 0},
					{ col: -2, row: 0},
					{ col: -3, row: 0},
					{ col: -4, row: 0},
					{ col: -5, row: 0},
					{ col: -6, row: 0},
					{ col: -7, row: 0}
				]
			}

		}

		angular.module(Global.AppName).constant(constantId, pieces);

})();