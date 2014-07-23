angular.module('common').service('Guid', function(){

		var guid = (function() {
		  function s4() {
		  	
		    var randomSegment = Math.floor((1 + Math.random()) * 0x10000)
		               .toString(16)
		               .substring(1);
		    return randomSegment;
		  }
		  return function() {
		    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		           s4() + '-' + s4() + s4() + s4();
		  };
		})();
	
		return guid;
		
	
});