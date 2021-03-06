package com.minimart;

import java.util.Date;

import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.beanutils.converters.DateConverter;
import org.apache.commons.beanutils.converters.DateTimeConverter;
import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.DefaultHandler;
import org.eclipse.jetty.server.handler.HandlerList;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.eclipse.jetty.webapp.WebAppContext;

import com.minimart.util.Configuration;
import com.sun.jersey.spi.container.servlet.ServletContainer;

import org.eclipse.jetty.util.log.Log;
import org.eclipse.jetty.util.log.Slf4jLog;
 
public class MinimalServerRest {

	public static void main(String[] args) throws Exception {
		
		Log.setLog(new Slf4jLog());
		
		Log.info("Log is working!");
		
		int portNumber = Integer.parseInt(Configuration.getAppProperty("Port"));

		Server server = new Server(8080);

	    String currentClassPath = MinimalServerRest.class.getClassLoader().getResource(".").toString();
	    String webappPath = currentClassPath + "../../src/main/webapp";
	    WebAppContext webAppContext = new WebAppContext(webappPath, "");
	    webAppContext.setDescriptor(webAppContext + "/WEB-INF/web.xml");
	    
	    ResourceHandler resource_handler = new ResourceHandler();
	    resource_handler.setDirectoriesListed(true);
	    resource_handler.setWelcomeFiles(new String[]{ "index.html" });
	    resource_handler.setResourceBase("src/main/webapp/");

	    HandlerList handlers = new HandlerList();
	    handlers.setHandlers(new Handler[] { 
	    		resource_handler, 
	    		//new DefaultHandler(), 
	    		webAppContext });

	    server.setHandler(handlers);
	    
	    server.start();
	    server.join();
	    
//		webAppContext.setResourceBase(".");
//		webAppContext.setContextPath("/runJetty");
	    
//	    server.setHandler(webAppContext);

		String[] patterns = new String[] {"yyyy-MM-dd", "dd-MM-yyyy"};
		DateTimeConverter converter = new DateConverter();
		converter.setPatterns(patterns);
		ConvertUtils.register(converter, Date.class);

    	 
//         ServletHolder sh = new ServletHolder(ServletContainer.class);
//         sh.setInitOrder(1);
//    	 sh.setInitParameter("jersey.config.server.provider.packages","com.minimart.model");
//    	 sh.setInitParameter("com.sun.jersey.config.property.packages", "com.minimart.service.impl");
//    	 sh.setInitParameter("com.sun.jersey.api.json.POJOMappingFeature", "true");
//    	 
//         Server server = new Server(Integer.parseInt(Configuration.getAppProperty("Port")));
//         ServletContextHandler context = new ServletContextHandler(server, "/", ServletContextHandler.SESSIONS);
//         context.addServlet(sh, "/*");
//         server.start();
//         server.join();      
	    
		Log.debug("Port Number:" + portNumber);

      }
}