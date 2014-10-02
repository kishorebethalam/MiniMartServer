package com.minimart.util;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.atteo.evo.inflector.English;
import org.hamcrest.core.IsEqual;

import com.minimart.annotation.DTOQueryAnnotation;
import com.minimart.annotation.POSDTOFieldAnnotation;
import com.minimart.annotation.POSFieldAnnotation;
import com.minimart.annotation.POSModelAnnotation;
import com.minimart.model.POSModel;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

public class CodeGenerator {
	
	private String basePackage;
	private String srcFolderPath;
	private String testFolderPath;
	private String templatesFolderPath;

	private String modelPackage;
	private String servicePackage;
	private String serviceImplPackage;
	private String daoPackage;
	private String daoImplPackage;
	
	private String serviceTestPackage;
	private String restPackage;
	private String dtoPackage;
	
	private String generatedHTMLTemplatesFolderPath;
	private String generatedJSFilesFolderPath;

	/**
	 * @param basePackage
	 * @param srcFolderPath
	 */
	public CodeGenerator(String basePackage, String srcFolderPath, String templatesFolderPath, String generatedJSFilesFolderPath, String generatedHTMLTemplatesFolderPath) {
		super();
		this.basePackage = basePackage;
		this.srcFolderPath = srcFolderPath;
		this.testFolderPath = srcFolderPath.replace("main","test");
		this.templatesFolderPath = templatesFolderPath;
		this.generatedJSFilesFolderPath = generatedJSFilesFolderPath;
		this.generatedHTMLTemplatesFolderPath = generatedHTMLTemplatesFolderPath;

		this.modelPackage = this.basePackage + ".model";
		this.servicePackage = this.basePackage + ".service";
		this.serviceImplPackage = this.basePackage + ".service.impl";
		this.daoPackage = this.basePackage + ".dao";
		this.daoImplPackage = this.basePackage + ".dao.impl";
		this.serviceTestPackage = this.basePackage + ".service";
		this.restPackage = this.basePackage + ".restclient";
		this.dtoPackage = this.basePackage + ".dto";
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {

		CodeGenerator generator = new CodeGenerator("com.minimart",
				"/Users/kbethalam/Desktop/Work/MiniMartServer/src/main/java/", "/src/main/resources/templates/freemaker/", "/Users/kbethalam/Desktop/Work/MiniMartServer/src/main/webapp/resources/js", "/Users/kbethalam/Desktop/Work/MiniMartServer/src/main/webapp/resources/templates");

		
		List<String> models = new ArrayList<String>();
		models.add("Category");
		models.add("Manufacturer");
		models.add("Brand");
		models.add("InventoryItem");
		models.add("Product");
		models.add("ProductMaster");
		
		
		generator.generateJSAppRouter(models);
		generator.generateJSModelController(models);
		generator.generateJSViewController(models);
		generator.generateHTMLTemplates(models);

//		QueryGenerator.startGeneration("src/main/resources/");
//		generator.generateCode(models);
//		QueryGenerator.completeGeneration();

	}

	@SuppressWarnings("unchecked")
	public void generateCode(List<String> modelClassesNames) {

		// Build the data-model
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("servicePackage", this.servicePackage);
		data.put("serviceImplPackage", this.serviceImplPackage);
		data.put("modelPackage", this.modelPackage);
		data.put("daoPackage", this.daoPackage);
		data.put("daoImplPackage", this.daoImplPackage);
		data.put("serviceTestPackage", this.serviceTestPackage);
		data.put("restPackage", this.restPackage);
		data.put("dtoPackage", this.dtoPackage);
		
		
		for (String modelClass : modelClassesNames) {

			data.put("variableName", getVariableName(modelClass));
			data.put("className", modelClass);
			data.put("classNamePlural", English.plural(modelClass));

			String dbTableName;
			try {
				dbTableName = getTableName((Class<? extends POSModel>) Class.forName(this.modelPackage + "." + modelClass));
				data.put("dbTableName", dbTableName);
			} catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			generateCRUDQueries(modelClass, data);

			generateServiceInterface(modelClass, data);
			generateServiceImpl(modelClass, data);
			generateDAOInterface(modelClass, data);
			generateDAOImpl(modelClass, data);
			
			generateServiceTest(modelClass, data);
			generateRest(modelClass, data);

		}
		
	}

	private String getVariableName(String className) {
		return className.substring(0, 1).toLowerCase() + className.substring(1);
	}

	private void generateServiceInterface(String modelClass,
			Map<String, Object> data) {

		// Freemarker configuration object
		Configuration cfg = new Configuration();
		try {
			// Load template from source folder
			Template template = cfg.getTemplate(this.templatesFolderPath + "ServiceInterface.ftl");

			generateFile(modelClass + "Service", this.servicePackage, template,
					data);

		} catch (IOException e) {
			e.printStackTrace();
		} catch (TemplateException e) {
			e.printStackTrace();
		}
	}

	private void generateServiceImpl(String modelClass, Map<String, Object> data) {

		// Freemarker configuration object
		Configuration cfg = new Configuration();
		try {
			// Load template from source folder
			Template template = cfg.getTemplate(this.templatesFolderPath + "ServiceImpl.ftl");

			generateFile(modelClass + "ServiceImpl", this.serviceImplPackage,
					template, data);

		} catch (IOException e) {
			e.printStackTrace();
		} catch (TemplateException e) {
			e.printStackTrace();
		}
	}

	private void generateDAOInterface(String modelClass,
			Map<String, Object> data) {

		// Freemarker configuration object
		Configuration cfg = new Configuration();
		try {
			// Load template from source folder
			Template template = cfg.getTemplate(this.templatesFolderPath + "DAOInterface.ftl");

			generateFile(modelClass + "DAO", this.daoPackage, template, data);

		} catch (IOException e) {
			e.printStackTrace();
		} catch (TemplateException e) {
			e.printStackTrace();
		}
	}

	private void generateDAOImpl(String modelClass, Map<String, Object> data) {

		// Freemarker configuration object
		Configuration cfg = new Configuration();
		try {
			// Load template from source folder
			Template template = cfg.getTemplate(this.templatesFolderPath + "DAOImpl.ftl");

			generateFile(modelClass + "DAOImpl", this.daoImplPackage, template,
					data);

		} catch (IOException e) {
			e.printStackTrace();
		} catch (TemplateException e) {
			e.printStackTrace();
		}
	}
	
	private void generateServiceTest(String modelClass, Map<String, Object> data) {

		// Freemarker configuration object
		Configuration cfg = new Configuration();
		try {
			// Load template from source folder
			Template template = cfg.getTemplate(this.templatesFolderPath + "ServiceTest.ftl");

			generateTestFile(modelClass + "ServiceTest", this.serviceTestPackage, template,
					data);

		} catch (IOException e) {
			e.printStackTrace();
		} catch (TemplateException e) {
			e.printStackTrace();
		}
	}

	private void generateRest(String modelClass, Map<String, Object> data) {

		// Freemarker configuration object
		Configuration cfg = new Configuration();
		try {
			// Load template from source folder
			Template template = cfg.getTemplate(this.templatesFolderPath + "RestClient.ftl");

			generateFile(modelClass + "RESTClient", this.restPackage, template,
					data);

		} catch (IOException e) {
			e.printStackTrace();
		} catch (TemplateException e) {
			e.printStackTrace();
		}
	}
	
	private void generateJSModelController(List<String> modelClasses) {

//		List<String> modelClasses = Arrays.asList("Brand","Category");
		Map<String, List<String>> fieldsByModel = new HashMap<String, List<String>>();
		for (String model : modelClasses){
			try {
				List<Field> fields = getAllFields(Class.forName(this.dtoPackage + "." + model + "DTO"));
				List<String> fieldNames = new ArrayList<String>();
				for (Field field : fields){
					if (!(field.getName().equalsIgnoreCase("serialVersionUID"))){
						fieldNames.add(field.getName());
					}
				}
				fieldsByModel.put(model, fieldNames);
			} catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		// Freemarker configuration object
		Configuration cfg = new Configuration();
		try {
			// Load template from source folder
			Template template = cfg.getTemplate(this.templatesFolderPath + "JSModelController.ftl");

			Map<String, Object> data = new HashMap<String, Object>();
			data.put("dtoClasses", modelClasses);
			data.put("fieldsByModel", fieldsByModel);
			
			generateJSFile("ModelController", template, data);

		} catch (IOException e) {
			e.printStackTrace();
		} catch (TemplateException e) {
			e.printStackTrace();
		}
	}
	
	private void generateJSViewController(List<String> modelClasses) {

//		List<String> modelClasses = Arrays.asList("Brand","Category");
		Map<String, List<String>> fieldsByModel = new HashMap<String, List<String>>();
		for (String model : modelClasses){
			try {
				List<Field> fields = getAllFields(Class.forName(this.dtoPackage + "." + model + "DTO"));
				List<String> fieldNames = new ArrayList<String>();
				for (Field field : fields){
					if (!(field.getName().equalsIgnoreCase("serialVersionUID"))){
						fieldNames.add(field.getName());
					}
				}
				fieldsByModel.put(model, fieldNames);
			} catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		// Freemarker configuration object
		Configuration cfg = new Configuration();
		try {
			// Load template from source folder
			Template template = cfg.getTemplate(this.templatesFolderPath + "JSViewController.ftl");

			Map<String, Object> data = new HashMap<String, Object>();
			data.put("dtoClasses", modelClasses);
			data.put("fieldsByModel", fieldsByModel);
			
			generateJSFile("ViewController", template, data);

		} catch (IOException e) {
			e.printStackTrace();
		} catch (TemplateException e) {
			e.printStackTrace();
		}
	}
	
	private void generateJSAppRouter(List<String> modelClasses) {

		// Freemarker configuration object
		Configuration cfg = new Configuration();
		try {
			// Load template from source folder
			Template template = cfg.getTemplate(this.templatesFolderPath + "JSAppRouter.ftl");

			Map<String, Object> data = new HashMap<String, Object>();
			data.put("dtoClasses", modelClasses);
			
			generateJSFile("AppRouter", template, data);

		} catch (IOException e) {
			e.printStackTrace();
		} catch (TemplateException e) {
			e.printStackTrace();
		}
	}
	
	private void generateHTMLTemplates(List<String> modelClasses) {

//		List<String> modelClasses = Arrays.asList("Brand","Category");
		for (String modelClass : modelClasses){
			generateHTMLListTemplate(modelClass);
			generateHTMLDetailTemplate(modelClass);
		}
		
	}
	private void generateHTMLListTemplate(String modelClassName) {

		List<Field> fields;
		try {
			fields = getAllFields(Class.forName(this.dtoPackage + "." + modelClassName + "DTO"));
			
			List<String> fieldNames = new ArrayList<String>();
			for (Field field : fields){
				if (!(field.getName().equalsIgnoreCase("serialVersionUID"))){
					fieldNames.add(field.getName());
				}
			}

			// Freemarker configuration object
			Configuration cfg = new Configuration();
			try {
				// Load template from source folder
				Template template = cfg.getTemplate(this.templatesFolderPath + "html-list-template.ftl");

				Map<String, Object> data = new HashMap<String, Object>();
				data.put("modelClassName", modelClassName);
				data.put("fields", fieldNames);
				
				generateHTMLTemplateFile(modelClassName.toLowerCase() + "-list-template", template, data);

			} catch (IOException e) {
				e.printStackTrace();
			} catch (TemplateException e) {
				e.printStackTrace();
			}
		} catch (ClassNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
	}
	private void generateHTMLDetailTemplate(String modelClassName) {

		List<Field> fields;
		try {
			fields = getAllFields(Class.forName(this.dtoPackage + "." + modelClassName + "DTO"));
			
			List<String> fieldNames = new ArrayList<String>();
			for (Field field : fields){
				if (!(field.getName().equalsIgnoreCase("serialVersionUID"))){
					fieldNames.add(field.getName());
				}
			}

			// Freemarker configuration object
			Configuration cfg = new Configuration();
			try {
				// Load template from source folder
				Template template = cfg.getTemplate(this.templatesFolderPath + "html-details-template.ftl");

				Map<String, Object> data = new HashMap<String, Object>();
				data.put("modelClassName", modelClassName);
				data.put("fields", fieldNames);
				
				generateHTMLTemplateFile(modelClassName.toLowerCase() + "-details-template", template, data);

			} catch (IOException e) {
				e.printStackTrace();
			} catch (TemplateException e) {
				e.printStackTrace();
			}
		} catch (ClassNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
	}
	public void generateCRUDQueries(String className, Map<String, Object> data) {

		try {

			@SuppressWarnings("unchecked")
			Class<? extends POSModel> modelClass = (Class<? extends POSModel>) Class
					.forName(this.modelPackage + "." + className);

			String dbTableName = getTableName(modelClass);
			List<Object[]> fieldsInfo = getFieldsInfo(modelClass);
			List<String> fieldNames = new ArrayList<String>();
			for (Object[] fieldInfo : fieldsInfo) {
				fieldNames.add(((String) fieldInfo[2]).toUpperCase());
			}
			
			QueryGenerator.generateInsertQuery(dbTableName, fieldNames);
			QueryGenerator.generateUpdateQuery(dbTableName, fieldNames);
			QueryGenerator.generateDeleteQuery(dbTableName, fieldNames);
			QueryGenerator.generateGetByIdQuery(dbTableName, fieldNames);
			QueryGenerator.generateGetAllQuery(dbTableName, fieldNames);
			
			@SuppressWarnings("unchecked")
			Class<? extends POSModel> dtoClass = (Class<? extends POSModel>) Class
					.forName(this.dtoPackage + "." + className + "DTO");
			
			List<String[]> dtoFieldsInfo = getDTOFieldsInfo(dtoClass);
			QueryGenerator.generateGetDTOByIdQuery(dtoClass, dbTableName, fieldNames, dtoFieldsInfo);
			QueryGenerator.generateGetAllDTOQuery(dtoClass, dbTableName, fieldNames, dtoFieldsInfo);

		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
	}

	
	private List<Object[]> getFieldsInfo(Class<? extends POSModel> modelClass) {
		List<Object[]> fieldsArray = new ArrayList<Object[]>();

		try {


			for (Field field : CodeGenerator.getAllFields(modelClass)) {
				if (field.isAnnotationPresent(POSFieldAnnotation.class)) {
					try {
						POSFieldAnnotation fieldAnnotation = field
								.getAnnotation(POSFieldAnnotation.class);
						String dbKey = fieldAnnotation.dbColumnName();
						Object[] fieldInfo = new Object[3];
						fieldInfo[0] = field.getName();
						fieldInfo[1] = field.getType();
						fieldInfo[2] = dbKey;

						fieldsArray.add(fieldInfo);
					} catch (Exception exp) {
						exp.printStackTrace();
					}
				}
			}
		} catch (Exception exp) {
			exp.printStackTrace();
		}
		return fieldsArray;
	}
	
	private List<String[]> getDTOFieldsInfo(Class<? extends POSModel> modelClass) {
		List<String[]> fieldsArray = new ArrayList<String[]>();

		try {


			for (Field field : CodeGenerator.getAllFields(modelClass)) {
				if (field.isAnnotationPresent(POSDTOFieldAnnotation.class)) {
					try {
						POSDTOFieldAnnotation fieldAnnotation = field
								.getAnnotation(POSDTOFieldAnnotation.class);
						String referenceTable = fieldAnnotation.referenceTable();
						String referenceTitleField = fieldAnnotation.referenceTitleField();
						String referingField = fieldAnnotation.referingField();
						
						String[] fieldInfo = new String[4];
						fieldInfo[0] = referenceTable;
						fieldInfo[1] = referenceTitleField;
						fieldInfo[2] = referingField;
						fieldInfo[3] = field.getName();

						fieldsArray.add(fieldInfo);
					} catch (Exception exp) {
						exp.printStackTrace();
					}
				}
			}
		} catch (Exception exp) {
			exp.printStackTrace();
		}
		return fieldsArray;
	}

	public static DTOQueryAnnotation getHardCodedQueriesForDTO(Class<? extends POSModel> modelClass)
			throws ClassNotFoundException {

		DTOQueryAnnotation modelAnnotation = null;

		if (modelClass.isAnnotationPresent(DTOQueryAnnotation.class)) {
			try {
				modelAnnotation = modelClass
						.getAnnotation(DTOQueryAnnotation.class);
			} catch (Exception exp) {
				exp.printStackTrace();
			}
		}
		return modelAnnotation;
	}
	private String getTableName(Class<? extends POSModel> modelClass)
			throws ClassNotFoundException {

		String dbTableName = "";

		if (modelClass.isAnnotationPresent(POSModelAnnotation.class)) {
			try {
				POSModelAnnotation modelAnnotation = modelClass
						.getAnnotation(POSModelAnnotation.class);
				dbTableName = modelAnnotation.dbTableName();
			} catch (Exception exp) {
				exp.printStackTrace();
			}
		}
		return dbTableName;
	}

	public void generateJSFile(String fileName,
			Template template, Map<String, Object> data) throws IOException,
			TemplateException {

		String filePath = this.generatedJSFilesFolderPath ;

		File parentDirectory = new File(filePath); // will create a sub folder
													// for each user (currently
													// does not work, below
													// hopefully is a solution)

		if (!parentDirectory.exists()) {
			parentDirectory.mkdirs();
		}

		Writer fileWriter = new FileWriter(filePath + "/" + fileName + ".js");
		template.process(data, fileWriter);
		fileWriter.flush();
		fileWriter.close();
	}
	
	public void generateHTMLTemplateFile(String fileName,
			Template template, Map<String, Object> data) throws IOException,
			TemplateException {

		String filePath = this.generatedHTMLTemplatesFolderPath ;

		File parentDirectory = new File(filePath); // will create a sub folder
													// for each user (currently
													// does not work, below
													// hopefully is a solution)

		if (!parentDirectory.exists()) {
			parentDirectory.mkdirs();
		}

		Writer fileWriter = new FileWriter(filePath + "/" + fileName+ ".html");
		template.process(data, fileWriter);
		fileWriter.flush();
		fileWriter.close();
	}
	
	
	public void generateFile(String className, String packageName,
			Template template, Map<String, Object> data) throws IOException,
			TemplateException {

		String filePath = this.srcFolderPath + packageName.replace(".", "/");

		File parentDirectory = new File(filePath); // will create a sub folder
													// for each user (currently
													// does not work, below
													// hopefully is a solution)

		if (!parentDirectory.exists()) {
			parentDirectory.mkdirs();
		}

		Writer fileWriter = new FileWriter(filePath + "/" + className + ".java");
		template.process(data, fileWriter);
		fileWriter.flush();
		fileWriter.close();
	}
	
	public void generateTestFile(String className, String packageName,
			Template template, Map<String, Object> data) throws IOException,
			TemplateException {


		String filePath = this.testFolderPath + packageName.replace(".", "/");
		
//		System.out.println("Generating " + filePath);
		
		File parentDirectory = new File(filePath); // will create a sub folder
													// for each user (currently
													// does not work, below
													// hopefully is a solution)

		if (!parentDirectory.exists()) {
			parentDirectory.mkdirs();
		}

		Writer fileWriter = new FileWriter(filePath + "/" + className + ".java");
		template.process(data, fileWriter);
		fileWriter.flush();
		fileWriter.close();
	}
	
	public static List<Field> getAllFields(Class<?> type) {
		List<Field> fields = new ArrayList<Field>();
		for (Class<?> c = type; c != null; c = c.getSuperclass()) {
			fields.addAll(Arrays.asList(c.getDeclaredFields()));
		}
		
		return fields;
	}
}
