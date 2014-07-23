angular.module('chessPieces').provider('Piece', function(){
	
	var piece = {
		name : ''
	}

	this.$get = function(){
		return piece;
	}

});