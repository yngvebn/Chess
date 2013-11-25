(function(){
	var controllerId = 'chessBoardController';

	angular.module(Global.AppName).controller(controllerId, ['$scope', 'chessBoardService', ChessBoardController]);

	function ChessBoardController($scope, chessBoardService){
		$scope.board = chessBoardService.board;

		$scope.selectedCell = null;

		$scope.canMove = function(cell){
            return false;

			if(!$scope.selectedCell) return false;
			for (var i = $scope.selectedCell.piece.possibleMoves.length - 1; i >= 0; i--) {
				var possibleMove = $scope.selectedCell.piece.possibleMoves[i];
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
				if(cell.piece)
					$scope.selectedCell = cell;
				
			}
			else{
				if(cell.piece)
					$scope.selectedCell = cell;
			}
		}
	}
})();