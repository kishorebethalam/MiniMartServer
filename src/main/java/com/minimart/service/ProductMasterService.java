package com.minimart.service;

import java.util.List;
import com.minimart.model.ProductMaster;
import com.minimart.dto.ProductMasterDTO;

public interface ProductMasterService {

	public int addProductMaster(ProductMaster productMaster);
	public void updateProductMaster(ProductMaster productMaster);
	public void deleteProductMaster(int id);
	public ProductMaster getProductMasterById(int id);
	public List<ProductMaster> getAllProductMasters();
	public List<ProductMaster> getProductMastersByCriteria(Object criterion);
	public ProductMasterDTO getProductMasterDTOById(int id);
	public List<ProductMasterDTO> getAllProductMasterDTOs();
}