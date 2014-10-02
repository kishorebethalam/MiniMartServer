var CategoryCollectionView = Backbone.View.extend({
    el: '.contentarea',
    render: function () {
        var self = this;// Saving the scope object
        var _categoryCollection = new CategoryCollection();
        _categoryCollection.fetch({
            success: function (data) {
                var _categoryTemplate = renderTemplate('category-list-template',{ categoryCollection: data.models });
                self.$el.html(_categoryTemplate);
            }
        });
    }
});

var CategoryDetailsView = Backbone.View.extend({
	el: '.contentarea',
	events: {
        'click #createCategory': 'createCategory',
        'click #updateCategory': 'updateCategory',
        'click #closeDetails': 'closeDetails'
        
    }, 
	render: function (categoryId) {
		var categoryDetails=null;
		if (categoryId) {
			var self = this;
		 
			// Category update. We need to fetch category details from server and
			// render the template.
			var _categoryModel = new CategoryModel({ id: categoryId });
	   
			_categoryModel.fetch({
				success: function (data) {
					var _categoryDetailTemplate = renderTemplate('category-details-template', { category: data });
					self.$el.html(_categoryDetailTemplate);
				}
			});
		}
		else
		{
			// Category is created
			var _categoryDetailTemplate = renderTemplate('category-details-template', { category: null });
			this.$el.html(_categoryDetailTemplate);
		}
	},
	createCategory: function () {

		// Create a category model to fill the form details
		var model = new CategoryModel({
		
				parentCategoryName: $('.category-parentCategoryName').val() ,
				parentCategoryId: $('.category-parentCategoryId').val() ,
				name: $('.category-name').val() 
		});

		model.save({}, {
			success: function () {
				window.App.appRouter.navigate('category/list', { trigger: true });// Navigate back to listing page
			}
		});
	},
	updateCategory: function () {
		// Create a category model to fill the form details
		var model = new CategoryModel({
				parentCategoryName: $('.category-parentCategoryName').val() ,
				id: $('.category-id').val() ,
				parentCategoryId: $('.category-parentCategoryId').val() ,
				name: $('.category-name').val() 
		});
		model.save({}, {
			success: function () {
				window.App.appRouter.navigate('category/list', { trigger: true });// Navigate back to listing page
			}
		});
	},
	closeDetails: function () {
		window.App.appRouter.navigate('category/list', { trigger: true });// Navigate back to listing page
	}
});
var ManufacturerCollectionView = Backbone.View.extend({
    el: '.contentarea',
    render: function () {
        var self = this;// Saving the scope object
        var _manufacturerCollection = new ManufacturerCollection();
        _manufacturerCollection.fetch({
            success: function (data) {
                var _manufacturerTemplate = renderTemplate('manufacturer-list-template',{ manufacturerCollection: data.models });
                self.$el.html(_manufacturerTemplate);
            }
        });
    }
});

var ManufacturerDetailsView = Backbone.View.extend({
	el: '.contentarea',
	events: {
        'click #createManufacturer': 'createManufacturer',
        'click #updateManufacturer': 'updateManufacturer',
        'click #closeDetails': 'closeDetails'
        
    }, 
	render: function (manufacturerId) {
		var manufacturerDetails=null;
		if (manufacturerId) {
			var self = this;
		 
			// Manufacturer update. We need to fetch manufacturer details from server and
			// render the template.
			var _manufacturerModel = new ManufacturerModel({ id: manufacturerId });
	   
			_manufacturerModel.fetch({
				success: function (data) {
					var _manufacturerDetailTemplate = renderTemplate('manufacturer-details-template', { manufacturer: data });
					self.$el.html(_manufacturerDetailTemplate);
				}
			});
		}
		else
		{
			// Manufacturer is created
			var _manufacturerDetailTemplate = renderTemplate('manufacturer-details-template', { manufacturer: null });
			this.$el.html(_manufacturerDetailTemplate);
		}
	},
	createManufacturer: function () {

		// Create a manufacturer model to fill the form details
		var model = new ManufacturerModel({
		
				name: $('.manufacturer-name').val() 
		});

		model.save({}, {
			success: function () {
				window.App.appRouter.navigate('manufacturer/list', { trigger: true });// Navigate back to listing page
			}
		});
	},
	updateManufacturer: function () {
		// Create a manufacturer model to fill the form details
		var model = new ManufacturerModel({
				id: $('.manufacturer-id').val() ,
				name: $('.manufacturer-name').val() 
		});
		model.save({}, {
			success: function () {
				window.App.appRouter.navigate('manufacturer/list', { trigger: true });// Navigate back to listing page
			}
		});
	},
	closeDetails: function () {
		window.App.appRouter.navigate('manufacturer/list', { trigger: true });// Navigate back to listing page
	}
});
var BrandCollectionView = Backbone.View.extend({
    el: '.contentarea',
    render: function () {
        var self = this;// Saving the scope object
        var _brandCollection = new BrandCollection();
        _brandCollection.fetch({
            success: function (data) {
                var _brandTemplate = renderTemplate('brand-list-template',{ brandCollection: data.models });
                self.$el.html(_brandTemplate);
            }
        });
    }
});

