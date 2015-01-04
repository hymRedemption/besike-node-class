module.exports = Class;


function Class(classMember) {
	var construct = null;
	// get the constructor
	if (classMember['initialize']){
		construct = classMember['initialize'];
		delete classMember['initialize']
	}
	else{
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
