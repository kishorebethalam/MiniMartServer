package com.minimart.restclient;

import java.util.List;

import javax.ws.rs.HttpMethod;

import com.minimart.model.Product;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.GenericType;


public class ProductRESTClient  extends BaseRESTClient {
	
	public ProductRESTClient(String baseUrl) {
		super(baseUrl);
	}

	public int addProduct(Product product) {

		ClientResponse response = this.processRequest("product/add", HttpMethod.POST, product);
		Integer id = response.getEntity(Integer.class);
		return id;
	}
	
	public int updateProduct(Product product) {

		ClientResponse response = this.processRequest("product/update", HttpMethod.PUT, product);
		Integer id = response.getEntity(Integer.class);
		return id;
	}
	
	public Product getProduct(int id) {

		ClientResponse response = this.processRequest("product/" + id , HttpMethod.GET, null);
		Product product = response.getEntity(Product.class);
		return product;
	}
	
	public List<Product> getAllProducts() {

		ClientResponse response = this.processRequest("product/all", HttpMethod.GET, null);
		return response.getEntity(new GenericType<List<Product>>() { });
		 
	}

	
	
}