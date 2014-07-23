angular.module('chessPieces').factory('Piece', function(Guid){
	
	function piece(name){
		
		this.id = Guid();
		this.name = name;
		this.position = [0, 0]

		
	}

	piece.prototype.position = function(pos){
		return this.position(pos);
	}

	piece.prototype.name = '';
	piece.prototype.id = '';

	
	return function(name){
			function construct(){
				piece.call(this, name);
			}

			construct.prototype = Object.create(piece.prototype);
			construct.prototype.constructor = construct;
		
			return  construct;
	}
});