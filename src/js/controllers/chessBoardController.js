(function(){
	var controllerId = 'chessBoardController';

	angular.module(Global.AppName).controller(controllerId, ['$scope', 'chessBoardService', ChessBoardController]);

	function ChessBoardController($scope, chessBoardService){
		$scope.board = chessBoardService.board;

		$scope.selectedCell = null;

		$scope.canMove = function(cell){
            if(!cell.piece) return false;
			if(!$scope.selectedCell) return false;
            console.log('can move', cell);

			var possibleMoves= chessBoardService.board.getAllPossibleMoves(cell.piece);
			for (var i = possibleMoves.length - 1; i >= 0; i--) {
				var possibleMove = possibleMoves[i];

				if(cell.col == possibleMove.col && cell.row == possibleMove.row) return true;

			};
			return false;
		}

		$scope.select = function(cell){
			if($scope.selectedCell){
				if(chessBoardService.board.movePiece($scope.selectedCell.piece, cell)){
					$scope.selectedCell = null;

                    /*if(chessBoardService.isCheckMate(cell)){
						alert('Check mate!');
					}*/
				}
				else
				if(cell.piece){
					$scope.selectedCell = cell;
				}
				
			}
			else{
				if(cell.piece)
					$scope.selectedCell = cell;
			}
		}
	}
})();