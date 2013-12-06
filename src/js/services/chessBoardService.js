var Piece = function(piece, color, startPosition){
    var position = {row: 0, col: 0}, history = [];
    if(startPosition){
        position.col = startPosition.col;
        position.row = startPosition.row;
    }

    var id = (startPosition.col+1)*(startPosition.row+1);
	var options = {
		piece: piece,
		color: color
	};

    function calculateDifference(from, to){
        return {
            row: from.row - to.row,
            col: from.col - to.col
        }
    }

    function findAllowedMove(board, from, to){
    	var moves = [];
    	var difference = calculateDifference(from, to);


        var normalMoves = _.find(options.piece.allowedMoves, function(move){
        	if(move.restrictDirection)
        		if(move.restrictDirection != options.piece.direction) return false;

            return move.col == difference.col && move.row == difference.row;
        });

        var specialMoves = [];
        if(options.piece.specialMoves)
	        for (var i = options.piece.specialMoves.length - 1; i >= 0; i--) {
	         	var specialMoveCoords = options.piece.specialMoves[i].getPossibleMoves(from, board);
	         	for (var i = specialMoveCoords.length - 1; i >= 0; i--) {
	         		if(specialMoveCoords[i].col == to.col && specialMoveCoords[i].row == to.row)
	         			specialMoves.push(specialMoveCoords[i]);
	         	};
	        };

        moves = moves.concat(specialMoves);
        if(normalMoves)
        	moves = moves.concat(normalMoves);
        return moves;
    }

    function isMoveAllowed(action, board, to){
    	if(board.hasPieceAtCoords(to))
        	if(board.findPieceByCoords(to).color == options.color) return false;
		if(!options.piece.canSkipPieces) 
	    		if(board.hasPiecesInPath(position, to)) return false;
    
        if(action.onlyIfAvailable && board.hasPieceAtCoords(to)) return false;
        if(action.onlyIfOccupied && !board.hasPieceAtCoords(to)) return false;
        if(action.firstTimeOnly && history.length > 0) return false;
        return true;
    }

	function move(board, to, force, callback){
		var allowedMove = {};
		if(!force){
	        var actions = findAllowedMove(board, this.position, to);
	        if(actions.length == 0) return false;
	        allowedMove = _.find(actions, function(action){
	        	return isMoveAllowed(action, board, to);
	        })
	        if(!allowedMove) return false;
	        
	        if(allowedMove.onMove) allowedMove.onMove(board, to, piece);
        }
        else{
        	allowedMove.firstTimeOnly = true;
        }
        var move = {
            piece: piece,
            firstTimeOnly: allowedMove.firstTimeOnly,
            from: {
                row: position.row,
                col: position.col
            },
            to: {
                row: to.row,
                col: to.col
            }
        };
        history.push(move);
        position.row = to.row;
        position.col = to.col;
        callback(move);
        return true;
	}

	return {
		id: id,
		move: move,
		color: options.color,
        position: position,
        history: history,
        letter: piece.letter,
        direction: piece.direction,
        specialMoves: options.piece.specialMoves
    }
};

