package com.minimart.dao;

import java.util.List;
import com.minimart.model.Product;

public interface ProductDAO {

	public int addProduct(Product product);
	public void updateProduct(Product product);
	public void deleteProduct(int id);
	public Product getProductById(int id);
	public List<Product> getAllProducts();
	public List<Product> getProductsByCriteria(Object criterion);
}