var BrandDetailsView = Backbone.View.extend({
	el: '.contentarea',
	events: {
        'click #createBrand': 'createBrand',
        'click #updateBrand': 'updateBrand',
        'click #closeDetails': 'closeDetails'
        
    }, 
	render: function (brandId) {
		var brandDetails=null;
		if (brandId) {
			var self = this;
		 
			// Brand update. We need to fetch brand details from server and
			// render the template.
			var _brandModel = new BrandModel({ id: brandId });
	   
			_brandModel.fetch({
				success: function (data) {
					var _brandDetailTemplate = renderTemplate('brand-details-template', { brand: data });
					self.$el.html(_brandDetailTemplate);
				}
			});
		}
		else
		{
			// Brand is created
			var _brandDetailTemplate = renderTemplate('brand-details-template', { brand: null });
			this.$el.html(_brandDetailTemplate);
		}
	},
	createBrand: function () {

		// Create a brand model to fill the form details
		var model = new BrandModel({
		
				manufacturerName: $('.brand-manufacturerName').val() ,
				manufacturerId: $('.brand-manufacturerId').val() ,
				name: $('.brand-name').val() 
		});

		model.save({}, {
			success: function () {
				window.App.appRouter.navigate('brand/list', { trigger: true });// Navigate back to listing page
			}
		});
	},
	updateBrand: function () {
		// Create a brand model to fill the form details
		var model = new BrandModel({
				manufacturerName: $('.brand-manufacturerName').val() ,
				id: $('.brand-id').val() ,
				manufacturerId: $('.brand-manufacturerId').val() ,
				name: $('.brand-name').val() 
		});
		model.save({}, {
			success: function () {
				window.App.appRouter.navigate('brand/list', { trigger: true });// Navigate back to listing page
			}
		});
	},
	closeDetails: function () {
		window.App.appRouter.navigate('brand/list', { trigger: true });// Navigate back to listing page
	}
});
var InventoryItemCollectionView = Backbone.View.extend({
    el: '.contentarea',
    render: function () {
        var self = this;// Saving the scope object
        var _inventoryItemCollection = new InventoryItemCollection();
        _inventoryItemCollection.fetch({
            success: function (data) {
                var _inventoryItemTemplate = renderTemplate('inventoryitem-list-template',{ inventoryItemCollection: data.models });
                self.$el.html(_inventoryItemTemplate);
            }
        });
    }
});