var Board = function(){
    var self = this, pieces = [], rows = [], history = [], takenPieces = [];
    rows = getBlankBoard();


    return {
    	takenPieces: takenPieces,
        findPieceByName: findPieceByName,
        findPieceByCoords: findPieceByCoords,
        hasPieceAtCoords: hasPieceAtCoords,
        hasPiecesInPath: hasPiecesInPath,
        movePiece: movePiece,
        takePieceAtCoords: takePieceAtCoords,
        rows: rows,
        init: init,
        load: load,
        history: history
    }

    function takePieceAtCoords(coords){
    	var piece = _.find(pieces, function(p){
    		return p.position.col == coords.col && p.position.row == coords.row
    	});
    	pieceWasTaken(piece);
    }

    function pieceWasTaken(piece){
    	piece.taken = true;
    	rows[piece.position.row].cells[piece.position.col].piece = null;
    	takenPieces.push(piece);
    }

    function getBlankBoard(){
        var newRows = [];
        for(var row = 0; row<8; row++){
            var thisRow = { cells : []};
            for(var col = 0; col<8; col++){
                thisRow.cells.push({
                    piece: null,
                    col: col,
                    row: row
                });
            }
            newRows.push(thisRow);
        }

        return newRows;
    }

    function copy(coords){
    	return {
    		row: coords.row,
    		col: coords.col
    	}	
    }

    function areEqual(point1, point2){
    	return point1.col == point2.col && point1.row == point2.row;
    }

    function getCoordsBetween(from, to){
    	var path = [];

    	var source = copy(from);
    	var destination = copy(to);

    	var current = copy(from);

    	while(!areEqual(destination, current)){
				var row = destination.row == source.row ? source.row : 
					(destination.row > source.row ? current.row+1 : current.row-1);
				var col = destination.col == source.col ? source.col : (destination.col > source.col ? current.col+1 : current.col-1);
				var cell = {
					col: col,
					row: row
				};
				if(!areEqual(destination, cell) && !areEqual(source, cell))
					path.push(cell);
				current = cell;
			}
			return path;

    }

    function hasPiecesInPath(from, to){
    	var coordsBetween = getCoordsBetween(from, to);
    	for (var i = coordsBetween.length - 1; i >= 0; i--) {
    		var coord = coordsBetween[i];
    		if(hasPieceAtCoords(coord)) return true;
    	};
    }


    function findPieceByName(color, name){
        return _.find(pieces, function(piece){
            return piece.name === name && piece.color === color
        });
    }

    function findPieceByCoords(coords){
        var piece = _.find(pieces, function(piece){
            return piece.position.row === coords.row && piece.position.col == coords.col && !piece.taken;
        });

    	return piece;
    }

    function hasPieceAtCoords(coords){
        if(!findPieceByCoords(coords)) return false;
        return true;
    }

    function movePiece(piece, to, force){
        var oldPosition = {
            col: piece.position.col,
            row: piece.position.row
        };
    	
        var pieceAtCoords = findPieceByCoords(to);
        return piece.move(this, to, force, function(move){
        	if(pieceAtCoords){
    			pieceWasTaken(pieceAtCoords);
    		}
        	rows[oldPosition.row].cells[oldPosition.col].piece = null;
            rows[to.row].cells[to.col].piece = piece;
            history.push(move);
        });
    }


    function addPiece(piece){
        pieces.push(piece);
        rows[piece.position.row].cells[piece.position.col].piece = piece;
    }


    function init(pieces, callback){
    	var whiteDirection = 1;
    	var blackDirection = -1;
        for(var pieceDefinitionIndex in pieces){
            var pieceDefinition = pieces[pieceDefinitionIndex];
            var whitePiece = pieceDefinition['white'];
            var blackPiece = pieceDefinition['black'];
            for(var startPosition in whitePiece.startpositions){
                var piece = new Piece({ direction: whiteDirection, name: pieceDefinitionIndex, letter: whitePiece.letter, specialMoves: pieceDefinition.specialMoves, allowedMoves: pieceDefinition.allowedMoves, canSkipPieces: pieceDefinition.canSkipPieces}, 'white', whitePiece.startpositions[startPosition]);
                addPiece(piece);
            }
            for(var startPosition in blackPiece.startpositions){
                var piece = new Piece({ direction: blackDirection, name: pieceDefinitionIndex, letter: blackPiece.letter,specialMoves: pieceDefinition.specialMoves, allowedMoves: pieceDefinition.allowedMoves, canSkipPieces: pieceDefinition.canSkipPieces}, 'black', blackPiece.startpositions[startPosition]);
                addPiece(piece);
            }
        }
        callback(this);
        return self;
    }

    function load(history){
        return self;
    }

};

