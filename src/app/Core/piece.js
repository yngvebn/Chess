angular.module('chessPieces').factory('Piece', function(Guid){
	
	function piece(name, options){
		var piece = this;
		var opts = {};

		this.id = Guid();
		this.name = name;
		this.position = [0, 0]
		this.history = [];

		angular.extend(opts, options);
		this.move = function(pos){
			this.history.push(pos);
			this.position = pos;
		}

		this.getMovesFrom = function(pos){
			if(!opts.getMovesFrom) throw Error("Method not implemented");
			return opts.getMovesFrom.call(piece, pos);
		}
	}

	piece.prototype.name = '';
	piece.prototype.id = '';
	
	return function(name, options){
			function construct(){
				piece.call(this, name, options);
			}

			construct.prototype = Object.create(piece.prototype);
			construct.prototype.constructor = construct;
		
			return  construct;
	}
});