package com.minimart.restclient;

import java.util.List;

import javax.ws.rs.HttpMethod;

import com.minimart.model.InventoryItem;
import com.minimart.dto.InventoryItemDTO;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.GenericType;


public class InventoryItemRESTClient  extends BaseRESTClient {
	
	public InventoryItemRESTClient(String baseUrl) {
		super(baseUrl);
	}

	public int addInventoryItem(InventoryItem inventoryItem) {

		ClientResponse response = this.processRequest("inventoryItem/add", HttpMethod.POST, inventoryItem);
		Integer id = response.getEntity(Integer.class);
		return id;
	}
	
	public void updateInventoryItem(InventoryItem inventoryItem) {

		ClientResponse response = this.processRequest("inventoryItem/update", HttpMethod.PUT, inventoryItem);
	}
	
	public void deleteInventoryItem(InventoryItem inventoryItem) {

		ClientResponse response = this.processRequest("inventoryItem/" + inventoryItem.getId(), HttpMethod.DELETE, null);
	}
	
	public InventoryItem getInventoryItem(int id) {

		ClientResponse response = this.processRequest("inventoryItem/" + id , HttpMethod.GET, null);
		InventoryItem inventoryItem = response.getEntity(InventoryItem.class);
		return inventoryItem;
	}
	
	public List<InventoryItem> getAllInventoryItems() {

		ClientResponse response = this.processRequest("inventoryItem/all", HttpMethod.GET, null);
		return response.getEntity(new GenericType<List<InventoryItem>>() { });
		 
	}
	
	public InventoryItemDTO getInventoryItemDTO(int id) {

		ClientResponse response = this.processRequest("inventoryItem/dto/" + id , HttpMethod.GET, null);
		InventoryItemDTO inventoryItemDTO = response.getEntity(InventoryItemDTO.class);
		return inventoryItemDTO;
	}
	
	public List<InventoryItemDTO> getAllInventoryItemDTOs() {

		ClientResponse response = this.processRequest("inventoryItem/dto/all", HttpMethod.GET, null);
		return response.getEntity(new GenericType<List<InventoryItemDTO>>() { });
		 
	}

	
	
}