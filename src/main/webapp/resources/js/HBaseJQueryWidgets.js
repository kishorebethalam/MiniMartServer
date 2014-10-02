/*
Defines the following widgets used to build the UI of the application.

* cluster
* hbasenode
* breadcrumb
* mmLineChart

*/
$.widget("hbasemm.cluster",
    {
        options:
        {
            clusterObject: null,
            onClickCallback: null
        },

        _create: function()
        {
            this.element
                .addClass('hbasemm-cluster');


            this.stateImageElement= $("<img src='resources/img/Cluster.png' class=\"hbasemm-cluster-img\"/>");
            this.titleElement= $("<div class=\"hbasemm-cluster-title\"></div>");

            this.nodesCountElement = $("<div class=\"hbasemm-cluster-nodes-count\"></div>");

            $(this.stateImageElement).appendTo(this.element);
            $(this.titleElement).appendTo(this.element);
            $(this.nodesCountElement).appendTo(this.element);

            if (this.options.onClickCallback){
                this.element.addClass('tappable');

                var self = this;
                this.element.click(function(){
                    self.options.onClickCallback(self.options.clusterObject);
                });
            }

        },

        _init: function()
        {
            $(this.titleElement).text(this.options.clusterObject.name);
            var noOfNodes = HBaseMM.ModelController.getNodesByClusterId(this.options.clusterObject.id).length;
            $(this.nodesCountElement).text('Total Nodes: ' + noOfNodes);

        },

        _setOption: function(option, value)
        {

            $.Widget.prototype._setOption.apply( this, arguments );

            this._init();
        },

        destroy: function()
        {
            // Need to reset this element(s) back to
            // what they were before we enhanced them.
            // this includes destorying the other UI
            // widgets we created.

            this.element
                .removeClass('hbasemm-cluster')
                .resizable('destroy')
                .draggable('destroy');
            if (this.options.onClickCallback) {
                this.element
                    .removeClass('hbasemm-cluster-border');
            }
            $.Widget.prototype.destroy.call( this );
        }

    });

$.widget("hbasemm.hbasenode",
    {
        options:
        {
            nodeObject: null,
            onHoverCallback: null,
            onClickNodeCallback: null,
            onClickRoleCallback: null
        },

        _create: function()
        {
            this.element.addClass('hbasemm-node');

            var stateImageElement= $("<img src='resources/img/Node.png' class=\"hbasemm-node-img\"/>");
            $(stateImageElement).appendTo(this.element);

// console.log(this.element);
            var nodesContentAreaElement = $("<div class=\"hbasemm-node-content-area\"></div>");
            $(nodesContentAreaElement).appendTo(this.element);

            var titleElement= $("<div title = ' ' class=\"hbasemm-node-title\"></div>");
            $(titleElement).appendTo(nodesContentAreaElement);
            $(titleElement).text(this.options.nodeObject.name.toUpperCase());
            $( titleElement ).tooltip({ content: this.options.nodeObject.name.toLowerCase()  });
         //   $( titleElement ).tooltip({ toolTipClass: "tooltip-styling"  });

            var rolesContainerElement= $("<div class=\"hbasemm-node-roles-container\"></div>");
            $(rolesContainerElement).appendTo(nodesContentAreaElement);

         var self = this;
            $.each(this.options.nodeObject.roleIds, function(index, roleId) {

                var roleElement= $("<div class=\"hbasemm-node-role\"></div>");
                $(roleElement).appendTo(rolesContainerElement);
                $(roleElement).text(roleId.toUpperCase());

                if (self.options.nodeObject.inActiveRoleIds.indexOf(roleId) != -1) {
                    $(roleElement).addClass('hbasemm-inactive-role');
                }

                if (self.options.onClickRoleCallback) {
                    $(roleElement).addClass('tappable');

                    $(roleElement).click(function() {
                        self.options.onClickRoleCallback(self.options.nodeObject, roleId);
                    });
                }
            });

            if (this.options.onHoverCallback){
                var self = this;

                this.element.hover(function(){
                    self.options.onHoverCallback(self.options.nodeObject);
                });
            }
            if (this.options.onClickNodeCallback) {

             $(this.element).addClass('tappable');

             this.element.click(function() {
                    self.options.onClickNodeCallback(self.options.nodeObject);
                });
            }
        },
        _init: function()
        {
        },
        _setOption: function(option, value)
        {
            // If colorbox('option', 'color', 'newcolor')
            // is called, its that same as just reinitializing
            // the widget. Need to call the default behavior first
            // if we're not doing anything special and
            // then call init

            $.Widget.prototype._setOption.apply( this, arguments );

            this._init();
        },

        destroy: function()
        {
            // Need to reset this element(s) back to
            // what they were before we enhanced them.
            // this includes destorying the other UI
            // widgets we created.

            this.element
                .removeClass('hbasemm-node')
                .resizable('destroy')
                .draggable('destroy');
            $.Widget.prototype.destroy.call( this );
        }

    });

$.widget("hbasemm.breadcrumb",
    {
        options:
        {
            breadcrumbsList: null
        },

        _create: function()
        {



        },
        _init: function()
        {
            this.element.addClass('hbase-breadcrumb');

            $('.hbase-breadcrumb div').remove();

            var self = this;
            $.each(this.options.breadcrumbsList, function(index, breadcrumb){

                var breadcrumbItemElement = $("<div class=\"hbase-breadcrumb-item\"></div>");
                $(breadcrumbItemElement).text(breadcrumb.title);
                $(breadcrumbItemElement).appendTo(self.element);

                if (breadcrumb.onClickCallback) {

                    $(breadcrumbItemElement).addClass('tappable');
                    $(breadcrumbItemElement).click(function(){
                        breadcrumb.onClickCallback();
                    });
                }

                //If this isn't the last element in the breadcrumb, add the separator.

                if (index != (self.options.breadcrumbsList.length - 1)) {

                    var separatorElement = $("<div class=\"hbase-breadcrumb-item-seperator\"></div>");
                    $(separatorElement).text('>');
                    $(separatorElement).appendTo(self.element);

                }
            });
        },
        _setOption: function(option, value)
        {
            $.Widget.prototype._setOption.apply( this, arguments );

            this._init();
        },

        destroy: function()
        {
            // Need to reset this element(s) back to
            // what they were before we enhanced them.
            // this includes destorying the other UI
            // widgets we created.

            this.element
                .removeClass('hbasemm-breadcrumb')
                .resizable('destroy')
                .draggable('destroy');
            $.Widget.prototype.destroy.call( this );
        }

    });

