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

/* JS Object to represent Category */
var CategoryModel = Backbone.Model.extend({
	defaults: {
		parentCategoryName: null,
		id: null,
		parentCategoryId: null,
		name: null
	},
	"sync": mySyncFunction,
	initialize: function () {
	},
	url: 'http://localhost:8080/category'
});

/* JS Object to represent CategoryCollection */

var CategoryCollection = Backbone.Collection.extend({
    model: CategoryModel,
    url: 'http://localhost:8080/category/dto/all'
});
/* JS Object to represent Manufacturer */
var ManufacturerModel = Backbone.Model.extend({
	defaults: {
		id: null,
		name: null
	},
	"sync": mySyncFunction,
	initialize: function () {
	},
	url: 'http://localhost:8080/manufacturer'
});

/* JS Object to represent ManufacturerCollection */

var ManufacturerCollection = Backbone.Collection.extend({
    model: ManufacturerModel,
    url: 'http://localhost:8080/manufacturer/dto/all'
});
/* JS Object to represent Brand */
var BrandModel = Backbone.Model.extend({
	defaults: {
		manufacturerName: null,
		id: null,
		manufacturerId: null,
		name: null
	},
	"sync": mySyncFunction,
	initialize: function () {
	},
	url: 'http://localhost:8080/brand'
});

/* JS Object to represent BrandCollection */

var BrandCollection = Backbone.Collection.extend({
    model: BrandModel,
    url: 'http://localhost:8080/brand/dto/all'
});
/* JS Object to represent InventoryItem */
var InventoryItemModel = Backbone.Model.extend({
	defaults: {
		productName: null,
		measurementCategory: null,
		measurementQuantity: null,
		id: null,
		productId: null,
		trackingCode: null,
		quantity: null,
		receivedDate: null,
		expiryDate: null,
		promotionalOffer: null
	},
	"sync": mySyncFunction,
	initialize: function () {
	},
	url: 'http://localhost:8080/inventoryItem'
});

/* JS Object to represent InventoryItemCollection */

var InventoryItemCollection = Backbone.Collection.extend({
    model: InventoryItemModel,
    url: 'http://localhost:8080/inventoryItem/dto/all'
});
/* JS Object to represent Product */
var ProductModel = Backbone.Model.extend({
	defaults: {
		productMasterName: null,
		id: null,
		productMasterId: null,
		measurementCategory: null,
		measurementQuantity: null,
		mrp: null,
		sellPrice: null,
		buyPrice: null,
		reorderVolume: null,
		reorderFrequency: null
	},
	"sync": mySyncFunction,
	initialize: function () {
	},
	url: 'http://localhost:8080/product'
});

/* JS Object to represent ProductCollection */

var ProductCollection = Backbone.Collection.extend({
    model: ProductModel,
    url: 'http://localhost:8080/product/dto/all'
});
/* JS Object to represent ProductMaster */
var ProductMasterModel = Backbone.Model.extend({
	defaults: {
		brandName: null,
		categoryName: null,
		id: null,
		brandId: null,
		categoryId: null,
		name: null
	},
	"sync": mySyncFunction,
	initialize: function () {
	},
	url: 'http://localhost:8080/productMaster'
});

/* JS Object to represent ProductMasterCollection */

var ProductMasterCollection = Backbone.Collection.extend({
    model: ProductMasterModel,
    url: 'http://localhost:8080/productMaster/dto/all'
});
