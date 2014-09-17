package com.minimart.dto;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;

import com.minimart.annotation.DTOQueryAnnotation;
import com.minimart.annotation.POSDTOFieldAnnotation;
import com.minimart.model.InventoryItem;

@DTOQueryAnnotation( getDTOByID= "select INVENTORY_ITEM.ID, INVENTORY_ITEM.PRODUCT_ID, INVENTORY_ITEM.TRACKING_CODE, INVENTORY_ITEM.QUANTITY, INVENTORY_ITEM.RECEIVED_DATE, INVENTORY_ITEM.EXPIRY_DATE, INVENTORY_ITEM.PROMOTIONAL_OFFER, PRODUCT_MASTER.name productName, PRODUCT.measurement_category measurementCategory, PRODUCT.measurement_quantity measurementQuantity from INVENTORY_ITEM, PRODUCT, PRODUCT_MASTER where INVENTORY_ITEM.id = ?  AND product_id = PRODUCT.id AND PRODUCT.product_master_id = product_master.id;",
getAllDTOs="select INVENTORY_ITEM.ID, INVENTORY_ITEM.PRODUCT_ID, INVENTORY_ITEM.TRACKING_CODE, INVENTORY_ITEM.QUANTITY, INVENTORY_ITEM.RECEIVED_DATE, INVENTORY_ITEM.EXPIRY_DATE, INVENTORY_ITEM.PROMOTIONAL_OFFER, PRODUCT_MASTER.name productName, PRODUCT.measurement_category measurementCategory, PRODUCT.measurement_quantity measurementQuantity from INVENTORY_ITEM, PRODUCT, PRODUCT_MASTER where product_id = PRODUCT.id AND PRODUCT.product_master_id = product_master.id;")
public class InventoryItemDTO extends InventoryItem {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1306963061003338376L;

	protected String productName;
	protected String measurementCategory;
	protected Integer measurementQuantity;

	/**
	 * @return the productName
	 */
	public String getProductName() {
		return productName;
	}

	/**
	 * @param productName
	 *            the productName to set
	 */
	public void setProductName(String productName) {
		this.productName = productName;
	}

	

	/**
	 * @return the measurementCategory
	 */
	public String getMeasurementCategory() {
		return measurementCategory;
	}

	/**
	 * @param measurementCategory the measurementCategory to set
	 */
	public void setMeasurementCategory(String measurementCategory) {
		this.measurementCategory = measurementCategory;
	}

	/**
	 * @return the measurementQuantity
	 */
	public Integer getMeasurementQuantity() {
		return measurementQuantity;
	}

	/**
	 * @param measurementQuantity the measurementQuantity to set
	 */
	public void setMeasurementQuantity(Integer measurementQuantity) {
		this.measurementQuantity = measurementQuantity;
	}

	public InventoryItemDTO() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param id
	 * @param productId
	 * @param trackingCode
	 * @param quantity
	 * @param receivedDate
	 * @param expiryDate
	 * @param promotionalOffer
	 * @param productName
	 * @param measurementCategory
	 * @param measurementQuantity
	 */
	public InventoryItemDTO(Integer id, Integer productId, String trackingCode,
			int quantity, Date receivedDate, Date expiryDate,
			String promotionalOffer, String productName,
			String measurementCategory, int measurementQuantity) {
		super(id, productId, trackingCode, quantity, receivedDate, expiryDate,
				promotionalOffer);
		this.productName = productName;
		this.measurementCategory = measurementCategory;
		this.measurementQuantity = measurementQuantity;
	}

	@Override
	public void loadFromResultSet(ResultSet resultSet) throws SQLException {
		super.loadFromResultSet(resultSet);
		this.productName = resultSet.getString("productName");
		this.measurementCategory = resultSet.getString("measurementCategory");
		this.measurementQuantity = resultSet.getInt("measurementQuantity");
	}

}
