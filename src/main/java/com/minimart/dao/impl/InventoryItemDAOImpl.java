package com.minimart.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.minimart.model.InventoryItem;
import com.minimart.dao.InventoryItemDAO;
import com.minimart.dao.util.DAOException;
import com.minimart.dao.util.DBUtil;


public class InventoryItemDAOImpl implements InventoryItemDAO {
	
	public int addInventoryItem(InventoryItem inventoryItem){
		
        Object[] values = inventoryItem.toObjectArray(false);

        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet generatedKeys = null;

        String query = DBUtil.getQuery("INVENTORY_ITEM_INSERT");
        
        try {
            connection = DBUtil.getConnection();
            preparedStatement = DBUtil.prepareStatement(connection, query, true, values);
            int affectedRows = preparedStatement.executeUpdate();
            if (affectedRows == 0) {
                throw new DAOException("Creating InventoryItem failed, no rows affected.");
            }
            generatedKeys = preparedStatement.getGeneratedKeys();
            if (generatedKeys.next()) {
                inventoryItem.setId(generatedKeys.getInt(1));
            } else {
                throw new DAOException("Creating user failed, no generated key obtained.");
            }
        } catch (SQLException e) {
            throw new DAOException(e);
        } finally {
            DBUtil.close(connection, preparedStatement, generatedKeys);
        }	
        return inventoryItem.getId();			
	}
	
	public void updateInventoryItem(InventoryItem inventoryItem){
	
	    Object[] values = inventoryItem.toObjectArray(true);

        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet generatedKeys = null;

        String query = DBUtil.getQuery("INVENTORY_ITEM_UPDATE");
        
        try {
            connection = DBUtil.getConnection();
            preparedStatement = DBUtil.prepareStatement(connection, query, false, values);
            int affectedRows = preparedStatement.executeUpdate();
            if (affectedRows == 0) {
                throw new DAOException("Updating InventoryItem failed, no rows affected.");
            }
        } catch (SQLException e) {
            throw new DAOException(e);
        } finally {
            DBUtil.close(connection, preparedStatement, generatedKeys);
        }	
        
	}
	public void deleteInventoryItem(int id){
	
	    Object[] values = {id};

        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet generatedKeys = null;

        String query = DBUtil.getQuery("INVENTORY_ITEM_DELETE");
        
        try {
            connection = DBUtil.getConnection();
            preparedStatement = DBUtil.prepareStatement(connection, query, false, values);
            int affectedRows = preparedStatement.executeUpdate();
            if (affectedRows == 0) {
                throw new DAOException("Deleting InventoryItem failed, no rows affected.");
            }
        } catch (SQLException e) {
            throw new DAOException(e);
        } finally {
            DBUtil.close(connection, preparedStatement, generatedKeys);
        }		
	}
	public InventoryItem getInventoryItemById(int id){
	
		Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        
        InventoryItem inventoryItem = null;

        String query = DBUtil.getQuery("INVENTORY_ITEM_GET_BY_ID");
        Object[] parameters = {id};
        try {
            connection = DBUtil.getConnection();
            preparedStatement = DBUtil.prepareStatement(connection, query, false, parameters);
            resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
            	inventoryItem = new InventoryItem();
            	inventoryItem.loadFromResultSet(resultSet);
            }
        } catch (SQLException e) {
            throw new DAOException(e);
        } finally {
            DBUtil.close(connection, preparedStatement, resultSet);
        }
        
        return inventoryItem ;
	}
	
	public List<InventoryItem> getAllInventoryItems(){
		List<InventoryItem> results  = new ArrayList<InventoryItem>(); 
		
		Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        
        String query = DBUtil.getQuery("INVENTORY_ITEM_GET_ALL");
        
        Object[] parameters = {};
        try {
            connection = DBUtil.getConnection();
            preparedStatement = DBUtil.prepareStatement(connection, query, false, parameters);
            resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
            	InventoryItem inventoryItem = new InventoryItem();
            	inventoryItem.loadFromResultSet(resultSet);
            	results.add(inventoryItem);
            }
        } catch (SQLException e) {
            throw new DAOException(e);
        } finally {
            DBUtil.close(connection, preparedStatement, resultSet);
        }
        
        return results ;
	}
	
	public List<InventoryItem> getInventoryItemsByCriteria(Object criterion){
		return null;
	}
	
	
}