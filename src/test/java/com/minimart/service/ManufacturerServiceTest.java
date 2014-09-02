package com.minimart.service;

import static org.junit.Assert.assertEquals;

import java.util.List;

import org.junit.Test;

import com.minimart.model.Manufacturer;
import com.minimart.model.POSModel;
import com.minimart.service.impl.ManufacturerServiceImpl;
import com.minimart.TestDataUtil;

public class ManufacturerServiceTest {

	ManufacturerService service ;
	public ManufacturerServiceTest() {
		// TODO Auto-generated constructor stub
		service = new ManufacturerServiceImpl();
	}
	
	@Test
	public void testManufacturerCRUD() throws Exception
	{
		//Get the original list of items from db, if any.
		List<Manufacturer> originalItems = service.getAllManufacturers();
		
		//Get the list of items to be used for testing.
		List<POSModel> testManufacturers = TestDataUtil.getTestData("Manufacturer");
		if (testManufacturers == null || testManufacturers.size() ==0) {
			assertEquals(true, false);
		}
		
		//Start inserting all test data and test for proper insertion

		for (POSModel model : testManufacturers) {
			Manufacturer manufacturer = (Manufacturer) model;
			int generatedManufacturerId = service.addManufacturer(manufacturer);

			//Ensure that it's inserted properly by retrieving and verifying it.
			Manufacturer fetchManufacturer = service.getManufacturerById(generatedManufacturerId);
			assertEquals(manufacturer, fetchManufacturer);
		}
		
		//Ensure that all inserts are successful by verifying the size in db post insert.
		List<Manufacturer> allItemsAfterInsert = service.getAllManufacturers();
		assertEquals(allItemsAfterInsert.size(), testManufacturers.size() + originalItems.size());
		
		for (POSModel model : testManufacturers) {
			Manufacturer manufacturer = (Manufacturer) model;
			service.deleteManufacturer(manufacturer.getId());;

			Manufacturer fetchManufacturerAfterDelete = service.getManufacturerById(manufacturer.getId());
			assertEquals(fetchManufacturerAfterDelete, null);
		}		

		//Ensure that all deletes are successful by verifying the size in db post delete.
		List<Manufacturer> allItemsAfterDelete = service.getAllManufacturers();
		assertEquals(allItemsAfterDelete.size(), originalItems.size());
	}
	
	

}
