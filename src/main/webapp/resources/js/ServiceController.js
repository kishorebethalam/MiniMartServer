/*
 Primary interface to the HBase Admin App Service.

 An instance of ServiceController is maintained as an property of HBaseMM (defined in HBaseMM.js) object.
 Whenever application needs to access a method exposed by this controller, it'll refer to it in the following format.

 HBaseMM.ServiceController.methodName(argumentsList)

 */

/*
    Initializer that accepts Host, Port and Protocol of the AdminApp service.

    If the UI is to be served from the Blacktab, DON'T pass the parameters to this method. Then the app will deduce the
    host, port and protocol from browser window's location.

 */
var ServiceController = function(host, port, protocol) {
    this.configure(host, port, protocol);
    return this;
};

/*
    Utility method to configure the host and Port.
    If the UI is to be served from the Blacktab, DON'T pass the parameters to this method. Then the app will deduce the
    host, port and protocol from browser window's location.

 */
ServiceController.prototype.configure= function (host, port, protocol) {
    
	if(window.location['pathname'].indexOf("hbaseProxy") > -1) {

		this.isIntegratedWithBlackTab = true;

	}

	else {

		this.isIntegratedWithBlackTab = false;

	}

    if (!host) {
        //this.isIntegratedWithBlackTab = true;
        this.host = window.location['hostname'];
        this.port = window.location['port'];
        this.protocol = window.location['protocol'];
    }
    else {

        //this.isIntegratedWithBlackTab = false;

        this.host = host;

        if (port){
            this.port = port;
        }

        if (protocol){
            this.protocol = protocol;
        }
        else {
            this.protocol = 'http:';
        }
    }
    
   // this.isIntegratedWithBlackTab = true;

    return this;
};


/*
    Utility method to get the base URL for method invocation.
 */
ServiceController.prototype.getBaseURL = function () {
    

    var baseUrl = this.protocol + '//' + this.host;
    if (this.port.length > 0) {
        baseUrl = baseUrl+ ':' + this.port;
    }
    if (this.isIntegratedWithBlackTab){
        baseUrl = baseUrl + '/hbaseProxy';
    }    
    baseUrl = baseUrl + '/hbasemonitoring';
    return baseUrl;
};


/*
    Method to retrieve the topology associated with a cluster.
    This method accepts an instanceID and a callbackFunction to execute once the information is retrieved.
 */
