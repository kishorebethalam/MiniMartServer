package com.minimart.service;

import static org.junit.Assert.assertEquals;

import java.util.List;

import org.junit.Test;

import com.minimart.model.ProductMaster;
import com.minimart.model.POSModel;
import com.minimart.service.impl.ProductMasterServiceImpl;
import com.minimart.TestDataUtil;

public class ProductMasterServiceTest {

	ProductMasterService service ;
	public ProductMasterServiceTest() {
		// TODO Auto-generated constructor stub
		service = new ProductMasterServiceImpl();
	}
	
	@Test
	public void testProductMasterCRUD() throws Exception
	{
		//Get the original list of items from db, if any.
		List<ProductMaster> originalItems = service.getAllProductMasters();
		
		//Get the list of items to be used for testing.
		List<POSModel> testProductMasters = TestDataUtil.getTestData("ProductMaster");
		if (testProductMasters == null || testProductMasters.size() ==0) {
			assertEquals(true, false);
		}
		
		//Start inserting all test data and test for proper insertion

		for (POSModel model : testProductMasters) {
			ProductMaster productMaster = (ProductMaster) model;
			int generatedProductMasterId = service.addProductMaster(productMaster);

			//Ensure that it's inserted properly by retrieving and verifying it.
			ProductMaster fetchProductMaster = service.getProductMasterById(generatedProductMasterId);
			assertEquals(productMaster, fetchProductMaster);
		}
		
		//Ensure that all inserts are successful by verifying the size in db post insert.
		List<ProductMaster> allItemsAfterInsert = service.getAllProductMasters();
		assertEquals(allItemsAfterInsert.size(), testProductMasters.size() + originalItems.size());
		
		for (POSModel model : testProductMasters) {
			ProductMaster productMaster = (ProductMaster) model;
			service.deleteProductMaster(productMaster.getId());;

			ProductMaster fetchProductMasterAfterDelete = service.getProductMasterById(productMaster.getId());
			assertEquals(fetchProductMasterAfterDelete, null);
		}		

		//Ensure that all deletes are successful by verifying the size in db post delete.
		List<ProductMaster> allItemsAfterDelete = service.getAllProductMasters();
		assertEquals(allItemsAfterDelete.size(), originalItems.size());
	}
	
	

}
