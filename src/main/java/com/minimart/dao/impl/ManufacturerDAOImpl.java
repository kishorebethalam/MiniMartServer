package com.minimart.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.minimart.model.Manufacturer;
import com.minimart.dao.ManufacturerDAO;
import com.minimart.dao.util.DAOException;
import com.minimart.dao.util.DBUtil;


public class ManufacturerDAOImpl implements ManufacturerDAO {
	
	public int addManufacturer(Manufacturer manufacturer){
		
        Object[] values = manufacturer.toObjectArray(false);

        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet generatedKeys = null;

        String query = DBUtil.getQuery("MANUFACTURER_INSERT");
        
        try {
            connection = DBUtil.getConnection();
            preparedStatement = DBUtil.prepareStatement(connection, query, true, values);
            int affectedRows = preparedStatement.executeUpdate();
            if (affectedRows == 0) {
                throw new DAOException("Creating Manufacturer failed, no rows affected.");
            }
            generatedKeys = preparedStatement.getGeneratedKeys();
            if (generatedKeys.next()) {
                manufacturer.setId(generatedKeys.getInt(1));
            } else {
                throw new DAOException("Creating user failed, no generated key obtained.");
            }
        } catch (SQLException e) {
            throw new DAOException(e);
        } finally {
            DBUtil.close(connection, preparedStatement, generatedKeys);
        }	
        return manufacturer.getId();			
	}
	
	public void updateManufacturer(Manufacturer manufacturer){
	
	    Object[] values = manufacturer.toObjectArray(true);

        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet generatedKeys = null;

        String query = DBUtil.getQuery("MANUFACTURER_UPDATE");
        
        try {
            connection = DBUtil.getConnection();
            preparedStatement = DBUtil.prepareStatement(connection, query, false, values);
            int affectedRows = preparedStatement.executeUpdate();
            if (affectedRows == 0) {
                throw new DAOException("Updating Manufacturer failed, no rows affected.");
            }
        } catch (SQLException e) {
            throw new DAOException(e);
        } finally {
            DBUtil.close(connection, preparedStatement, generatedKeys);
        }	
        
	}
	public void deleteManufacturer(int id){
	
	    Object[] values = {id};

        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet generatedKeys = null;

        String query = DBUtil.getQuery("MANUFACTURER_DELETE");
        
        try {
            connection = DBUtil.getConnection();
            preparedStatement = DBUtil.prepareStatement(connection, query, false, values);
            int affectedRows = preparedStatement.executeUpdate();
            if (affectedRows == 0) {
                throw new DAOException("Deleting Manufacturer failed, no rows affected.");
            }
        } catch (SQLException e) {
            throw new DAOException(e);
        } finally {
            DBUtil.close(connection, preparedStatement, generatedKeys);
        }		
	}
	public Manufacturer getManufacturerById(int id){
	
		Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        
        Manufacturer manufacturer = null;

        String query = DBUtil.getQuery("MANUFACTURER_GET_BY_ID");
        Object[] parameters = {id};
        try {
            connection = DBUtil.getConnection();
            preparedStatement = DBUtil.prepareStatement(connection, query, false, parameters);
            resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
            	manufacturer = new Manufacturer();
            	manufacturer.loadFromResultSet(resultSet);
            }
        } catch (SQLException e) {
            throw new DAOException(e);
        } finally {
            DBUtil.close(connection, preparedStatement, resultSet);
        }
        
        return manufacturer ;
	}
	
	public List<Manufacturer> getAllManufacturers(){
		List<Manufacturer> results  = new ArrayList<Manufacturer>(); 
		
		Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        
        String query = DBUtil.getQuery("MANUFACTURER_GET_ALL");
        
        Object[] parameters = {};
        try {
            connection = DBUtil.getConnection();
            preparedStatement = DBUtil.prepareStatement(connection, query, false, parameters);
            resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
            	Manufacturer manufacturer = new Manufacturer();
            	manufacturer.loadFromResultSet(resultSet);
            	results.add(manufacturer);
            }
        } catch (SQLException e) {
            throw new DAOException(e);
        } finally {
            DBUtil.close(connection, preparedStatement, resultSet);
        }
        
        return results ;
	}
	
	public List<Manufacturer> getManufacturersByCriteria(Object criterion){
		return null;
	}
	
	
}