ServiceController.prototype.getTopologyInfo = function (instanceId, callbackFunction ) {
    var fullUrl = this.getBaseURL() + '/topology/clusterDetails?instanceId=' + instanceId;

    
    $.ajax({
        type: "GET",
        url: fullUrl,
        dataType:'json',
        success: function(data) {
            callbackFunction(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
//            console.log('Error happend because of ' + textStatus);
/*            if (textStatus == 'timeout'){
                alert('request timedout');
            }
            else if (textStatus == 'abort'){
                alert('request aborted');
            }
            else if (textStatus == 'error'){
                alert('Error executing query');
            }
*/            callbackFunction({});
        }
    });

/*    $.getJSON(fullUrl, function(data) {
//        alertObject(data, 'JSON Response from Cluster Details API:');
        callbackFunction(data);

    });
    */
};

/*
    Method to execute a phoenix query in service and get the data associated with it.
    This method accepts the query string to execute and a callbackFunction to execute once the information is retrieved.
 */
//
//ServiceController.prototype.executeQuery = function (query, callbackFunction ) {
//
//    var fullUrl = this.getBaseURL() + '/executeQuery';
////    console.log(fullUrl);
//
//    $.ajax({
//        type: "POST",
//        url: fullUrl,
//        data:query,
//        dataType:'json',
//        contentType: 'multipart/form-data',
//        success: function(data) {
//            callbackFunction(data);
//        },
//        error: function(jqXHR, textStatus, errorThrown) {
////            console.log('Error happend because of ' + textStatus);
///*            if (textStatus == 'timeout'){
//                alert('request timedout');
//            }
//            else if (textStatus == 'abort'){
//                alert('request aborted');
//            }
//            else if (textStatus == 'error'){
//                alert('Error executing query');
//            }
//*/            callbackFunction([]);
//        }
//    });
//};
//
///*
//    Method to get the key metrics organized by categories based on the role and hosts.
// */
//ServiceController.prototype.getMetricCategoriesData = function (role, hostNamesArray, callbackFunction ) {
//
//	var fullUrl = this.getBaseURL() + '/keymetricsdata';
//
//	if (role == 'KEY_METRIC_DATA') {
//        fullUrl = this.getBaseURL() + '/metriccategories';
//	}
//
//    var jsonData = {
//        "role" : role,
//        "nodes" : hostNamesArray
//    };
//
//    $.ajax({
//        type: "POST",
//        url: fullUrl,
//        data: JSON.stringify(jsonData),
//        dataType: "json",
//        contentType: 'multipart/form-data',
//        success: function(data) {
//            callbackFunction(data);
//        },
//        error: function(jqXHR, textStatus, errorThrown) {
///*            if (textStatus == 'timeout'){
//                alert('request timedout');
//            }
//            else if (textStatus == 'abort'){
//                alert('request aborted');
//            }
//            else if (textStatus == 'error'){
//                alert('Error executing query');
//            }
//*/            callbackFunction([]);
//        }
//
//    });
//
//};

/*
    Method to get metrics for a particular role
 */
ServiceController.prototype.getCategoriesMetadata = function (role, callbackFunction ) {
    var fullUrl = this.getBaseURL() + '/metaInfo/categoriesMetadata?role=' + role;


    //$('.hbase-explore-progress-indicator').hide();

    $.ajax({
        
        url: fullUrl,
        dataType:'json',
        success: function(data) {
            callbackFunction(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
//            console.log('Error happend because of ' + textStatus);
/*            if (textStatus == 'timeout'){
                alert('request timedout');
            }
            else if (textStatus == 'abort'){
                alert('request aborted');
            }
            else if (textStatus == 'error'){
                alert('Error executing query');
            }
*/            callbackFunction({});
        }
    });
    
};

/*
    Method to get the time series data associated with a metric.
 */
ServiceController.prototype.getTimeSeriesData = function (metricDataArray, hostNamesArray, startTime, endTime, roundingTime, transformFunc, callbackFunction ) {

    var fullUrl = this.getBaseURL() + '/timeSeriesData';
//    console.log(fullUrl);
    
    if (hostNamesArray == null) {
    	hostNamesArray = [];
    }
    
    var jsonData = {
	"metrics" : metricDataArray,
        "nodes" : hostNamesArray,
        "startTime" : startTime,
        "endTime" : endTime,
        "roundTime" : roundingTime,
	"transformExpression" : transformFunc
    };
    
//    alertObject(jsonData, 'JSON Data in request');
    $.ajax({
        type: "POST",
        url: fullUrl,
        data: JSON.stringify(jsonData),
        dataType: "json",
        contentType: 'multipart/form-data',
        success: function(data) {
//            alert(JSON.stringify(data));
            callbackFunction(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // if (textStatus == 'timeout'){
//                 alert('request timedout');
//             }
//             else if (textStatus == 'abort'){
//                 alert('request aborted');
//             }
//             else if (textStatus == 'error'){
//                 alert('Error executing query');
//             }
            callbackFunction([]);
        }
    });

};



/*
    Method to check whether a given set of features are supported by API.
 */
ServiceController.prototype.checkSupportForFeatures = function (featuresListArray, callbackFunction) {

    var featuresListString = featuresListArray.toString();
    var fullUrl = this.getBaseURL() + '/topology/isSupported?features=' + featuresListString;

    $.ajax({
        type: "GET",
        url: fullUrl,
        dataType: "json",
        contentType: 'multipart/form-data',
        success: function(data) {
            callbackFunction(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
/*            if (textStatus == 'timeout'){
                alert('request timedout');
            }
            else if (textStatus == 'abort'){
                alert('request aborted');
            }
            else if (textStatus == 'error'){
                alert('Error executing query');
            }
*/
            //If an error occurs, assume that all the features are not supported.     
            var failureResponse = {};
            $.each(featuresListArray, function(index, feature) {
                failureResponse[feature] =  false;
            });
            callbackFunction(failureResponse);
        }

    });

};

/*
    Method to get self help related to a set of metrics
 */
ServiceController.prototype.getSelfHelpInfo = function (metriIdsAndTags, callbackFunction ) {
    var fullUrl = this.getBaseURL() + '/metaInfo/metricsMetadata';

	$.ajax({
        type: "POST",
        url: fullUrl,
        data: JSON.stringify(metriIdsAndTags),
        dataType: "json",
        contentType: 'multipart/form-data',
        success: function(data) {
//            alert(JSON.stringify(data));
            callbackFunction(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (textStatus == 'timeout'){
                alert('request timedout');
            }
            else if (textStatus == 'abort'){
                alert('request aborted');
            }
            else if (textStatus == 'error'){
                alert('Error executing query');
            }
            callbackFunction([]);
        }
    });
    
};

/*
    Method to get list of orgs that've migration jobs associated with them.
 */
ServiceController.prototype.getMigrationOrgs = function (callbackFunction ) {
    var fullUrl = this.getBaseURL() + '/migration/orgsList';

	$.ajax({
        type: "GET",
        url: fullUrl,
        dataType: "json",
        contentType: 'multipart/form-data',
        success: function(data) {
            callbackFunction(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
//             if (textStatus == 'timeout'){
//                 alert('request timedout');
//             }
//             else if (textStatus == 'abort'){
//                 alert('request aborted');
//             }
//             else if (textStatus == 'error'){
//                 alert('Error executing query');
//             }
            callbackFunction([]);
        }
    });
    
};

/*
    Method to get overall progress of the migration jobs.
 */
ServiceController.prototype.getMigrationOverallProgress = function (includeJobCountsOnly, callbackFunction ) {
    var fullUrl = this.getBaseURL() + '/migration/overallProgress';
    
    if (includeJobCountsOnly) {
    	fullUrl += '?jobCountsOnly=NO'; 
    }

	$.ajax({
        type: "GET",
        url: fullUrl,
        dataType: "json",
        contentType: 'multipart/form-data',
        success: function(data) {
            callbackFunction(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
//             if (textStatus == 'timeout'){
//                 alert('request timedout');
//             }
//             else if (textStatus == 'abort'){
//                 alert('request aborted');
//             }
//             else if (textStatus == 'error'){
//                 alert('Error executing query');
//             }
            callbackFunction([]);
        }
    });
    
};

/*
    Method to get list of tables that've migration jobs associated with them.
 */
ServiceController.prototype.getMigrationTables = function (callbackFunction ) {
    var fullUrl = this.getBaseURL() + '/migration/tablesList';

	$.ajax({
        type: "GET",
        url: fullUrl,
        dataType: "json",
        contentType: 'multipart/form-data',
        success: function(data) {
//            alert(JSON.stringify(data));
            callbackFunction(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
//             if (textStatus == 'timeout'){
//                 alert('request timedout');
//             }
//             else if (textStatus == 'abort'){
//                 alert('request aborted');
//             }
//             else if (textStatus == 'error'){
//                 alert('Error executing query');
//             }
            callbackFunction([]);
        }
    });
    
};

/*
    Method to get list of backup jobs satisfying criteria.
 */
ServiceController.prototype.getBackupJobs = function (filterObject, callbackFunction ) {
    var fullUrl = this.getBaseURL() + '/backupRestore/jobsList';

	$.ajax({
        type: "POST",
        url: fullUrl,
        dataType: "json",
        data: JSON.stringify(filterObject),
        contentType: 'multipart/form-data',
        success: function(data) {
            callbackFunction(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
//             if (textStatus == 'timeout'){
//                 alert('request timedout');
//             }
//             else if (textStatus == 'abort'){
//                 alert('request aborted');
//             }
//             else if (textStatus == 'error'){
//                 alert('Error executing query');
//             }
            callbackFunction([]);
        }
    });
    
};

/*
    Method to get list of job types associated with Backup/Restore jobs.
 */
ServiceController.prototype.getBackupJobTypes = function (callbackFunction ) {
    var fullUrl = this.getBaseURL() + '/backupRestore/jobTypesList';

	$.ajax({
        type: "GET",
        url: fullUrl,
        dataType: "json",
        contentType: 'multipart/form-data',
        success: function(data) {
//            alert(JSON.stringify(data));
            callbackFunction(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
//             if (textStatus == 'timeout'){
//                 alert('request timedout');
//             }
//             else if (textStatus == 'abort'){
//                 alert('request aborted');
//             }
//             else if (textStatus == 'error'){
//                 alert('Error executing query');
//             }
            callbackFunction([]);
        }
    });
    
};

/*
Method to get list of tables that've backup/restore jobs associated with them.
*/
ServiceController.prototype.getBackupTables = function (callbackFunction ) {
var fullUrl = this.getBaseURL() + '/backupRestore/tablesList';

$.ajax({
    type: "GET",
    url: fullUrl,
    dataType: "json",
    contentType: 'multipart/form-data',
    success: function(data) {
//        alert(JSON.stringify(data));
        callbackFunction(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
//         if (textStatus == 'timeout'){
//             alert('request timedout');
//         }
//         else if (textStatus == 'abort'){
//             alert('request aborted');
//         }
//         else if (textStatus == 'error'){
//             alert('Error executing query');
//         }
        callbackFunction([]);
    }
});

};
/*
    Method to get list of tables that've migration jobs associated with them.
 */
ServiceController.prototype.getRulesList = function (callbackFunction ) {
    var fullUrl = this.getBaseURL() + '/alerts/rulesList';

	$.ajax({
        type: "GET",
        url: fullUrl,
        dataType: "json",
        contentType: 'multipart/form-data',
        success: function(data) {
            callbackFunction(data['rulesList']);
        },
        error: function(jqXHR, textStatus, errorThrown) {
//             if (textStatus == 'timeout'){
//                 alert('request timedout');
//             }
//             else if (textStatus == 'abort'){
//                 alert('request aborted');
//             }
//             else if (textStatus == 'error'){
//                 alert('Error executing query');
//             }
            callbackFunction([]);
        }
    });
    
};

ServiceController.prototype.executeRules = function (ruleIds, callbackFunction ) {
    var fullUrl = this.getBaseURL() + '/alerts/executeRules';

	$.ajax({
       type: "POST",
        url: fullUrl,
        dataType: "json",
        data: JSON.stringify(ruleIds),
        contentType: 'multipart/form-data',
        success: function(data) {
//            alert(JSON.stringify(data));
            callbackFunction(data['rulesList']);
        },
        error: function(jqXHR, textStatus, errorThrown) {
//             if (textStatus == 'timeout'){
//                 alert('request timedout');
//             }
//             else if (textStatus == 'abort'){
//                 alert('request aborted');
//             }
//             else if (textStatus == 'error'){
//                 alert('Error executing query');
//             }
            callbackFunction([]);
        }
    });
    
};

ServiceController.prototype.updateRule = function (ruleData, callbackFunction ) {
    var fullUrl = this.getBaseURL() + '/alerts/updateRule';

	$.ajax({
       type: "POST",
        url: fullUrl,
        dataType: "json",
        data: JSON.stringify(ruleData),
        contentType: 'multipart/form-data',
        success: function(data,textStatus, xhr) {
//            alert(JSON.stringify(data));
		if(xhr.status == 200)
 	        	callbackFunction();
		else
			alert(xhr.responseText);
        },
        error: function(jqXHR, textStatus, errorThrown) {
//             if (textStatus == 'timeout'){
//                 alert('request timedout');
//             }
//             else if (textStatus == 'abort'){
//                 alert('request aborted');
//             }
//             else if (textStatus == 'error'){
//                 alert('Error executing query');
//             }
            	
		if(jqXHR.status == 200)
			callbackFunction();

		else
			alert(jqXHR.responseText);
        }
    });
    
};

ServiceController.prototype.deleteRules = function (ruleIds, callbackFunction ) {
    var fullUrl = this.getBaseURL() + '/alerts/deleteRules';

	$.ajax({
       type: "POST",
        url: fullUrl,
        dataType: "json",
        data: JSON.stringify(ruleIds),
        contentType: 'multipart/form-data',
        success: function(data) {
//            alert(JSON.stringify(data));
            callbackFunction();
        },
        error: function(jqXHR, textStatus, errorThrown) {
//             if (textStatus == 'timeout'){
//                 alert('request timedout');
//             }
//             else if (textStatus == 'abort'){
//                 alert('request aborted');
//             }
//             else if (textStatus == 'error'){
//                 alert('Error executing query');
//             }
            callbackFunction();
        }
    });
    
};

ServiceController.prototype.updateRulesStatus = function (statusRequest, callbackFunction ) {
    var fullUrl = this.getBaseURL() + '/alerts/updateRulesStatus';

	$.ajax({
       type: "POST",
        url: fullUrl,
        dataType: "json",
        data: JSON.stringify(statusRequest),
        contentType: 'multipart/form-data',
        success: function(data) {
//            alert(JSON.stringify(data));
            callbackFunction();
        },
        error: function(jqXHR, textStatus, errorThrown) {
//             if (textStatus == 'timeout'){
//                 alert('request timedout');
//             }
//             else if (textStatus == 'abort'){
//                 alert('request aborted');
//             }
//             else if (textStatus == 'error'){
//                 alert('Error executing query');
//             }
            callbackFunction();
        }
    });
    
};

ServiceController.prototype.getNotificationsList = function (ruleIds, callbackFunction ) {
    var fullUrl = this.getBaseURL() + '/alerts/notificationsList';

	$.ajax({
       type: "POST",
        url: fullUrl,
        dataType: "json",
        data: "{}",
        contentType: 'multipart/form-data',
        success: function(data) {
            callbackFunction(data['notificationsList']);
        },
        error: function(jqXHR, textStatus, errorThrown) {
//             if (textStatus == 'timeout'){
//                 alert('request timedout');
//             }
//             else if (textStatus == 'abort'){
//                 alert('request aborted');
//             }
//             else if (textStatus == 'error'){
//                 alert('Error executing query');
//             }
            callbackFunction([]);
        }
    });
    
};

ServiceController.prototype.getLatestNotificationsList = function (ruleIds, callbackFunction ) {
    var fullUrl = this.getBaseURL() + '/alerts/latestNotificationsList';

	$.ajax({
       type: "POST",
        url: fullUrl,
        dataType: "json",
        data: JSON.stringify(ruleIds),
        contentType: 'multipart/form-data',
        success: function(data) {
            callbackFunction(data['latestNotificationsList']);
        },
        error: function(jqXHR, textStatus, errorThrown) {
//             if (textStatus == 'timeout'){
//                 alert('request timedout');
//             }
//             else if (textStatus == 'abort'){
//                 alert('request aborted');
//             }
//             else if (textStatus == 'error'){
//                 alert('Error executing query');
//             }
            callbackFunction([]);
        }
    });
    
};

/*
    Method to get list of migration jobs satisfying criteria.
 */
ServiceController.prototype.getMigrationJobs = function (filterObject, callbackFunction ) {
    var fullUrl = this.getBaseURL() + '/migration/jobsList';

	$.ajax({
        type: "POST",
        url: fullUrl,
        dataType: "json",
        data: JSON.stringify(filterObject),
        contentType: 'multipart/form-data',
        success: function(data) {
//            alert(JSON.stringify(data));
            callbackFunction(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
//             if (textStatus == 'timeout'){
//                 alert('request timedout');
//             }
//             else if (textStatus == 'abort'){
//                 alert('request aborted');
//             }
//             else if (textStatus == 'error'){
//                 alert('Error executing query');
//             }
            callbackFunction([]);
        }
    });
    
};
/*
    Method to get list of migration jobs satisfying criteria.
 */
ServiceController.prototype.restartMigrationJob = function (jobDetails, callbackFunction ) {
    var fullUrl = this.getBaseURL() + '/migration/restartJob';

	$.ajax({
        type: "POST",
        url: fullUrl,
        dataType: "json",
        data: JSON.stringify(jobDetails),
        contentType: 'multipart/form-data',
        success: function(data) {
//            alert(JSON.stringify(data));
            callbackFunction(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
//             if (textStatus == 'timeout'){
//                 alert('request timedout');
//             }
//             else if (textStatus == 'abort'){
//                 alert('request aborted');
//             }
//             else if (textStatus == 'error'){
//                 alert('Error executing query');
//             }
            callbackFunction([]);
        }
    });
    
};

/*
 Utility method to process response from a Phoenix query and create ChartPlot instances to be presented in the chart.

 @parameters
 jsonObject -> JSON representation of the phoenix query result.

 seriesKeyColumn -> index/name of the column that contains the value to be used a plot in the chart.

 datesColumn ->  index/name of the column that contains the date component of the result tuple.
 This is used as the 'X' coordinate in the line chart.

 valuesColumn -> index/name of the column that contains the value component of the result tuple.
 This is used as the 'Y' coordinate in the line chart.

 strToTimestampConversionFunction -> A function that's used to conver the values in the datesColumn to a date object.

 Example:  Consider that the following is a response from a phoenix query.
 ["sreekarp1-wsl","18-07-2013 11:20:11",302709449].
 For the above tuple, seriesKeyColumn is passed as '0' as it's the first item. Similarly, datesColumn will
 be '1' and valuesColumn will be '2'.

 strToTimestampConversionFunction for the above tuple will be as follows.
 function(dateValueFromJSON){
 return getJSDateFromFullDateString(dateValueFromJSON).getTime(); //Refer to HBaseMM.js
 }


 @response: An array of plotSeries that're ready to be passed to mmLineChart widget.

 */
ServiceController.prototype.convertSauronJSONObjectToTimeSeriesData= function (jsonObject, seriesKeyColumn, datesColumn,
                                                                              valuesColumn,
                                                                              strToTimestampConversionFunction) {

    if (jsonObject.length == 0) {
        return [];
    }
        
    var chartPlots= [];
//    //JSON response contains a dictionary of metrics and corresponding data points so loop through each metric and process them all. 
//    $.each(jsonObject, function(metricId, dataItems) {

        //    logWithTimestamp("No of items received :" + jsonObject.length);

        var dictionaryByNodes = splitArrayIntoGroupsByDistinctValueInColumn(jsonObject, seriesKeyColumn);
        $.each(dictionaryByNodes, function(seriesKey, dataItems) {


            var dataPoints = [];

            $.each(dataItems, function(index, record) {

                var valueStr = record[valuesColumn];
                var dateStr = record[datesColumn];
                
                if (valueStr != null && dateStr != null && valueStr != undefined && dateStr != undefined) {

                    //Plot series data points should be of format {x:value, y:value}.
                    dataPoints.push({
                        x: strToTimestampConversionFunction(dateStr),
                        y: parseFloat(valueStr)
                    });
                }
            });

            //sort date points by x coordinate (date) value.
            dataPoints.sort(function(a, b) {
                return (a.x > b.x) ? 1 : ((b.x > a.x) ? -1 : 0);
            });
            //console.log(dataPoints);
            
			var chartPlot = new ChartPlot(seriesKey, dataPoints);
			chartPlots.push(chartPlot);
	//        logWithTimestamp('No of items for series['+ seriesKey +']:' + dataPoints.length);

        });

//    });
    chartPlots.sort(function(a, b) {
                return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
    });
    return chartPlots;
};


/*
 Utility method to return date clause for a query given the dateRangeEnum.
 dateRangeEnum can be one of the following.
 HBaseMM.Literals.DATE_RANGE_5M
 HBaseMM.Literals.DATE_RANGE_30M
 HBaseMM.Literals.DATE_RANGE_1H
 HBaseMM.Literals.DATE_RANGE_12H
 HBaseMM.Literals.DATE_RANGE_1D
 HBaseMM.Literals.DATE_RANGE_1W
 */
ServiceController.prototype.getDateClauseForQuery = function(dateRangeEnum) {

    var  endDate = (new Date()).getTime();
    var startDateInMillis = 0 ;
    if (dateRangeEnum == HBaseMM.Literals.DATE_RANGE_5M){
        startDateInMillis = endDate  - 1000 * 60 * 5;
    }
    else if (dateRangeEnum == HBaseMM.Literals.DATE_RANGE_30M){
        startDateInMillis = endDate  - 1000 * 60 * 30;
    }
    else if (dateRangeEnum == HBaseMM.Literals.DATE_RANGE_1H){
        startDateInMillis = endDate  - 1000 * 60 * 60;
    }
    else if (dateRangeEnum == HBaseMM.Literals.DATE_RANGE_12H){
        startDateInMillis = endDate  - 1000 * 60 * 60 * 12;
    }
    else if (dateRangeEnum == HBaseMM.Literals.DATE_RANGE_1D){
        startDateInMillis = endDate  - 1000 * 60 * 60 * 24;
    }
    else if (dateRangeEnum == HBaseMM.Literals.DATE_RANGE_1W){
        startDateInMillis = endDate  - 1000 * 60 * 60 * 24 * 7;
    }
    else {
        startDateInMillis = endDate;
    }

    var startDate = new Date(startDateInMillis);

    var dateString = startDate.getUTCFullYear() + '-'  + (startDate.getUTCMonth() + 1) + '-' + startDate.getUTCDate() + ' ' + startDate.getUTCHours() + ':' + startDate.getUTCMinutes() + ':' + startDate.getUTCSeconds();

//    console.log(dateString + ' for ' +dateRangeEnum);
    return ' and date >= to_date(\'' + dateString + '\') ';

};

/*
 Utility method to return EPOCH time given the dateRangeEnum.
 dateRangeEnum can be one of the following.
 HBaseMM.Literals.DATE_RANGE_5M
 HBaseMM.Literals.DATE_RANGE_30M
 HBaseMM.Literals.DATE_RANGE_1H
 HBaseMM.Literals.DATE_RANGE_12H
 HBaseMM.Literals.DATE_RANGE_1D
 HBaseMM.Literals.DATE_RANGE_1W
 */
ServiceController.prototype.getEpochTimeForDateRangeEnum = function(dateRangeEnum) {

    var  endDate = (new Date()).getTime() ;
    var startDateInMillis = 0 ;
    if (dateRangeEnum == HBaseMM.Literals.DATE_RANGE_5M){
        startDateInMillis = endDate  - 1000 * 60 * 5;
    }
    else if (dateRangeEnum == HBaseMM.Literals.DATE_RANGE_30M){
        startDateInMillis = endDate  - 1000 * 60 * 30;
    }
    else if (dateRangeEnum == HBaseMM.Literals.DATE_RANGE_1H){
        startDateInMillis = endDate  - 1000 * 60 * 60;
    }
    else if (dateRangeEnum == HBaseMM.Literals.DATE_RANGE_12H){
        startDateInMillis = endDate  - 1000 * 60 * 60 * 12;
    }
    else if (dateRangeEnum == HBaseMM.Literals.DATE_RANGE_1D){
        startDateInMillis = endDate  - 1000 * 60 * 60 * 24;
    }
    else if (dateRangeEnum == HBaseMM.Literals.DATE_RANGE_1W){
        startDateInMillis = endDate  - 1000 * 60 * 60 * 24 * 7;
    }
    else {
        startDateInMillis = endDate;
    }

//    console.log('Epoch ' + ' for ' +dateRangeEnum + ':' + startDateInMillis);
    return startDateInMillis;

};

/*
 Utility method to return roudning time given the dateRangeEnum.
 dateRangeEnum can be one of the following.
 HBaseMM.Literals.DATE_RANGE_5M
 HBaseMM.Literals.DATE_RANGE_30M
 HBaseMM.Literals.DATE_RANGE_1H
 HBaseMM.Literals.DATE_RANGE_12H
 HBaseMM.Literals.DATE_RANGE_1D
 HBaseMM.Literals.DATE_RANGE_1W
 
 Response is in seconds.
 A value of -1 denotes that rounding is not required.
 
 */
ServiceController.prototype.getRoundingTimeForDateRangeEnum = function(dateRangeEnum) {



    if (dateRangeEnum == HBaseMM.Literals.DATE_RANGE_5M){
        return -1;
    }
    else if (dateRangeEnum == HBaseMM.Literals.DATE_RANGE_30M){
        return -1;
    }
    else if (dateRangeEnum == HBaseMM.Literals.DATE_RANGE_1H){
        return 1 * 60;
    }
    else if (dateRangeEnum == HBaseMM.Literals.DATE_RANGE_12H){
        return 5 * 60;
    }
    else if (dateRangeEnum == HBaseMM.Literals.DATE_RANGE_1D){
        return 10 * 60;
    }
    else if (dateRangeEnum == HBaseMM.Literals.DATE_RANGE_1W){
        return 30 * 60;
    }
    
    return -1;
};

/*
 Utility method to return roudning time given the start and end dates.
 Response is in seconds.
 A value of -1 denotes that rounding is not required.
 
 */
ServiceController.prototype.getRoundingTime = function(startDate, endDate) {
	if (startDate) {
		var startTime = startDate.getTime();
		var endTime = endDate.getTime();
		var timeDifferenceInMins = parseInt((endTime - startTime) / (1000 * 60 ));
	
		if (timeDifferenceInMins <= 30){
			return -1;
		}
		else if (timeDifferenceInMins > 30 && timeDifferenceInMins <= 60){
			return 1 * 60;
		}
		else if (timeDifferenceInMins > 60 && timeDifferenceInMins <= (12 *60)){
			return 5 * 60;
		}
		else if (timeDifferenceInMins > (12 * 60) && timeDifferenceInMins <= ( 24  * 60)){
			return 10 * 60;
		}
		else if (timeDifferenceInMins > (24 * 60) && timeDifferenceInMins <= ( 7 * 24 * 12 * 60) ){
			return 30 * 60;
		}
		else if (timeDifferenceInMins > ( 7 * 24 * 60) && timeDifferenceInMins <= ( 30 * 24 * 12 * 60) ){
			return 60 * 60;
		}
		else if (timeDifferenceInMins > ( 30 * 24 * 60) && timeDifferenceInMins <= ( 12 * 30 * 24 * 12 * 60) ){
			return 24 * 60 * 60;
		}
		else if (timeDifferenceInMins > ( 12 * 30 * 24 * 60) ) {
			return  2 * 24 * 60;
		}
	}
    return -1;
};


/*
 Utility method to create a string that's delimited with quoted items from an array.
 For example, ['host1', 'host2', 'host3'] will return
 'host1', 'host2', 'host3'
 */
function getDelimitedAndQuotedStringForItems(array){
    var delimitedString = '';
    $.each(array, function(index, item){
        delimitedString = delimitedString + "'" + item  + "'";
        if (index != (array.length - 1)){
            delimitedString = delimitedString + ' , ';
        }
    });
    return delimitedString;
}

/*
 Utility method to return the different alerts.
 */

ServiceController.prototype.getAlerts = function ( filterObject, callbackFunction ) {
    var fullUrl = this.getBaseURL() + '/alerts/notificationsList';

    
    $.ajax({
        type: "POST",
        url: fullUrl,
        dataType: "json",
        data: filterObject,
        contentType: 'multipart/form-data',
        success: function(data) {
//            alert(JSON.stringify(data));
            callbackFunction(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
//             if (textStatus == 'timeout'){
//                 alert('request timedout');
//             }
//             else if (textStatus == 'abort'){
//                 alert('request aborted');
//             }
//             else if (textStatus == 'error'){
//                 alert('Error executing query');
//             }
            callbackFunction([]);
        }
    });
};

ServiceController.prototype.getOpenAlertsCount = function ( callbackFunction ) {
    var fullUrl = this.getBaseURL() + '/alerts/openNotificationsCount';

    
    $.ajax({
        type: "GET",
        url: fullUrl,
        dataType:'json',
        success: function(data) {
            callbackFunction(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
//            console.log('Error happend because of ' + textStatus);
/*            if (textStatus == 'timeout'){
                alert('request timedout');
            }
            else if (textStatus == 'abort'){
                alert('request aborted');
            }
            else if (textStatus == 'error'){
                alert('Error executing query');
            }
*/            callbackFunction({});
        }
    });
};

ServiceController.prototype.updateAlertNotes = function ( alertNotes, callbackFunction ) {
    var fullUrl = this.getBaseURL() + '/alerts/updateNotificationNotes';

    
    $.ajax({
        type: "POST",
        url: fullUrl,
        dataType: "json",
        data: JSON.stringify(alertNotes),
        contentType: 'multipart/form-data',
        success: function(data) {
//            alert(JSON.stringify(data));
            callbackFunction(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
//             if (textStatus == 'timeout'){
//                 alert('request timedout');
//             }
//             else if (textStatus == 'abort'){
//                 alert('request aborted');
//             }
//             else if (textStatus == 'error'){
//                 alert('Error executing query');
//             }
            callbackFunction([]);
        }
    });
};

ServiceController.prototype.updateNotificationStatusAndNotes = function ( alertNotes, callbackFunction ) {
    var fullUrl = this.getBaseURL() + '/alerts/updateNotificationStatusAndNotes';

    
    $.ajax({
        type: "POST",
        url: fullUrl,
        dataType: "json",
        data: JSON.stringify(alertNotes),
        contentType: 'multipart/form-data',
        success: function(data,textStatus, xhr) {
//            alert(xhr.status);
		if(xhr.status == 200)
            		callbackFunction(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
//             if (textStatus == 'timeout'){
//                 alert('request timedout');
//             }
//             else if (textStatus == 'abort'){
//                 alert('request aborted');
//             }
//             else if (textStatus == 'error'){
//                 alert('Error executing query');
//             }
            callbackFunction([]);
        }
    });
};

//ServiceController.prototype.getCPUUsageMetrics=function (hostNamesArray, dateRangeEnum, callbackFunction) {
//
//    console.log('this will calcualte the memory Usage metrics for ' + hostNamesArray + '[' + dateRangeEnum + ']');
//
//    var startDateInSecs = HBaseMM.ServiceController.getEpochDateRange(dateRangeEnum);
//
//    HBaseMM.ServiceController.getTimeSeriesData('CPU_STATS', hostNamesArray, startDateInSecs,  function(responseJSON){
//
//        responseJSON.splice(0,1);
//
//        console.log("no of records:", responseJSON.length);
//        var cpuUsagePercentRecords = [];
////        alertObject(responseJSON, 'Response');
//        var groupedByDate = splitArrayIntoGroupsByDistinctValueInColumn(responseJSON, 0);
//        $.each(groupedByDate, function(dateKey, recordsForThisDateArray){
//
//
////            alertObject(recordsForThisDateArray, 'Processing Date:[' + index + ']');
//
//            var groupedByHost = splitArrayIntoGroupsByDistinctValueInColumn(recordsForThisDateArray, 2);
//            $.each(groupedByHost, function(hostKey, recordsForThisHost){
//
////                alertObject(recordsForThisHost, 'Processing Host:[' + hostKey + ']');
//
//                var idleCycles= 0;
//                var totalCpuCycles = 0;
//                $.each(recordsForThisHost, function(index, record){
//                    var type = record[3];
//                    var noOfCycles = parseInt(record[1]);
////                    console.log('type:' + type  + 'noOfCycles' + noOfCycles);
//                    if (type == 'idle'){
//                        idleCycles = noOfCycles;
//                    }
//                    totalCpuCycles += noOfCycles;
//                });
//
//                var transformedRecord = [];
//                var host = hostKey;
//                var date = dateKey;
//
//
//                var percentage = 100 - (idleCycles * 1.0 /totalCpuCycles) * 100;
//
//                transformedRecord[0] = host;
//                transformedRecord[1] = date;
//                transformedRecord[2] = percentage;
//
////                console.log(host + '[' + date + '] : (' + idleCycles + ',' + totalCpuCycles + ') # ' + percentage);
//                cpuUsagePercentRecords.push(transformedRecord);
//
////                alertObject(transformedRecord, 'Transformed Record');
//
//            });
//
//
//
//        });
////        console.log(cpuUsagePercentRecords);
////            alertObject(cpuUsagePercentRecords, 'Percentage Records');
//
//        callbackFunction(cpuUsagePercentRecords);
//    });
//};

