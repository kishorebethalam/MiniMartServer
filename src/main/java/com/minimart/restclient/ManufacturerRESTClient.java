package com.minimart.restclient;

import java.util.List;

import javax.ws.rs.HttpMethod;

import com.minimart.model.Manufacturer;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.GenericType;


public class ManufacturerRESTClient  extends BaseRESTClient {
	
	public ManufacturerRESTClient(String baseUrl) {
		super(baseUrl);
	}

	public int addManufacturer(Manufacturer manufacturer) {

		ClientResponse response = this.processRequest("manufacturer/add", HttpMethod.POST, manufacturer);
		Integer id = response.getEntity(Integer.class);
		return id;
	}
	
	public int updateManufacturer(Manufacturer manufacturer) {

		ClientResponse response = this.processRequest("manufacturer/update", HttpMethod.PUT, manufacturer);
		Integer id = response.getEntity(Integer.class);
		return id;
	}
	
	public Manufacturer getManufacturer(int id) {

		ClientResponse response = this.processRequest("manufacturer/" + id , HttpMethod.GET, null);
		Manufacturer manufacturer = response.getEntity(Manufacturer.class);
		return manufacturer;
	}
	
	public List<Manufacturer> getAllManufacturers() {

		ClientResponse response = this.processRequest("manufacturer/all", HttpMethod.GET, null);
		return response.getEntity(new GenericType<List<Manufacturer>>() { });
		 
	}

	
	
}