$.widget("hbasemm.mmLineChart",
    {
        options:
        {
            title:null,
            chartPlots:null,
            selectedDateRange:null,
            autoReloadInterval: 60,
            autoReloadEnabled: false,
            chart:null,
            rawQuery:null,
            metricIds:null,
            hostNamesArray:null,
            chartPlotsDisabledStatus:{},
            dateRange:HBaseMM.Literals.DATE_RANGE_1H,
            startDate:null,
            endDate:null,
            xAxisLabel: null,
            yAxisLabel: null,
            xAxisTickFormat: function(d){ return d3.time.format('%d-%b-%y %H:%M:%S %Z')(new Date(d)); },
// xAxisTickFormat: function(d){return d3.time.format('%Y-%m-%d %H:%M:%S')(new Date(d));},
            yAxisTickFormat: d3.format(".0f%%"),
            yAxisBasicPlotValues: [0,10],
            xAxisBasicPlotValues: null,
            width:null,
            height:null,
            chartHelpText:null,
            customizeForDashboardDisplay:false,
            tags:{},
	    alertDate:null,
	    metricDataArray:null,
	    current: false,
	    thresholds: null,
	    transformFunc: null,
            isRate: false
        },

	setOptionsForAlert: function(self)
	{
		if(self.options.alertDate)
		{
            		self.reloadSelfHelpText();

			if(self.options.current) {
				
				self.options.dateRange = HBaseMM.Literals.DATE_RANGE_1H;
			}

			else {
				var alertMillisecs = (self.options.alertDate.getTime());

				self.options.startDate = new Date(parseInt(self.options.alertDate.getTime())-(15*60*1000));		
				self.options.endDate = new Date(parseInt(self.options.alertDate.getTime())+(15*60*1000));
				
				self.options.dateRange = HBaseMM.Literals.DATE_RANGE_CUSTOM;
			}

		}
	},

        _create: function()
        {
            this.element.addClass('hbasemm-chart-container');

            //Make sure that the container for the chart has an id. This's important as we'll need to identify the svg in which the chart will be rendered.
            this.containerId = this.element.attr('id');
            if (!this.containerId){
                throw "Chart's container must have an id";
            }

        },

        _init: function()
        {
            
 console.log('init is called');

            var self = this;
// var containerId = this.element.attr('id');
		
		this.setOptionsForAlert(self);

            var titleTag = '<div class="hbasemm-chart-container-title"></div>';
            $(titleTag).appendTo(this.element).text(this.options.title);
            

			var helpTextDialogId = this.containerId  + '_helptext_dialog';
            
			var tooltipTagId = this.containerId  + '_tooltip';
			var tooltipDivTag = '<div class="hbasemm-chart-container-tooltip"><a id="' + tooltipTagId + '" href="javascript:showHelpText(\'' + helpTextDialogId + '\');" style="text-decoration: none;" title="Help"><div class="ui-icon ui-icon-info"/></a></div>';
			$(tooltipDivTag).appendTo(this.element);

			var copyTagId = this.containerId  + '_copy';
			var copyDivTag = '<div class="hbasemm-chart-container-tooltip"><a id="' + copyTagId + '" href="javascript:return;" style="text-decoration: none;" title="Copy to Clipboard"><div class="ui-icon ui-icon-copy"/></a></div>';
			$(copyDivTag).appendTo(this.element);
			
			$('#' + copyTagId).click(function(){
				self.copyGraphAsURL();
			});

            var progressIndicatorTag = '<img src="resources/img/Preloader_Resending.gif" class="hbasemm-chart-container-progress-indicator"/>';
            $(progressIndicatorTag).appendTo(this.element);

		
            var optionsTagId = self.containerId + '_options';
            var optionsTag = '<div class="hbasemm-chart-container-options" id="'+ optionsTagId + '">';
            $(optionsTag).appendTo(this.element);

            if(self.options.dateRange) {
                var timeRangeOptionsId = self.containerId+'_time_range';
                
                var timeRangeContainerId = timeRangeOptionsId + '_container';
                var timeRangeContainerTag = '<div class="hbasemm-chart-container-time-range-container" id="'+ timeRangeOptionsId + '_container' + '"></div>';
                $(timeRangeContainerTag).appendTo($('#' + optionsTagId));
                
                var timeRangeOptionsTag = '<div id="'+ timeRangeOptionsId + '"></div>';
                $(timeRangeOptionsTag).appendTo($('#' + timeRangeContainerId));
                

                var timeRangeOptions = [HBaseMM.Literals.DATE_RANGE_5M, HBaseMM.Literals.DATE_RANGE_30M, HBaseMM.Literals.DATE_RANGE_1H, HBaseMM.Literals.DATE_RANGE_12H, HBaseMM.Literals.DATE_RANGE_1D, HBaseMM.Literals.DATE_RANGE_1W, HBaseMM.Literals.DATE_RANGE_CUSTOM];

                $.each(timeRangeOptions, function(index, option){

                    var idForDiv = timeRangeOptionsId + '_option_' + option;
                    var divForThisButton = '<div class="hbasemm-chart-container-time-range-option tappable" id="' + idForDiv + '">' + option + '</div>';

                    $(divForThisButton).appendTo($('#' + timeRangeOptionsId ));
                    $('#'+ idForDiv).click(function(){

                        self.updateDateRange(option, true);
                    });

                });
                var customRangeContainerId = timeRangeOptionsId + '_custom';
                var customRangeContainerTag = '<div id="'+ customRangeContainerId + '" style="display:none;clear:both;"></div>';
                $(customRangeContainerTag).appendTo($('#' + timeRangeContainerId));
                
                var startDateTag = '<div id="'+ timeRangeOptionsId + '_start_date' + '" class="hbasemm-chart-container-time-range-custom-input"></div>';
                $(startDateTag).appendTo($('#' + customRangeContainerId ));
                
                $(startDateTag).change(function(){console.log('value modified')});
                
                
                var endDateTag = '<div id="'+ timeRangeOptionsId + '_end_date' + '" class="hbasemm-chart-container-time-range-custom-input"></div>';
                $(endDateTag).appendTo($('#' + customRangeContainerId ));
                
                
                var startDateTimePickerOptions = {
					prompt:"Choose Start Date",
					includeTimeComponents:true,
					includeNowButton:false,
					selectedHour : 0,
					selectedMin : 0
				};

				var endDateTimePickerOptions = {
					title:"End Date",
					prompt:"Choose End Date",
					includeTimeComponents:true,
					selectedHour : 23,
					selectedMin : 59
				};

				var startDateInputId = timeRangeOptionsId + '_start_date';
				var endDateInputId = timeRangeOptionsId + '_end_date';

				$('#' + startDateInputId).datetimepicker(startDateTimePickerOptions);
				$('#' + endDateInputId).datetimepicker(endDateTimePickerOptions);

                
                var goButtonTag = '<input id="'+ timeRangeOptionsId + '_go' + '" value="Go" type="button" class="hbasemm-chart-container-time-range-custom-button"/>';
                $(goButtonTag).appendTo($('#' + customRangeContainerId ));

                $("#" + timeRangeOptionsId + "_go").click(function(){
                	console.log('tapped on go button');
                	self.reloadChartWithData();
                });
                
                
				var reloadContainerId = self.containerId+'_reload_container';
				var reloadContainerTag = '<div class="hbasemm-chart-container-reload-container" id="'+ reloadContainerId + '"></div>';
				$(reloadContainerTag).appendTo($('#' + optionsTagId));


				var reloadPrimarySectionId = reloadContainerId + '_primary_section';
				var reloadPrimarySection = '<div id="'+ reloadPrimarySectionId + '"></div>';
				$(reloadPrimarySection).appendTo($('#' + reloadContainerId));

				var autoReloadCheckBoxId = reloadContainerId + '_check' ;
				var autoReloadCheckBox = '<input type="checkbox" class="hbasemm-chart-container-reload-checkbox" id="' + autoReloadCheckBoxId + '"/>';
				$(autoReloadCheckBox).appendTo($('#' + reloadPrimarySectionId));

				var manualReloadButtonId = reloadContainerId + '_manual_button' ;
				var manualReloadButton = '<input type="submit" class="hbasemm-chart-container-reload-button" id="' + manualReloadButtonId + '" value="Reload Now"/>';
				$(manualReloadButton).appendTo($('#' + reloadPrimarySectionId));

				var autoRelaodTextDiv = '<div class="hbasemm-chart-container-reload-text">Autoreload</div>';
				$('#' + reloadPrimarySectionId).append(autoRelaodTextDiv);

				var reloadSecondarySectionId = reloadContainerId + '_secondary_section';
				var reloadSecondarySection = '<div id="'+ reloadSecondarySectionId + '" class="hbasemm-chart-container-auto-reload-options-container"></div>';
				$(reloadSecondarySection).appendTo($('#' + reloadContainerId));

				if (self.options.autoReloadEnabled){
					$('#' + reloadSecondarySectionId).show();
				}
				else {
					$('#' + reloadSecondarySectionId).hide();
				}

				var reloadOptionsDivId = reloadContainerId + '_reload_options_container';	
				var reloadOptionsDiv = '<div id="' + reloadOptionsDivId + '">Every</div>';
				$('#' + reloadSecondarySectionId).append(reloadOptionsDiv);

				var selectedSeconds = self.options.autoReloadInterval;
				self.options.selectedMin = selectedSeconds / 60;
				self.options.selectedSec = selectedSeconds - self.options.selectedMin * 60 ;

				var minSelector = $('<select id="hour_selector"></select>');
				for ( i =0; i <= 59; i++) {
					var value = i;
					if (i < 10) {
						value = '0' + i;
					}
					else {
						value = '' + i;
					}
					
					$(minSelector).append($('<option>', {
						value: i ,
						text : value
					}));
				}
				if(self.options.selectedMin) {
					$(minSelector).val(self.options.selectedMin);
				}


				if (self.options.dateRange == HBaseMM.Literals.DATE_RANGE_CUSTOM) {
					
					var startTime = new Date(self.options.startDate);
					var endTime = self.options.endDate;
					
					var startTimeStr = ('0' + (startTime.getMonth()+1)).slice(-2) + '/' + ('0' + startTime.getDate()).slice(-2)  + '/'+ startTime.getFullYear() + ' ' + ('0' + startTime.getHours()).slice(-2) + ':' + ('0' + startTime.getMinutes()).slice(-2);
					var endTimeStr = ('0' + (endTime.getMonth()+1)).slice(-2) + '/' + ('0' + endTime.getDate()).slice(-2) + '/'+ endTime.getFullYear() + ' ' + ('0' + endTime.getHours()).slice(-2) + ':' + ('0' + endTime.getMinutes()).slice(-2);

					var timeRangeOptionsId = this.containerId+'_time_range';
					var startDateInputId = timeRangeOptionsId + '_start_date_input';
					var endDateInputId = timeRangeOptionsId + '_end_date_input';

					$('#' + startDateInputId).val(startTimeStr);
					$('#' + endDateInputId).val(endTimeStr);
			
					self.options.secondsAtChartReload = ('0' + endTime.getSeconds()).slice(-2);;

					$('#' + customRangeContainerId).show();
				}
				
				$(minSelector).change(function(){
					console.log($(minSelector).val() + ' is selected for min');
					self.options.selectedMin = parseInt($(minSelector).val());

					self.options.autoReloadInterval = (self.options.selectedMin * 60) + self.options.selectedSec;
					self.resetChartAutoReloadtimer();
				});

				var secSelector = $('<select id="min_selector"></select>');
				for ( i =0; i <= 59; i++) {
					var value = i;
					if (i < 10) {
						value = '0' + i;
					}
					else {
						value = '' + i;
					}
					$(secSelector).append($('<option>', {
						value: i,
						text : value
					}));
				}
	
				if(self.options.selectedSec) {
					$(secSelector).val(self.options.selectedSec);
				}

				$(secSelector).change(function(){
					self.options.selectedSec = parseInt($(secSelector).val());

					self.options.autoReloadInterval = (self.options.selectedMin * 60) + self.options.selectedSec;
					self.resetChartAutoReloadtimer();
				});

				$($('#' + reloadOptionsDivId)).append('&nbsp;');	
				$($('#' + reloadOptionsDivId)).append(minSelector);	
				$($('#' + reloadOptionsDivId)).append('&nbsp;minute(s)');	

				$($('#' + reloadOptionsDivId)).append('&nbsp;');	
				$($('#' + reloadOptionsDivId)).append(secSelector);	
				$($('#' + reloadOptionsDivId)).append('&nbsp;second(s)');	

				$('#' + autoReloadCheckBoxId).change(function(){

					self.options.autoReloadEnabled = $(this).is(":checked");
					if(self.options.autoReloadEnabled){
						$($('#' + reloadSecondarySectionId)).show();
					}
					else {
						$($('#' + reloadSecondarySectionId)).hide();
					}
					self.resetChartAutoReloadtimer();
				});

				if (self.options.autoReloadEnabled){
					$('#' + autoReloadCheckBoxId).attr("checked", true);
				}
				else {
					$('#' + autoReloadCheckBoxId).attr("checked", false);
				}

				$('#' + manualReloadButtonId).click(function(){
					if (self.options.selectedDateRange != HBaseMM.Literals.DATE_RANGE_CUSTOM) {
						self.populateCustomDateInputFields();
						self.reloadChartWithData();
					}
				});

                if (self.options.dateRange){
                    self.options.selectedDateRange = self.options.dateRange;
                }
                self.updateDateRange(self.options.selectedDateRange, false);
            }
            
            //console.log('finally '+this.options.title+' '+this.options.chart);

		/*
		 Changes to show link to toggle between current graph and graph showing abnormal datapoint
		*/

		/*if(self.options.alertDate) {

			var alertToggleDiv = $("<div is = 'alertToggleDiv' class = 'hbasemm-chart-container-alertToggleDiv tappable' ></div>");
			$(alertToggleDiv).text("Toggle");
			$(alertToggleDiv).appendTo(this.element);

		}*/
            
            
            this.loadEmptyGraph(function(){
				self.reloadChartWithData();
			});
			// d3.select(".nv-legendWrap")
			// .attr("transform", "translate(100,100)");
        },
        _refresh : function(){
            alert('refresh called');
            this.reloadChartWithData();
        },
        copyGraphAsURL: function() {
//         	alert('copy is called from graph');
			
			var title = this.options.title;
			var startTime = jsDateFromInputField('#' + this.containerId+'_time_range_start_date_input', this.options.secondsAtChartReload).getTime();
			var endTime = jsDateFromInputField('#' + this.containerId+'_time_range_end_date_input', this.options.secondsAtChartReload).getTime();
			//var metricIds = JSON.stringify(this.options.metricIds);
			var metricDataArray = JSON.stringify(this.options.metricDataArray);
			//var tags = this.options.tags ? JSON.stringify(this.options.tags) : {};
			//var isRate = this.options.isRate;
			var hostNamesArray = this.options.hostNamesArray ? JSON.stringify(this.options.hostNamesArray) : '[]';
// title
// dateRange
// metricIds
// tags
// isRate
// hostNamesArray

        	/*var url = HBaseMM.ServiceController.getBaseURL() + '/index.html#graph' 
        				+ '/' + title + '/' + startTime + '/' + endTime 
        				+ '/' + metricIds + '/' + tags + '/' + isRate + '/' +  hostNamesArray;*/

		var link = document.URL;
		var index = link.indexOf("#");
		link = link.substring(0,index);

		var url = link + '#graph' 
        				+ '/' + title + '/' + startTime + '/' + endTime 
        				+ '/' + metricDataArray + '/'  +  hostNamesArray;

		
        				        				
        	window.prompt("Copy to clipboard: Ctrl+C, Enter", url);
        },
        reloadSelfHelpText: function(){
        	
        	
//        	this.options.chart.yAxis.axisLabel('Test Label');
                    
        	var self = this;
			var helpTextDialogId = this.containerId  + '_helptext_dialog';
			
         	var helpText = '<div class="hbasemm-tooltip-container" id="' + helpTextDialogId + '_container' +'"  >';

		$.each(self.options.metricDataArray, function(index, metricData) {

				metricId = metricData.metricId;
				tags = metricData.tags;

				if (tags && Object.keys(tags).length > 0 ) {

//					alertObject(self.options.tags);
				
					//Loop through tags
					$.each(tags, function(tagKey, tagValues) {
					
//						alertObject(tagValues, 'Tag values:[' + tagKey + ']' );
						//For each key, loop through the values.
						
						$.each(tagValues, function(index, tagValue) {
						
							//For each value, add the help related to that particular tag value. 
							
							var helpMessage = HBaseMM.ModelController.getSelfHelpForMetric(metricId, tagValue);
							
							var titleText = metricId + ' (' +  tagKey  + ' = \''+ tagValue + '\')';
							var helpTextForThisMetric = '<div class="hbasemm-tooltip-metric-container">';
							helpTextForThisMetric = helpTextForThisMetric + '<div class="hbasemm-tooltip-metric-title">' + titleText + '</div>' ;
							helpTextForThisMetric = helpTextForThisMetric + '<div class="hbasemm-tooltip-metric-content">' + helpMessage || 'N/A' + '</div>' ;
		
							helpText = helpText + helpTextForThisMetric;
						});
					});
				}	
				else {
					var helpMessage = HBaseMM.ModelController.getSelfHelpForMetric(metricId, '');
					
					var helpTextForThisMetric = '<div class="hbasemm-tooltip-metric-container">';
					helpTextForThisMetric = helpTextForThisMetric + '<div class="hbasemm-tooltip-metric-title">' + metricId + '</div>' ;
					helpTextForThisMetric = helpTextForThisMetric + '<div class="hbasemm-tooltip-metric-content">' + helpMessage + '</div>' ;
				
					helpText = helpText + helpTextForThisMetric;
				
				}
         	});
         	
         	helpText = helpText + "</div>";
         	
         	$('#' + helpTextDialogId).remove();
         	var helpDiv = $('<div id="' + helpTextDialogId + '" title="Basic dialog" style="display:none;"></div>');
         	
         	$(helpDiv).appendTo(this.element);
         	
         	var titleBarElement = $("<div class='hbase-dialog-titlebar'></div>");
			$(titleBarElement).appendTo($('#' + helpTextDialogId));
			var closeIconElement = $("<img src='resources/img/close.png' class=\"hbase-dialog-titlebar-close-icon tappable\"/>");

			$(closeIconElement).appendTo(titleBarElement);

			$(closeIconElement).click(function(){
				//When the close button is tapped, remove it from UI.
				$('#' + helpTextDialogId).dialog('destroy');
			});

			$(helpText).appendTo($('#' + helpTextDialogId));
			
			
			var metricId = self.options.metricDataArray[0].metricId;
			var measurementInfo = HBaseMM.ModelController.getMeasurementInfoForMetric(metricId);
			this.options.yAxisLabel = measurementInfo || '';

			if (this.options.chart) {
				this.options.chart.yAxis.axisLabel(this.options.yAxisLabel);
			}

        },
        
        showCustomDateRangeOptions: function(){

			var timeRangeOptionsId = this.containerId+'_time_range';
			var customRangeContainerId = timeRangeOptionsId + '_custom';
			$('#' + customRangeContainerId).show();
        },
        
        hideCustomDateRangeOptions: function(){
        
			var timeRangeOptionsId = this.containerId+'_time_range';
			var customRangeContainerId = timeRangeOptionsId + '_custom';
			$('#' + customRangeContainerId).hide();
        },

        getTickValues: function(){

			var tickValues = [];
			
			var self = this;

			if (self.options.rawQuery) {
				return [new Date().getTime(), new Date().getTime()];
			}
	
			var startDate = jsDateFromInputField('#' + this.containerId+'_time_range_start_date_input', self.options.secondsAtChartReload);
			var endDate = jsDateFromInputField('#' + this.containerId+'_time_range_end_date_input', self.options.secondsAtChartReload);

			if (startDate) {
				var xMin = startDate.getTime();
				var xMax = endDate.getTime();

			// console.log('Min and Max:' + xMin + ',' + xMax);
				var maxTicks = this.noOfTicks(),
					xDiff = (xMax - xMin)/maxTicks, tickValues = [];
			// console.log('maxTicks:' + maxTicks);
				tickValues[0] = xMin;

				for(i=1; i<maxTicks; i++){
					var current = xMin + i*xDiff;
					tickValues[i] = Math.ceil(current);
				}

				tickValues[maxTicks] = xMax;
			}
			// console.log('tickValues:' + tickValues);

			return tickValues;
// chartObject.xAxis.tickValues(tickValues);
// alertObject(chartObject, 'ChartObject:');
// chartObject.forceX([xMin, xMax]);
        },

        updateDateRange: function(newDateRange, isReloadChartData){

            var self = this;

// var containerId = this.element.attr('id');

            var timeRangeOptionsId = this.containerId+'_time_range';

            var idForDiv = timeRangeOptionsId + '_option_' + newDateRange;


            //Get id of this option.
            var selectorThisTab = '#' + idForDiv;

            //For all the tabs other than this, set the state to not highlighted.
            $('#' + timeRangeOptionsId).find(".hbasemm-chart-container-time-range-option").not(selectorThisTab).removeClass('hbasemm-chart-container-time-range-option-active');
            $('#' + timeRangeOptionsId).find(".hbasemm-chart-container-time-range-option").not(selectorThisTab).addClass('hbasemm-chart-container-time-range-option-inactive');

            //Set the state of this tab to highlighted.
            $(selectorThisTab).removeClass('hbasemm-chart-container-time-range-option-inactive');
            $(selectorThisTab).addClass('hbasemm-chart-container-time-range-option-active');


            self.options.selectedDateRange = newDateRange;

if (self.options.selectedDateRange != HBaseMM.Literals.DATE_RANGE_CUSTOM) {
self.populateCustomDateInputFields();
}

//Hide the reload container when the brand selects custom date range.
var reloadContainerId = self.containerId+'_reload_container';
if (self.options.selectedDateRange != HBaseMM.Literals.DATE_RANGE_CUSTOM) {
$('#' + reloadContainerId).show();
}
else {
$('#' + reloadContainerId).hide();
}

// if (self.options.selectedDateRange != newDateRange) {

                if (isReloadChartData) {
// console.log('in update date range');
if (self.options.selectedDateRange != HBaseMM.Literals.DATE_RANGE_CUSTOM) {
self.hideCustomDateRangeOptions();
                     self.reloadChartWithData();
                    }
                    else {
                     self.showCustomDateRangeOptions();
                    }
                }//console.log('finally '+this.options.title+' '+this.options.chart);
// }
        },
        populateCustomDateInputFields: function(){
            
            var self = this;
            

            
        	var startTime = new Date(HBaseMM.ServiceController.getEpochTimeForDateRangeEnum(self.options.selectedDateRange));
			var endTime = new Date();
				
			var startTimeStr = ('0' + (startTime.getMonth()+1)).slice(-2) + '/' + ('0' + startTime.getDate()).slice(-2)  + '/'+ startTime.getFullYear() + ' ' + ('0' + startTime.getHours()).slice(-2) + ':' + ('0' + startTime.getMinutes()).slice(-2);
			var endTimeStr = ('0' + (endTime.getMonth()+1)).slice(-2) + '/' + ('0' + endTime.getDate()).slice(-2) + '/'+ endTime.getFullYear() + ' ' + ('0' + endTime.getHours()).slice(-2) + ':' + ('0' + endTime.getMinutes()).slice(-2);

            var timeRangeOptionsId = this.containerId+'_time_range';
			var startDateInputId = timeRangeOptionsId + '_start_date_input';
			var endDateInputId = timeRangeOptionsId + '_end_date_input';
				
			$('#' + startDateInputId).val(startTimeStr);
			$('#' + endDateInputId).val(endTimeStr);
			
			self.options.secondsAtChartReload = ('0' + endTime.getSeconds()).slice(-2);
				
// 			console.log('start time:' + startTimeStr + ' to '  + $('#' + startDateInputId).val() + ':' + self.options.secondsAtChartReload + ' for id ' + startDateInputId);
// 			console.log('end time:' + endTimeStr + ' to '  + $('#' + endDateInputId).val() + ':' + self.options.secondsAtChartReload + ' for id ' + endDateInputId);

        },

        updateDateSlider: function( minValue, maxValue, isReloadChartData) {
              
        },
        showProgressIndicator: function(){
// var containerId = this.element.attr('id');
            $('#' + this.containerId + ' .hbasemm-chart-container-progress-indicator').show();
        },
        hideProgressIndicator: function(){
            var containerId = this.element.attr('id');
            $('#' + containerId + ' .hbasemm-chart-container-progress-indicator').hide();
        },
        loadEmptyGraph: function(callback){//console.log('empty graph');

// var containerId = this.element.attr('id');

            var svgId = this.containerId + '_svg' ;
            var svgTag = '<svg id=\"' + svgId + '\">' + '</svg>';

            $(svgTag).appendTo(this.element);
//showOverlay('#'+svgId);
// this.element.css('width', chartWidth + 'px');
// this.element.css('height', chartHeight+ 'px');

            var self = this;
            nv.addGraph(function() {

		
                self.options.chart = nv.models.lineChart();

                var tickValues = self.getTickValues();
            
                var minValue = tickValues[0];
                var maxValue = tickValues[tickValues.length - 1];
                var stepValue = self.getStepValue();
                
// var scale = d3.time.scale.utc();
// scale.ticks(d3.time.minutes.utc, stepValue);
            
                var scale = d3.scale.ordinal().domain(tickValues);
                if (self.options.selectedDateRange) {
                    self.options.chart.forceX([minValue, maxValue]);
                }
                
                console.log('forcing X values ' + minValue + ',' + maxValue);
// console.log('step value' + stepValue);
                self.options.xAxisTickFormat = self.getXAxisLabelFormat();
				
				if (self.options.yAxisBasicPlotValues) {	
	                self.options.chart.forceY(self.options.yAxisBasicPlotValues);
	            }
    
    
                self.options.chart.xAxis
                    .axisLabel(self.options.xAxisLabel)
                    .tickFormat(self.options.xAxisTickFormat)
                    .scale(scale)
                    .tickValues(tickValues);
				
				var metricId = self.options.metricDataArray[0].metricId;
				var measurementInfo = HBaseMM.ModelController.getMeasurementInfoForMetric(metricId);
				self.options.yAxisLabel = measurementInfo || '';
				
                self.options.chart.yAxis
                    .axisLabel(self.options.yAxisLabel)
                    .tickFormat(self.options.yAxisTickFormat);

                //Chat widget's width and height are primarily determined by the metaInfo supplied for the chart. If these values are not provided by the metaInfo, use the height of the container.
                //We need to make sure that both the container and the chart are set to the same width and height. Otherwise, we'll see clipping of the chat window.
                var chartWidth = self.options.width ? self.options.width : parseInt(self.element.css('width').replace("px","") ) - 10;
                var chartHeight= self.options.height ? self.options.height: parseInt(self.element.css('height').replace("px","")) - 100;
                
                self.options.chart.width(chartWidth);
                self.options.chart.height(chartHeight);
                
                self.applyCustomColors();
                
// self.generateTickValues(self.options.chart);
                //Retrieve the svg node created earlier and start preparing the chart.
                logWithTimestamp('about to use nvd3');
                d3.select('#'+svgId)
                    .datum(self.getEmptyChartData())
// .transition()
// .duration(100)
                    .call(self.options.chart);
                logWithTimestamp('completed using nvd3');
                nv.utils.windowResize(
                    function() {
                        self.options.chart.update();
                    }
                );
                
/* var emptyChartPlots = self.getEmptyChartData();
$.each(emptyChartPlots, function(index, series){
console.log(series.key + self.options.chartPlotsDisabledStatus[series.key]);
});
*/
// alertObject(self.options.chartPlotsDisabledStatus, ' in empty chartdata');
// alertObject(self.options.chart, 'self.options.chart in Empty Data');

// alertObject(self.options.chart.xAxis.tickValues(), 'Chart after Draw');

self.registerForLegendStateChange(self);
            
            
                return self.options.chart;
            },callback);//callback();
        },
// reloadPlots:function(){
//
// getPlotSeries(this.options.metricIds, this.options.hostNamesArray, HBaseMM.Literals.DATE_RANGE_5M, function(chartPlots){
// this.options.chartPlots = chartPlots;
// });
//
// },


        reloadChartWithData: function(){
         var self = this;
// var containerId = self.element.attr('id');
            //document.getElementById(containerId).innerHTML = "<svg></svg>";

// console.log('in reloadChartWithData');
            var self = this;
            
            self.showProgressIndicator();
            if(self.options.rawQuery) {
                getPlotSeriesFromQuery(self.options.rawQuery, function(chartPlots){
                	self.options.chartPlots = chartPlots;
                    self.plotChart(chartPlots);
                });
            }
            else {

            	
            	var startDate = jsDateFromInputField('#' + this.containerId+'_time_range_start_date_input', self.options.secondsAtChartReload);
			    var endDate = jsDateFromInputField('#' + this.containerId+'_time_range_end_date_input', self.options.secondsAtChartReload);
        	
        		var roundingTime = HBaseMM.ServiceController.getRoundingTime(startDate, endDate);

				if (startDate) {//alert("this+"+JSON.stringify(self.options.metricDataArray));
					getPlotSeries(self.options.metricDataArray, self.options.hostNamesArray, startDate.getTime(), endDate.getTime(), roundingTime, self.options.transformFunc, function(chartPlots){
				
					console.log(self.options.metricDataArray + ' reload is called');
					   self.plotChart(chartPlots);
					});
				}					
            }
        },
        
        /*method called when the window size is changed*/
        
        plotChartdummy: function(){
 		var self = this;
        	self.plotChart(self.options.chartPlots);
               	if($( window ).width() < 1100)
        	{
        		self.options.chart.xAxis.rotateLabels(-60);        		
        	}
        	else
        	{	
        		self.options.chart.xAxis.rotateLabels(-1) /*TODO Set the labels to original point after the window is resized to normal size*/
        	}
	},

	appendThresholdData: function(chartSeriesItems, minValue, maxValue, callback){

		self = this;

		var thresholds = self.options.thresholds;
		var thresholdPlot = {};
		var chartSeriesThreshold = [];
		var metricValue = null;
		var metricDataArray = [];

		var svgId = self.containerId + '_svg' ;

		if(thresholds) {

			$.each(chartSeriesItems, function(index, chartSeriesItem){

				var metricId = chartSeriesItem['key'];
				metricId = metricId.substring(0, metricId.indexOf('{'));
				
				if(thresholds[metricId]) {

					var value = thresholds[metricId]['thresholdValue'];

					if(isNaN(value)) {
					
						self.options.transformFunc = value;
					
						$.each(thresholds[metricId]['metricIds'], function(index, metricId) {

							var metric = new MetricData(metricId, "", {}, false);
							metricDataArray.push(metric);

						});

						getPlotSeries(metricDataArray, self.options.hostNamesArray, minValue, maxValue, 0, self.options.transformFunc, function(chartPlots){
				
							self.options.chartPlots = chartPlots;

							chartSeriesThreshold = self.getChartData();
							chartSeriesThreshold[0]['isthreshold'] = true;
							chartSeriesThreshold[0]['key'] = "threshold{"+metricId+"}";
						   
							thresholdPlot = chartSeriesThreshold[0];
							chartSeriesItems.push(thresholdPlot);

							callback(self, chartSeriesItems, svgId);
						});

					}

					else {

						thresholdPlot = {"isthreshold":true,"key":"threshold{"+metricId+"}","disabled":false,"values":[{"x":minValue,"y":value,"series":0},{"x":maxValue,"y":value,"series":0}]};

						chartSeriesItems.push(thresholdPlot);

						callback(self, chartSeriesItems, svgId);
					}

				}
				

			});

		}
		
		else {
			callback(self, chartSeriesItems, svgId);
		}

	},

	showDottedLineForThreshold: function(){

		var thresholds = this.options.thresholds;

		if(thresholds) {

			var svgId = self.containerId + '_svg' ;

			d3.select('#'+svgId).selectAll('.nv-linesWrap .nv-group')
				.filter(function(g){return g.isthreshold == true})
           			 .selectAll('.nv-line').style("stroke-dasharray", ("3, 3"));


		}

	},
        
        plotChart: function(chartPlots) {
            self = this;
            

            
            self.options.chartPlots = chartPlots;

// var containerId = self.element.attr('id');
            

            var svgId = self.containerId + '_svg' ;

            var tickValues = self.getTickValues();
            
            //Chat widget's width and height are primarily determined by the metaInfo supplied for the chart. If these values are not provided by the metaInfo, use the height of the container.
            //We need to make sure that both the container and the chart are set to the same width and height. Otherwise, we'll see clipping of the chat window.
            var chartWidth = self.options.width ? self.options.width : parseInt(self.element.css('width').replace("px","") ) - 10;
            var chartHeight= self.options.height ? self.options.height: parseInt(self.element.css('height').replace("px","")) - 100;
            console.log('plotChart container Id ' + self.containerId);
            self.options.chart.width(chartWidth);
            self.options.chart.height(chartHeight);
            
            var minValue = tickValues[0];
            var maxValue = tickValues[tickValues.length - 1];
            var stepValue = self.getStepValue();
            
// var scale = d3.time.scale.utc();
// scale.ticks(d3.time.minutes.utc, stepValue);
    
self.applyCustomColors();

            var scale = d3.scale.ordinal().domain(tickValues);
            //alertObject(self.options.chart, 'Chart Object:');
            if (self.options.selectedDateRange) {
// console.log(self.options.chart);
                //alertObject(self.options.chart, 'self.options.chart before adding x min and max');

                self.options.chart.forceX([minValue, maxValue]);
            }

// console.log('forcing X values ' + minValue + ',' + maxValue);
// console.log('step value' + stepValue);
            self.options.xAxisTickFormat = self.getXAxisLabelFormat();
            
            if (self.options.yAxisBasicPlotValues) {
	            self.options.chart.forceY(self.options.yAxisBasicPlotValues);
	        }
            self.options.chart.xAxis
                .axisLabel(self.options.xAxisLabel)
                .tickFormat(self.options.xAxisTickFormat)
                .scale(scale)
                .tickValues(tickValues);
//            alert(self.options.yAxisLabel);

			var metricId = self.options.metricDataArray[0].metricId;	
			var measurementInfo = HBaseMM.ModelController.getMeasurementInfoForMetric(metricId);
			self.options.yAxisLabel = measurementInfo || '';
			
            self.options.chart.yAxis
                .axisLabel(self.options.yAxisLabel);
            self.options.chart.yAxis.rotateLabels(90);

		//var flag = 0;

		/*if(chartPlots[0] && (chartPlots[0]['dataPoints'][0]['y']) % 1 != 0){
			  self.options.chart.yAxis.tickFormat(d3.format(".2f%%"));
		}*/

		/*$.each(chartPlots, function(index, chartPlot) {

			var dataPoints = chartPlot['dataPoints'];

			$.each(chartPlot['dataPoints'], function(dataIndex, datapoint) {

				if(datapoint['y'] % 1 != 0){
					  flag = 1;
				}

			});

		});

		if(flag == 1){
			  self.options.chart.yAxis.tickFormat(d3.format(".2f%%"));
		}*/

		self.options.chart.yAxis.tickFormat( function (xValue) {
			
			if(xValue % 1 !=0)
				return d3.format(".2f%%")(xValue)

			else
				return d3.format(".0f%%")(xValue)
		});

// if (self.options.selectedDateRange == HBaseMM.Literals.DATE_RANGE_1D
// // self.options.selectedDateRange == HBaseMM.Literals.DATE_RANGE_1W
// // || self.options.selectedDateRange == HBaseMM.Literals.DATE_RANGE_CUSTOM ){
// ){
// self.options.chart.xAxis.rotateLabels(-60);
// }
// else
// if (self.options.selectedDateRange){
// self.options.chart.xAxis.rotateLabels(0);
// }
// else {
// self.options.chart.xAxis.rotateLabels(-60);
// }
            var chartSeriesItems = self.appendThresholdData(self.getChartData(), minValue, maxValue, function(self, chartSeriesItems, svgId){

		d3.select('#'+svgId)
                .datum(chartSeriesItems)
                .call(self.options.chart);

		    self.showDottedLineForThreshold();
		        
		    self.applyCSSModificationsOnChart(self.containerId);
		    
		    //Update the status of chart plots whenever the brand interacts with the legend. App trackes these changes via chartPlotsDisabledStatus
		    self.registerForLegendStateChange(self);
		    
		    self.hideProgressIndicator();
		    
		    self.resetChartAutoReloadtimer();

		});
            
// return self.options.chart;
  // });
        },
        resetChartAutoReloadtimer: function(){
         logWithTimestamp('resetChartAutoReloadtimer is called');
         var self = this;
if (self.autoReloadTimer){
clearTimeout(self.autoReloadTimer);
}
if (self.options.autoReloadInterval == 0 || self.options.selectedDateRange == HBaseMM.Literals.DATE_RANGE_CUSTOM){
return;
}
if (self.options.autoReloadEnabled) {

logWithTimestamp('resetChartAutoReloadtimer is initiated to execute after ' + self.options.autoReloadInterval + ' secs');
self.autoReloadTimer = setTimeout(function(){
logWithTimestamp('auto reload is initiated');

if (self.options.selectedDateRange != HBaseMM.Literals.DATE_RANGE_CUSTOM) {
self.populateCustomDateInputFields();
self.reloadChartWithData();
}

}, self.options.autoReloadInterval * 1000);
}
        },
        registerForLegendStateChange: function(self){

            var dispatcherId = 'stateChange.' + self.containerId ;

            self.options.chart.dispatch.on(dispatcherId, function(stateProperties){

                setTimeout(function() {
                    var states = stateProperties['disabled'];
                    $.each(self.options.chartPlots, function(index, series){
                        self.options.chartPlotsDisabledStatus[series.name] = states[index];
                    });
                    
                    console.log(self.options.metricDataArray);
                    console.log(self.options.chartPlotsDisabledStatus);
                    
                    self.applyCSSModificationsOnChart(self.containerId);

             }, 500);
            });
        },
        /**
* Method to apply some CSS modifications on the rendered charts to handle the following items.
* Does the following.
* 1. Display all data points as circles.
* 2. Adjust the y axis labels anchor point dynamically if the label is more than 7 characters in length.
*/
        
        
        
        applyCSSModificationsOnChart: function(containerId) {

		self = this;

            setTimeout(function() {

				self.showDottedLineForThreshold();
				
				$('#' + containerId + ' .nv-lineChart circle.nv-point').css({
					 "fill-opacity": 1
				});
            
				$('#' + containerId + ' .nv-lineChart circle.nv-point').attr("r", "3.5");
    
    
			    $('#' + containerId + ' .nv-y text ').hover(
					function () {
											
						if (!$(this).text().match(/^[a-zA-Z]/)) {
							if ($(this).text().length > 7) {
								if ($(this).attr('text-anchor') != 'middle') {
									$(this).attr('text-anchor', 'middle');
								}
							}
						}
					},
					function () {
												
						if (!$(this).text().match(/^[a-zA-Z]/)) {
							if ($(this).text().length > 7) {
								if ($(this).attr('text-anchor') != 'end') {
									$(this).attr('text-anchor', 'end');
								}
							}
						}
					});
            }, 500);
        },
        applyCustomColors: function() {
            
            console.log('in applyCustomColors');
            var plotColors = [];
            var self = this;
            
            var noOfMetricIds = self.options.metricDataArray ? self.options.metricDataArray.length : 0;
            
            if (noOfMetricIds <= 1 ) {
                
                var plotColorStrings = [];
                
                if (self.options.chartPlots) {
                    plotColorStrings = getColorsForChartPlots(self.options.chartPlots);
 console.log('got colors by plots ', self.options.chartPlots, plotColorStrings);
                }
                else if (self.options.hostNamesArray){
                    plotColorStrings = getColorsForHosts(self.options.hostNamesArray);
 console.log('got colors by hosts ', self.options.hostNamesArray, plotColorStrings);
                }
                
                
            
                $.each(plotColorStrings, function(index, colorString) {
                    plotColors.push(d3.rgb(colorString));
                });
            }
            else {
                
                var brightnessRatiosForMetrics = {};
                
                var brightnessIncrementer = 1 ;
                var currentBrightness = 0;
                
                $.each(self.options.metricDataArray, function(index, metricData){
		    metricId = metricData.metricId;
                    brightnessRatiosForMetrics[metricId] = currentBrightness;
                    currentBrightness = currentBrightness + brightnessIncrementer;
                });
                
// 				alertObject(brightnessRatiosForMetrics, ' Brightness');
                if (self.options.chartPlots) {
					$.each(self.options.chartPlots, function(index, chartPlot){
					
						
						
						var nameOfMetric = chartPlot.name;
						var hostNameOfMetric = nameOfMetric;
						var startIndexOfHostName = nameOfMetric.indexOf('{host=');
						if (startIndexOfHostName != -1) {
							var endIndexOfHostName = nameOfMetric.length - 1;
							hostNameOfMetric =  nameOfMetric.substring(startIndexOfHostName + '{host='.length, endIndexOfHostName);
						}
//						var hostNameOfMetric = nameOfMetric.substring(0, nameOfMetric.indexOf('{host='));
						var colorOfHost = getOrUpdateChartPlotColorForKey(hostNameOfMetric);
//						console.log("hostNameOfMetric:" + hostNameOfMetric + 'Original:' + nameOfMetric);
						var metricIdForThisSeries = '';
						$.each(self.options.metricDataArray, function(index, metricData){
							metricId = metricData.metricId;
							var candidateKey = '';
							if (startIndexOfHostName != -1) {
								candidateKey = metricId + '{host=' + hostNameOfMetric + '}';
							}
							else {
								candidateKey = metricId + '{}';
							}
							if (candidateKey == nameOfMetric) {
								metricIdForThisSeries = metricId;
							}
						});
						
//						console.log('Metric Id for ' + nameOfMetric + ' is ' + metricIdForThisSeries);

						var brightnessRatioForThisMetric = brightnessRatiosForMetrics[metricIdForThisSeries];
//						console.log('brightnessRatio for this metric is ' + brightnessRatioForThisMetric);
						if (!brightnessRatioForThisMetric && brightnessRatioForThisMetric != 0) {
							brightnessRatioForThisMetric = index * 1;
						}
						var color = d3.rgb(colorOfHost);
						if (brightnessRatioForThisMetric > 0) {
							color = color.darker(brightnessRatioForThisMetric);
//							console.log('color brightness is reduced for ' + metricIdForThisSeries);
						}
//						console.log('brightness ratio is ' + brightnessRatioForThisMetric);
						console.log(nameOfMetric + ' will be painted with ' + color.toString());

						plotColors.push(color);
					});
				}
            }
            
            d3.scale.myColors = function() {
                return d3.scale.ordinal().range(plotColors);
            };
            
            self.options.chart.color(d3.scale.myColors().range());

        },
        getYAxisRangeFromSeriesArray: function(chartSeriesItems){
            var minValue = null;
            var maxValue = null;
            $.each(chartSeriesItems, function(index, chartSeries) {
                
                var dataPoints = chartSeries[values];
                if (dataPoints.length > 1) {


                    dataPoints.sort(function(a,b) { return (a.y > b.y) ? 1 : ((b.y > a.y) ? -1 : 0);} );
                    var minValueForThisSeries = dataPoints[0];
                    var maxValueForThisSerires = dataPoints[dataPoints.length - 1];
                    
                    if (!minValue || minValueForThisSeries < minValue) {
                        minValue = minValueForThisSeries;
                    }
                    
                    if (!maxValue || maxValueForThisSeries > maxValue) {
                        maxValue = maxValueForThisSeries;
                    }
                }
                
            });
            var ranges = [];
            if (minValue) {
                ranges.push(minValue);
            }
            
            if (maxValue) {
                ranges.push(maxValue);
            }
// console.log('returning range:' + range);
            return range;
        },
        getStepValue: function (){

            if (this.options.selectedDateRange == HBaseMM.Literals.DATE_RANGE_5M){
                return 1;
            }
            else if (this.options.selectedDateRange == HBaseMM.Literals.DATE_RANGE_30M){
                return 5;
            }
            else if (this.options.selectedDateRange == HBaseMM.Literals.DATE_RANGE_1H){
                return 5;
            }
            else if (this.options.selectedDateRange == HBaseMM.Literals.DATE_RANGE_12H){
                return 60;
            }
            else if (this.options.selectedDateRange == HBaseMM.Literals.DATE_RANGE_1D){
                return 240;
            }
            else if (this.options.selectedDateRange == HBaseMM.Literals.DATE_RANGE_1W){
                return 1440;
            }
            else if (this.options.selectedDateRange == HBaseMM.Literals.DATE_RANGE_CUSTOM){

				var self = this;
				var startDate = jsDateFromInputField('#' + this.containerId+'_time_range_start_date_input', self.options.secondsAtChartReload);
				var endDate = jsDateFromInputField('#' + this.containerId+'_time_range_end_date_input', self.options.secondsAtChartReload);

				var startTime = startDate.getTime();
				var endTime = endDate.getTime();
				var noOfMins = parseInt((endTime - startTime) / (1000 * 60 ));

				return noOfMins/12;
            
            }
            return 5;
        },
        noOfTicks: function (){
			var self = this;
            if (this.options.selectedDateRange == HBaseMM.Literals.DATE_RANGE_5M){
                return 5;
            }
            else if (this.options.selectedDateRange == HBaseMM.Literals.DATE_RANGE_30M){
                return 6;
            }
            else if (this.options.selectedDateRange == HBaseMM.Literals.DATE_RANGE_1H){
            	if (self.options.customizeForDashboardDisplay)  {
            		return 6;
            	}
                return 12;
            }
            else if (this.options.selectedDateRange == HBaseMM.Literals.DATE_RANGE_12H){
	            if (self.options.customizeForDashboardDisplay)  {
            		return 6;
            	}
                return 12;
            }
            else if (this.options.selectedDateRange == HBaseMM.Literals.DATE_RANGE_1D){
	            if (self.options.customizeForDashboardDisplay)  {
            		return 3;
            	}
                return 6;
            }
            else if (this.options.selectedDateRange == HBaseMM.Literals.DATE_RANGE_1W){
            	if (self.options.customizeForDashboardDisplay)  {
            		return 3;
            	}
                return 7;
            }
else if (this.options.selectedDateRange == HBaseMM.Literals.DATE_RANGE_CUSTOM){
			if (self.options.customizeForDashboardDisplay)  {
            		return 3;
            }
return 6;
}
            return 5;
        },
        _setOption: function(option, value)
        {
// console.log('set option is called on an existing object');
// $.Widget.prototype._setOption.apply( this, arguments );
// this._init();
// this._refresh();
// alert('in setoptions');
        },
        destroy: function()
        {
            // Need to reset this element(s) back to
            // what they were before we enhanced them.
            // this includes destorying the other UI
            // widgets we created.

            this.element
                .removeClass('hbasemm-chart-linechart');
            $.Widget.prototype.destroy.call( this );
        },
        
        getXAxisLabelFormat: function() {

            if (this.options.selectedDateRange == HBaseMM.Literals.DATE_RANGE_5M){
                return function(d){ return d3.time.format('%H:%M:%S')(new Date(d));};
            }
            else if (this.options.selectedDateRange == HBaseMM.Literals.DATE_RANGE_30M){
                return function(d){ return d3.time.format('%H:%M:%S')(new Date(d));};;
            }
            else if (this.options.selectedDateRange == HBaseMM.Literals.DATE_RANGE_1H){
                return function(d){ return d3.time.format('%H:%M:%S')(new Date(d));};
            }
            else if (this.options.selectedDateRange == HBaseMM.Literals.DATE_RANGE_12H){
                return function(d){ return d3.time.format('%H:%M:%S')(new Date(d));};
            }
            else if (this.options.selectedDateRange == HBaseMM.Literals.DATE_RANGE_1D){
                return function(d){ return d3.time.format('%d-%b %H:%M')(new Date(d));};
            }
            else if (this.options.selectedDateRange == HBaseMM.Literals.DATE_RANGE_1W){
                return function(d){ return d3.time.format('%d-%b %H:%M')(new Date(d));};
            }
            else if (this.options.selectedDateRange == HBaseMM.Literals.DATE_RANGE_CUSTOM) {
                return function(d){ return d3.time.format('%d-%b %H:%M')(new Date(d));};
            }
            return function(d){ return d3.time.format('%d-%b %H:%M')(new Date(d));};

        },
        getChartData: function() {
            var self = this;
            var chartSeriesArray = [];
            
// var containerId = self.element.attr('id');
            console.log(this.options.chartPlotsDisabledStatus , ' retrieved in container ' + self.containerId);
            $.each(this.options.chartPlots, function(index, chartPlot){
                
                //Get the status of each chart plot from chartPlotsDisabledStatus.
                //This is done to retain host selection when the brand changes date ranges.
                var isThisPlotDisabled = false;
                if (self.options.chartPlotsDisabledStatus) {
                    isThisPlotDisabled = self.options.chartPlotsDisabledStatus[chartPlot.name];
                    if (isThisPlotDisabled == null || isThisPlotDisabled == undefined) {
                        isThisPlotDisabled = false;
                    }
                }
// console.log('disabled[' + chartPlot.name + ']' + isThisPlotDisabled);
                var chartSeries = {
                    key: chartPlot.name,
                    disabled: isThisPlotDisabled,
                    values: chartPlot.dataPoints
                };
                chartSeriesArray.push(chartSeries);
            });
            if (chartSeriesArray.length == 0) {
                return this.getEmptyChartData();
            }
            return chartSeriesArray;

        },

        getEmptyChartData: function() {
            var chartSeriesArray = [];
            var self = this;
            if(self.options.rawQuery) {
                var chartSeries = {
                    key: "empty",
                    values: [{"x":null,"y":null}]
                };
                chartSeriesArray.push(chartSeries);
            }
            else if (self.options.hostNamesArray){
                $.each(self.options.hostNamesArray, function(index, hostName){
                    var chartSeries = {
                        key: hostName,
                        values: [{"x":null,"y":null}]
                    };
                    chartSeriesArray.push(chartSeries);
                });
            }
            if (chartSeriesArray.length ==0 ) {
             var chartSeries = {
                    key: "empty",
                    values: [{"x":null,"y":null}]
                };
                chartSeriesArray.push(chartSeries);
            }
// alertObject(chartSeriesArray);

            return chartSeriesArray;
        }
    });
