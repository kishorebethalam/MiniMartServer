package com.minimart.service;

import java.util.List;
import com.minimart.model.Product;
import com.minimart.dto.ProductDTO;

public interface ProductService {

	public int addProduct(Product product);
	public int updateProduct(Product product);
	public int deleteProduct(int id);
	public Product getProductById(int id);
	public List<Product> getAllProducts();
	public List<Product> getProductsByCriteria(Object criterion);
	public ProductDTO getProductDTOById(int id);
	public List<ProductDTO> getAllProductDTOs();
}