package com.minimart.service.impl;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.ext.Provider;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.Consumes;

import java.util.List;
import com.minimart.model.ProductMaster;
import com.minimart.service.ProductMasterService;
import com.minimart.dao.ProductMasterDAO;
import com.minimart.dao.impl.ProductMasterDAOImpl;

@Provider
@Path("productMaster")
public class ProductMasterServiceImpl implements ProductMasterService {

	protected ProductMasterDAO productMasterDAO ;
	public ProductMasterServiceImpl() {
		this.productMasterDAO = new ProductMasterDAOImpl();
	}
	
	@Path("add")
	@POST
	@Consumes( MediaType.APPLICATION_JSON)
	public int addProductMaster(ProductMaster productMaster){
		return this.productMasterDAO.addProductMaster(productMaster);
	}
	
	@Path("update")
	@PUT
	@Consumes( MediaType.APPLICATION_JSON)
	public void updateProductMaster(ProductMaster productMaster){
		this.productMasterDAO.updateProductMaster(productMaster);
	}
	
	@Path("{id}")
	@DELETE
	public void deleteProductMaster(@PathParam("id") int id){
		this.productMasterDAO.deleteProductMaster(id);
	}
	
	@Path("{id}")
	@GET
	@Produces( MediaType.APPLICATION_JSON)
	public ProductMaster getProductMasterById(@PathParam("id") int id){
		return this.productMasterDAO.getProductMasterById(id);
	}
	
	@Path("all")
	@GET
	@Produces( MediaType.APPLICATION_JSON)
	public List<ProductMaster> getAllProductMasters(){
		return this.productMasterDAO.getAllProductMasters();
	}
	
	@Path("search")
	@POST
	@Produces( MediaType.APPLICATION_JSON)
	public List<ProductMaster> getProductMastersByCriteria(Object criterion){
		return this.productMasterDAO.getProductMastersByCriteria(criterion);
	}
}

