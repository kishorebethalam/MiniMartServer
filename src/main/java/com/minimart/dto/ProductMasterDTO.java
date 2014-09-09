package com.minimart.dto;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.minimart.annotation.POSDTOFieldAnnotation;
import com.minimart.model.ProductMaster;

public class ProductMasterDTO extends ProductMaster{

	/**
	 * 
	 */
	private static final long serialVersionUID = 7065053827738062125L;

	@POSDTOFieldAnnotation(referenceTable="BRAND", referenceTitleField="name", referingField="brand_id")
	protected String brandName;

	@POSDTOFieldAnnotation(referenceTable="CATEGORY", referenceTitleField="name", referingField="category_id")
	protected String categoryName;

	/**
	 * @return the brandName
	 */
	public String getBrandName() {
		return brandName;
	}

	/**
	 * @param brandName the brandName to set
	 */
	public void setBrandName(String brandName) {
		this.brandName = brandName;
	}

	/**
	 * @return the categoryName
	 */
	public String getCategoryName() {
		return categoryName;
	}

	/**
	 * @param categoryName the categoryName to set
	 */
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	/**
	 * @param id
	 * @param brandId
	 * @param categoryId
	 * @param name
	 * @param brandName
	 * @param categoryName
	 */
	public ProductMasterDTO(Integer id, Integer brandId, Integer categoryId,
			String name, String brandName, String categoryName) {
		super(id, brandId, categoryId, name);
		this.brandName = brandName;
		this.categoryName = categoryName;
	}

	public ProductMasterDTO() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public void loadFromResultSet(ResultSet resultSet) throws SQLException {
		super.loadFromResultSet(resultSet);
		this.brandName = resultSet.getString("brandName");
		this.categoryName = resultSet.getString("categoryName");
	}
}
