package com.minimart.dto;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.minimart.annotation.POSDTOFieldAnnotation;
import com.minimart.model.Brand;

public class BrandDTO extends Brand{

	/**
	 * 
	 */
	private static final long serialVersionUID = 3796175360704116238L;
	
	@POSDTOFieldAnnotation(referenceTable="MANUFACTURER", referenceTitleField="name", referingField="manufacturer_id")
	protected String manufacturerName;


	/**
	 * @param id
	 * @param manufacturerId
	 * @param name
	 * @param manufacturerName
	 */
	public BrandDTO(Integer id, Integer manufacturerId, String name,
			String manufacturerName) {
		super(id, manufacturerId, name);
		this.manufacturerName = manufacturerName;
	}

	public BrandDTO() {
		// TODO Auto-generated constructor stub
	}

	public String getManufacturerName() {
		return manufacturerName;
	}

	public void setManufacturerName(String manufacturerName) {
		this.manufacturerName = manufacturerName;
	}

	@Override
	public void loadFromResultSet(ResultSet resultSet) throws SQLException {
		super.loadFromResultSet(resultSet);
		this.manufacturerName = resultSet.getString("manufacturerName");
	}
}
