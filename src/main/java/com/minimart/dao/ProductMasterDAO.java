package com.minimart.dao;

import java.util.List;
import com.minimart.model.ProductMaster;

public interface ProductMasterDAO {

	public int addProductMaster(ProductMaster productMaster);
	public void updateProductMaster(ProductMaster productMaster);
	public void deleteProductMaster(int id);
	public ProductMaster getProductMasterById(int id);
	public List<ProductMaster> getAllProductMasters();
	public List<ProductMaster> getProductMastersByCriteria(Object criterion);
}