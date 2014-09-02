package com.minimart;

import java.util.List;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.webapp.WebAppContext;

import com.minimart.model.Manufacturer;
import com.minimart.service.ManufacturerService;
import com.minimart.service.impl.ManufacturerServiceImpl;

/**
 * 
 * This class launches the web application in an embedded Jetty container.
 * This is the entry point to your application. The Java command that is used for
 * launching should fire this main method.
 *
 */
public class Main {
    
    /**
     * @param args
     */
    public static void main(String[] args) throws Exception{
    	testApp();
    }
    public static void testApp(){
    	
//    	BrandService brandService = new BrandServiceImpl();
//    	
//    	List<Brand> brands = brandService.getAllBrands();
//    	for (Brand brand : brands) {
//    		System.out.println(brand.toString());
//    	}
    	
    	ManufacturerService service = new ManufacturerServiceImpl();
    	
    	List<Manufacturer> items = service.getAllManufacturers();
    	for (Manufacturer item : items) {
    		System.out.println(item.toString());
    	}
    	
    	
//    	Brand brandNew = new Brand();
//    	brandNew.setManufacturerId(1);
//    	brandNew.setName("Brand3");
//    	int brandId = brandService.addBrand(brandNew);
    	
//    	int brandId = 3;
//    	Brand brand = brandService.getBrandById(brandId);
//    	System.out.println("Before updating" + brand.toString());
//    	
//    	brand.setName("Updated" + brand.getName());
//    	brandService.updateBrand(brand);
//    	
//    	Brand updatedBrand = brandService.getBrandById(brandId);
//    	System.out.println("After Updating" + updatedBrand);
//    	
//    	brandService.deleteBrand(brandId);
//    	Brand afterDelete= brandService.getBrandById(brandId);
//    	if (afterDelete != null) {
//    		System.out.println("delete is failed");
//    	} else {
//    		System.out.println("delete is successful");
//    	}
    	
    	
    }
    public static void startServer() throws Exception{
        String webappDirLocation = "src/main/webapp/";
        
        //The port that we should run on can be set into an environment variable
        //Look for that variable and default to 8080 if it isn't there.
        String webPort = System.getenv("PORT");
        if(webPort == null || webPort.isEmpty()) {
            webPort = "8080";
        }

        Server server = new Server(Integer.valueOf(webPort));
        WebAppContext root = new WebAppContext();

        root.setContextPath("/");
        root.setDescriptor(webappDirLocation+"/WEB-INF/web.xml");
        root.setResourceBase(webappDirLocation);
        
        //Parent loader priority is a class loader setting that Jetty accepts.
        //By default Jetty will behave like most web containers in that it will
        //allow your application to replace non-server libraries that are part of the
        //container. Setting parent loader priority to true changes this behavior.
        //Read more here: http://wiki.eclipse.org/Jetty/Reference/Jetty_Classloading
        root.setParentLoaderPriority(true);
        
        server.setHandler(root);
        
        server.start();
        server.join();   
    }

}
