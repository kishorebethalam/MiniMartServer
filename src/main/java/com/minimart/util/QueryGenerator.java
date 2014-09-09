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
import com.minimart.annotation.DTOQueryAnnotation;
import com.minimart.model.POSModel;

public class QueryGenerator {

	private static String QUERY_PROPERTIES_FILE_NAME = "Query.properties";
	private static Properties queryProperties;
	private static String queryFilePath = "test";

	public QueryGenerator(String queryFilePathArg) {
		queryFilePath = queryFilePathArg;
	}

	public static void startGeneration(String queryFilePathArg) {
		queryFilePath = queryFilePathArg;
		queryProperties = new Properties();
		try {
			File file = new File(queryFilePath + QUERY_PROPERTIES_FILE_NAME);
			if (!file.exists()) {
				file.createNewFile();
			}
			queryProperties.load(new FileInputStream(file));
			// System.out.println(queryProperties.toString());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public static void completeGeneration() {
		FileOutputStream fileOut;
		try {
			fileOut = new FileOutputStream(new File(queryFilePath
					+ QUERY_PROPERTIES_FILE_NAME));
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

		// System.out.println(buffer.toString());

		queryProperties.put(dbTableName.toUpperCase() + "_GET_BY_ID",
				buffer.toString());
		return buffer.toString();
	}

	public static String generateGetDTOByIdQuery(
			Class<? extends POSModel> dtoClass, String dbTableName,
			List<String> fieldNames, List<String[]> dtoFields) {

		try {
			DTOQueryAnnotation queryAnnotation = CodeGenerator
					.getHardCodedQueriesForDTO(dtoClass);
			
			if (queryAnnotation != null) {
				
				String query = queryAnnotation.getDTOByID();
				if (query != null && query.length() > 0) {
					
					System.out.println(query);
					
					queryProperties.put(dbTableName.toUpperCase()
							+ "_GET_DTO_BY_ID", query);
					return query;
				}
			}
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		List<String> columnSet = new ArrayList<String>();
		for (String field : fieldNames) {
			String fieldName = dbTableName + "." + field;
			columnSet.add(fieldName);
		}
		for (String[] dtoField : dtoFields) {
			String fieldName = dtoField[0] + "." + dtoField[1] + " "
					+ dtoField[3];
			columnSet.add(fieldName);
		}

		List<String> tableNames = new ArrayList<String>();
		tableNames.add(dbTableName);

		for (String[] dtoField : dtoFields) {
			tableNames.add(dtoField[0]);
		}

		List<String> conditions = new ArrayList<String>();
		conditions.add(dbTableName + ".id = ? ");
		for (String[] dtoField : dtoFields) {
			String expression = dtoField[2] + " = " + dtoField[0] + ".id";
			conditions.add(expression);
		}

		StringBuffer buffer = new StringBuffer();
		buffer.append("select ");
		buffer.append(Joiner.on(", ").skipNulls().join(columnSet));
		buffer.append(" from ");
		buffer.append(Joiner.on(", ").skipNulls().join(tableNames));
		buffer.append(" where ").append(
				Joiner.on(" AND ").skipNulls().join(conditions));

		System.out.println(buffer.toString());

		queryProperties.put(dbTableName.toUpperCase() + "_GET_DTO_BY_ID",
				buffer.toString());
		return buffer.toString();
	}

	public static String generateGetAllDTOQuery(
			Class<? extends POSModel> dtoClass, String dbTableName,
			List<String> fieldNames, List<String[]> dtoFields) {

		try {
			DTOQueryAnnotation queryAnnotation = CodeGenerator
					.getHardCodedQueriesForDTO(dtoClass);
			
			if (queryAnnotation != null) {
				
				String query = queryAnnotation.getAllDTOs();
				if (query != null && query.length() > 0) {
					queryProperties.put(dbTableName.toUpperCase()
							+ "_GET_DTO_ALL", query);
					System.out.println(query);
					
					return query;
				}
			}
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		List<String> columnSet = new ArrayList<String>();
		for (String field : fieldNames) {
			String fieldName = dbTableName + "." + field;
			columnSet.add(fieldName);
		}

		for (String[] dtoField : dtoFields) {
			String fieldName = dtoField[0] + "." + dtoField[1] + " "
					+ dtoField[3];
			columnSet.add(fieldName);
		}

		List<String> tableNames = new ArrayList<String>();
		tableNames.add(dbTableName);

		for (String[] dtoField : dtoFields) {
			tableNames.add(dtoField[0]);
		}

		List<String> conditions = new ArrayList<String>();
		for (String[] dtoField : dtoFields) {
			String expression = dtoField[2] + " = " + dtoField[0] + ".id";
			conditions.add(expression);
		}

		StringBuffer buffer = new StringBuffer();
		buffer.append("select ");
		buffer.append(Joiner.on(", ").skipNulls().join(columnSet));
		buffer.append(" from ");
		buffer.append(Joiner.on(", ").skipNulls().join(tableNames));

		if (conditions.size() > 0) {
			buffer.append(" where ").append(
					Joiner.on(" AND ").skipNulls().join(conditions));
		}

		System.out.println(buffer.toString());

		queryProperties.put(dbTableName.toUpperCase() + "_GET_DTO_ALL",
				buffer.toString());
		return buffer.toString();
	}

	public static String generateGetAllQuery(String dbTableName,
			List<String> fieldNames) {

		StringBuffer buffer = new StringBuffer();
		buffer.append("select ");
		buffer.append(Joiner.on(", ").skipNulls().join(fieldNames));
		buffer.append(" from ");
		buffer.append(dbTableName);

		// System.out.println(buffer.toString());

		queryProperties.put(dbTableName.toUpperCase() + "_GET_ALL",
				buffer.toString());
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

		// System.out.println(buffer.toString());

		queryProperties.put(dbTableName.toUpperCase() + "_UPDATE",
				buffer.toString());
		return buffer.toString();
	}

	public static String generateInsertQuery(String dbTableName,
			List<String> fieldNames) {

		List<String> applicableFields = new ArrayList<String>(fieldNames);
		applicableFields.remove("ID");

		String[] questionsArray = String
				.format("%0" + applicableFields.size() + "d", 0)
				.replace("0", "?,").split(",");

		StringBuffer buffer = new StringBuffer();
		buffer.append("insert into ").append(dbTableName);
		buffer.append(" ( ");
		buffer.append(Joiner.on(", ").skipNulls().join(applicableFields));
		buffer.append(" ) ");
		buffer.append(" values ( ");
		buffer.append(Joiner.on(", ").skipNulls().join(questionsArray));
		buffer.append(" ) ");

		// System.out.println(buffer.toString());

		queryProperties.put(dbTableName.toUpperCase() + "_INSERT",
				buffer.toString());
		return buffer.toString();
	}

	public static String generateDeleteQuery(String dbTableName,
			List<String> fieldNames) {

		StringBuffer buffer = new StringBuffer();
		buffer.append("delete from ").append(dbTableName);
		buffer.append(" where id = ? ");

		// System.out.println(buffer.toString());

		queryProperties.put(dbTableName.toUpperCase() + "_DELETE",
				buffer.toString());
		return buffer.toString();
	}

}
