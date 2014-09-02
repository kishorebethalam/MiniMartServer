package com.minimart.dao;

import java.util.List;
import com.minimart.model.Brand;

public interface BrandDAO {

	public int addBrand(Brand brand);
	public void updateBrand(Brand brand);
	public void deleteBrand(int id);
	public Brand getBrandById(int id);
	public List<Brand> getAllBrands();
	public List<Brand> getBrandsByCriteria(Object criterion);
}