// 
// $.widget("hbasemm.metricsTable",
//     {
//         options:
//         {
//             metricsArray: null,
//             nodeTitlesList:null,
//             metricsColumnTitle:"",
//             valueColumnTitle:"",
//             isDisplayingMetricsForMultipleNodes: false
//         },
// 
//         _create: function()
//         {
//             this.element.addClass('hbase-table-container');
// 
//             this.containerId = this.element.attr('id');
//             if (!this.containerId){
//                 throw "Table's container must have an id";
//             }
// 
//             var tableElement= $("<table id=\"" + this.containerId + "_table\"></table>");
// 
//             $(tableElement).appendTo(this.element);
// 
//             var theadElement= $("<thead></thead>");
//             $(theadElement).appendTo(tableElement);
// 
//             //If no title is specified for metrics column, leave it blank.
//             var metricsColumnTitleValue = '';
//             if (this.options.metricsColumnTitle ){
//                 metricsColumnTitleValue = this.options.metricsColumnTitle;
//             }
//             var thMetricsColumnTitle = '<th>' + metricsColumnTitleValue + '</th>';
//             $(thMetricsColumnTitle ).appendTo(theadElement);
// 
//             //Check if the table is displaying metrics from multiple nodes.
//             //If it is, we'll display the name of the node as column value
//             //Otherwise, display the name supplied with options.
//             if (this.options.nodeTitlesList.length > 1) {
//                 $.each(this.options.nodeTitlesList, function(index, nodeTitle){
// 
//                     var thNodeTitle = '<th>' + nodeTitle + '</th>';
//                     $(thNodeTitle).appendTo(theadElement);
//                 });
//             }
//             else {
//                 var valueColumnTitleValue = this.options.valueColumnTitle ? this.options.valueColumnTitle : '';
//                 var thNodeTitle = '<th>' + valueColumnTitleValue + '</th>';
//                 $(thNodeTitle).appendTo(theadElement);
//             }
// 
//             //var thGraphColumnTitle = '<th><a href="#"><img src="resources/img/graph.png"/></a></th>';
// 
//             var thGraphColumnTitle = '<th>Graph</th>';
//             $(thGraphColumnTitle ).appendTo(theadElement);
// 
//             var nodeTitlesList = this.options.nodeTitlesList;
// 
//             var tbodyElement= $("<tbody></tbody>");
//             $(tbodyElement).appendTo(tableElement);
// 
//             var self = this;
//             $.each(this.options.metricsArray, function(index, metricData) {
// 
//                 var trowElement= $("<tr></tr>");
//                 $(trowElement).appendTo(tbodyElement);
// 
//                 var tdMetricDataTitle = metricData.name;
//                 $("<td>" + tdMetricDataTitle + "</td>").appendTo(trowElement);
// 
// // alertObject(nodeTitlesList, 'Nodes');
// // alertObject(metricData.values, 'MetricData:');
//                 $.each(nodeTitlesList, function (index, nodeTitle){
// 
//                     var valueForThisNode = 'N/A';
//                     var thresholdForThisNode = null;
//                     $.each(metricData.values, function(key, value) {
//                         var comparingHost = value['host'];
// 
//                         if (comparingHost == nodeTitle) {
// 
//                             valueForThisNode = value['value'];
//                             thresholdForThisNode = value['threshold'];
// 
//                             if (metricData.type == HBaseMM.Literals.METRIC_DATA_TYPE_CONSTANT_DATE) {
//                                 valueForThisNode = getFullDateFromEpochTimeInMilliseconds(valueForThisNode);
//                             }
//                             if (metricData.type == HBaseMM.Literals.METRIC_DATA_TYPE_TIME_SERIES_PERCENTAGE) {
//                                 valueForThisNode = Math.ceil(valueForThisNode * 100) / 100 + '%';
//                             }
//                         }
//                     });
// 
//                     var cssClassStr = 'hbase-threshold-none';
//                     if (thresholdForThisNode) {
//                         cssClassStr = 'hbase-threshold-' + thresholdForThisNode;
//                     }
//                         
//                     var valueElement = $("<td><div class=\"" + cssClassStr + "\">" + valueForThisNode + "</div></td>");
//                     $(valueElement).appendTo(trowElement);
//                 });
// 
//                 var emptyGraphElement= $("<td></td>");
//                 $(emptyGraphElement).appendTo(trowElement);
// 
//                 if (metricData.type == HBaseMM.Literals.METRIC_DATA_TYPE_TIME_SERIES_NUMBER
//                     || metricData.type == HBaseMM.Literals.METRIC_DATA_TYPE_TIME_SERIES_PERCENTAGE ){
// 
//                     var graphImageElement = $("<img src='resources/img/chart.png' class=\"hbase-explore-table-graph-icon\">");
// 
//                     $(graphImageElement).addClass('hbase-table-cell-tappable');
// 
//                     $(graphImageElement).appendTo(emptyGraphElement).click(function(){
// 
//                         if (metricData.type == HBaseMM.Literals.METRIC_DATA_TYPE_TIME_SERIES_NUMBER){
//                             self.loadGraph(graphImageElement, metricData, self.options.nodeTitlesList);
//                         }
//                         else if (metricData.type == HBaseMM.Literals.METRIC_DATA_TYPE_TIME_SERIES_PERCENTAGE){
//                             self.loadPercentageGraph(graphImageElement, metricData, self.options.nodeTitlesList);
//                         }
//                     });
//                 }
// 
//             });
// // $(this.titleElement).tooltip({ content: "Awesome title!" });
// 
//         },
// 
//         _init: function()
//         {
// 
//         },
// 
//         _setOption: function(option, value)
//         {
// 
//             $.Widget.prototype._setOption.apply( this, arguments );
// 
//             this._init();
//         },
// 
//         destroy: function()
//         {
//             // Need to reset this element(s) back to
//             // what they were before we enhanced them.
//             // this includes destorying the other UI
//             // widgets we created.
// 
//             this.element.removeClass('hbase-table-container');
//             $.Widget.prototype.destroy.call( this );
//         },
// 
//         loadGraph: function(htmlElementSelector, metricData, nodeTitlesList) {
//             alert('this will load value graph based on [' + metricData.id+ ',' + nodeTitlesList + ']');
//         },
// 
//         loadPercentageGraph: function(htmlElementSelector, metricData, nodeTitlesList) {
// // alert('this will load percentage graph based on [' + metricData.id+ ',' + nodeKey + ']');
// 
//             var dialogElement = $("<div class=\"hbase-dialog\"></div>");
//             $(dialogElement).appendTo(this.elemeent);
//             $(dialogElement).mmDialog({
//                 metricData: metricData,
//                 hostNamesArray: nodeTitlesList
//             });
//         },
// 
//         loadListOfNodes: function(htmlElementSelector, metricData, nodeKey) {
//             alert('this will load list of nodes based on [' + metricData.id + ',' + nodeKey + ']');
//         }
//     });


