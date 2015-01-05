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

	// Implement the inheritance
	if (baseClass){
		//create temp prototype to implement the inheritance
		var temp = tempPrototype(construct, baseClass.prototype);
		//add the instance method to the temp prototype
		addInstanceMethod(temp, classMember);
		construct.prototype = temp;
		construct["__super__"] = baseClass;
	}
	else{
		//add the instance method to the temp prototype
		addInstanceMethod(construct.prototype, classMember);
		construct["__super__"] = Object;
	}
	
	//Implent the super
	var current_class = construct;
	construct.prototype.super = function(){
		if (arguments.length != 0){
			var funcName = arguments[0];
			var result;
			var old = current_class;
			current_class = current_class.__super__;
			result = current_class.prototype[funcName].apply(this, [].slice.call(arguments,1));
			current_class = old;
			return result;
		}
	};
	return construct;
};

function addInstanceMethod(constrtPrototype, methods){
	for( var method in methods){
		constrtPrototype[method] = methods[method];
	}
}

function tempPrototype(constructFunc, baseClassPrototype){
	function F(){
		this.constructor = constructFunc;
	};
	F.prototype = baseClassPrototype;
	var o = new F();
	return o;
}
