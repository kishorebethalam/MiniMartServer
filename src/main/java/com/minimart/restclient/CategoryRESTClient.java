package com.minimart.restclient;

import java.util.List;

import javax.ws.rs.HttpMethod;

import com.minimart.model.Category;
import com.minimart.dto.CategoryDTO;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.GenericType;


public class CategoryRESTClient  extends BaseRESTClient {
	
	public CategoryRESTClient(String baseUrl) {
		super(baseUrl);
	}

	public int addCategory(Category category) {

		ClientResponse response = this.processRequest("category/add", HttpMethod.POST, category);
		Integer id = response.getEntity(Integer.class);
		return id;
	}
	
	public void updateCategory(Category category) {

		ClientResponse response = this.processRequest("category/update", HttpMethod.PUT, category);
	}
	
	public void deleteCategory(Category category) {

		ClientResponse response = this.processRequest("category/" + category.getId(), HttpMethod.DELETE, null);
	}
	
	public Category getCategory(int id) {

		ClientResponse response = this.processRequest("category/" + id , HttpMethod.GET, null);
		Category category = response.getEntity(Category.class);
		return category;
	}
	
	public List<Category> getAllCategorys() {

		ClientResponse response = this.processRequest("category/all", HttpMethod.GET, null);
		return response.getEntity(new GenericType<List<Category>>() { });
		 
	}
	
	public CategoryDTO getCategoryDTO(int id) {

		ClientResponse response = this.processRequest("category/dto/" + id , HttpMethod.GET, null);
		CategoryDTO categoryDTO = response.getEntity(CategoryDTO.class);
		return categoryDTO;
	}
	
	public List<CategoryDTO> getAllCategoryDTOs() {

		ClientResponse response = this.processRequest("category/dto/all", HttpMethod.GET, null);
		return response.getEntity(new GenericType<List<CategoryDTO>>() { });
		 
	}

	
	
}