var InventoryItemDetailsView = Backbone.View.extend({
	el: '.contentarea',
	events: {
        'click #createInventoryItem': 'createInventoryItem',
        'click #updateInventoryItem': 'updateInventoryItem',
        'click #closeDetails': 'closeDetails'
        
    }, 
	render: function (inventoryItemId) {
		var inventoryItemDetails=null;
		if (inventoryItemId) {
			var self = this;
		 
			// InventoryItem update. We need to fetch inventoryItem details from server and
			// render the template.
			var _inventoryItemModel = new InventoryItemModel({ id: inventoryItemId });
	   
			_inventoryItemModel.fetch({
				success: function (data) {
					var _inventoryItemDetailTemplate = renderTemplate('inventoryItem-details-template', { inventoryItem: data });
					self.$el.html(_inventoryItemDetailTemplate);
				}
			});
		}
		else
		{
			// InventoryItem is created
			var _inventoryItemDetailTemplate = renderTemplate('inventoryItem-details-template', { inventoryItem: null });
			this.$el.html(_inventoryItemDetailTemplate);
		}
	},
	createInventoryItem: function () {

		// Create a inventoryItem model to fill the form details
		var model = new InventoryItemModel({
		
				productName: $('.inventoryItem-productName').val() ,
				measurementCategory: $('.inventoryItem-measurementCategory').val() ,
				measurementQuantity: $('.inventoryItem-measurementQuantity').val() ,
				productId: $('.inventoryItem-productId').val() ,
				trackingCode: $('.inventoryItem-trackingCode').val() ,
				quantity: $('.inventoryItem-quantity').val() ,
				receivedDate: $('.inventoryItem-receivedDate').val() ,
				expiryDate: $('.inventoryItem-expiryDate').val() ,
				promotionalOffer: $('.inventoryItem-promotionalOffer').val() 
		});

		model.save({}, {
			success: function () {
				window.App.appRouter.navigate('inventoryItem/list', { trigger: true });// Navigate back to listing page
			}
		});
	},
	updateInventoryItem: function () {
		// Create a inventoryItem model to fill the form details
		var model = new InventoryItemModel({
				productName: $('.inventoryItem-productName').val() ,
				measurementCategory: $('.inventoryItem-measurementCategory').val() ,
				measurementQuantity: $('.inventoryItem-measurementQuantity').val() ,
				id: $('.inventoryItem-id').val() ,
				productId: $('.inventoryItem-productId').val() ,
				trackingCode: $('.inventoryItem-trackingCode').val() ,
				quantity: $('.inventoryItem-quantity').val() ,
				receivedDate: $('.inventoryItem-receivedDate').val() ,
				expiryDate: $('.inventoryItem-expiryDate').val() ,
				promotionalOffer: $('.inventoryItem-promotionalOffer').val() 
		});
		model.save({}, {
			success: function () {
				window.App.appRouter.navigate('inventoryItem/list', { trigger: true });// Navigate back to listing page
			}
		});
	},
	closeDetails: function () {
		window.App.appRouter.navigate('inventoryItem/list', { trigger: true });// Navigate back to listing page
	}
});
var ProductCollectionView = Backbone.View.extend({
    el: '.contentarea',
    render: function () {
        var self = this;// Saving the scope object
        var _productCollection = new ProductCollection();
        _productCollection.fetch({
            success: function (data) {
                var _productTemplate = renderTemplate('product-list-template',{ productCollection: data.models });
                self.$el.html(_productTemplate);
            }
        });
    }
});

