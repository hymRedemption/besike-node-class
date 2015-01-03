module.exports = Class;


function Class(classMember) {
	var construct = null;
	// get the constructor
	for ( var property in classMember ){
		if ( property === "initialize" ){
			construct = classMember[property];
		}
	}
	if ( construct == null){//no constructor 
		construct = function(){};
	}
	// add instance methods
	for ( var method in classMember){
		if ( method !== "initialize" ){
			construct.prototype[method] = classMember[method];
		}
	}
	return construct;
};