$.widget("hbasemm.breadcrumb",
    {
        options:
        {
            breadcrumbsList: null
        },

        _create: function()
        {



        },
        _init: function()
        {
            this.element.addClass('hbase-breadcrumb');

            $('.hbase-breadcrumb div').remove();

            var self = this;
            $.each(this.options.breadcrumbsList, function(index, breadcrumb){

                var breadcrumbItemElement = $("<div class=\"hbase-breadcrumb-item\"></div>");
                $(breadcrumbItemElement).text(breadcrumb.title);
                $(breadcrumbItemElement).appendTo(self.element);

                if (breadcrumb.onClickCallback) {

                    $(breadcrumbItemElement).addClass('tappable');
                    $(breadcrumbItemElement).click(function(){
                        breadcrumb.onClickCallback();
                    });
                }

                //If this isn't the last element in the breadcrumb, add the separator.

                if (index != (self.options.breadcrumbsList.length - 1)) {

                    var separatorElement = $("<div class=\"hbase-breadcrumb-item-seperator\"></div>");
                    $(separatorElement).text('>');
                    $(separatorElement).appendTo(self.element);

                }
            });
        },
        _setOption: function(option, value)
        {
            $.Widget.prototype._setOption.apply( this, arguments );

            this._init();
        },

        destroy: function()
        {
            // Need to reset this element(s) back to
            // what they were before we enhanced them.
            // this includes destorying the other UI
            // widgets we created.

            this.element
                .removeClass('hbasemm-breadcrumb')
                .resizable('destroy')
                .draggable('destroy');
            $.Widget.prototype.destroy.call( this );
        }

    });