var ProductDetailsView = Backbone.View.extend({
	el: '.contentarea',
	events: {
        'click #createProduct': 'createProduct',
        'click #updateProduct': 'updateProduct',
        'click #closeDetails': 'closeDetails'
        
    }, 
	render: function (productId) {
		var productDetails=null;
		if (productId) {
			var self = this;
		 
			// Product update. We need to fetch product details from server and
			// render the template.
			var _productModel = new ProductModel({ id: productId });
	   
			_productModel.fetch({
				success: function (data) {
					var _productDetailTemplate = renderTemplate('product-details-template', { product: data });
					self.$el.html(_productDetailTemplate);
				}
			});
		}
		else
		{
			// Product is created
			var _productDetailTemplate = renderTemplate('product-details-template', { product: null });
			this.$el.html(_productDetailTemplate);
		}
	},
	createProduct: function () {

		// Create a product model to fill the form details
		var model = new ProductModel({
		
				productMasterName: $('.product-productMasterName').val() ,
				productMasterId: $('.product-productMasterId').val() ,
				measurementCategory: $('.product-measurementCategory').val() ,
				measurementQuantity: $('.product-measurementQuantity').val() ,
				mrp: $('.product-mrp').val() ,
				sellPrice: $('.product-sellPrice').val() ,
				buyPrice: $('.product-buyPrice').val() ,
				reorderVolume: $('.product-reorderVolume').val() ,
				reorderFrequency: $('.product-reorderFrequency').val() 
		});

		model.save({}, {
			success: function () {
				window.App.appRouter.navigate('product/list', { trigger: true });// Navigate back to listing page
			}
		});
	},
	updateProduct: function () {
		// Create a product model to fill the form details
		var model = new ProductModel({
				productMasterName: $('.product-productMasterName').val() ,
				id: $('.product-id').val() ,
				productMasterId: $('.product-productMasterId').val() ,
				measurementCategory: $('.product-measurementCategory').val() ,
				measurementQuantity: $('.product-measurementQuantity').val() ,
				mrp: $('.product-mrp').val() ,
				sellPrice: $('.product-sellPrice').val() ,
				buyPrice: $('.product-buyPrice').val() ,
				reorderVolume: $('.product-reorderVolume').val() ,
				reorderFrequency: $('.product-reorderFrequency').val() 
		});
		model.save({}, {
			success: function () {
				window.App.appRouter.navigate('product/list', { trigger: true });// Navigate back to listing page
			}
		});
	},
	closeDetails: function () {
		window.App.appRouter.navigate('product/list', { trigger: true });// Navigate back to listing page
	}
});
var ProductMasterCollectionView = Backbone.View.extend({
    el: '.contentarea',
    render: function () {
        var self = this;// Saving the scope object
        var _productMasterCollection = new ProductMasterCollection();
        _productMasterCollection.fetch({
            success: function (data) {
                var _productMasterTemplate = renderTemplate('productmaster-list-template',{ productMasterCollection: data.models });
                self.$el.html(_productMasterTemplate);
            }
        });
    }
});

var ProductMasterDetailsView = Backbone.View.extend({
	el: '.contentarea',
	events: {
        'click #createProductMaster': 'createProductMaster',
        'click #updateProductMaster': 'updateProductMaster',
        'click #closeDetails': 'closeDetails'
        
    }, 
	render: function (productMasterId) {
		var productMasterDetails=null;
		if (productMasterId) {
			var self = this;
		 
			// ProductMaster update. We need to fetch productMaster details from server and
			// render the template.
			var _productMasterModel = new ProductMasterModel({ id: productMasterId });
	   
			_productMasterModel.fetch({
				success: function (data) {
					var _productMasterDetailTemplate = renderTemplate('productMaster-details-template', { productMaster: data });
					self.$el.html(_productMasterDetailTemplate);
				}
			});
		}
		else
		{
			// ProductMaster is created
			var _productMasterDetailTemplate = renderTemplate('productMaster-details-template', { productMaster: null });
			this.$el.html(_productMasterDetailTemplate);
		}
	},
	createProductMaster: function () {

		// Create a productMaster model to fill the form details
		var model = new ProductMasterModel({
		
				brandName: $('.productMaster-brandName').val() ,
				categoryName: $('.productMaster-categoryName').val() ,
				brandId: $('.productMaster-brandId').val() ,
				categoryId: $('.productMaster-categoryId').val() ,
				name: $('.productMaster-name').val() 
		});

		model.save({}, {
			success: function () {
				window.App.appRouter.navigate('productMaster/list', { trigger: true });// Navigate back to listing page
			}
		});
	},
	updateProductMaster: function () {
		// Create a productMaster model to fill the form details
		var model = new ProductMasterModel({
				brandName: $('.productMaster-brandName').val() ,
				categoryName: $('.productMaster-categoryName').val() ,
				id: $('.productMaster-id').val() ,
				brandId: $('.productMaster-brandId').val() ,
				categoryId: $('.productMaster-categoryId').val() ,
				name: $('.productMaster-name').val() 
		});
		model.save({}, {
			success: function () {
				window.App.appRouter.navigate('productMaster/list', { trigger: true });// Navigate back to listing page
			}
		});
	},
	closeDetails: function () {
		window.App.appRouter.navigate('productMaster/list', { trigger: true });// Navigate back to listing page
	}
});
