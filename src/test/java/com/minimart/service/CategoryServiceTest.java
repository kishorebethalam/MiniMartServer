package com.minimart.service;

import static org.junit.Assert.assertEquals;

import java.util.List;

import org.junit.Test;

import com.minimart.model.Category;
import com.minimart.model.POSModel;
import com.minimart.service.impl.CategoryServiceImpl;
import com.minimart.TestDataUtil;

public class CategoryServiceTest {

	CategoryService service ;
	public CategoryServiceTest() {
		// TODO Auto-generated constructor stub
		service = new CategoryServiceImpl();
	}
	
	@Test
	public void testCategoryCRUD() throws Exception
	{
		//Get the original list of items from db, if any.
		List<Category> originalItems = service.getAllCategories();
		
		//Get the list of items to be used for testing.
		List<POSModel> testCategories = TestDataUtil.getTestData("Category");
		if (testCategories == null || testCategories.size() ==0) {
			assertEquals(true, false);
		}
		
		//Start inserting all test data and test for proper insertion

		for (POSModel model : testCategories) {
			Category category = (Category) model;
			int generatedCategoryId = service.addCategory(category);

			//Ensure that it's inserted properly by retrieving and verifying it.
			Category fetchCategory = service.getCategoryById(generatedCategoryId);
			assertEquals(category, fetchCategory);
		}
		
		//Ensure that all inserts are successful by verifying the size in db post insert.
		List<Category> allItemsAfterInsert = service.getAllCategories();
		assertEquals(allItemsAfterInsert.size(), testCategories.size() + originalItems.size());
		
		for (POSModel model : testCategories) {
			Category category = (Category) model;
			service.deleteCategory(category.getId());;

			Category fetchCategoryAfterDelete = service.getCategoryById(category.getId());
			assertEquals(fetchCategoryAfterDelete, null);
		}		

		//Ensure that all deletes are successful by verifying the size in db post delete.
		List<Category> allItemsAfterDelete = service.getAllCategories();
		assertEquals(allItemsAfterDelete.size(), originalItems.size());
	}
	
	

}
