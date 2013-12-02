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