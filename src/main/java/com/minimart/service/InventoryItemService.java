package com.minimart.service;

import java.util.List;
import com.minimart.model.InventoryItem;
import com.minimart.dto.InventoryItemDTO;

public interface InventoryItemService {

	public int addInventoryItem(InventoryItem inventoryItem);
	public int updateInventoryItem(InventoryItem inventoryItem);
	public int deleteInventoryItem(int id);
	public InventoryItem getInventoryItemById(int id);
	public List<InventoryItem> getAllInventoryItems();
	public List<InventoryItem> getInventoryItemsByCriteria(Object criterion);
	public InventoryItemDTO getInventoryItemDTOById(int id);
	public List<InventoryItemDTO> getAllInventoryItemDTOs();
}