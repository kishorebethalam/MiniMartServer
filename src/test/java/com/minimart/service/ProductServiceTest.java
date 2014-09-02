package com.minimart.service;

import static org.junit.Assert.assertEquals;

import java.util.List;

import org.junit.Test;

import com.minimart.model.Product;
import com.minimart.model.POSModel;
import com.minimart.service.impl.ProductServiceImpl;
import com.minimart.TestDataUtil;

public class ProductServiceTest {

	ProductService service ;
	public ProductServiceTest() {
		// TODO Auto-generated constructor stub
		service = new ProductServiceImpl();
	}
	
	@Test
	public void testProductCRUD() throws Exception
	{
		//Get the original list of items from db, if any.
		List<Product> originalItems = service.getAllProducts();
		
		//Get the list of items to be used for testing.
		List<POSModel> testProducts = TestDataUtil.getTestData("Product");
		if (testProducts == null || testProducts.size() ==0) {
			assertEquals(true, false);
		}
		
		//Start inserting all test data and test for proper insertion

		for (POSModel model : testProducts) {
			Product product = (Product) model;
			int generatedProductId = service.addProduct(product);

			//Ensure that it's inserted properly by retrieving and verifying it.
			Product fetchProduct = service.getProductById(generatedProductId);
			assertEquals(product, fetchProduct);
		}
		
		//Ensure that all inserts are successful by verifying the size in db post insert.
		List<Product> allItemsAfterInsert = service.getAllProducts();
		assertEquals(allItemsAfterInsert.size(), testProducts.size() + originalItems.size());
		
		for (POSModel model : testProducts) {
			Product product = (Product) model;
			service.deleteProduct(product.getId());;

			Product fetchProductAfterDelete = service.getProductById(product.getId());
			assertEquals(fetchProductAfterDelete, null);
		}		

		//Ensure that all deletes are successful by verifying the size in db post delete.
		List<Product> allItemsAfterDelete = service.getAllProducts();
		assertEquals(allItemsAfterDelete.size(), originalItems.size());
	}
	
	

}
