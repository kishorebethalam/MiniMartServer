package com.minimart.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.minimart.model.Brand;
import com.minimart.dao.BrandDAO;
import com.minimart.dao.util.DAOException;
import com.minimart.dao.util.DBUtil;


public class BrandDAOImpl implements BrandDAO {
	
	public int addBrand(Brand brand){
		
        Object[] values = brand.toObjectArray(false);

        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet generatedKeys = null;

        String query = DBUtil.getQuery("BRAND_INSERT");
        
        try {
            connection = DBUtil.getConnection();
            preparedStatement = DBUtil.prepareStatement(connection, query, true, values);
            int affectedRows = preparedStatement.executeUpdate();
            if (affectedRows == 0) {
                throw new DAOException("Creating Brand failed, no rows affected.");
            }
            generatedKeys = preparedStatement.getGeneratedKeys();
            if (generatedKeys.next()) {
                brand.setId(generatedKeys.getInt(1));
            } else {
                throw new DAOException("Creating user failed, no generated key obtained.");
            }
        } catch (SQLException e) {
            throw new DAOException(e);
        } finally {
            DBUtil.close(connection, preparedStatement, generatedKeys);
        }	
        return brand.getId();			
	}
	
	public void updateBrand(Brand brand){
	
	    Object[] values = brand.toObjectArray(true);

        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet generatedKeys = null;

        String query = DBUtil.getQuery("BRAND_UPDATE");
        
        try {
            connection = DBUtil.getConnection();
            preparedStatement = DBUtil.prepareStatement(connection, query, false, values);
            int affectedRows = preparedStatement.executeUpdate();
            if (affectedRows == 0) {
                throw new DAOException("Updating Brand failed, no rows affected.");
            }
        } catch (SQLException e) {
            throw new DAOException(e);
        } finally {
            DBUtil.close(connection, preparedStatement, generatedKeys);
        }	
        
	}
	public void deleteBrand(int id){
	
	    Object[] values = {id};

        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet generatedKeys = null;

        String query = DBUtil.getQuery("BRAND_DELETE");
        
        try {
            connection = DBUtil.getConnection();
            preparedStatement = DBUtil.prepareStatement(connection, query, false, values);
            int affectedRows = preparedStatement.executeUpdate();
            if (affectedRows == 0) {
                throw new DAOException("Deleting Brand failed, no rows affected.");
            }
        } catch (SQLException e) {
            throw new DAOException(e);
        } finally {
            DBUtil.close(connection, preparedStatement, generatedKeys);
        }		
	}
	public Brand getBrandById(int id){
	
		Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        
        Brand brand = null;

        String query = DBUtil.getQuery("BRAND_GET_BY_ID");
        Object[] parameters = {id};
        try {
            connection = DBUtil.getConnection();
            preparedStatement = DBUtil.prepareStatement(connection, query, false, parameters);
            resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
            	brand = new Brand();
            	brand.loadFromResultSet(resultSet);
            }
        } catch (SQLException e) {
            throw new DAOException(e);
        } finally {
            DBUtil.close(connection, preparedStatement, resultSet);
        }
        
        return brand ;
	}
	
	public List<Brand> getAllBrands(){
		List<Brand> results  = new ArrayList<Brand>(); 
		
		Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        
        String query = DBUtil.getQuery("BRAND_GET_ALL");
        
        Object[] parameters = {};
        try {
            connection = DBUtil.getConnection();
            preparedStatement = DBUtil.prepareStatement(connection, query, false, parameters);
            resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
            	Brand brand = new Brand();
            	brand.loadFromResultSet(resultSet);
            	results.add(brand);
            }
        } catch (SQLException e) {
            throw new DAOException(e);
        } finally {
            DBUtil.close(connection, preparedStatement, resultSet);
        }
        
        return results ;
	}
	
	public List<Brand> getBrandsByCriteria(Object criterion){
		return null;
	}
	
	
}