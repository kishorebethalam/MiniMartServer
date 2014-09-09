package com.minimart.dto;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.minimart.annotation.POSDTOFieldAnnotation;
import com.minimart.model.Product;

public class ProductDTO extends Product{

	/**
	 * 
	 */
	private static final long serialVersionUID = -4045105043475310316L;
	
	@POSDTOFieldAnnotation(referenceTable="PRODUCT_MASTER", referenceTitleField="name", referingField="product_master_id")
	protected String productMasterName;

	
	/**
	 * @param id
	 * @param productMasterId
	 * @param measurementCategory
	 * @param measurementQuantity
	 * @param mrp
	 * @param sellPrice
	 * @param buyPrice
	 * @param reorderVolume
	 * @param reorderFrequency
	 * @param productMasterName
	 */
	public ProductDTO(Integer id, Integer productMasterId,
			String measurementCategory, int measurementQuantity, float mrp,
			float sellPrice, float buyPrice, int reorderVolume,
			String reorderFrequency, String productMasterName) {
		super(id, productMasterId, measurementCategory, measurementQuantity,
				mrp, sellPrice, buyPrice, reorderVolume, reorderFrequency);
		this.productMasterName = productMasterName;
	}


	public ProductDTO() {
		// TODO Auto-generated constructor stub
	}


	/**
	 * @return the productMasterName
	 */
	public String getProductMasterName() {
		return productMasterName;
	}


	/**
	 * @param productMasterName the productMasterName to set
	 */
	public void setProductMasterName(String productMasterName) {
		this.productMasterName = productMasterName;
	}


	@Override
	public void loadFromResultSet(ResultSet resultSet) throws SQLException {
		super.loadFromResultSet(resultSet);
		this.productMasterName = resultSet.getString("productMasterName");
	}

}
