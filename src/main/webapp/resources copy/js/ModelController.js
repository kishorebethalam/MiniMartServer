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

var BrandModel = Backbone.Model.extend({
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
	url: 'http://localhost:8080/brand'
});

var listOfBrands = Backbone.Collection.extend({
    model: BrandModel,
    url: 'http://localhost:8080/brand/dto/all'
});
         
/*
 END: Definitions of the model objects used in the application.
 */
/*var Category=function(id,parentCategoryId,name,parentCategoryName){
			this.id = id;
			this.parentCategoryId = parentCategoryId;
			this.name = name;
			this.parentCategoryName = parentCategoryName;
				return this;
			};
	
var ProductMaster =function(id,brandId,categoryId,name,brandName,categoryName){
					this.id = id;
					this.brandId = brandId;
					this.categoryId = categoryId;
					this.name = name;
					this.brandName = brandName;
					this.categoryName = categoryName;
						return this;
					};
		
  
  
var Product=function(id,productMasterId,productMasterName,measurementCategory,measurementQuantity,mrp,sellPrice,buyPrice,reorderVolume,reorderFrequency){
  		this.id = id;
  		this.productMasterId = productMasterId;
  		this.productMasterName = productMasterName;
  		this.measurementCategory = measurementCategory;
  		this.measurementQuantity = measurementQuantity;
  		this.mrp = mrp;
  		this.sellPrice = sellPrice;
  		this.buyPrice = buyPrice;
  		this.reorderVolume = reorderVolume;
  		this.reorderFrequency = reorderFrequency;
  			return this;
  };
 
var Inventory = function(id,productId,productName,trackingCode,quantity,receivedDate,expiryDate,promotionalOffer,measurementCategory,measurementQuantity){
		this.id = id;
		this.productId = productId;
		this.productName = productName;
		this.trackingCode = trackingCode;
		this.quantity = quantity;
		this.receivedDate = receivedDate;
		this.expiryDate = expiryDate;
		this.promotionalOffer = promotionalOffer;
		this.measurementCategory = measurementCategory;
		this.measurementQuantity = measurementQuantity;
			return this;
		}
*/