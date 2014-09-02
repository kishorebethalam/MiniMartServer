package com.minimart.service.impl;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.ext.Provider;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.Consumes;

import java.util.List;
import com.minimart.model.InventoryItem;
import com.minimart.service.InventoryItemService;
import com.minimart.dao.InventoryItemDAO;
import com.minimart.dao.impl.InventoryItemDAOImpl;

@Provider
@Path("inventoryItem")
public class InventoryItemServiceImpl implements InventoryItemService {

	protected InventoryItemDAO inventoryItemDAO ;
	public InventoryItemServiceImpl() {
		this.inventoryItemDAO = new InventoryItemDAOImpl();
	}
	
	@Path("add")
	@POST
	@Consumes( MediaType.APPLICATION_JSON)
	public int addInventoryItem(InventoryItem inventoryItem){
		return this.inventoryItemDAO.addInventoryItem(inventoryItem);
	}
	
	@Path("update")
	@PUT
	@Consumes( MediaType.APPLICATION_JSON)
	public void updateInventoryItem(InventoryItem inventoryItem){
		this.inventoryItemDAO.updateInventoryItem(inventoryItem);
	}
	
	@Path("{id}")
	@DELETE
	public void deleteInventoryItem(@PathParam("id") int id){
		this.inventoryItemDAO.deleteInventoryItem(id);
	}
	
	@Path("{id}")
	@GET
	@Produces( MediaType.APPLICATION_JSON)
	public InventoryItem getInventoryItemById(@PathParam("id") int id){
		return this.inventoryItemDAO.getInventoryItemById(id);
	}
	
	@Path("all")
	@GET
	@Produces( MediaType.APPLICATION_JSON)
	public List<InventoryItem> getAllInventoryItems(){
		return this.inventoryItemDAO.getAllInventoryItems();
	}
	
	@Path("search")
	@POST
	@Produces( MediaType.APPLICATION_JSON)
	public List<InventoryItem> getInventoryItemsByCriteria(Object criterion){
		return this.inventoryItemDAO.getInventoryItemsByCriteria(criterion);
	}
}

