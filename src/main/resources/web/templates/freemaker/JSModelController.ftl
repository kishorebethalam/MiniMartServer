function mySyncFunction(method, model, options){
  if(method=="read"){
    options.url = model.url + '/dto/' + model.get('id'); 
  }else if(method=='create'){
  	options.url = model.url + '/add'; 
  }
  else if(method=='update'){
  	options.url = model.url + '/update'; 
  }
  else if(method=='delete'){
  	options.url = model.url + '/' + model.get('id'); 
  }
  return Backbone.sync(method, model, options);
}

var ModelController = function() {
    return this;
};

<#list dtoClasses as modelClassName>
var ${modelClassName}Model = Backbone.Model.extend({
	defaults: {
		id: null,
		manufacturerId: null,
		name: null,
		manufacturerName: null
	},
	"sync": mySyncFunction,
	initialize: function () {
	   // Do stuff's which you want at the time of model creation
	   console.log('in init');
	},
	url: 'http://localhost:8080/${modelClassName}'
});

var listOf${classNamePlural} = Backbone.Collection.extend({
    model: ${className}Model,
    url: 'http://localhost:8080/${modelClassName}/dto/all'
});
</#list>