$.widget("hbasemm.mmDialog",
    {
        options:
        {
            metricData: null,
            hostNamesArray:null,
	    time:null,
	    chartName:null,
	    thresholds:null,
            chart: null
        },

        _create: function()
        {
// this.element.addClass('hbasemm-chart-container');


        },

        _init: function()
        {
            var self = this;
// loadPageToDiv(this.element, 'chart_dialog.html', function(){

                var titleBarElement = $("<div class=\"hbase-dialog-titlebar\"></div>");
                $(titleBarElement).appendTo(self.element);

                var chartIconElement = $("<img src='resources/img/chart.png' class=\"hbase-dialog-titlebar-chart-icon\"/>");
                var chartTitleElement = $("<div class=\"hbase-dialog-titlebar-title\"></div>");
                var closeIconElement = $("<img src='resources/img/close.png' class=\"hbase-dialog-titlebar-close-icon tappable\"/>");
		//var alertDataButton = $('<div id="hbaseDialogTitlebarAlert" class="hbase-dialog-titlebar-alert tappable" >Go to Notification</div><br><br>');
		//var alertDataButton = $('<input id="hbaseDialogTitlebarAlert" class="hbase-dialog-titlebar-alert" type = "button" value = "Go to Notification" ><br><br>');
		var alertDataButton = $('<a href = "#" id="hbaseDialogTitlebarAlert" class="hbase-dialog-titlebar-alert tappable" >Take Me to Alert Time</a><br><br>');

                //$(chartTitleElement).text(self.options.metricData[0].name);
		
                $(chartIconElement).appendTo(titleBarElement);
                $(chartTitleElement).appendTo(titleBarElement);
                $(closeIconElement).appendTo(titleBarElement);
		$(alertDataButton).appendTo(titleBarElement);
		
                
                $(closeIconElement).click(function(){
                    //When the close button is tapped, remove it from UI.
                    $(self.element).dialog('destroy').remove();
                });

                //$(self.element).dialog({ autoOpen: false, modal:true, width:'70%', height:600, resizable:false});
		$(self.element).dialog({ autoOpen: false, modal:true, width:'90%', height:600, resizable:false, closeOnEscape: false});


                $(self.element).dialog( "open" );

                var chartContentElement = $("<div class=\"hbase-dialog-content\"/></div>");
                $(chartContentElement).appendTo(self.element);

		/*self.metricsArray = [];

		$.each(self.options.metricData, function (i, metric) {

  			self.metricsArray.push(metric.metricId);
		});*/
		

		$(chartTitleElement).text(self.options.chartName);

                loadPageToDiv(chartContentElement, 'chart_dialog.html', function(){
// console.log('chart_dialog loaded');

// alert('in widget loading chart data for ' + self.options.hostNamesArray);

// var hostNamesArray = ['sreekarp1-wsl'];
                    
			//populateChartDialog("iostat.disk.read_requests",new Date(1389033000000),new Date(1391711400000),['iostat.disk.read_requests'],{},false,['aparikh-wsl'], true);

			var alertStartDate = new Date();
			alertStartDate.setHours( alertStartDate.getHours() - 1 );
//alert(JSON.stringify())
			//populateChartDialog(self.options.metricData[0].name,alertStartDate,new Date(),self.metricsArray,self.options.metricData[0].tags,false,self.options.hostNamesArray, true, true);
			populateChartDialog(self.options.chartName,alertStartDate,new Date(),self.options.metricData,self.options.hostNamesArray, true, true, self.options.thresholds);

                });


// });

		$(alertDataButton).click(function(){

			loadPageToDiv(chartContentElement, 'chart_dialog.html', function(){
			
			var alertDate = new Date(parseInt(self.options.time));

			/*var alertStartDate = new Date(alertMillisecs-(1800*1000));
			
			var alertEndDate = new Date(alertMillisecs+(1800*1000));*/
			
			populateChartDialog(self.options.chartName,alertDate,new Date(),self.options.metricData,self.options.hostNamesArray, true, false, self.options.thresholds);

                });


		});


        },
        _refresh : function(){

        },



        _setOption: function(option, value)
        {

            $.Widget.prototype._setOption.apply( this, arguments );
            this._init();
// this._refresh();
        },

        destroy: function()
        {
            // Need to reset this element(s) back to
            // what they were before we enhanced them.
            // this includes destorying the other UI
            // widgets we created.

            $.Widget.prototype.destroy.call( this );
        }

    });

// 
// 
// 
// $.widget("hbasemm.metricsExploreTable",
//     {
//         options:
//         {
//             metricCategoriesArray: null,
//             nodeTitlesList:null
//         },
// 
//         _create: function()
//         {
//             this.element
//                 .addClass('hbase-explore-table-container');
// 
// 
//             
// // $(this.titleElement).tooltip({ content: "Awesome title!" });
// 
//         },
// 
//         _init: function()
//         {
//             this.containerId = this.element.attr('id');
//             if (!this.containerId){
//                 throw "Table's container must have an id";
//             }
//             
//             $('#' + this.containerId + ' > table').remove();
// 
//             var headerTableElement= $("<table id=\"" + this.containerId + "_header_table\" class=\"hbase-explore-table-header\"></table>");
//             $(headerTableElement).appendTo(this.element);
// 
// // var headerTableTbodyElement = $('<tbody></tbody>');
// // $(headerTableTbodyElement).appendTo(headerTableTbodyElement);
// 
//             var headerTableTHeadElement = $('<tbody></tbody>');
//             $(headerTableTHeadElement).appendTo(headerTableElement);
// 
//             var headerTableTRowElement = $('<tr ></tr>');
//             $(headerTableTRowElement).appendTo(headerTableTHeadElement);
// 
//             var emptyTDElement = $('<td ><div></div></td>');
//             $(emptyTDElement).appendTo(headerTableTRowElement);
// 
//             $.each(this.options.nodeTitlesList, function(index, nodeTitle){
//                 var thNodeTitle = '<td ><img src="resources/img/Node_Small.png"/><div>' + nodeTitle + '</div></td>';
//                 $(thNodeTitle).appendTo(headerTableTRowElement);
//             });
// 
//             var thGraphColumnTitle = '<td><div>Graph</div></td>';
//             $(thGraphColumnTitle ).appendTo(headerTableTRowElement);
// 
//             var nodeTitlesList = this.options.nodeTitlesList;
// 
//             var self = this;
// 
//             //Loop through the categories and paint the UI
//             $.each(this.options.metricCategoriesArray, function(index, metricCategoryData){
// 
//                 var accordionTitle = metricCategoryData.name;
//                 var metricsArray = metricCategoryData.metrics;
// 
//                 var tableId = self.containerId + "_category_" + metricCategoryData.id + "_table";
//                 var categoryTableElement= $("<table id=\"" + tableId +"\" class=\"hbase-explore-table\"></table>");
//                 $(categoryTableElement).appendTo(self.element);
// 
//                 var categoryTBodyElement= $("<tbody></tbody>");
//                 $(categoryTBodyElement).appendTo(categoryTableElement);
// 
//                 var accordionTitleRowId = "accordion_" + accordionTitle ;
//                 var tAccordionTitleRow= $("<tr id=\"" + accordionTitleRowId +"\" class=\"hbase-explore-table-accordion-row\"></tr>");
//                 $(tAccordionTitleRow).appendTo(categoryTBodyElement).click(function(){
//                     self.expandOrCollapseAccordion(tableId);
//                 });
//                 $(tAccordionTitleRow).addClass('hbase-explore-table-accordion-row-unselected');
// 
//                 var tAccordionTD= $("<td colspan=\"" + (nodeTitlesList.length + 2 ) +"\"></td>");
//                 $(tAccordionTD).appendTo(tAccordionTitleRow);
// 
//                 var tAccordionImageElement = $("<img src=\"resources/img/Accordion_Open.png\" />");
//                 $(tAccordionImageElement).appendTo(tAccordionTD);
// 
//                 var tAccordionTitleElement = $("<div>" + accordionTitle + "</div>");
//                 $(tAccordionTitleElement).appendTo(tAccordionTD);
// 
//                 if (metricsArray) {
//                     $.each(metricsArray, function(index, metricData) {
// 
//                         var trowElement = $("<tr class=\"hbase-explore-table-metric-row\"></tr>");
//                         $(trowElement).appendTo(categoryTBodyElement).fadeOut(0);
// 
//                         var tdMetricDataTitle = metricData.name;
//                         $("<td><div>" + tdMetricDataTitle + "</div></td>").appendTo(trowElement);
// 
//                         // alertObject(metricData, 'Trying to add:');
//                         $.each(nodeTitlesList, function(index, nodeTitle) {
// 
//                             var valueForThisNode = 'N/A';
//                             var thresholdForThisNode = null;
//                             $.each(metricData.values, function(key, value) {
//                                 var comparingHost = value['host'];
// 
//                                 if (comparingHost == nodeTitle) {
// 
//                                     valueForThisNode = value['value'];
//                                     thresholdForThisNode = value['threshold'];
// 
//                                     if (metricData.type == HBaseMM.Literals.METRIC_DATA_TYPE_CONSTANT_DATE) {
//                                         valueForThisNode = getFullDateFromEpochTimeInMilliseconds(valueForThisNode);
//                                     }
//                                 }
//                             });
// 
//                             var cssClassStr = 'hbase-threshold-none';
//                             if (thresholdForThisNode) {
//                                 cssClassStr = 'hbase-threshold-' + thresholdForThisNode;
//                             }
//                             var valueElement = $("<td><div class=\"" + cssClassStr + "\">" + valueForThisNode + "</div></td>");
//                             $(valueElement).appendTo(trowElement);
//                         });
// 
//                         var emptyGraphElement = $("<td></td>");
//                         $(emptyGraphElement).appendTo(trowElement);
// 
//                         if (metricData.type == HBaseMM.Literals.METRIC_DATA_TYPE_TIME_SERIES_NUMBER || metricData.type == HBaseMM.Literals.METRIC_DATA_TYPE_TIME_SERIES_PERCENTAGE) {
// 
// 
//                             var graphImageElement = $("<img src='resources/img/chart.png' class=\"hbase-explore-table-graph-icon\"/>");
// 
//                             $(graphImageElement).addClass('hbase-table-cell-tappable');
// 
//                             $(graphImageElement).appendTo(emptyGraphElement).click(function() {
// 
//                                 if (metricData.type == HBaseMM.Literals.METRIC_DATA_TYPE_TIME_SERIES_NUMBER) {
//                                     self.loadGraph(metricData, self.options.nodeTitlesList);
//                                 } else if (metricData.type == HBaseMM.Literals.METRIC_DATA_TYPE_TIME_SERIES_PERCENTAGE) {
//                                     self.loadPercentageGraph(metricData, self.options.nodeTitlesList);
//                                 }
//                             });
//                         }
//                     });
//                 }
//             });
//         },
// 
//         _setOption: function(option, value)
//         {
// 
//             $.Widget.prototype._setOption.apply( this, arguments );
// 
//             this._init();
//         },
// 
//         destroy: function()
//         {
//             // Need to reset this element(s) back to
//             // what they were before we enhanced them.
//             // this includes destorying the other UI
//             // widgets we created.
// 
//             this.element.removeClass('hbase-explore-table-container');
//             $.Widget.prototype.destroy.call( this );
//         },
// 
//         expandOrCollapseAccordion: function(categoryTableId) {
//             $(function() {
// 
//                 //show or hide the rows under this table.
//                 $("#" + categoryTableId + " tr:not(.hbase-explore-table-accordion-row)").fadeToggle(500);
// 
//                 var accordionRow = $("#" + categoryTableId + " .hbase-explore-table-accordion-row");
// 
//                 //Change the image based on the state of accordion.
//                 var imageOfAccordion = $("#" + categoryTableId + " .hbase-explore-table-accordion-row img");
//                 var currentImagePath = $(imageOfAccordion).attr('src');
//                 if (currentImagePath == 'resources/img/Accordion_Open.png') {
//                     imageOfAccordion.attr('src', 'resources/img/Accordion_Close.png');
//                     
//                     //Change the text color based on expand/collapse.
//                     $(accordionRow).addClass('hbase-explore-table-accordion-row-selected');
//                     $(accordionRow).removeClass('hbase-explore-table-accordion-row-unselected');
//                 }
//                 else {
//                     imageOfAccordion.attr('src', 'resources/img/Accordion_Open.png');
// 
//                     //Change the text color based on expand/collapse.
//                     $(accordionRow).addClass('hbase-explore-table-accordion-row-unselected');
//                     $(accordionRow).removeClass('hbase-explore-table-accordion-row-selected');
// 
//                 }
//                 
//             });
// 
//         },
// 
//         loadGraph: function(metricData, nodeTitlesList) {
// // alert('this will load value graph based on [' + metricData.id+ ',' + nodeKey + ']');
// 
//             var dialogElement = $("<div class=\"hbase-dialog\"></div>");
//             $(dialogElement).appendTo(this.elemeent);
//             $(dialogElement).mmDialog({
//                 metricData: metricData,
//                 hostNamesArray: nodeTitlesList
//             });
// 
//         },
//         loadPercentageGraph: function(metricData, nodeTitlesList) {
//             alert('this will load percentage graph based on [' + metricData.id+ ',' + nodeKey + ']');
// 
//             var dialogElement = $("<div class=\"hbase-dialog\"></div>");
//             $(dialogElement).appendTo(this.elemeent);
//             $(dialogElement).mmDialog({
//                 metricData: metricData,
//                 hostNamesArray: nodeTitlesList
// 
//             });
// 
//         },
// 
//         loadListOfNodes: function(metricData, nodeKey) {
//             alert('this will load list of nodes based on [' + metricData.id + ',' + nodeKey + ']');
//         }
// 
//     });

