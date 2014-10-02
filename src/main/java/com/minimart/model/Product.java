package com.minimart.model;

// Generated Aug 12, 2014 10:36:52 PM by Hibernate Tools 3.4.0.CR1

import java.sql.ResultSet;
import java.sql.SQLException;

import javax.xml.bind.annotation.XmlRootElement;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

import com.minimart.annotation.POSFieldAnnotation;
import com.minimart.annotation.POSModelAnnotation;

/**
 * Product generated by hbm2java
 */
@POSModelAnnotation(dbTableName = "PRODUCT")
@XmlRootElement
@JsonIgnoreProperties(ignoreUnknown=true)

public class Product extends POSModel implements java.io.Serializable {



	/**
	 * 
	 */
	private static final long serialVersionUID = 6585060348438408397L;

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
	 */
	public Product(Integer id, Integer productMasterId,
			String measurementCategory, int measurementQuantity, float mrp,
			float sellPrice, float buyPrice, int reorderVolume,
			String reorderFrequency) {
		super();
		this.id = id;
		this.productMasterId = productMasterId;
		this.measurementCategory = measurementCategory;
		this.measurementQuantity = measurementQuantity;
		this.mrp = mrp;
		this.sellPrice = sellPrice;
		this.buyPrice = buyPrice;
		this.reorderVolume = reorderVolume;
		this.reorderFrequency = reorderFrequency;
	}

	@POSFieldAnnotation(dbColumnName = "id")
	protected Integer id;

	@POSFieldAnnotation(dbColumnName = "product_master_id")
	protected Integer productMasterId;

	@POSFieldAnnotation(dbColumnName = "measurement_category")
	protected String measurementCategory;

	@POSFieldAnnotation(dbColumnName = "measurement_quantity")
	protected int measurementQuantity;

	@POSFieldAnnotation(dbColumnName = "mrp")
	protected float mrp;

	@POSFieldAnnotation(dbColumnName = "sell_price")
	protected float sellPrice;

	@POSFieldAnnotation(dbColumnName = "buy_price")
	protected float buyPrice;

	@POSFieldAnnotation(dbColumnName = "reorder_volume")
	protected int reorderVolume;

	@POSFieldAnnotation(dbColumnName = "reorder_frequency")
	protected String reorderFrequency;

	/**
	 * @return the id
	 */
	public Integer getId() {
		return id;
	}

	/**
	 * @param id
	 *            the id to set
	 */
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * @return the productMasterId
	 */
	public Integer getProductMasterId() {
		return productMasterId;
	}

	/**
	 * @param productMasterId
	 *            the productMasterId to set
	 */
	public void setProductMasterId(Integer productMasterId) {
		this.productMasterId = productMasterId;
	}

	/**
	 * @return the measurementCategory
	 */
	public String getMeasurementCategory() {
		return measurementCategory;
	}

	/**
	 * @param measurementCategory
	 *            the measurementCategory to set
	 */
	public void setMeasurementCategory(String measurementCategory) {
		this.measurementCategory = measurementCategory;
	}

	/**
	 * @return the measurementQuantity
	 */
	public int getMeasurementQuantity() {
		return measurementQuantity;
	}

	/**
	 * @param measurementQuantity
	 *            the measurementQuantity to set
	 */
	public void setMeasurementQuantity(int measurementQuantity) {
		this.measurementQuantity = measurementQuantity;
	}

	/**
	 * @return the mrp
	 */
	public float getMrp() {
		return mrp;
	}

	/**
	 * @param mrp
	 *            the mrp to set
	 */
	public void setMrp(float mrp) {
		this.mrp = mrp;
	}

	

	/**
	 * @return the sellPrice
	 */
	public float getSellPrice() {
		return sellPrice;
	}

	/**
	 * @param sellPrice the sellPrice to set
	 */
	public void setSellPrice(float sellPrice) {
		this.sellPrice = sellPrice;
	}

	/**
	 * @return the buyPrice
	 */
	public float getBuyPrice() {
		return buyPrice;
	}

	/**
	 * @param buyPrice the buyPrice to set
	 */
	public void setBuyPrice(float buyPrice) {
		this.buyPrice = buyPrice;
	}

	/**
	 * @return the reorderVolume
	 */
	public int getReorderVolume() {
		return reorderVolume;
	}

	/**
	 * @param reorderVolume
	 *            the reorderVolume to set
	 */
	public void setReorderVolume(int reorderVolume) {
		this.reorderVolume = reorderVolume;
	}

	/**
	 * @return the reorderFrequency
	 */
	public String getReorderFrequency() {
		return reorderFrequency;
	}

