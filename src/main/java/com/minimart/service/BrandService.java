package com.minimart.service;

import java.util.List;
import com.minimart.model.Brand;
import com.minimart.dto.BrandDTO;

public interface BrandService {

	public int addBrand(Brand brand);
	public int updateBrand(Brand brand);
	public int deleteBrand(int id);
	public Brand getBrandById(int id);
	public List<Brand> getAllBrands();
	public List<Brand> getBrandsByCriteria(Object criterion);
	public BrandDTO getBrandDTOById(int id);
	public List<BrandDTO> getAllBrandDTOs();
}