package com.minimart.dao.util;

import java.io.File;
import java.io.FileInputStream;
import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;

public final class DBUtil {

	private final static String userName = "root";
	private final static String password = "kbethalam";

	private static Properties Queries = new Properties();

	private final static String dbURL = "jdbc:mysql://localhost/pos?" +
	// "user="+userName+"&password="+password;
			"user=" + userName;

	// Constructors
	// -------------------------------------------------------------------------------
	static {
		try {
			Queries.load(new FileInputStream ( new File(("src/main/resources/Query.properties"))));
		} catch (Exception exp) {
			exp.printStackTrace();
		}
	}

	private DBUtil() {
		// Utility class, hide constructor.
	}

	public static Connection getConnection() {

		try {
			return DriverManager.getConnection(dbURL);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}

	public static PreparedStatement prepareStatement(Connection connection,
			String sql, boolean returnGeneratedKeys, Object... values)
			throws SQLException {
		PreparedStatement preparedStatement = connection.prepareStatement(sql,
				returnGeneratedKeys ? Statement.RETURN_GENERATED_KEYS
						: Statement.NO_GENERATED_KEYS);
		setValues(preparedStatement, values);
		return preparedStatement;
	}

	/**
	 * Set the given parameter values in the given PreparedStatement.
	 * 
	 * @param connection
	 *            The PreparedStatement to set the given parameter values in.
	 * @param values
	 *            The parameter values to be set in the created
	 *            PreparedStatement.
	 * @throws SQLException
	 *             If something fails during setting the PreparedStatement
	 *             values.
	 */
	public static void setValues(PreparedStatement preparedStatement,
			Object... values) throws SQLException {
		for (int i = 0; i < values.length; i++) {
			preparedStatement.setObject(i + 1, values[i]);
		}
	}

	/**
	 * Converts the given java.util.Date to java.sql.Date.
	 * 
	 * @param date
	 *            The java.util.Date to be converted to java.sql.Date.
	 * @return The converted java.sql.Date.
	 */
	public static Date toSqlDate(java.util.Date date) {
		return (date != null) ? new Date(date.getTime()) : null;
	}

	/**
	 * Quietly close the Connection. Any errors will be printed to the stderr.
	 * 
	 * @param connection
	 *            The Connection to be closed quietly.
	 */
	public static void close(Connection connection) {
		if (connection != null) {
			try {
				connection.close();
			} catch (SQLException e) {
				System.err.println("Closing Connection failed: "
						+ e.getMessage());
				e.printStackTrace();
			}
		}
	}

	/**
	 * Quietly close the Statement. Any errors will be printed to the stderr.
	 * 
	 * @param statement
	 *            The Statement to be closed quietly.
	 */
	public static void close(Statement statement) {
		if (statement != null) {
			try {
				statement.close();
			} catch (SQLException e) {
				System.err.println("Closing Statement failed: "
						+ e.getMessage());
				e.printStackTrace();
			}
		}
	}

	/**
	 * Quietly close the ResultSet. Any errors will be printed to the stderr.
	 * 
	 * @param resultSet
	 *            The ResultSet to be closed quietly.
	 */
	public static void close(ResultSet resultSet) {
		if (resultSet != null) {
			try {
				resultSet.close();
			} catch (SQLException e) {
				System.err.println("Closing ResultSet failed: "
						+ e.getMessage());
				e.printStackTrace();
			}
		}
	}

	/**
	 * Quietly close the Connection and Statement. Any errors will be printed to
	 * the stderr.
	 * 
	 * @param connection
	 *            The Connection to be closed quietly.
	 * @param statement
	 *            The Statement to be closed quietly.
	 */
	public static void close(Connection connection, Statement statement) {
		close(statement);
		close(connection);
	}

	/**
	 * Quietly close the Connection, Statement and ResultSet. Any errors will be
	 * printed to the stderr.
	 * 
	 * @param connection
	 *            The Connection to be closed quietly.
	 * @param statement
	 *            The Statement to be closed quietly.
	 * @param resultSet
	 *            The ResultSet to be closed quietly.
	 */
	public static void close(Connection connection, Statement statement,
			ResultSet resultSet) {
		close(resultSet);
		close(statement);
		close(connection);
	}

	
	public static String getQuery(String key){
    	return Queries.getProperty(key);
    }
    
}