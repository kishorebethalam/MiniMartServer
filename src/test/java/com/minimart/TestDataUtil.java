package com.minimart;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

import com.minimart.model.POSModel;
import com.minimart.model.POSModelFactory;

public class TestDataUtil {

	public static void main (String[] args) throws ClassNotFoundException, Exception{
		loadTestData();
	}
	
	private static Map<String, List<POSModel>> testData; 
	static {
		testData = new HashMap<String, List<POSModel>>();
		try {
			loadTestData();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static List<POSModel> getTestData(String className){
		return testData.get(className);
	}
	
	private static void loadTestData() throws ClassNotFoundException, Exception {

		String rulesString = readFile("test_data.json");
		JSONObject dataJSON = new JSONObject(rulesString);
		
		@SuppressWarnings("rawtypes")
		Iterator iterator = dataJSON.sortedKeys();
		while (iterator.hasNext()){
			
			String className = (String) iterator.next();
			JSONArray dataItems = dataJSON.getJSONArray(className);
			
			String fullyQualifiedClassName = "com.minimart.model." + className;
			List<POSModel> modelObjects = new ArrayList<POSModel>(); 
			
			for( int i=0; i < dataItems.length() ; i++) {
				JSONObject dataItem = dataItems.getJSONObject(i); 
				
				@SuppressWarnings("unchecked")
				POSModel model = (POSModel) POSModelFactory.createFromJSON(dataItem, (Class<? extends POSModel>) Class.forName(fullyQualifiedClassName));
				modelObjects.add(model);
			}
			testData.put(className, modelObjects);
		}
		
//		System.out.println("No of items in testData" + testData.size());
//		System.out.println(dataJSON.toString());
	}

	private static String readFile(String filename) {
		String content = null;
		String resourcesPath = Configuration.getAppProperty("RootDirectory") + "/src/test/resources";
		String filePath = resourcesPath + File.separator + filename;
		
//		System.out.println("Trying to import " + filePath);
		File file = new File(filePath); // for ex foo.txt
		try {
			FileReader reader = new FileReader(file);
			char[] chars = new char[(int) file.length()];
			reader.read(chars);
			content = new String(chars);
			reader.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
//		System.out.println("Content: " + content);
		return content;
	}
}
