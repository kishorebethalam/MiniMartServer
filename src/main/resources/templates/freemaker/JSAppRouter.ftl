function setupDynamicRouting() {
	
	var AppRouter = Backbone.Router.extend({
	
		initialize: function(){
    		this.appView = window.AppView;
  		},
        routes: {
        	'': 'home',//Default route, when no hash tag is available
        	<#list dtoClasses as modelClassName>
        	'${modelClassName?uncap_first}/list': 'list${modelClassName}',
        	'${modelClassName?uncap_first}/create': 'create${modelClassName}',
        	'${modelClassName?uncap_first}/edit/:id': 'edit${modelClassName}',
        	'${modelClassName?uncap_first}/delete/:id': 'delete${modelClassName}'<#if modelClassName_has_next>,</#if>        		        		        		
        	</#list>
        }
    });

    // Instantiate the router
     var route = new AppRouter();
		 // When hash tag has localhost# register the below route
	route.on('route:home', function () {
//		route.navigate('brand/list', { trigger: true });
	});

    <#list dtoClasses as modelClassName>
    
    route.on('route:list${modelClassName}', function () {
		var listView = new ${modelClassName}CollectionView();
		listView.render();
	});
	route.on('route:create${modelClassName}', function () {
		var detailsView = new ${modelClassName}DetailsView();
    	detailsView.render();
    });
	route.on('route:edit${modelClassName}', function (id) {
		var detailsView = new ${modelClassName}DetailsView();
	   	detailsView.render(id);
	});
	route.on('route:delete${modelClassName}', function (id) {
		var model = new ${modelClassName}Model({'id':id});
		model.destroy();
		route.navigate('${modelClassName?uncap_first}/list', { trigger: true });// Navigate back to listing page
	});
    </#list>    	


    // Start Backbone history a necessary step for bookmarkable URL's
    Backbone.history.start();
    
    App.appRouter = route;
};
function populateTabs(tabsContainerSelector, popoulateTabsCallback){
	
	<#list dtoClasses as modelClassName>
	populateTab(tabsContainerSelector, '${modelClassName}', function(){
		App.appRouter.navigate('${modelClassName?uncap_first}/list', {trigger:true});
	});
	</#list>

 };