$.widget("hbasemm.mmDropDown",
    {
        options:
        {
            dropDownOptions: null,
            selectedOptions:null,
            onShowItemsCallback:null,
            onHideItemsCallback:null,
            promptText:null,
            onValueChangeCallback:null,
            isMultiSelectEnabled: false,
            allItemsTitle: "All"
        },

        _create: function()
        {
            
            var containerId = this.element.attr('id');
            //$('#' + containerId + ' > div').remove();


            var self = this;
            self.element.addClass('hbase-dropdown-container');

            this.titleElement = $("<div class=\"hbase-dropdown-title\"></div>");
            $(this.titleElement).appendTo(self.element);
            
            self.updateTitleForDropdown();
            
            var dropDownBGElement = $("<div class=\"hbase-dropdown-img-bg\"></div>");
            $(dropDownBGElement).appendTo(self.element);
            
            var dropDownImageElement= $("<img src='resources/img/Drop_down_Arrow.png' class=\"hbase-dropdown-img\"/>");
            $(dropDownImageElement).appendTo(dropDownBGElement);
            
            self.dropDownListElement = $("<div class=\"hbase-dropdown-list\" hidden></div>");
            $(self.dropDownListElement).appendTo(self.element);
  
            self.element.click(function(event){
                self.showOrHideListItems();
                event.stopPropagation();
            });

        },

        _init: function()
        {
            var self = this;

            var containerId = this.element.attr('id');
            $('#' + containerId + ' .hbase-dropdown-list-item').remove();
            
            if (!self.options.isMultiSelectEnabled) {
                $.each(self.options.dropDownOptions, function(index, value){
                
                    var dropDownItemElement = $("<div class=\"hbase-dropdown-list-item\"></div>");
                    $(dropDownItemElement).appendTo(self.dropDownListElement);

                    var title = value['title'];
                    $(dropDownItemElement).text(title);
                    $(dropDownItemElement).click(function(event){

                        self.selectItemForSingleSelection(title);
                        
                        if (self.options.onValueChangeCallback) {
                            self.options.onValueChangeCallback();
                        }
                        event.stopPropagation();

                    });
                });
                
                $(self.dropDownListElement).click(function(){
                    
                    self.showOrHideListItems();
                });
            }
            else {
                self.addSelectAllItem();
                
// alertObject(self.dropDownListElement, 'Dropdown list');
                $.each(self.options.dropDownOptions, function(index, value){
                    
                    var dropDownItemElement = $("<div class=\"hbase-dropdown-list-item\"></div>");
                    $(dropDownItemElement).appendTo(self.dropDownListElement);

                    var title = value['title'];
                    var state = value['state'];

                    if (state == 'inactive') {
                        $(dropDownItemElement).addClass('hbase-dropdown-list-item-inactive');
                    }

                    var checkId = getIdForDropDownCheckItem(title);
                    var dropDownItemCheckElement = $("<input " + " id=\"" + checkId + "\" type=\"checkbox\" class=\"hbase-dropdown-list-multi-item-check\"/>");
                    $(dropDownItemCheckElement).appendTo(dropDownItemElement);
                    
                    var dropDownItemTitleElement = $("<div class=\"hbase-dropdown-list-multi-item-title\"></div>");
                    $(dropDownItemTitleElement).appendTo(dropDownItemElement);
                    $(dropDownItemTitleElement).text(title);
                    
                    $(dropDownItemElement).click(function(event){

                        self.checkOrUncheckForMultiSelection(title);
                        if (self.options.onValueChangeCallback) {
                            self.options.onValueChangeCallback();
                        }
                        event.stopPropagation();
                    });
                });
            }
        },
        addSelectAllItem: function() {
            var self = this;
            var value = this.options.allItemsTitle;
            var dropDownItemElement = $("<div class=\"hbase-dropdown-list-item\"></div>");
            $(dropDownItemElement).appendTo(self.dropDownListElement);
            
// alertObject(self.dropDownListElement, 'Dropdown list');

            var checkId = getIdForDropDownCheckItem(value);
            var dropDownItemCheckElement = $("<input " + " id=\"" + checkId + "\" type=\"checkbox\" class=\"hbase-dropdown-list-multi-item-check\"/>");
            $(dropDownItemCheckElement).appendTo(dropDownItemElement);

            var dropDownItemTitleElement = $("<div class=\"hbase-dropdown-list-multi-item-title\"></div>");
            $(dropDownItemTitleElement).appendTo(dropDownItemElement);
            $(dropDownItemTitleElement).text(value);

            $(dropDownItemElement).click(function(event) {

                self.checkOrUncheckAllItems(value);
                if (self.options.onValueChangeCallback) {
                    self.options.onValueChangeCallback();
                }
                event.stopPropagation();
            });
// console.log('added All item');
        },
        
        checkOrUncheckAllItems: function() {
            
            var isAllItemsSelectedAlready = false;
            if (!this.options.selectedOptions) {
                this.options.selectedOptions = [];
            }
            var indexOfThisItem = this.options.selectedOptions.indexOf(this.options.allItemsTitle);
            //console.log('index :' + indexOfThisItem);
            if (indexOfThisItem >= 0) {
                isAllItemsSelectedAlready = true;
            }
            if (!isAllItemsSelectedAlready) {
                this.options.selectedOptions = [];
                this.options.selectedOptions.push(this.options.allItemsTitle);
                var self = this;
                $.each(self.options.dropDownOptions, function(index, value){
                    self.options.selectedOptions.push(value['title']);
                });
                $('.hbase-dropdown-list-multi-item-check').prop('checked', true);
            }
            else {
                this.options.selectedOptions = [];
                $('.hbase-dropdown-list-multi-item-check').prop('checked', false);
            }
            this.updateTitleForDropdown();
        },
        _refresh : function(){
          

        },
        showListItems: function() {
//	        this.dropDownListElement.css('z-index', 1);	
            this.dropDownListElement.show();
        },
        hideListItems: function() {
            this.dropDownListElement.hide();
        },
        reloadDropDownOptions: function(newOptions){
            this.options.dropDownOptions = newOptions;
            this.options.selectedOptions = [];
            this.updateTitleForDropdown();
            this._init();
        },
        getSelectedItems: function() {
            //console.log('returning : ' + this.options.selectedOptions);
            var selectedOptions = [];
            if (this.options.selectedOptions){
                selectedOptions = this.options.selectedOptions;
                var indexOfAllItem = selectedOptions.indexOf(this.options.allItemsTitle);
                //console.log('index :' + indexOfThisItem);
                if (indexOfAllItem >= 0) {
                    selectedOptions.splice(indexOfAllItem, 1);
                }
            }
            return selectedOptions;
        },
        updateTitleForDropdown: function() {
            var titleText = null;
// console.log('selected options:' + this.options.selectedOptions);
            if (this.options.selectedOptions && this.options.selectedOptions.length > 0){
                
                if (this.options.isMultiSelectEnabled) {
                    var isAllItemsSelected = false;
                    var indexOfAllItem = this.options.selectedOptions.indexOf(this.options.allItemsTitle);
                    //console.log('index :' + indexOfThisItem);
                    if (indexOfAllItem >= 0) {
                        isAllItemsSelected = true;
                    }
                    if (isAllItemsSelected) {
                        titleText = this.options.allItemsTitle;
                    }
                    else {
                        titleText = this.options.selectedOptions.join(', ');
                    }
                }
                else {
                    titleText = this.options.selectedOptions.join(', ');
                }
                
                
                
                this.titleElement.removeClass('hbase-dropdown-title-prompt');
                this.titleElement.addClass('hbase-dropdown-title-selected');
            }
            else {
                titleText = this.options.promptText;
                this.titleElement.removeClass('hbase-dropdown-title-selected');
                this.titleElement.addClass('hbase-dropdown-title-prompt');
            }
            
            this.titleElement.text(titleText);
        },
        
        selectItemForSingleSelection: function(selectedItem){
            
// console.log('Current Selection:' + this.options.selectedOptions);
            
// var selectedItem = $(dropDownItemElement).text();
            this.options.selectedOptions = [];
            this.options.selectedOptions.push(selectedItem);
            
            this.updateTitleForDropdown();
            
            this.showOrHideListItems();
            
        },
        
        checkOrUncheckForMultiSelection: function(selectedItem){
            
            //console.log('Current Selection:' + this.options.selectedOptions);
            
// var selectedItem = $(dropDownItemElement).text();
// console.log('selectedItem:' + selectedItem);
            
            var isThisItemSelectedAlready = false;
            if (!this.options.selectedOptions) {
                this.options.selectedOptions = [];
            }
/* if (!this.options.isMultiSelectEnabled && this.options.selectedOptions.length == 1) {
var previousSelectedItem = this.options.selectedOptions[0];
//this.toggleItemSelection(previousSelectedItem);
}
*/
            var indexOfThisItem = this.options.selectedOptions.indexOf(selectedItem);
            //console.log('index :' + indexOfThisItem);
            if (indexOfThisItem >= 0) {
                isThisItemSelectedAlready = true;
            }
            
            var checkId = getIdForDropDownCheckItem(selectedItem);
            
            if (!isThisItemSelectedAlready) {
// console.log('checking item');
                this.options.selectedOptions.push(selectedItem);
                $('#' + checkId).prop('checked', true);
                
                //If all items from dropdown options are selected, select the 'All Items' as well.
                if (this.options.selectedOptions.length == this.options.dropDownOptions.length) {
                    
                    this.options.selectedOptions.push(this.options.allItemsTitle);
                    var allItemsCheckid = getIdForDropDownCheckItem(this.options.allItemsTitle);
                    $('#' + allItemsCheckid).prop('checked', true);
                    
                }
            }
            else {
// console.log('unchecking item from ' + this.options.selectedOptions);
                this.options.selectedOptions.splice(indexOfThisItem, 1);
                $('#' + checkId).prop('checked', false);

// console.log('after popping current item ' + this.options.selectedOptions);
                
                var indexOfAllItems = this.options.selectedOptions.indexOf(this.options.allItemsTitle);
                if (indexOfAllItems >= 0) {
                    
                    this.options.selectedOptions.splice(indexOfAllItems, 1);
                    var allItemsCheckid = getIdForDropDownCheckItem(this.options.allItemsTitle);
                    $('#' + allItemsCheckid).prop('checked', false);
                }
                
// console.log('after popping select all item ' + this.options.selectedOptions);
            }
            
// console.log('Revised Selection:' + this.options.selectedOptions);
            
            this.updateTitleForDropdown();
            
        },
        showOrHideListItems: function(){

            if (this.dropDownListElement.is(":hidden") ) {
                
                this.dropDownListElement.show();
                if (this.options.onShowItemsCallback) {
                    this.options.onShowItemsCallback();
                }
                    
            }
            else {
                this.dropDownListElement.hide();
                if (this.options.onHideItemsCallback) {
                    this.options.onHideItemsCallback();
                }
            }
        },


        _setOption: function(option, value)
        {

            $.Widget.prototype._setOption.apply( this, arguments );
            this._refresh();
            this._init();
        },

        destroy: function()
        {
            // Need to reset this element(s) back to
            // what they were before we enhanced them.
            // this includes destorying the other UI
            // widgets we created.

            $.Widget.prototype.destroy.call( this );
        }

    });

$.widget("hbasemm.mmButton",
    {
        options:
        {
            title: null,
            onClickCallback: null
        },

        _create: function()
        {
            this.element
                .addClass('hbase-button');

            $(this.element).text(this.options.title);

            if (this.options.onClickCallback){
                this.element.addClass('tappable');

                var self = this;
                this.element.click(function(){
                    self.options.onClickCallback();
                });
            }
        },

        _init: function()
        {
        },

        _setOption: function(option, value)
        {

            $.Widget.prototype._setOption.apply( this, arguments );

            this._init();
        },

        destroy: function()
        {
            // Need to reset this element(s) back to
            // what they were before we enhanced them.
            // this includes destorying the other UI
            // widgets we created.

            this.element
                .removeClass('hbase-button')
                .resizable('destroy')
                .draggable('destroy');
            $.Widget.prototype.destroy.call( this );
        }

    });

$.widget("hbasemm.mmTextArea",
    {
        options:
        {
            placeholder: null,
            defaultText: null,
            data:null,
            dataType:null,
            isReadOnly:null,
            id:null
        },

        _create: function()
        {
            this.textAreaElement = $("<textarea></textarea>");
            $(this.textAreaElement).appendTo(this.element);
            if (this.options.defaultText) {
                $(this.textAreaElement).text(this.options.defaultText);
            }

            this.textAreaElement
                .addClass('hbasemm-textArea');
            if(this.options.id) {
                $(this.textAreaElement).attr("id", this.options.id);
            }
            if(this.options.placeholder) {
                $(this.textAreaElement).attr("placeholder", this.options.placeholder);
            }

            if(this.options.isReadOnly) {
                $(this.textAreaElement).attr('readonly','readonly');
            }

            if(this.options.data) {
                if(this.options.dataType == "text/json") {
                    $(this.textAreaElement).text(JSON.stringify(this.options.data));
                }
                else {
                    $(this.textAreaElement).text(this.options.data);
                }
            }
        },

        _init: function()
        {
        },

        _setOption: function(option, value)
        {

            $.Widget.prototype._setOption.apply( this, arguments );

            this._init();
        },

        destroy: function()
        {
            // Need to reset this element(s) back to
            // what they were before we enhanced them.
            // this includes destorying the other UI
            // widgets we created.

            this.element
                .removeClass('hbasemm-textArea')
                .resizable('destroy')
                .draggable('destroy');
            $.Widget.prototype.destroy.call( this );
        }

    });



