<#list dtoClasses as modelClassName>
var ${modelClassName}CollectionView = Backbone.View.extend({
    el: '.contentarea',
    render: function () {
        var self = this;// Saving the scope object
        var _${modelClassName?uncap_first}Collection = new ${modelClassName}Collection();
        _${modelClassName?uncap_first}Collection.fetch({
            success: function (data) {
                var _${modelClassName?uncap_first}Template = renderTemplate('${modelClassName?lower_case}-list-template',{ ${modelClassName?uncap_first}Collection: data.models });
                self.$el.html(_${modelClassName?uncap_first}Template);
            }
        });
    }
});

var ${modelClassName}DetailsView = Backbone.View.extend({
	el: '.contentarea',
	events: {
        'click #create${modelClassName}': 'create${modelClassName}',
        'click #update${modelClassName}': 'update${modelClassName}',
        'click #closeDetails': 'closeDetails'
        
    }, 
	render: function (${modelClassName?uncap_first}Id) {
		var ${modelClassName?uncap_first}Details=null;
		if (${modelClassName?uncap_first}Id) {
			var self = this;
		 
			// ${modelClassName} update. We need to fetch ${modelClassName?uncap_first} details from server and
			// render the template.
			var _${modelClassName?uncap_first}Model = new ${modelClassName}Model({ id: ${modelClassName?uncap_first}Id });
	   
			_${modelClassName?uncap_first}Model.fetch({
				success: function (data) {
					var _${modelClassName?uncap_first}DetailTemplate = renderTemplate('${modelClassName?uncap_first}-details-template', { ${modelClassName?uncap_first}: data });
					self.$el.html(_${modelClassName?uncap_first}DetailTemplate);
				}
			});
		}
		else
		{
			// ${modelClassName} is created
			var _${modelClassName?uncap_first}DetailTemplate = renderTemplate('${modelClassName?uncap_first}-details-template', { ${modelClassName?uncap_first}: null });
			this.$el.html(_${modelClassName?uncap_first}DetailTemplate);
		}
	},
	create${modelClassName}: function () {

		// Create a ${modelClassName?uncap_first} model to fill the form details
		var model = new ${modelClassName}Model({
		
			<#assign fields = fieldsByModel[modelClassName]>
			<#list fields as fieldName>
				<#if fieldName != "id">
				${fieldName}: $('.${modelClassName?uncap_first}-${fieldName}').val() <#if fieldName_has_next>,</#if>
				</#if>
			</#list>
		});

		model.save({}, {
			success: function () {
				window.App.appRouter.navigate('${modelClassName?uncap_first}/list', { trigger: true });// Navigate back to listing page
			}
		});
	},
	update${modelClassName}: function () {
		// Create a ${modelClassName?uncap_first} model to fill the form details
		var model = new ${modelClassName}Model({
			<#assign fields = fieldsByModel[modelClassName]>
			<#list fields as fieldName>
				${fieldName}: $('.${modelClassName?uncap_first}-${fieldName}').val() <#if fieldName_has_next>,</#if>
			</#list>
		});
		model.save({}, {
			success: function () {
				window.App.appRouter.navigate('${modelClassName?uncap_first}/list', { trigger: true });// Navigate back to listing page
			}
		});
	},
	closeDetails: function () {
		window.App.appRouter.navigate('${modelClassName?uncap_first}/list', { trigger: true });// Navigate back to listing page
	}
});
</#list>