(function(){
	var serviceName = 'chessBoardService';
	angular.module(Global.AppName).service(serviceName, ['pieces', ChessBoardService]);

	function ChessBoardService(pieces){
		var service = {
			board: {},
			pieces: [],
			movePiece: movePiece,
			isCheckMate: isCheckMate

		};
        new Board().init(pieces, function(board){
            service.board = board;
            console.log(board);
        });
        return service;

		var getPath = function(s, d){
			var source = {
				col: s.col,
				row: s.row
			};
			var destination = {
				col: d.col,
				row: d.row
			};
			var path = [];
			var current = source;
			while(JSON.stringify(destination) != JSON.stringify(current)){
				var row = destination.row == source.row ? source.row : 
					(destination.row > source.row ? current.row+1 : current.row-1);
				var col = destination.col == source.col ? source.col : (destination.col > source.col ? current.col+1 : current.col-1);
				var cell = {
					col: col,
					row: row
				};
				if(JSON.stringify(destination) != JSON.stringify(cell) && JSON.stringify(source) != JSON.stringify(cell))
					path.push(cell);
				current = cell;
			}
			return path;
		}

		var pieceInPath = function(source, destination){
			var positionsInPath = getPath(source, destination);
			for (var i = positionsInPath.length - 1; i >= 0; i--) {
				var pos = positionsInPath[i]
				if(service.board[pos.row].cells[pos.col].piece) return true;
			};
		}

		var findKingPosition = function(color){
			for (var row = service.board.length - 1; row >= 0; row--) {
				for (var col = service.board[row].cells.length - 1; col >= 0; col--) {
					var piece = service.board[row].cells[col].piece;
					if(piece){
						if(piece.color == color && piece.name == 'king')
							return service.board[row].cells[col];
					}
				};
				
			};
		}

		var piecePositions = {};

		var recalculatePiecePositions = function(color){
			if(!color){
				recalculatePiecePositions('black');
				recalculatePiecePositions('white');
				return;
			}
			var pieces = [];
			for (var row = service.board.length - 1; row >= 0; row--) {
				for (var col = service.board[row].cells.length - 1; col >= 0; col--) {
					var piece = service.board[row].cells[col].piece;
					if(piece){
						if(piece.color == color)
						{
							pieces.push(service.board[row].cells[col]);
						}
					}
				};
				
			};
			piecePositions[color] = pieces;
		}

		var getAllPiecePositions = function(color){
			
			return piecePositions[color];
		}

		var willCauseSelfCheck = function(source, destination)
		{
		
			var pieceCurrentlyInDestination = destination.piece;
			var pieceCurrentlyInSource = source.piece;

			destination.piece = source.piece;
			source.piece = null;
			
			var sourcePiece = pieceCurrentlyInSource;
			var piece = pieces[sourcePiece.name];

			var kingPosition = findKingPosition(sourcePiece.color);
			
			var opposingColor = sourcePiece.color == 'white' ? 'black' : 'white';
			var wouldCauseCheck = false;
			var opposingPiecePositions = getAllPiecePositions(opposingColor);
			for (var i = opposingPiecePositions.length - 1; i >= 0; i--) {
				if(isAllowedMove(opposingPiecePositions[i], kingPosition)) {
					
					wouldCauseCheck = true;
				}
			};

			destination.piece = pieceCurrentlyInDestination;
			source.piece = pieceCurrentlyInSource;

			
			return wouldCauseCheck;
		}

		var isAllowedMove = function(source, destination){

			var piece = pieces[source.piece.name];
			var direction = source.piece.color == 'white' ? 1 : -1; 
			var isFirstTimeMove = !source.piece.history;
			
			
			var isMoveAllowed = false;
			var offset = {
				col: destination.col - source.col,
				row: destination.row - source.row
			};

			for(var allowedMove in piece.allowedMoves){
				var move = piece.allowedMoves[allowedMove]
				var moveOffset = {
					col: move.col,
					row: move.row * direction
				};
				if(JSON.stringify(moveOffset) === JSON.stringify(offset)){
					isMoveAllowed = true;
					if(move.firstTimeOnly){
						if(!isFirstTimeMove) return false;
					}
					if(move.onlyIfOccupied){
						isMoveAllowed = (move.onlyIfOccupied && destination.piece);
					} 
					if(move.onlyIfAvailable){
						isMoveAllowed = !destination.piece;
					}
				}
			}
			if(!isMoveAllowed) return false;
			if(!piece.canSkipPieces){
				if(pieceInPath(source, destination)) return false;
			}
			if(destination.piece)
			{
				if(source.piece.color === destination.piece.color) return false;
			}
			return true;
		}

		function getCell(row, col){
			return service.board[row].cells[col];
		}
		function recalculateAvailableMoves(){
			var start = new Date().getTime();

			var blackPieces = getAllPiecePositions('black');
			var whitePieces = getAllPiecePositions('white');
			var allPieces = blackPieces.concat(whitePieces);
			for (var i = allPieces.length - 1; i >= 0; i--) {
				var source = allPieces[i];
				source.piece.possibleMoves = [];

				for(var row = 0; row < 8; row++){
					for(var col = 0; col < 8; col++){
						var destination = getCell(row, col);

						if(isAllowedMove(source, destination)  && !willCauseSelfCheck(source, destination)){
							source.piece.possibleMoves.push(destination);
						}
					};
				}
			}
			
			var end = new Date().getTime();
			var time = end - start;

			console.log('recalculateAvailableMoves ' + time);
		}

		resetBoard();
		setUpStartPositions();
		
		recalculatePiecePositions();
		recalculateAvailableMoves();

		function isCheckMate(destinationCell){
			var destination = service.board[destinationCell.row].cells[destinationCell.col];
			var colorOfMovedPiece = destination.piece.color;
			var opposingColor = colorOfMovedPiece == 'white' ? 'black' : 'white';

			var pieces = getAllPiecePositions(opposingColor);
			for (var i = pieces.length - 1; i >= 0; i--) {
				if(pieces[i].piece.possibleMoves.length > 0) return false;
			};
			return true;
		}

		function movePiece(sourceCell, destinationCell){
			var source = service.board[sourceCell.row].cells[sourceCell.col];
			var destination = service.board[destinationCell.row].cells[destinationCell.col];
			if(!isAllowedMove(source, destination)) return false;
			
			var piece = source.piece;
			piece.history = piece.history || [];
			piece.history.push({
				source: sourceCell, destination: destinationCell
			});
			if(willCauseSelfCheck(source, destination)){
				return false;
			}
			
			destination.piece = piece;

			source.piece = null;

			setTimeout(function(){
				recalculatePiecePositions();
				recalculateAvailableMoves();
				}, 10);
			


			return true;
		}

		

		function setUpStartPositions(){
			for(var p in pieces){
				var piece = pieces[p];
				var whiteStartPositions = piece.white.startpositions;
				var blackStartPositions = piece.black.startpositions;
				for(var pos in whiteStartPositions){
					var position = whiteStartPositions[pos];
					service.board[position.row].cells[position.col].piece = {
						color: 'white',
						letter: piece.white.letter,
						name: p,
					}
				}
				for(var pos in blackStartPositions){
					var position = blackStartPositions[pos];
					service.board[position.row].cells[position.col].piece = {
						color: 'black',
						letter: piece.black.letter,
						name: p
					}
				}
			}

		}

		function resetBoard(){
			var board = [];
			var x = ['a', 'b', 'c','d','e','f','g','h'];
			for(var j = 0; j < 8; j++){
				var row = {
					index: j,
					cells: []
				}
				for (var i = 0; i < x.length; i++) {
					var letter = x[i];
					var cell = {
						row: j,
						col: i,
						letter: letter
					}
					row.cells.push(cell);
					
				}
				board.push(row);
			};
			service.board = board;

		}
	}

	ChessBoardService();
})();