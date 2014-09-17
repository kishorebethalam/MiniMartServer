package com.minimart.restclient;

import java.util.List;

import javax.ws.rs.HttpMethod;

import com.minimart.model.ProductMaster;
import com.minimart.dto.ProductMasterDTO;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.GenericType;


public class ProductMasterRESTClient  extends BaseRESTClient {
	
	public ProductMasterRESTClient(String baseUrl) {
		super(baseUrl);
	}

	public int addProductMaster(ProductMaster productMaster) {

		ClientResponse response = this.processRequest("productMaster/add", HttpMethod.POST, productMaster);
		Integer id = response.getEntity(Integer.class);
		return id;
	}
	
	public void updateProductMaster(ProductMaster productMaster) {

		ClientResponse response = this.processRequest("productMaster/update", HttpMethod.PUT, productMaster);
	}
	
	public void deleteProductMaster(ProductMaster productMaster) {

		ClientResponse response = this.processRequest("productMaster/" + productMaster.getId(), HttpMethod.DELETE, null);
	}
	
	public ProductMaster getProductMaster(int id) {

		ClientResponse response = this.processRequest("productMaster/" + id , HttpMethod.GET, null);
		ProductMaster productMaster = response.getEntity(ProductMaster.class);
		return productMaster;
	}
	
	public List<ProductMaster> getAllProductMasters() {

		ClientResponse response = this.processRequest("productMaster/all", HttpMethod.GET, null);
		return response.getEntity(new GenericType<List<ProductMaster>>() { });
		 
	}
	
	public ProductMasterDTO getProductMasterDTO(int id) {

		ClientResponse response = this.processRequest("productMaster/dto/" + id , HttpMethod.GET, null);
		ProductMasterDTO productMasterDTO = response.getEntity(ProductMasterDTO.class);
		return productMasterDTO;
	}
	
	public List<ProductMasterDTO> getAllProductMasterDTOs() {

		ClientResponse response = this.processRequest("productMaster/dto/all", HttpMethod.GET, null);
		return response.getEntity(new GenericType<List<ProductMasterDTO>>() { });
		 
	}

	
	
}