var brandsListView = Backbone.View.extend({
    el: '.brand-management',// The element we defined in HTML
    render: function () {
        var self = this;// Saving the scope object
        var _brandList = new listOfBrands();
        _brandList.fetch({
            success: function (data) {
                var _brandTemplate = renderTemplate('brand-list-template',{ brands: data.models });
                self.$el.html(_brandTemplate);
            }
        });
    }
});

var brandDetailsView = Backbone.View.extend({
	el: '.brand-management',
	events: {
        'click #createNewBrand': 'createNewBrand',
        'click #updateBrand': 'updateBrand'
    }, 
	render: function (brandId) {
		var brandDetails=null;
		if (brandId) {
			var self = this;
		 
			// Brand update. We need to fetch brand details from server and
			// render the template.
			var _brandModel = new brandModel({ id: brandId });
	   
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
	createNewBrand: function () {

		// Create a brand model to fill the form details
		var model = new brandModel({
			id: null,
			name: $('.brand-name').val(),
			manufacturerId:1
		});

		model.save({}, {
			success: function () {
				route.navigate('', { trigger: true });// Navigate back to listing page
			}
		});
	},
	updateBrand: function () {
		// Create a brand model to fill the form details
		var model = new brandModel({
			id: $('.brand-id').val(),
			name: $('.brand-name').val(),
			manufacturerId:1
		});
		
		console.log(model);

		model.save({}, {
			success: function () {
				console.log('Data Saved');
				route.navigate('', { trigger: true });// Navigate back to listing page
			}
		});
	},
	deleteBrand: function () {
		alert('in deleteBrand');
		// Create a brand model to fill the form details
		var model = new brandModel({
			id: $('.brand-id').val(),
			name: $('.brand-name').val(),
			manufacturerId:1
		});
		
		console.log(model);

		model.destroy({}, {
			success: function () {
				console.log('Deleted');
				route.navigate('', { trigger: true });// Navigate back to listing page
			}
		});
	}
});