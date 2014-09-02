package com.minimart.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.minimart.model.Category;
import com.minimart.dao.CategoryDAO;
import com.minimart.dao.util.DAOException;
import com.minimart.dao.util.DBUtil;


public class CategoryDAOImpl implements CategoryDAO {
	
	public int addCategory(Category category){
		
        Object[] values = category.toObjectArray(false);

        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet generatedKeys = null;

        String query = DBUtil.getQuery("CATEGORY_INSERT");
        
        try {
            connection = DBUtil.getConnection();
            preparedStatement = DBUtil.prepareStatement(connection, query, true, values);
            int affectedRows = preparedStatement.executeUpdate();
            if (affectedRows == 0) {
                throw new DAOException("Creating Category failed, no rows affected.");
            }
            generatedKeys = preparedStatement.getGeneratedKeys();
            if (generatedKeys.next()) {
                category.setId(generatedKeys.getInt(1));
            } else {
                throw new DAOException("Creating user failed, no generated key obtained.");
            }
        } catch (SQLException e) {
            throw new DAOException(e);
        } finally {
            DBUtil.close(connection, preparedStatement, generatedKeys);
        }	
        return category.getId();			
	}
	
	public void updateCategory(Category category){
	
	    Object[] values = category.toObjectArray(true);

        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet generatedKeys = null;

        String query = DBUtil.getQuery("CATEGORY_UPDATE");
        
        try {
            connection = DBUtil.getConnection();
            preparedStatement = DBUtil.prepareStatement(connection, query, false, values);
            int affectedRows = preparedStatement.executeUpdate();
            if (affectedRows == 0) {
                throw new DAOException("Updating Category failed, no rows affected.");
            }
        } catch (SQLException e) {
            throw new DAOException(e);
        } finally {
            DBUtil.close(connection, preparedStatement, generatedKeys);
        }	
        
	}
	public void deleteCategory(int id){
	
	    Object[] values = {id};

        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet generatedKeys = null;

        String query = DBUtil.getQuery("CATEGORY_DELETE");
        
        try {
            connection = DBUtil.getConnection();
            preparedStatement = DBUtil.prepareStatement(connection, query, false, values);
            int affectedRows = preparedStatement.executeUpdate();
            if (affectedRows == 0) {
                throw new DAOException("Deleting Category failed, no rows affected.");
            }
        } catch (SQLException e) {
            throw new DAOException(e);
        } finally {
            DBUtil.close(connection, preparedStatement, generatedKeys);
        }		
	}
	public Category getCategoryById(int id){
	
		Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        
        Category category = null;

        String query = DBUtil.getQuery("CATEGORY_GET_BY_ID");
        Object[] parameters = {id};
        try {
            connection = DBUtil.getConnection();
            preparedStatement = DBUtil.prepareStatement(connection, query, false, parameters);
            resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
            	category = new Category();
            	category.loadFromResultSet(resultSet);
            }
        } catch (SQLException e) {
            throw new DAOException(e);
        } finally {
            DBUtil.close(connection, preparedStatement, resultSet);
        }
        
        return category ;
	}
	
	public List<Category> getAllCategories(){
		List<Category> results  = new ArrayList<Category>(); 
		
		Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        
        String query = DBUtil.getQuery("CATEGORY_GET_ALL");
        
        Object[] parameters = {};
        try {
            connection = DBUtil.getConnection();
            preparedStatement = DBUtil.prepareStatement(connection, query, false, parameters);
            resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
            	Category category = new Category();
            	category.loadFromResultSet(resultSet);
            	results.add(category);
            }
        } catch (SQLException e) {
            throw new DAOException(e);
        } finally {
            DBUtil.close(connection, preparedStatement, resultSet);
        }
        
        return results ;
	}
	
	public List<Category> getCategoriesByCriteria(Object criterion){
		return null;
	}
	
	
}