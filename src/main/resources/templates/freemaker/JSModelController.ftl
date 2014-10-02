/*Utility method to configure the urls for sync operations. */
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
/* JS Object to represent ${modelClassName} */
var ${modelClassName}Model = Backbone.Model.extend({
	defaults: {
		<#assign fields = fieldsByModel[modelClassName]>
		<#list fields as fieldName>
		${fieldName}: null<#if fieldName_has_next>,</#if>
		</#list>
	},
	"sync": mySyncFunction,
	initialize: function () {
	},
	url: 'http://localhost:8080/${modelClassName?uncap_first}'
});

/* JS Object to represent ${modelClassName}Collection */

var ${modelClassName}Collection = Backbone.Collection.extend({
    model: ${modelClassName}Model,
    url: 'http://localhost:8080/${modelClassName?uncap_first}/dto/all'
});
</#list>
