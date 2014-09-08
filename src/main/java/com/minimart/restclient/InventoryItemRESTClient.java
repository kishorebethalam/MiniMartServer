package com.minimart.restclient;

import java.util.List;

import javax.ws.rs.HttpMethod;

import com.minimart.model.InventoryItem;
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
	
	public int updateInventoryItem(InventoryItem inventoryItem) {

		ClientResponse response = this.processRequest("inventoryItem/update", HttpMethod.PUT, inventoryItem);
		Integer id = response.getEntity(Integer.class);
		return id;
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

	
	
}