function setupDynamicRouting() {
	
	var AppRouter = Backbone.Router.extend({
	
		initialize: function(){
    		this.appView = window.AppView;
  		},
        routes: {
        	'': 'home',//Default route, when no hash tag is available
        	        	'category/list': 'listCategory',
        	'category/create': 'createCategory',
        	'category/edit/:id': 'editCategory',
        	'category/delete/:id': 'deleteCategory',        		        		        		
        	'manufacturer/list': 'listManufacturer',
        	'manufacturer/create': 'createManufacturer',
        	'manufacturer/edit/:id': 'editManufacturer',
        	'manufacturer/delete/:id': 'deleteManufacturer',        		        		        		
        	'brand/list': 'listBrand',
        	'brand/create': 'createBrand',
        	'brand/edit/:id': 'editBrand',
        	'brand/delete/:id': 'deleteBrand',        		        		        		
        	'inventoryItem/list': 'listInventoryItem',
        	'inventoryItem/create': 'createInventoryItem',
        	'inventoryItem/edit/:id': 'editInventoryItem',
        	'inventoryItem/delete/:id': 'deleteInventoryItem',        		        		        		
        	'product/list': 'listProduct',
        	'product/create': 'createProduct',
        	'product/edit/:id': 'editProduct',
        	'product/delete/:id': 'deleteProduct',        		        		        		
        	'productMaster/list': 'listProductMaster',
        	'productMaster/create': 'createProductMaster',
        	'productMaster/edit/:id': 'editProductMaster',
        	'productMaster/delete/:id': 'deleteProductMaster'        		        		        		
        }
    });

    // Instantiate the router
     var route = new AppRouter();
		 // When hash tag has localhost# register the below route
	route.on('route:home', function () {
//		route.navigate('brand/list', { trigger: true });
	});

    
    route.on('route:listCategory', function () {
		var listView = new CategoryCollectionView();
		listView.render();
	});
	route.on('route:createCategory', function () {
		var detailsView = new CategoryDetailsView();
    	detailsView.render();
    });
	route.on('route:editCategory', function (id) {
		var detailsView = new CategoryDetailsView();
	   	detailsView.render(id);
	});
	route.on('route:deleteCategory', function (id) {
		var model = new CategoryModel({'id':id});
		model.destroy();
		route.navigate('category/list', { trigger: true });// Navigate back to listing page
	});
    
    route.on('route:listManufacturer', function () {
		var listView = new ManufacturerCollectionView();
		listView.render();
	});
	route.on('route:createManufacturer', function () {
		var detailsView = new ManufacturerDetailsView();
    	detailsView.render();
    });
	route.on('route:editManufacturer', function (id) {
		var detailsView = new ManufacturerDetailsView();
	   	detailsView.render(id);
	});
	route.on('route:deleteManufacturer', function (id) {
		var model = new ManufacturerModel({'id':id});
		model.destroy();
		route.navigate('manufacturer/list', { trigger: true });// Navigate back to listing page
	});
    
    route.on('route:listBrand', function () {
		var listView = new BrandCollectionView();
		listView.render();
	});
	route.on('route:createBrand', function () {
		var detailsView = new BrandDetailsView();
    	detailsView.render();
    });
	route.on('route:editBrand', function (id) {
		var detailsView = new BrandDetailsView();
	   	detailsView.render(id);
	});
	route.on('route:deleteBrand', function (id) {
		var model = new BrandModel({'id':id});
		model.destroy();
		route.navigate('brand/list', { trigger: true });// Navigate back to listing page
	});
    
    route.on('route:listInventoryItem', function () {
		var listView = new InventoryItemCollectionView();
		listView.render();
	});
	route.on('route:createInventoryItem', function () {
		var detailsView = new InventoryItemDetailsView();
    	detailsView.render();
    });
	route.on('route:editInventoryItem', function (id) {
		var detailsView = new InventoryItemDetailsView();
	   	detailsView.render(id);
	});
	route.on('route:deleteInventoryItem', function (id) {
		var model = new InventoryItemModel({'id':id});
		model.destroy();
		route.navigate('inventoryItem/list', { trigger: true });// Navigate back to listing page
	});
    
    route.on('route:listProduct', function () {
		var listView = new ProductCollectionView();
		listView.render();
	});
	route.on('route:createProduct', function () {
		var detailsView = new ProductDetailsView();
    	detailsView.render();
    });
	route.on('route:editProduct', function (id) {
		var detailsView = new ProductDetailsView();
	   	detailsView.render(id);
	});
	route.on('route:deleteProduct', function (id) {
		var model = new ProductModel({'id':id});
		model.destroy();
		route.navigate('product/list', { trigger: true });// Navigate back to listing page
	});
    
    route.on('route:listProductMaster', function () {
		var listView = new ProductMasterCollectionView();
		listView.render();
	});
	route.on('route:createProductMaster', function () {
		var detailsView = new ProductMasterDetailsView();
    	detailsView.render();
    });
	route.on('route:editProductMaster', function (id) {
		var detailsView = new ProductMasterDetailsView();
	   	detailsView.render(id);
	});
	route.on('route:deleteProductMaster', function (id) {
		var model = new ProductMasterModel({'id':id});
		model.destroy();
		route.navigate('productMaster/list', { trigger: true });// Navigate back to listing page
	});


    // Start Backbone history a necessary step for bookmarkable URL's
    Backbone.history.start();
    
    App.appRouter = route;
};
function populateTabs(tabsContainerSelector, popoulateTabsCallback){
	
	populateTab(tabsContainerSelector, 'Category', function(){
		App.appRouter.navigate('category/list', {trigger:true});
	});
	populateTab(tabsContainerSelector, 'Manufacturer', function(){
		App.appRouter.navigate('manufacturer/list', {trigger:true});
	});
	populateTab(tabsContainerSelector, 'Brand', function(){
		App.appRouter.navigate('brand/list', {trigger:true});
	});
	populateTab(tabsContainerSelector, 'InventoryItem', function(){
		App.appRouter.navigate('inventoryItem/list', {trigger:true});
	});
	populateTab(tabsContainerSelector, 'Product', function(){
		App.appRouter.navigate('product/list', {trigger:true});
	});
	populateTab(tabsContainerSelector, 'ProductMaster', function(){
		App.appRouter.navigate('productMaster/list', {trigger:true});
	});

 };