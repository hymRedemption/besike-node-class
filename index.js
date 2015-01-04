module.exports = Class;


function Class(classMember, baseClass) {
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
	if (baseClass){
		function F(){
			this.constructor = construct;
		};
		F.prototype = baseClass.prototype;
		var temp = new F();
		for( var proMethod in construct.prototype){
			temp[proMethod] = construct.prototype[proMethod];
		}
		construct.prototype = temp;
		construct["__super__"] = baseClass;
	}
	else{
		construct["__super__"] = Object;
	}
	return construct;
};
