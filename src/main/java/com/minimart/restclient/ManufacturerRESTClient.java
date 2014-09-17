package com.minimart.restclient;

import java.util.List;

import javax.ws.rs.HttpMethod;

import com.minimart.model.Manufacturer;
import com.minimart.dto.ManufacturerDTO;
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
	
	public void updateManufacturer(Manufacturer manufacturer) {

		ClientResponse response = this.processRequest("manufacturer/update", HttpMethod.PUT, manufacturer);
	}
	
	public void deleteManufacturer(Manufacturer manufacturer) {

		ClientResponse response = this.processRequest("manufacturer/" + manufacturer.getId(), HttpMethod.DELETE, null);
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
	
	public ManufacturerDTO getManufacturerDTO(int id) {

		ClientResponse response = this.processRequest("manufacturer/dto/" + id , HttpMethod.GET, null);
		ManufacturerDTO manufacturerDTO = response.getEntity(ManufacturerDTO.class);
		return manufacturerDTO;
	}
	
	public List<ManufacturerDTO> getAllManufacturerDTOs() {

		ClientResponse response = this.processRequest("manufacturer/dto/all", HttpMethod.GET, null);
		return response.getEntity(new GenericType<List<ManufacturerDTO>>() { });
		 
	}

	
	
}