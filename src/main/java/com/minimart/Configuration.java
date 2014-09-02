package com.minimart;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Properties;


public class Configuration {
	
//	public static Logger LOG = LoggerFactory.getLogger(Configuration.class);
	
	private static String AppPropertiesFileName = "App.properties";
	
    private static Properties appProperties = new Properties();
    static {
        try {
        	InputStream stream = new FileInputStream(new File("/Users/kbethalam/Desktop/Work/MiniMart/App.properties"));
//        	InputStream stream = Thread.currentThread().getContextClassLoader()
//                    .getResourceAsStream(AppPropertiesFileName); 
        	appProperties.load(stream);
        } catch (Exception exp) {
//        	LOG.error("Couldn't load " + AppPropertiesFileName);
        	exp.printStackTrace();
        }

    }
    
    public static String getAppProperty(String propertyName){
    	return appProperties.getProperty(propertyName);
    }
}
