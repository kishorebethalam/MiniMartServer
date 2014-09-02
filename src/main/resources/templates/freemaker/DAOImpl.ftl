package ${daoImplPackage};

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import ${modelPackage}.${className};
import ${daoPackage}.${className}DAO;
import ${daoPackage}.util.DAOException;
import ${daoPackage}.util.DBUtil;


public class ${className}DAOImpl implements ${className}DAO {
	
	public int add${className}(${className} ${variableName}){
		
        Object[] values = ${variableName}.toObjectArray(false);

        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet generatedKeys = null;

        String query = DBUtil.getQuery("${dbTableName}_INSERT");
        
        try {
            connection = DBUtil.getConnection();
            preparedStatement = DBUtil.prepareStatement(connection, query, true, values);
            int affectedRows = preparedStatement.executeUpdate();
            if (affectedRows == 0) {
                throw new DAOException("Creating ${className} failed, no rows affected.");
            }
            generatedKeys = preparedStatement.getGeneratedKeys();
            if (generatedKeys.next()) {
                ${variableName}.setId(generatedKeys.getInt(1));
            } else {
                throw new DAOException("Creating user failed, no generated key obtained.");
            }
        } catch (SQLException e) {
            throw new DAOException(e);
        } finally {
            DBUtil.close(connection, preparedStatement, generatedKeys);
        }	
        return ${variableName}.getId();			
	}
	
	public void update${className}(${className} ${variableName}){
	
	    Object[] values = ${variableName}.toObjectArray(true);

        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet generatedKeys = null;

        String query = DBUtil.getQuery("${dbTableName}_UPDATE");
        
        try {
            connection = DBUtil.getConnection();
            preparedStatement = DBUtil.prepareStatement(connection, query, false, values);
            int affectedRows = preparedStatement.executeUpdate();
            if (affectedRows == 0) {
                throw new DAOException("Updating ${className} failed, no rows affected.");
            }
        } catch (SQLException e) {
            throw new DAOException(e);
        } finally {
            DBUtil.close(connection, preparedStatement, generatedKeys);
        }	
        
	}
	public void delete${className}(int id){
	
	    Object[] values = {id};

        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet generatedKeys = null;

        String query = DBUtil.getQuery("${dbTableName}_DELETE");
        
        try {
            connection = DBUtil.getConnection();
            preparedStatement = DBUtil.prepareStatement(connection, query, false, values);
            int affectedRows = preparedStatement.executeUpdate();
            if (affectedRows == 0) {
                throw new DAOException("Deleting ${className} failed, no rows affected.");
            }
        } catch (SQLException e) {
            throw new DAOException(e);
        } finally {
            DBUtil.close(connection, preparedStatement, generatedKeys);
        }		
	}
	public ${className} get${className}ById(int id){
	
		Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        
        ${className} ${variableName} = null;

        String query = DBUtil.getQuery("${dbTableName}_GET_BY_ID");
        Object[] parameters = {id};
        try {
            connection = DBUtil.getConnection();
            preparedStatement = DBUtil.prepareStatement(connection, query, false, parameters);
            resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
            	${variableName} = new ${className}();
            	${variableName}.loadFromResultSet(resultSet);
            }
        } catch (SQLException e) {
            throw new DAOException(e);
        } finally {
            DBUtil.close(connection, preparedStatement, resultSet);
        }
        
        return ${variableName} ;
	}
	
	public List<${className}> getAll${classNamePlural}(){
		List<${className}> results  = new ArrayList<${className}>(); 
		
		Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        
        String query = DBUtil.getQuery("${dbTableName}_GET_ALL");
        
        Object[] parameters = {};
        try {
            connection = DBUtil.getConnection();
            preparedStatement = DBUtil.prepareStatement(connection, query, false, parameters);
            resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
            	${className} ${variableName} = new ${className}();
            	${variableName}.loadFromResultSet(resultSet);
            	results.add(${variableName});
            }
        } catch (SQLException e) {
            throw new DAOException(e);
        } finally {
            DBUtil.close(connection, preparedStatement, resultSet);
        }
        
        return results ;
	}
	
	public List<${className}> get${classNamePlural}ByCriteria(Object criterion){
		return null;
	}
	
	
}