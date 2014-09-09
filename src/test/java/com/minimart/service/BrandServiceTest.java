package com.minimart.service;

import static org.junit.Assert.assertEquals;

import java.util.List;

import org.junit.Test;

import com.minimart.model.Brand;
import com.minimart.model.POSModel;
import com.minimart.restclient.BrandRESTClient;
import com.minimart.service.impl.BrandServiceImpl;
import com.minimart.TestDataUtil;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.GenericType;
import com.sun.jersey.api.client.config.ClientConfig;
import com.sun.jersey.api.client.config.DefaultClientConfig;
import com.sun.jersey.api.json.JSONConfiguration;

public class BrandServiceTest {

	BrandService service ;
	public BrandServiceTest() {
		// TODO Auto-generated constructor stub
		service = new BrandServiceImpl();
	}
	
	@Test
	public void testRest(){
		BrandRESTClient restClient = new BrandRESTClient("http://localhost:8080");
		Brand brand = restClient.getBrand(1);
		Brand brandFromService = service.getBrandById(1);
		assertEquals(brand, brandFromService);
	}
	
	@Test
	public void testBrandCRUD() throws Exception
	{
		//Get the original list of items from db, if any.
		List<Brand> originalItems = service.getAllBrands();
		
		//Get the list of items to be used for testing.
		List<POSModel> testBrands = TestDataUtil.getTestData("Brand");
		if (testBrands == null || testBrands.size() ==0) {
			assertEquals(true, false);
		}
		
		//Start inserting all test data and test for proper insertion

		for (POSModel model : testBrands) {
			Brand brand = (Brand) model;
			int generatedBrandId = service.addBrand(brand);

			//Ensure that it's inserted properly by retrieving and verifying it.
			Brand fetchBrand = service.getBrandById(generatedBrandId);
			assertEquals(brand, fetchBrand);
		}
		
		//Ensure that all inserts are successful by verifying the size in db post insert.
		List<Brand> allItemsAfterInsert = service.getAllBrands();
		assertEquals(allItemsAfterInsert.size(), testBrands.size() + originalItems.size());
		
		for (POSModel model : testBrands) {
			Brand brand = (Brand) model;
			service.deleteBrand(brand.getId());;

			Brand fetchBrandAfterDelete = service.getBrandById(brand.getId());
			assertEquals(fetchBrandAfterDelete, null);
		}		

		//Ensure that all deletes are successful by verifying the size in db post delete.
		List<Brand> allItemsAfterDelete = service.getAllBrands();
		assertEquals(allItemsAfterDelete.size(), originalItems.size());
	}
	
	

}
