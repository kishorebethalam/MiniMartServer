package com.minimart.model;

// Generated Aug 12, 2014 10:36:52 PM by Hibernate Tools 3.4.0.CR1

import java.sql.ResultSet;
import java.sql.SQLException;

import javax.xml.bind.annotation.XmlRootElement;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

import com.minimart.annotation.POSFieldAnnotation;
import com.minimart.annotation.POSModelAnnotation;

/**
 * Category generated by hbm2java
 */
@POSModelAnnotation(dbTableName="CATEGORY")
@XmlRootElement
@JsonIgnoreProperties(ignoreUnknown=true)

public class Category extends POSModel implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * @param id
	 * @param parentCategoryId
	 * @param name
	 */
	public Category(Integer id, Integer parentCategoryId, String name) {
		super();
		this.id = id;
		this.parentCategoryId = parentCategoryId;
		this.name = name;
	}

	@POSFieldAnnotation(dbColumnName = "id")
	protected Integer id;

	@POSFieldAnnotation(dbColumnName = "parent_category_id")
	protected Integer parentCategoryId;
	
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
	 * @return the parentCategoryId
	 */
	public Integer getParentCategoryId() {
		return parentCategoryId;
	}

	/**
	 * @param parentCategoryId the parentCategoryId to set
	 */
	public void setParentCategoryId(Integer parentCategoryId) {
		this.parentCategoryId = parentCategoryId;
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
	public Category() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public void loadFromResultSet(ResultSet resultSet) throws SQLException {
		this.id = resultSet.getInt("id");
		this.parentCategoryId = resultSet.getInt("parent_category_id");
		this.name = resultSet.getString("name");
	}

	@Override
	public Object[] toObjectArray(boolean includeId) {

		if (includeId) {
			Object[] params = { this.parentCategoryId, this.name, this.id};
			return params;
		} else {
			Object[] params = { this.parentCategoryId, this.name};
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
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime
				* result
				+ ((parentCategoryId == null) ? 0 : parentCategoryId.hashCode());
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
		if (!(obj instanceof Category)) {
			return false;
		}
		Category other = (Category) obj;
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
		if (parentCategoryId == null) {
			if (other.parentCategoryId != null) {
				return false;
			}
		} else if (!parentCategoryId.equals(other.parentCategoryId)) {
			return false;
		}
		return true;
	}

	@Override
	public final boolean verifyRequiredFields() {
		if (this.name != null && this.name.trim().length() > 0 
				&& this.parentCategoryId != 0){
			return true;
		}
		return false;
	}
}
