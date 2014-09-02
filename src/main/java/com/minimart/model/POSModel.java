package com.minimart.model;

import java.sql.ResultSet;
import java.sql.SQLException;

public abstract class POSModel {

	public POSModel() {
		// TODO Auto-generated constructor stub
	}
	
	public abstract void loadFromResultSet(ResultSet resultSet) throws SQLException;
	public abstract Object[] toObjectArray(boolean includeId);

}
