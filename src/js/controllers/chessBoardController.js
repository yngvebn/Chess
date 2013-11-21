(function(){
	var controllerId = 'chessBoardController';

	angular.module(Global.AppName).controller(controllerId, ['$scope', 'chessBoardService', ChessBoardController]);

	function ChessBoardController($scope, chessBoardService){
		$scope.board = chessBoardService.board;

		$scope.selectedCell = null;

		$scope.select = function(cell){
			if($scope.selectedCell){
				if(chessBoardService.movePiece($scope.selectedCell, cell)){
				}
				$scope.selectedCell = null;
				
			}
			else{
				if(cell.piece)
					$scope.selectedCell = cell;
			}
		}
	}
})();