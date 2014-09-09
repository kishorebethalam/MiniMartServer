package com.minimart.model;

// Generated Aug 12, 2014 10:36:52 PM by Hibernate Tools 3.4.0.CR1

import java.sql.ResultSet;
import java.sql.SQLException;

import javax.xml.bind.annotation.XmlRootElement;

import com.minimart.annotation.POSFieldAnnotation;
import com.minimart.annotation.POSModelAnnotation;

/**
 * ProductMaster generated by hbm2java
 */
@POSModelAnnotation(dbTableName="PRODUCT_MASTER")
@XmlRootElement
public class ProductMaster extends POSModel implements java.io.Serializable {

	

	/**
	 * 
	 */
	private static final long serialVersionUID = 3897843879939920209L;

	/**
	 * @param id
	 * @param brandId
	 * @param categoryId
	 * @param name
	 */
	public ProductMaster(Integer id, Integer brandId, Integer categoryId,
			String name) {
		super();
		this.id = id;
		this.brandId = brandId;
		this.categoryId = categoryId;
		this.name = name;
	}

	@POSFieldAnnotation(dbColumnName = "id")
	protected Integer id;

	@POSFieldAnnotation(dbColumnName = "brand_id")
	protected Integer brandId;

	@POSFieldAnnotation(dbColumnName = "category_id")
	protected Integer categoryId;

	@POSFieldAnnotation(dbColumnName = "name")
	protected String name;

	/**
	 * @return the id
	 */
	public Integer getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * @return the brandId
	 */
	public Integer getBrandId() {
		return brandId;
	}

	/**
	 * @param brandId the brandId to set
	 */
	public void setBrandId(Integer brandId) {
		this.brandId = brandId;
	}

	/**
	 * @return the categoryId
	 */
	public Integer getCategoryId() {
		return categoryId;
	}

	/**
	 * @param categoryId the categoryId to set
	 */
	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * 
	 */
	public ProductMaster() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	@Override
	public void loadFromResultSet(ResultSet resultSet) throws SQLException {
		this.id = resultSet.getInt("id");
		this.brandId = resultSet.getInt("brand_id");
		this.categoryId = resultSet.getInt("category_id");
		this.name = resultSet.getString("name");
	}

	@Override
	public Object[] toObjectArray(boolean includeId) {

		if (includeId) {
			Object[] params = { this.brandId, this.categoryId, this.name, this.id};
			return params;
		} else {
			Object[] params = { this.brandId, this.categoryId, this.name};
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
		result = prime * result + ((brandId == null) ? 0 : brandId.hashCode());
		result = prime * result
				+ ((categoryId == null) ? 0 : categoryId.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		return result;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (obj == null) {
			return false;
		}
		if (!(obj instanceof ProductMaster)) {
			return false;
		}
		ProductMaster other = (ProductMaster) obj;
		if (brandId == null) {
			if (other.brandId != null) {
				return false;
			}
		} else if (!brandId.equals(other.brandId)) {
			return false;
		}
		if (categoryId == null) {
			if (other.categoryId != null) {
				return false;
			}
		} else if (!categoryId.equals(other.categoryId)) {
			return false;
		}
		if (id == null) {
			if (other.id != null) {
				return false;
			}
		} else if (!id.equals(other.id)) {
			return false;
		}
		if (name == null) {
			if (other.name != null) {
				return false;
			}
		} else if (!name.equals(other.name)) {
			return false;
		}
		return true;
	}
	
	
}