$.widget("hbasemm.mmRadioButtonGroup",
    {
        options:
        {
            labelsArray: null,
            onClickCallBack: null
        },

        _create: function()
        {
            var parentId = this.element.attr('id');
            var self = this;
            $.each(self.options.labelsArray, function(index, buttonText) {
                this.buttonElement = $("<input type=\"radio\" name=\"" + parentId + "_radioGroup\" id=\"" + parentId + "_" + buttonText + "\" value=\"" + buttonText + "\" class=\"hbasemm-radio\" />");
                $(this.buttonElement).appendTo(self.element);

                //Create and add Label to the Selector
                var radioTitleId = getIdForRadioButtonItemTitle(parentId + "_" + buttonText);
                this.radioButtonLabel = $("<div id=\"" + radioTitleId + "\" class=\"hbasemm-radio-title\" />");
                this.radioButtonLabel.text(buttonText);
                $(this.radioButtonLabel).appendTo(self.element);
                $(this.radioButtonLabel).addClass('tappable');
                var outer = this;
                $(this.buttonElement).click(function() {
                    if($.isFunction(self.options.onClickCallBack)) {
                    self.options.onClickCallBack($(outer.radioButtonLabel).text());
                    }
                });
                $(this.radioButtonLabel).click(function() {
                    self.toggleOtherRadioButtons("#" + radioTitleId);
                });
            });
        },

        _init: function()
        {

        },

        _setOption: function(option, value)
        {

            $.Widget.prototype._setOption.apply( this, arguments );

            this._init();
        },

        destroy: function()
        {
            // Need to reset this element(s) back to
            // what they were before we enhanced them.
            // this includes destorying the other UI
            // widgets we created.

            this.element
                //.removeClass('hbasemm-textArea')
                .resizable('destroy')
                .draggable('destroy');
            $.Widget.prototype.destroy.call( this );

        },

        toggleOtherRadioButtons: function(clicked)
        {
            var radioGroupId = this.element.attr('id') + "_radioGroup";
            $.each($("input[name='" + radioGroupId + "']"), function(index, radioElement) {
                if($(radioElement).val() == $(clicked).text()) {
                    $(radioElement).click();
                }
            });
        }
    });
    
$.widget("hbasemm.datetimepicker", {
        options:
        {
            selectedDate: null,
            selectedHour: 0,
            selectedMin: 0,
            prompt: 'Choose Date',
            includeNowButton: true,
            includeTimeComponents:true,
            includeClearButton:false
        },

        _create: function()
        {
            this.element.addClass('hbasemm-datetimepicker');

			var elementId = this.element.attr('id');

			var inputElementId = elementId + '_input';
            this.inputElement= $("<input type='text' id='" + inputElementId + "' style='width:99%;text-align:center' readonly='readonly'/>");
            if (this.options.prompt) {
            	$(this.inputElement).attr('placeholder', this.options.prompt);
            }

            $(this.inputElement).appendTo(this.element);
            
			var self = this;
            $(this.inputElement).datepicker({
            	autoSize: true,
	            maxDate : new Date(),
    	        //showButtonPanel: true,
        	    //closeText: "Close",
            	//currentText: "Now",
            
	            onChangeMonthYear: function(year, month, instance) {
    	        	self.loadAdditionalUIComponents();
        	    },
            
				beforeShow: function(input, instance) {

					console.log('current input:' + $(input).val());
					var currentDateTimeStr = $(input).val();
					if (currentDateTimeStr.length > 0) {

						var timeString = currentDateTimeStr.split(' ')[1];
						var timeComponents = timeString.split(':');
						var hour = parseInt(timeComponents[0]);
						var min = parseInt(timeComponents[1]);
			
						if (self.options.selectedHour != hour) {
							self.options.selectedHour = hour;
						}
			
						if(self.options.selectedMin != min) {
							self.options.selectedMin = min;
						}
			
						console.log('selected hour:', self.options.selectedHour);
						console.log('selected min:', self.options.selectedMin);
				}
			
				self.loadAdditionalUIComponents();
			},
		
			onClose: function(dateText, instance){
			
				if (dateText.length > 0) {

					var selectedDate = dateText.split(' ')[0];

					var hour = self.options.selectedHour;
					if (hour < 10) hour = '0' + hour;

					var min = self.options.selectedMin;
					if (min < 10) min = '0' + min;

					$(this).val(selectedDate + ' ' + hour + ':' + min);
				}
			}
		});
            
    },
        
    
    loadAdditionalUIComponents: function (){
    
		var self = this;
		
		setTimeout(function() {

			var timeRangeButtonPaneDiv = $('<div id="time_range_div" class="ui-datepicker-buttonpane ui-widget-content"><div>');
			if ($('#time_range_div').length > 0 ){
				return;
			}
			var hourSelector = $('<select id="hour_selector"></select>');
			for ( i =0; i <= 23; i++) {
				var value = i;
				if (i < 10) {
					value = '0' + i;
				}
				else {
					value = '' + i;
				}
	
				$(hourSelector).append($('<option>', {
					value: i ,
					text : value
				}));
			}
	
			if(self.options.selectedHour) {
				$(hourSelector).val(self.options.selectedHour);
			}

			$(hourSelector).change(function(){
				console.log($(hourSelector).val() + ' is selected for hour');
				self.options.selectedHour = $(hourSelector).val();
			});

			var minSelector = $('<select id="min_selector"></select>');
			for ( i =0; i <= 59; i++) {
				var value = i;
				if (i < 10) {
					value = '0' + i;
				}
				else {
					value = '' + i;
				}
		
				$(minSelector).append($('<option>', {
					value: i,
					text : value
				}));
			}
			if(self.options.selectedMin) {
				$(minSelector).val(self.options.selectedMin);
			}
			$(minSelector).change(function(){
				console.log($(minSelector).val() + ' is selected for min');
				self.options.selectedMin = $(minSelector).val();
			});

			var timeRangeButtonsDiv = $('<div style="margin-bottom:10px;margin-top:10px;"></div>');
			$(timeRangeButtonsDiv).append('&nbsp;Time:');
			$(timeRangeButtonsDiv).append(hourSelector);
			$(timeRangeButtonsDiv).append('&nbsp;hrs&nbsp;');
			$(timeRangeButtonsDiv).append(minSelector);	
			$(timeRangeButtonsDiv).append('&nbsp;mins&nbsp;');

			$(timeRangeButtonPaneDiv).append(timeRangeButtonsDiv);

			$('.ui-datepicker-calendar').after(timeRangeButtonPaneDiv);
	
			var buttonPaneDiv = $('<div id="buttons_div" class="ui-datepicker-buttonpane ui-widget-content"><div>');

			if (self.options.includeNowButton){

				var nowButton = $('<input type="button" id="now_button" class="hbasemm-chart-container-time-range-now-button" value="Now"/>');
				$(nowButton).click(function(){

					var currentDate = new Date();

					self.options.selectedHour = currentDate.getHours();
					self.options.selectedMin = currentDate.getMinutes();

					$(self.inputElement).datepicker("setDate", new Date());
					self.loadAdditionalUIComponents();

					var currentTimeStr = ('0' + (currentDate.getMonth()+1)).slice(-2) + '/' + ('0' + currentDate.getDate()).slice(-2) + '/'+ currentDate.getFullYear() + ' ' + ('0' + currentDate.getHours()).slice(-2) + ':' + ('0' + currentDate.getMinutes()).slice(-2);
					$(self.inputElement).val(currentTimeStr);

				});
		
				$(buttonPaneDiv).append(nowButton);
			}

			var closeButton = $('<input type="button" id="close_button" class="hbasemm-chart-container-time-range-close-button" value="Close"/>');
			$(closeButton).click(function(){
				console.log('tapped on close button');
				$(self.inputElement).datepicker("hide");
			});
			$(buttonPaneDiv).append(closeButton);
			
			if (self.options.includeClearButton){
				var clearButton = $('<input type="button" id="clear_button" class="hbasemm-chart-container-time-range-clear-button" value="Clear"/>');
				$(clearButton).click(function(){
					console.log('tapped on clear button');
					$(self.inputElement).val("");
					$(self.inputElement).datepicker("hide");
				});
				$(buttonPaneDiv).append(clearButton);
			}
	
	
			 $(timeRangeButtonPaneDiv).after(buttonPaneDiv);
	
		// <input type="button" id ="now_button" class="float:left;margin-top:10px; margin-bottom:10px; width: auto; height: auto; -moz-border-radius: 5px; border-radius: 5px;"value="Now"/><input type="button" style=""value="Close"/>
	
	
			}, 100);
	},

    _init: function() {


    },

    _setOption: function(option, value){

            $.Widget.prototype._setOption.apply( this, arguments );

            this._init();
    },

    destroy: function() {
		// Need to reset this element(s) back to
		// what they were before we enhanced them.
		// this includes destorying the other UI
		// widgets we created.

		this.element
			.removeClass('hbasemm-datetimepicker')
			.resizable('destroy')
			.draggable('destroy');
		$.Widget.prototype.destroy.call( this );
	}
});
//start

$.widget("hbasemm.metricsExploreDashboard",
    {
        options:
        {
		metricCategoriesArray: null,
		nodeTitlesList:null
            
        },

        _create: function()
        {
            
        },

	

        _init: function()
        {
		$('#hbasemm-dashboard-container').remove();
            	this.dashboardContainer = $("<div id =\"hbasemm-dashboard-container\"></div>");
		$(this.dashboardContainer).addClass('hbasemm-explore-dashboard');
		$(this.dashboardContainer).appendTo(this.element);
		$('#hbasemm-dashboard-container').hide();
		var self = this;
		
		$.each(this.options.metricCategoriesArray, function(index, metricCategoryData){
			this.categoryContainer = $("<div id = \"container-category_"+metricCategoryData.name+"\" class =\"dashboard-category-container\"></div>");
			$(this.categoryContainer).appendTo(self.dashboardContainer);

			this.categoryTitle = $("<div id = \"dashboard-category_"+metricCategoryData.name+"\" class =\"dashboard-category-title\" >&nbsp&nbsp"+metricCategoryData.name+"</div>");
			this.accordImage = $("<img src = \"resources/img/Accordion_Close.png\" class = \"dashboard-accord-image\">");
			this.accordImage.appendTo(this.categoryTitle);
		

			$(this.categoryTitle).appendTo(this.categoryContainer);
		
			$(this.categoryTitle).addClass('tappable').click(function(){

				self.expandOrCollapseAccordion(self_cat);
					});

		
			this.lineBreak = $('<br><br><br>');
			$(this.lineBreak).appendTo(this.categoryContainer);
			this.chartContainer = $("<div id = \"dashboard-chart_"+metricCategoryData.name+"\" class =\"dashboard-chart-container\"></div>");
			$(this.chartContainer).appendTo(this.categoryContainer);

			var metricsArray = metricCategoryData.metrics;
			var self_cat = this;
		
			self.populateGraphs(self,self_cat,metricsArray,function(){

				$('#hbasemm-dashboard-container').show();
			});

        });

    },

	populateGraphs: function(self,self_cat,metricsArray,callback){
		if (metricsArray) {
		
			var metricsAndTagsInfoForHelp = [];
		
			$.each(metricsArray, function(index, metricData) {

				if(metricData.name == 'Start Time' || metricData.name == 'Active Time') {
					return true;
				}
				var divId = self_cat.id + '_' + index;
	//	    	alertObject(divId);
				this.metricChart = $("<div id = \"dashboard-metric_"+divId+"\" class =\"dashboard-metric-name\"></div>");	
				$(this.metricChart).appendTo(self_cat.chartContainer);		
			
				var params = metricData.params;
				var isRate = params['rate'] ? true : false;
				var aggregateFunciton = params['aggregateFunction'] ;
				var downsamplingFunction = params['downsamplingFunction'] ;

				var metric = new MetricData(metricData.id, '', metricData.tags, isRate, aggregateFunciton, downsamplingFunction);
				
				$(this.metricChart).mmLineChart({
					title:metricData.name,
					hostNamesArray:self.options.nodeTitlesList,
					dateRange:HBaseMM.Literals.DATE_RANGE_1H,
					//metricIds: [metricData.id],
					//tags: metricData.tags,
					//isRate: isRate,
					metricDataArray: [metric],
					customizeForDashboardDisplay:true
				});
			
			
				if (metricData.tags && Object.keys(metricData.tags).length > 0) {
				
					//Loop through tags
					$.each(metricData.tags, function(tagKey, tagValues) {
					
						//alertObject(tagValues, 'Tag values:[' + tagKey + ']' );
						//For each key, loop through the values.
						
						$.each(tagValues, function(index, tagValue) {
							metricsAndTagsInfoForHelp.push({'id':metricData.id, 'tag':tagValue});	
						});
					});
				}
				else {
					metricsAndTagsInfoForHelp.push({'id':metricData.id});
				}
			});
//			alertObject(metricsAndTagsInfoForHelp, 'About to pass');
			getSelfHelpInfo(metricsAndTagsInfoForHelp, function(responseData){
    	    	reloadHelpTextOnVisibleCharts();
	        }); 

			callback();
		}
	},

        _setOption: function(option, value)
        {

            $.Widget.prototype._setOption.apply( this, arguments );

            this._init();
        },

	 expandOrCollapseAccordion: function(self_cat) {
            $(function() {

                //show or hide the rows under this table.
		
                
		$(self_cat.chartContainer).fadeToggle(500);
		
                var accordionRow = self_cat.categoryTitle;

                //Change the image based on the state of accordion.
                var imageOfAccordion = self_cat.accordImage;
                var currentImagePath = $(imageOfAccordion).attr('src');
                if (currentImagePath == 'resources/img/Accordion_Open.png') {
                    imageOfAccordion.attr('src', 'resources/img/Accordion_Close.png');
                    
                    //Change the text color based on expand/collapse.
                    $(accordionRow).addClass('hbase-explore-dashboard-accordion-row-selected');
                    $(accordionRow).removeClass('hbase-explore-dashboard-accordion-row-unselected');
                }
                else {
                    imageOfAccordion.attr('src', 'resources/img/Accordion_Open.png');

                    //Change the text color based on expand/collapse.
                    $(accordionRow).addClass('hbase-explore-dashboard-accordion-row-unselected');
                    $(accordionRow).removeClass('hbase-explore-dashboard-accordion-row-selected');

                }
                
            });

        },



        destroy: function()
        {
            // Need to reset this element(s) back to
            // what they were before we enhanced them.
            // this includes destorying the other UI
            // widgets we created.
		$('#hbasemm-dashboard-container').remove();

            this.element
                .resizable('destroy')
                .draggable('destroy');
            
            $.Widget.prototype.destroy.call( this );
        }

    });
    
/*    
  
Widget to generate alerts
  
*/    

