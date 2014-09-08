package com.minimart.restclient;

import java.util.List;

import javax.ws.rs.HttpMethod;

import com.minimart.model.Brand;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.GenericType;


public class BrandRESTClient  extends BaseRESTClient {
	
	public BrandRESTClient(String baseUrl) {
		super(baseUrl);
	}

	public int addBrand(Brand brand) {

		ClientResponse response = this.processRequest("brand/add", HttpMethod.POST, brand);
		Integer id = response.getEntity(Integer.class);
		return id;
	}
	
	public int updateBrand(Brand brand) {

		ClientResponse response = this.processRequest("brand/update", HttpMethod.PUT, brand);
		Integer id = response.getEntity(Integer.class);
		return id;
	}
	
	public Brand getBrand(int id) {

		ClientResponse response = this.processRequest("brand/" + id , HttpMethod.GET, null);
		Brand brand = response.getEntity(Brand.class);
		return brand;
	}
	
	public List<Brand> getAllBrands() {

		ClientResponse response = this.processRequest("brand/all", HttpMethod.GET, null);
		return response.getEntity(new GenericType<List<Brand>>() { });
		 
	}

	
	
}