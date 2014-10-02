/*
    A wrapper for different methods that are used to stub the data for developing UI widgets and pages.
 */
var TestDataController = function() {
    return this;
};

/*
    Utility method that returns the topology information from json stub.
    This is primarily used to continue with the development when the app server is not available, but a Suaron server is available.

 */
TestDataController.prototype.getTopologyTestData = function (callbackFunction) {

    var self = this;
    $.getJSON("resources/testdata/master_data.json", function(data) {

        HBaseMM.ModelController.loadTopologyInfoFromJSON(data, function(){
//            alert('json loaded');
            callbackFunction();
        });
    });
};

/*
    Utility method that returns the metrics organized by categories for a list of nodes.
    This is being used to develop explore.html page.
 */

TestDataController.prototype.getMetricsForCategoryByNodeForExplore = function (categoryName, nodeName, callbackFunction) {

    var self = this;
    $.getJSON("resources/testdata/explore.json", function(data) {

//        alertObject(data, 'Metric Category Data');

        var metricCategoriesArray = [];

        $.each(data, function(index, metricCategoryJSONObject){

            var categoryId = metricCategoryJSONObject['id'];
            var categoryName = metricCategoryJSONObject['name'];
            var metricsJSONArray= metricCategoryJSONObject['metrics'];

            var metricsArray = [];
            $.each(metricsJSONArray, function(index, metricJSONObject){
                var metricId = metricJSONObject['id'];
                var metricName = metricJSONObject['name'];
                var type = metricJSONObject['type'];
                var values = metricJSONObject['values'];
                var threshold= metricJSONObject['threshold'];

                var metricData = new MetricData(metricId, metricName, values, type, threshold);

//            alertObject(metricData.values, 'Values[' + index + ']');
                metricsArray.push(metricData);

            });

            var metricCategoryData = new MetricCategoryData(categoryId, categoryName, metricsArray);
            metricCategoriesArray.push(metricCategoryData);
        });
//        alertObject(metricCategoriesArray, 'returning');
        callbackFunction(metricCategoriesArray);

    });
};

/*
    Utility method that returns the jobs information from json stub.
 */
TestDataController.prototype.getMigrationJobsTestData = function (callbackFunction) {

    var self = this;
    $.getJSON("resources/testdata/migration_jobs_data.json", function(data) {
		
		var jobsArray = [];
		
		$.each(data, function(index, jobObject){
		
			var migrationJobId = jobObject['MIGRATION_JOB_ID'];;
			var organizationId = jobObject['ORGANIZATION_ID'];;
			var tableName = jobObject['TABLE_NAME'];;
			var status = jobObject['STATUS'];;
			var jobSubmitted = jobObject['JOB_SUBMITTED'];;
			var jobFinished = jobObject['JOB_FINISHED'];;
			var rangeStart = jobObject['RANGE_START'];;
			var rangeEnd = jobObject['RANGE_END'];;
			var lastRowMigrated = jobObject['LAST_ROW_MIGRATED'];;
			var hadoopJobId = jobObject['HADOOP_JOB_ID'];;
			var retries = jobObject['RETRIES'];;
			var targetQuorum = jobObject['TARGET_QUORUM'];;
			var currentRow = jobObject['CURRENT_ROW'];;
			var totalRows = jobObject['TOTAL_ROWS'];;
    		var progress = Math.random() * 100;
    			
			var jobData = new MigrationJobData(migrationJobId, organizationId, tableName,
								status, jobSubmitted, jobFinished, rangeStart, rangeEnd, 
								lastRowMigrated, hadoopJobId, retries, targetQuorum, 
								currentRow, totalRows, progress );

			jobsArray.push(jobData);

		});

//		alertObject(jobsArray,  'Migration Jobs');
		
		callbackFunction(10, 'sreekarp1-wsl', '8088', jobsArray);
// 		return false;
    });
};

/*
    Utility method that returns the jobs information from json stub.
 */
TestDataController.prototype.getBackupJobsTestData = function (callbackFunction) {

    var self = this;
    $.getJSON("resources/testdata/backup_jobs_data.json", function(data) {
		
		var jobsArray = [];
		
		$.each(data, function(index, jobObject){
		
			var tableName = jobObject['TABLE_NAME'];;
			var status = jobObject['STATUS'];;
			var type = jobObject['TYPE'];;
			var jobSubmitted = jobObject['JOB_SUBMITTED'];;
			var jobFinished = jobObject['JOB_FINISHED'];;
			var rangeStart = jobObject['RANGE_START'];;
			var rangeEnd = jobObject['RANGE_END'];;
			var output = jobObject['OUTPUT'];;
			var message = jobObject['MESSAGE'];;
    			
    		var jobData = new BackupJobData(tableName, status, type, 
								jobSubmitted, jobFinished, rangeStart, rangeEnd, 
								output, message )
									
			jobsArray.push(jobData);

		});

// 		alertObject(jobsArray,  'Migration Jobs');
		
		callbackFunction(jobsArray.length, jobsArray);
// 		return false;
    });
};

/*
    Utility method that returns the test data for alerts.
 */

TestDataController.prototype.getAlertsTestData = function (callbackFunction) {

    $.getJSON("resources/testdata/alerts.json", function(data) {
		
		callbackFunction(data);
	});
};

TestDataController.prototype.getOpenAlertsCountTestData = function (callbackFunction) {

    $.getJSON("resources/testdata/openAlertsCount.json", function(data) {
		
		callbackFunction(data);
	});
};

/*
    Utility method that returns the test data for rules.
 */

TestDataController.prototype.getRulesList = function (callbackFunction) {

    $.getJSON("resources/testdata/rules_data.json", function(data) {
		
		callbackFunction(data['rulesList']);
	});
};
