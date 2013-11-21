(function(){
	var controllerId = 'chessBoardController';

	angular.module(Global.AppName).controller(controllerId, ['$scope', 'chessBoardService', ChessBoardController]);

	function ChessBoardController($scope, chessBoardService){
		$scope.board = chessBoardService.board;

		$scope.selectedCell = {};

		$scope.select = function(cell){
			if($scope.selectedCell && !cell.piece){
				chessBoardService.movePiece($scope.selectedCell, cell);
				$scope.selectedCell = null;
			}
			else{
			$scope.selectedCell = cell;
			}
		}
	}
})();