package com.minimart.dto;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.minimart.annotation.DTOQueryAnnotation;
import com.minimart.annotation.POSDTOFieldAnnotation;
import com.minimart.model.Category;


@DTOQueryAnnotation( getDTOByID= "select CATEGORY1.ID, CATEGORY1.PARENT_CATEGORY_ID, CATEGORY1.NAME, CATEGORY2.name parentCategoryName from CATEGORY AS CATEGORY1, CATEGORY AS CATEGORY2 where CATEGORY1.id = ? and CATEGORY1.parent_category_id = CATEGORY2.id;",
getAllDTOs="select CATEGORY1.ID, CATEGORY1.PARENT_CATEGORY_ID, CATEGORY1.NAME, CATEGORY2.name parentCategoryName from CATEGORY AS CATEGORY1, CATEGORY AS CATEGORY2 where CATEGORY1.parent_category_id = CATEGORY2.id;")

public class CategoryDTO extends Category{

	/**
	 * 
	 */
	private static final long serialVersionUID = -3045015147394773737L;

	protected String parentCategoryName;


	/**
	 * @param id
	 * @param parentCategoryId
	 * @param name
	 * @param parentCategoryName
	 */
	public CategoryDTO(Integer id, Integer parentCategoryId, String name,
			String parentCategoryName) {
		super(id, parentCategoryId, name);
		this.parentCategoryName = parentCategoryName;
	}

	public CategoryDTO() {
		// TODO Auto-generated constructor stub
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime
				* result
				+ ((parentCategoryName == null) ? 0 : parentCategoryName
						.hashCode());
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
		if (!super.equals(obj)) {
			return false;
		}
		if (!(obj instanceof CategoryDTO)) {
			return false;
		}
		CategoryDTO other = (CategoryDTO) obj;
		if (parentCategoryName == null) {
			if (other.parentCategoryName != null) {
				return false;
			}
		} else if (!parentCategoryName.equals(other.parentCategoryName)) {
			return false;
		}
		return true;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "CategoryDTO [parentCategoryName=" + parentCategoryName
				+ ", id=" + id + ", parentCategoryId=" + parentCategoryId
				+ ", name=" + name + "]";
	}

	/**
	 * @return the parentCategoryName
	 */
	public String getParentCategoryName() {
		return parentCategoryName;
	}

	/**
	 * @param parentCategoryName the parentCategoryName to set
	 */
	public void setParentCategoryName(String parentCategoryName) {
		this.parentCategoryName = parentCategoryName;
	}

	@Override
	public void loadFromResultSet(ResultSet resultSet) throws SQLException {
		super.loadFromResultSet(resultSet);
		this.parentCategoryName = resultSet.getString("parentCategoryName");
	}

}
