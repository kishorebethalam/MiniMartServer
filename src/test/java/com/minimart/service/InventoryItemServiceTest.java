package com.minimart.service;

import static org.junit.Assert.assertEquals;

import java.util.List;

import org.junit.Test;

import com.minimart.model.InventoryItem;
import com.minimart.model.POSModel;
import com.minimart.service.impl.InventoryItemServiceImpl;
import com.minimart.TestDataUtil;

public class InventoryItemServiceTest {

	InventoryItemService service ;
	public InventoryItemServiceTest() {
		// TODO Auto-generated constructor stub
		service = new InventoryItemServiceImpl();
	}
	
	@Test
	public void testInventoryItemCRUD() throws Exception
	{
		//Get the original list of items from db, if any.
		List<InventoryItem> originalItems = service.getAllInventoryItems();
		
		//Get the list of items to be used for testing.
		List<POSModel> testInventoryItems = TestDataUtil.getTestData("InventoryItem");
		if (testInventoryItems == null || testInventoryItems.size() ==0) {
			assertEquals(true, false);
		}
		
		//Start inserting all test data and test for proper insertion

		for (POSModel model : testInventoryItems) {
			InventoryItem inventoryItem = (InventoryItem) model;
			int generatedInventoryItemId = service.addInventoryItem(inventoryItem);

			//Ensure that it's inserted properly by retrieving and verifying it.
			InventoryItem fetchInventoryItem = service.getInventoryItemById(generatedInventoryItemId);
			assertEquals(inventoryItem, fetchInventoryItem);
		}
		
		//Ensure that all inserts are successful by verifying the size in db post insert.
		List<InventoryItem> allItemsAfterInsert = service.getAllInventoryItems();
		assertEquals(allItemsAfterInsert.size(), testInventoryItems.size() + originalItems.size());
		
		for (POSModel model : testInventoryItems) {
			InventoryItem inventoryItem = (InventoryItem) model;
			service.deleteInventoryItem(inventoryItem.getId());;

			InventoryItem fetchInventoryItemAfterDelete = service.getInventoryItemById(inventoryItem.getId());
			assertEquals(fetchInventoryItemAfterDelete, null);
		}		

		//Ensure that all deletes are successful by verifying the size in db post delete.
		List<InventoryItem> allItemsAfterDelete = service.getAllInventoryItems();
		assertEquals(allItemsAfterDelete.size(), originalItems.size());
	}
	
	

}
