(function(){
	var controllerId = 'chessBoardController';

	angular.module(Global.AppName).controller(controllerId, ['$scope', 'chessBoardService', ChessBoardController]);

	function ChessBoardController($scope, chessBoardService){
		$scope.board = chessBoardService.board;
	}
})();