$.widget("hbasemm.alerts",
    {
        options:
        {
		type: null,
		host: null,
		title: null,
		status: null,
		time: null,		
		help: null,
		notes: null,
		metrics: null,
		alertNum: null
        },

        _create: function()
        {
            this.element.addClass('hbase-alerts');

            
        },

        _init: function()
        {
            this.populateDivs();
            this.checkOverflowText();
            this.displayHelpText();
	    this.displayNotesText();
	    //this.inputNotesText();
		
        },

        _setOption: function(option, value)
        {

            $.Widget.prototype._setOption.apply( this, arguments );

            this._init();
        },

        destroy: function()
        {
            // Need to reset this element(s) back to
            // what they were before we enhanced them.
            // this includes destorying the other UI
            // widgets we created.

            this.element
                .removeClass('hbase-alerts')
                .resizable('destroy')
                .draggable('destroy');
            $.Widget.prototype.destroy.call( this );
        },

	checkOverflowText: function()
        {
		//the max-width of title div is set to 22% of the outer element.
		//checks if the text size has exceeded the div width, i.e text div size = 22% of parent div as overflow hidden is used		

            if( $(this.element.alertsTitle).width() == (  Math.ceil($(this.element.alertsTitle).parent().width() *22/100 ) ) )
            {
                $(this.element.alertsTitle).addClass("tappable");
                $(this.element.alertsTitle).attr('title', this.options.title);
                //this.test(this,$(this.element.alertsTitle).tooltip( { tooltipClass: "custom-tooltip-styling" } ));
                $(this.element.alertsTitle).tooltip(  );


            }
        },
        
    	displayHelpText: function()
        {
		
            $(this.element.alertsHelpImageDiv).addClass("tappable");
            $(this.element.alertsHelpImageDiv).attr('title', this.options.help);
            //this.test(this,$(this.element.alertsTitle).tooltip( { tooltipClass: "custom-tooltip-styling" } ));
            $(this.element.alertsHelpImageDiv).tooltip(  );


            
        },

	displayNotesText: function()
        {
		self = this;
		var alertNum = this.options.alertNum;
        	$(this.element.alertsNotesImageDiv).addClass("tappable");
        	//$(this.element.alertsNotesImageDiv).attr('title', JSON.stringify(this.options.notes));
            	//$(this.element.alertsNotesImageDiv).tooltip(  );

		

	    	$("#notesImage-"+alertNum).click( function() {
alert(alertNum + " "+ self.options.title);

			/*self.element.alertsNotesDialog = $('<div id = "alertsNotesDialog" title="Notes"></div>');
			self.element.alertsNotesDialogCloseImage = $('<img src = "resources/img/close.png" id = "alertsNotesDialogCloseImage" class = "hbasemm-alerts-notesDialogCloseImage tappable">');
			$(self.element.alertsNotesDialogCloseImage).appendTo(self.element.alertsNotesDialog);
			self.element.alertsNotesbrandname = $('<div id = "alertsNotesbrandname" class = "hbasemm-alerts-notesbrandname" >brandname: </div>');
			self.element.notesbrandnameText = $('<input type="text" name="uname" class = "hbasemm-alerts-notesbrandnameText" id = "notesbrandnameText" >');
			$(self.element.notesbrandnameText).appendTo(self.element.alertsNotesbrandname);
			$(self.element.alertsNotesbrandname).appendTo(self.element.alertsNotesDialog);
			self.element.alertsNotesAction = $('<div id = "alertsNotesAction" class = "hbasemm-alerts-notesAction" >Enter Action: </div>');
			self.element.alertsNotesActionText = $('<textarea id = "alertsNotesActionText" rows="4" cols="40" class = "hbasemm-alerts-hbasemm-alerts-notesActionText" ></textarea>');
			$(self.element.alertsNotesActionText).appendTo(self.element.alertsNotesAction);
			$(self.element.alertsNotesAction).appendTo(self.element.alertsNotesDialog);
			self.element.alertsNoteButtonDiv = $('<div id = "alertsNoteButtonDiv" class = "hbasemm-alerts-alertsNoteButtonDiv" >');
			self.element.alertsNoteButton = $('<input type = "button" id = "alertsNoteButton" class = "hbasemm-alerts-alertsNoteButton" value = "Submit" >');
			$(self.element.alertsNoteButton).appendTo(self.element.alertsNoteButtonDiv);
			$(self.element.alertsNoteButtonDiv).appendTo(self.element.alertsNotesDialog);

			$(self.element.alertsNotesDialog).appendTo(self.element);
			$(self.element.alertsNotesDialog).hide();*/

			//2nd

			self.element.alertsNotesDialog = $('<div id = "alertsNotesDialog" title="Notes"></div>');
			self.element.alertsNotesDialogCloseImage = $('<img src = "resources/img/close.png" id = "alertsNotesDialogCloseImage" class = "hbasemm-alerts-notesDialogCloseImage tappable">');
			$(self.element.alertsNotesDialogCloseImage).appendTo(self.element.alertsNotesDialog);
			self.element.alertsNotesAction = $('<div id = "alertsNotesAction" class = "hbasemm-alerts-notesAction" >Enter Notes: </div>');
			self.element.alertsNotesActionText = $('<textarea id = "alertsNotesActionText" rows="4" cols="40" class = "hbasemm-alerts-hbasemm-alerts-notesActionText" ></textarea>');
			$(self.element.alertsNotesActionText).appendTo(self.element.alertsNotesAction);
			$(self.element.alertsNotesAction).appendTo(self.element.alertsNotesDialog);
			self.element.alertsNoteButtonDiv = $('<div id = "alertsNoteButtonDiv" class = "hbasemm-alerts-alertsNoteButtonDiv" >');
			self.element.alertsNoteButton = $('<input type = "button" id = "alertsNoteButton" class = "hbasemm-alerts-alertsNoteButton" value = "Submit" >');
			$(self.element.alertsNoteButton).appendTo(self.element.alertsNoteButtonDiv);
			$(self.element.alertsNoteButtonDiv).appendTo(self.element.alertsNotesDialog);

			$(self.element.alertsNotesDialog).appendTo(self.element);
			$(self.element.alertsNotesDialog).hide();

			

			$(self.element.alertsNotesActionText).text(HBaseMM.ModelController.alertsArray[alertNum].notes);
			//alert(self.options.alertNum);
			
			$( "#alertsNotesDialog" ).dialog( { height: 400, width:500, modal:true } );

			$( "#alertsNoteButton" ).click(function(){

				//alert($("#notesbrandnameText").val());
				//alert(alertNum);
				//var brandname = $("#notesbrandnameText").val();
				var action = $("#alertsNotesActionText").val();
				//var time = getJSDateFromEpochTimeInMillis(new Date().getTime());

				//var note = {};
				//note["brand"] = brandname;
				//note["time"] = time;
				//note["action"] = action;

				note = action;
				//alert(HBaseMM.ModelController.alertsArray[alertNum].notes);
				//var note = '{"brand":"'+brandname+'","time":"'+time+'","action":"'+action+'"}';
				//HBaseMM.ModelController.alertsArray[alertNum].notes.push(note);
				HBaseMM.ModelController.alertsArray[alertNum].notes = note;
				//alert(JSON.stringify(HBaseMM.ModelController.alertsArray[alertNum]));
				$( "#alertsNotesDialog" ).dialog('destroy');
				$( "#alertsNotesDialog"  ).remove();
				self.options.notes = HBaseMM.ModelController.alertsArray[alertNum].notes;
				//alert(HBaseMM.ModelController.alertsArray[alertNum].notes);
				//alert(self.options.notes);
				//$(self.element.alertsNotesImageDiv).attr('title', JSON.stringify(self.options.notes));
				//$(self.element.alertsNotesImageDiv).tooltip('destroy');
				//self.displayNotesText();
				//$(self.element.alertsNotesImageDiv).tooltip( 'destroy' );
				
				//$(self.element.alertsNotesImageDiv).attr('title', JSON.stringify(self.options.notes));
				
				//$(self.element.alertsNotesImageDiv).attr('title', "testing");
				//alert($(self.element.alertsNotesImageDiv).attr("title"));

				//alert(self.options.notes);
				//$("#alertsNotesImageDiv-"+alertNum).attr('title', self.options.notes);
				//$("#alertsNotesImageDiv-"+alertNum).tooltip('destroy');
alert(alertNum + " "+ self.options.alertNum);
			});

			$( "#alertsNotesDialogCloseImage" ).click( function() { 

				$( "#alertsNotesDialog" ).dialog('destroy'); 
				$("#alertsNotesDialog").remove();

			} );
		} );


            
        },

	populateGraphDialog: function(self)
	{

		var metricDataTest = MetricData("iostat.disk.read_requests","iostat.disk.read_requests",{},"");
	
			var dialogElement = $("<div id = 'dialogChartContainer' class = 'hbasemm-alerts-dialogChartContainer'></div>");

			$( dialogElement ).appendTo(self.element);

			$( dialogElement ).mmDialog({metricData:metricDataTest});
	},

	populateDivs: function()
	{
		/*
		
		Create the divs to display the alert image, host name, title, time of alert, status, help icon, notes icon and graph icon

		*/
		
		this.element.alertsImage = $("<img src = 'resources/img/"+this.options.type+".png' class = 'hbasemm-alerts-alertImage' >");
		this.element.alertsImageDiv = $("<div id ='alertsImageDiv' class = 'hbasemm-alerts-alertImageDiv'><div>");
		$(this.element.alertsImage).appendTo(this.element.alertsImageDiv);
		$(this.element.alertsImageDiv).appendTo(this.element);

		this.element.alertsHost = $("<div id = 'alertsHost' class = 'hbasemm-alerts-host'></div>");
		$(this.element.alertsHost).text(this.options.host);
		$(this.element.alertsHost).appendTo(this.element);

		this.element.alertsTitle = $("<div id = 'alertsTitle' class = 'hbasemm-alerts-title' ></div>");
		$(this.element.alertsTitle).text(this.options.title);
		$(this.element.alertsTitle).appendTo(this.element);

		this.element.alertsTime = $("<div id = 'alertsTime' class = 'hbasemm-alerts-time'></div>");
		$(this.element.alertsTime).text(getJSDateFromEpochTimeInMillis(this.options.time));
		$(this.element.alertsTime).appendTo(this.element);

		this.element.alertsStatus = $("<div id = 'alertsStatus' class = 'hbasemm-alerts-status'></div>");
		$(this.element.alertsStatus).text(this.options.status);
		$(this.element.alertsStatus).appendTo(this.element);

		this.element.alertsHelpImage = $("<img src = 'resources/img/help.png' style = 'height:30px; width:30px' class = 'hbasemm-alerts-helpImage' >");
		this.element.alertsHelpImageDiv = $("<div id ='alertsHelpImageDiv' class = 'hbasemm-alerts-helpImageDiv'></div>");
		$(this.element.alertsHelpImage).appendTo(this.element.alertsHelpImageDiv);
		$(this.element.alertsHelpImageDiv).appendTo(this.element);

		var alertNum = this.options.alertNum;

		this.element.alertsNotesImage = $("<img src = 'resources/img/sticky-notes.png' style = 'height:30px; width:30px' class = 'hbasemm-alerts-notesImage' id = notesImage-"+alertNum+" >");
		this.element.alertsNotesImageDiv = $("<div id ='alertsNotesImageDiv-"+alertNum+"' class = 'hbasemm-alerts-notesImageDiv'></div>");
		$(this.element.alertsNotesImage).appendTo(this.element.alertsNotesImageDiv);
		$(this.element.alertsNotesImageDiv).appendTo(this.element);

		//$( this.element.alertsNotesImageDiv ).dialog();


		//this.element.dialog = $(" <div id='dialog' title='Basic dialog'><p>This is the default dialog which is useful for displaying information. The dialog window can be moved, resized and closed with the  icon.</p></div> ");

		//this.element.dialog = $(" <div id='dialog' title='Basic dialog'></div> ");

		//$(this.element.dialog).appendTo(this.element);

		//$(this.element.dialog).dialog();

		this.element.alertsGraphImage = $("<img src = 'resources/img/chart.png' class = 'hbasemm-alerts-graphImage' >");
		this.element.alertsGraphImageDiv = $("<div id ='alertsGraphImageDiv' class = 'hbasemm-alerts-graphImageDiv tappable'></div>");
		$(this.element.alertsGraphImage).appendTo(this.element.alertsGraphImageDiv);
		$(this.element.alertsGraphImageDiv).appendTo(this.element);

		/*this.element.alertsNotesDialog = $('<div id = "alertsNotesDialog" title="Notes"></div>');
		this.element.alertsNotesDialogCloseImage = $('<img src = "resources/img/close.png" id = "alertsNotesDialogCloseImage" class = "hbasemm-alerts-notesDialogCloseImage tappable">');
		$(this.element.alertsNotesDialogCloseImage).appendTo(this.element.alertsNotesDialog);
		this.element.alertsNotesbrandname = $('<div id = "alertsNotesbrandname" class = "hbasemm-alerts-notesbrandname" >brandname: </div>');
		this.element.notesbrandnameText = $('<input type="text" name="uname" class = "hbasemm-alerts-notesbrandnameText" id = "notesbrandnameText" >');
		$(this.element.notesbrandnameText).appendTo(this.element.alertsNotesbrandname);
		$(this.element.alertsNotesbrandname).appendTo(this.element.alertsNotesDialog);
		this.element.alertsNotesAction = $('<div id = "alertsNotesAction" class = "hbasemm-alerts-notesAction" >Enter Action: </div>');
		this.element.alertsNotesActionText = $('<textarea id = "alertsNotesActionText" rows="4" cols="40" class = "hbasemm-alerts-hbasemm-alerts-notesActionText" ></textarea>');
		$(this.element.alertsNotesActionText).appendTo(this.element.alertsNotesAction);
		$(this.element.alertsNotesAction).appendTo(this.element.alertsNotesDialog);
		this.element.alertsNoteButtonDiv = $('<div id = "alertsNoteButtonDiv" class = "hbasemm-alerts-alertsNoteButtonDiv" >');
		this.element.alertsNoteButton = $('<input type = "button" id = "alertsNoteButton" class = "hbasemm-alerts-alertsNoteButton" value = "Submit" >');
		$(this.element.alertsNoteButton).appendTo(this.element.alertsNoteButtonDiv);
		$(this.element.alertsNoteButtonDiv).appendTo(this.element.alertsNotesDialog);

		$(this.element.alertsNotesDialog).appendTo(this.element);
		$(this.element.alertsNotesDialog).hide();*/

		//this.element.alertsHr = $("<hr id = 'alertsHr' class = 'hbasemm-alerts-hr'>");
		//this.element.alertsHrDiv = $("<div id ='alertsHrDiv' class = 'hbasemm-alerts-hrDiv'></div>");
		//$(this.element.alertsHr).appendTo(this.element.alertsHrDiv);
		//$(this.element.alertsHrDiv).appendTo(this.element);

		self = this;

		metricData = self.options.metrics;
		hostNamesArray = [self.options.host];
		time = self.options.time;

		$(this.element.alertsGraphImageDiv).click(function(){//alert(self.options.metrics);

			//var metricDataTest = MetricData("iostat.disk.read_requests","iostat.disk.read_requests","","");
	
			//var metricDataTest = MetricData(self.options.metrics[''],"iostat.disk.read_requests","","");

			this.dialogElement = $("<div id = 'dialogChartContainer' class = 'hbasemm-alerts-dialogChartContainer'></div>");

			$( this.dialogElement ).appendTo(self.element);

			//$( this.dialogElement ).mmDialog({metricData:self.options.metrics, hostNamesArray:[self.options.host] });

			$( this.dialogElement ).mmDialog({metricData:metricData, hostNamesArray:hostNamesArray, time:time });

			//$( dialogElement ).mmDialog( {hostNamesArray:['aparikh-wsl']} );			
			//self.populateGraphDialog(self);
			
			});

	}

    });

//end
