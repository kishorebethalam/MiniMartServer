/*
 Primary interface to load and interact with the UI.

 Instances of ModelController and SauronController are maintained as properties of HBaseMM.

 HBaseMM is set as a property of window object so that any component in the application can refer to a signleton instance.


 */

var App = function() {

   this.ModelController = new ModelController();

   this.ServiceController = new ServiceController();
   this.TestDataController = new TestDataController();
   window.App = this;
   
   return window.App;
};


window.App = new App();

function setupDynamicRouting() {
	
	var AppRouter = Backbone.Router.extend({
        routes: {
        	'': 'home',//Default route, when no hash tag is available
        	'create': 'create',// Create brand, when brand clicks on Create button
        	'edit/:id': 'edit',
        	'delete/:id': 'delete'
        }
    });

    // Instantiate the router
     var route = new AppRouter();
		 // When hash tag has localhost# register the below route
	route.on('route:home', function () {
		var listView = new brandsListView();
	    listView.render();
	});

	// When hash tag has localhost#create register the below route
	route.on('route:create', function () {
		var detailsView = new brandDetailsView();
    	detailsView.render();
    });
    
    

	//When hash tag has localhost#edit/1 register the below route
	route.on('route:edit', function (id) {
		var detailsView = new brandDetailsView();
    	detailsView.render(id);
	});

	route.on('route:delete', function (id) {
		var model = new BrandModel({'id':id});
		model.destroy();
	});

    // Start Backbone history a necessary step for bookmarkable URL's
    Backbone.history.start();
    
    App.appRouter = route;
}

function getSelectedTabId(){
	var selectedId = $('#tabs > .tabitem-active').attr('id');
	if (selectedId) {
		return selectedId.replace('tab_item_', '').toProperCase();
	}	
	return '';
}

/*
    Utility method to populate tabs into a HTML DOM item.
    Used by index.html to render the app's tab based UI.
 */

function populateTabs(tabsContainerSelector, popoulateTabsCallback){
//	populateTab(tabsContainerSelector, 'Rules', function(){
//		HBaseMM.appRouter.navigate('rules', {trigger:true});
//	});
	
	populateTab(tabsContainerSelector, 'Brand', function(){
		HBaseMM.appRouter.navigate('brand', {trigger:true});
	});

	populateTab(tabsContainerSelector, 'Manufacturer', function(){
		
		HBaseMM.appRouter.navigate('manufacturer', {trigger:true});
	});

	populateTab(tabsContainerSelector, 'Explore', function(){
		HBaseMM.appRouter.navigate('explore', {trigger:true});
	});
	
	populateTab(tabsContainerSelector, 'Query', function(){
		HBaseMM.appRouter.navigate('query', {trigger:true});
	});


	populateTab(tabsContainerSelector, 'Backups', function(){
		HBaseMM.appRouter.navigate('backups', {trigger:true});
	});

	HBaseMM.alertNotificationsAutoReloadTimer = setTimeout(function(){

		reloadAlertNotifications();

	}, 100);	

    getSupportedFeatures(function(featuresList){

        if (featuresList.indexOf(HBaseMM.Literals.FEATURE_REPLICATION) >= 0) {

            populateTab(tabsContainerSelector, 'Replication', function(){
	        	HBaseMM.appRouter.navigate('replication', {trigger:true});
            });
        }
         
        if (featuresList.indexOf(HBaseMM.Literals.FEATURE_MIGRATION) >= 0) { 

			populateTab(tabsContainerSelector, 'Migrations', function(){
				HBaseMM.appRouter.navigate('migrationJobs', {trigger:true});
			});
		}
		
        if (featuresList.indexOf(HBaseMM.Literals.FEATURE_MIGRATION) >= 0) { 
			HBaseMM.migrationNotificationsAutoReloadTimer = setTimeout(function(){

				reloadMigrationNotifications();

			}, 100);
		}		
        popoulateTabsCallback();
	});
 }

/*
    Utility method to generate a tab item.
    The name to be displayed and the action to be performed when the tap is tapped are passed in as arguments.
 */
