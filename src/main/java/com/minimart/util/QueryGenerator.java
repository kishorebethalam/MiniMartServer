package com.minimart.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import com.google.common.base.Joiner;


public class QueryGenerator {

	private static String QUERY_PROPERTIES_FILE_NAME = "Query.properties";
	private static Properties queryProperties;
	private static String queryFilePath = "test";

	public QueryGenerator(String queryFilePathArg) {
		queryFilePath = queryFilePathArg;
	}

	public static void startGeneration(String queryFilePathArg){
		queryFilePath = queryFilePathArg;
		queryProperties = new Properties();
		try {
			File file = new File(queryFilePath + QUERY_PROPERTIES_FILE_NAME);
			if (!file.exists()){
				file.createNewFile();
			}
			queryProperties.load(new FileInputStream(file));
//			System.out.println(queryProperties.toString());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public static void completeGeneration(){
		FileOutputStream fileOut;
		try {
			fileOut = new FileOutputStream(new File(queryFilePath + QUERY_PROPERTIES_FILE_NAME));
			queryProperties.store(fileOut, "Queries To be used in DAOs");
			fileOut.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static String generateGetByIdQuery(String dbTableName,
			List<String> fieldNames) {
		 
		StringBuffer buffer = new StringBuffer();
		buffer.append("select ");
		buffer.append(Joiner.on(", ").skipNulls().join(fieldNames));
		buffer.append(" from ");
		buffer.append(dbTableName);
		buffer.append(" where id = ? ");
		
//		System.out.println(buffer.toString());
		
		queryProperties.put(dbTableName.toUpperCase() + "_GET_BY_ID", buffer.toString());
		return buffer.toString();
	}
	public static String generateGetAllQuery(String dbTableName,
			List<String> fieldNames) {
		 
		StringBuffer buffer = new StringBuffer();
		buffer.append("select ");
		buffer.append(Joiner.on(", ").skipNulls().join(fieldNames));
		buffer.append(" from ");
		buffer.append(dbTableName);

		
//		System.out.println(buffer.toString());
		
		queryProperties.put(dbTableName.toUpperCase() + "_GET_ALL", buffer.toString());
		return buffer.toString();
	}
	public static String generateUpdateQuery(String dbTableName,
			List<String> fieldNames) {
		
		List<String> applicableFields = new ArrayList<String>(fieldNames);
		applicableFields.remove("ID");

		StringBuffer buffer = new StringBuffer();
		buffer.append("update ").append(dbTableName);
		buffer.append(" set ");
		
		List<String> expressions = new ArrayList<String>();
		for (String fieldName : applicableFields) {
			expressions.add(fieldName + " = ? ");
		}
		buffer.append(Joiner.on(" , ").skipNulls().join(expressions));
		buffer.append(" where id = ? ");
		
//		System.out.println(buffer.toString());
		
		queryProperties.put(dbTableName.toUpperCase() + "_UPDATE", buffer.toString());
		return buffer.toString();
	}
	public static String generateInsertQuery(String dbTableName,
			List<String> fieldNames) {
		
		List<String> applicableFields = new ArrayList<String>(fieldNames);
		applicableFields.remove("ID");
		
		String[] questionsArray = String.format("%0" + applicableFields.size() + "d", 0).replace("0","?,").split(",");

		StringBuffer buffer = new StringBuffer();
		buffer.append("insert into ").append(dbTableName);
		buffer.append(" ( ");
		buffer.append(Joiner.on(", ").skipNulls().join(applicableFields));
		buffer.append(" ) ");
		buffer.append(" values ( ");
		buffer.append(Joiner.on(", ").skipNulls().join(questionsArray));
		buffer.append(" ) ");
		
//		System.out.println(buffer.toString());
		
		queryProperties.put(dbTableName.toUpperCase() + "_INSERT", buffer.toString());
		return buffer.toString();
	}
	public static String generateDeleteQuery(String dbTableName,
			List<String> fieldNames) {
		
		 
		StringBuffer buffer = new StringBuffer();
		buffer.append("delete from ").append(dbTableName);
		buffer.append(" where id = ? ");
		
//		System.out.println(buffer.toString());
		
		queryProperties.put(dbTableName.toUpperCase() + "_DELETE", buffer.toString());
		return buffer.toString();
	}

}
