package com.minimart.dao;

import java.util.List;
import com.minimart.model.Brand;
import com.minimart.dto.BrandDTO;

public interface BrandDAO {

	public int addBrand(Brand brand);
	public void updateBrand(Brand brand);
	public void deleteBrand(int id);
	public Brand getBrandById(int id);
	public List<Brand> getAllBrands();
	public List<Brand> getBrandsByCriteria(Object criterion);
	public BrandDTO getBrandDTOById(int id);
	public List<BrandDTO> getAllBrandDTOs();
}