function populateTab(tabsContainerSelector, tabName, onClickCallback){

    var tabItemDiv = $("<div id='" + tabName + "' class=\"tabitem\">" + tabName + "</div>");;

    $(tabItemDiv).appendTo($(tabsContainerSelector));
    $(tabItemDiv).attr('id', getIdForTabItem(tabName));


    $(tabItemDiv).click(function(){
        updateTabsUIOnSelect(tabsContainerSelector, tabName)
        onClickCallback();
    });
}


/*
 *	A plugin used to bind Enter key events to text fields.
 *  This is used in migrations_jobs.html to bind enter key event to the search text field.
 * 
 */
(function($) {
    $.fn.onEnter = function(func) {
        this.bind('keypress', function(e) {
            if (e.keyCode == 13) func.apply(this, [e]);    
        });               
        return this; 
     };
})(jQuery);

(function($) {
     $.fn.equalHeights = function(minHeight, maxHeight) {
      tallest = (minHeight) ? minHeight : 0;
      this.each(function() {
       if($(this).height() > tallest) {
        tallest = $(this).height();
      }
    });
      if((maxHeight) && tallest > maxHeight) tallest = maxHeight;
      return this.each(function() {
       $(this).height(tallest).css("overflow","auto");
     });
    }
  })(jQuery);
  
  
function jsDateFromInputField(inputIdentifier, seconds){
	//Input field accepts up to minutes only. Append the seconds using seconds argument.
	var dateTimeStr = $(inputIdentifier).val() + ':' + seconds;
	var jsDate = jsDateFromDateInput(dateTimeStr);

	console.log(jsDate + ' is created from ' + dateTimeStr);
	return jsDate;
}

function jsDateFromDateInput(dateString){

	console.log('about to convert to date' + dateString);

	var reggie = /(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})/;
    var dateArray = reggie.exec(dateString);
    if (dateArray) {
		var dateObject = new Date(
			(+dateArray[3]),
			(+dateArray[1])-1, // Careful, month starts at 0!
			(+dateArray[2]),
			(+dateArray[4]),
			(+dateArray[5]),
			(+dateArray[6])
		);
		return dateObject;
	}
	return null;
}

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

/*
	Function to render template. 
*/
function renderTemplate(templateName, templateData) {
    if ( !renderTemplate.templateCache ) { 
        renderTemplate.templateCache = {};
    }

    if ( ! renderTemplate.templateCache[templateName] ) {
        var templateDir = '/resources/templates';
        var templateUrl = templateDir + '/' + templateName + '.html';

        var template_string;
        $.ajax({
            url: templateUrl,
            method: 'GET',
            async: false,
            dataType:'html',
            success: function(data) {
                template_string = data;
            }
        });

        renderTemplate.templateCache[templateName] = _.template(template_string);
    }

    return renderTemplate.templateCache[templateName](templateData);
}
/*
	Function to calculate the text width of any div
*/

$.fn.textWidth = function() {

	var html_org = $(this).html();
	var html_calc = '<span>' + html_org + '</span>';
	$(this).html(html_calc);
	var width = $(this).find('span:first').width();
	$(this).html(html_org);
	return width;
};

function showOverlay(element){
	
	var overlayDiv = $("<div id = '" + element.substring(1) + "-overlay' class = 'hbasemm-overlay'></div>");
	var spinnerImage = $("<img src = 'resources/img/Preloader_Resending.gif' class = 'hbasemm-overlay-spinner'>");

	$(spinnerImage).appendTo(overlayDiv);
	$(overlayDiv).insertAfter(element);

	var elementHeight = $(element).outerHeight(true);
	var elementWidth = $(element).outerWidth(true);
	var posn = $(element).position();


	//var elementHeight = $(element).height();
	//var elementWidth = $(element).width();

	$(overlayDiv).css("height",elementHeight).css("width",elementWidth).css("position","absolute").css("top",posn['top']).css("left",posn['left']);
}

function removeOverlay(element){

	$(element+"-overlay").remove();

}