	/**
	 * @param reorderFrequency
	 *            the reorderFrequency to set
	 */
	public void setReorderFrequency(String reorderFrequency) {
		this.reorderFrequency = reorderFrequency;
	}

	/**
	 * 
	 */
	public Product() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public void loadFromResultSet(ResultSet resultSet) throws SQLException {
		this.id = resultSet.getInt("id");
		this.productMasterId = resultSet.getInt("product_master_id");
		this.measurementCategory= resultSet.getString("measurement_category"); 
		this.measurementQuantity = resultSet.getInt("measurement_quantity");
		this.mrp = resultSet.getFloat("mrp");
		this.sellPrice = resultSet.getFloat("sell_price");
		this.buyPrice = resultSet.getFloat("buy_price");
		this.reorderVolume = resultSet.getInt("reorder_volume");
		this.reorderFrequency = resultSet.getString("reorder_frequency");
	}

	@Override
	public Object[] toObjectArray(boolean includeId) {

		if (includeId) {
			Object[] params = { this.productMasterId,
					this.measurementCategory, this.measurementQuantity,
					this.mrp, this.sellPrice, this.buyPrice,
					this.reorderVolume, this.reorderFrequency, this.id };
			return params;
		} else {
			Object[] params = { this.productMasterId, this.measurementCategory,
					this.measurementQuantity, this.mrp, this.sellPrice,
					this.buyPrice, this.reorderVolume, this.reorderFrequency };
			return params;
		}
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + Float.floatToIntBits(buyPrice);
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime
				* result
				+ ((measurementCategory == null) ? 0 : measurementCategory
						.hashCode());
		result = prime * result + measurementQuantity;
		result = prime * result + Float.floatToIntBits(mrp);
		result = prime * result
				+ ((productMasterId == null) ? 0 : productMasterId.hashCode());
		result = prime
				* result
				+ ((reorderFrequency == null) ? 0 : reorderFrequency.hashCode());
		result = prime * result + reorderVolume;
		result = prime * result + Float.floatToIntBits(sellPrice);
		return result;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object obj) {
		System.out.println("Comparing " + this.toString() + " against " + ((Product)obj).toString());
		if (this == obj) {
			return true;
		}
		if (obj == null) {
			return false;
		}
		if (!(obj instanceof Product)) {
			return false;
		}
		Product other = (Product) obj;
		if (Float.floatToIntBits(buyPrice) != Float
				.floatToIntBits(other.buyPrice)) {
			return false;
		}
		if (id == null) {
			if (other.id != null) {
				return false;
			}
		} else if (!id.equals(other.id)) {
			return false;
		}
		if (measurementCategory == null) {
			if (other.measurementCategory != null) {
				return false;
			}
		} else if (!measurementCategory.equals(other.measurementCategory)) {
			return false;
		}
		if (measurementQuantity != other.measurementQuantity) {
			return false;
		}
		if (Float.floatToIntBits(mrp) != Float.floatToIntBits(other.mrp)) {
			return false;
		}
		if (productMasterId == null) {
			if (other.productMasterId != null) {
				return false;
			}
		} else if (!productMasterId.equals(other.productMasterId)) {
			return false;
		}
		if (reorderFrequency == null) {
			if (other.reorderFrequency != null) {
				return false;
			}
		} else if (!reorderFrequency.equals(other.reorderFrequency)) {
			return false;
		}
		if (reorderVolume != other.reorderVolume) {
			return false;
		}
		if (Float.floatToIntBits(sellPrice) != Float
				.floatToIntBits(other.sellPrice)) {
			return false;
		}
		return true;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "Product [id=" + id + ", productMasterId=" + productMasterId
				+ ", measurementCategory=" + measurementCategory
				+ ", measurementQuantity=" + measurementQuantity + ", mrp="
				+ mrp + ", sellPrice=" + sellPrice + ", buyPrice=" + buyPrice
				+ ", reorderVolume=" + reorderVolume + ", reorderFrequency="
				+ reorderFrequency + "]";
	}
	
	@Override
	public final boolean verifyRequiredFields() {
		if (this.measurementCategory != null && this.measurementCategory.trim().length() > 0
				&& this.reorderFrequency != null && this.reorderFrequency.trim().length() > 0
				&& this.productMasterId != 0 
				&& this.measurementQuantity != 0
				&& this.mrp != 0
				&& this.buyPrice != 0
				&& this.sellPrice != 0
				&& this.reorderVolume != 0
				){
			return true;
		}
		return false;
	}
	
}
