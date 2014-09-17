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
import com.minimart.dto.ProductMasterDTO;

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
	public int updateProductMaster(ProductMaster productMaster){
		this.productMasterDAO.updateProductMaster(productMaster);
		return productMaster.getId();
	}
	
	@Path("{id}")
	@DELETE
	public int deleteProductMaster(@PathParam("id") int id){
		this.productMasterDAO.deleteProductMaster(id);
		return id;
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
	
	@Path("dto/{id}")
	@GET
	@Produces( MediaType.APPLICATION_JSON)
	public ProductMasterDTO getProductMasterDTOById(@PathParam("id") int id){
		return this.productMasterDAO.getProductMasterDTOById(id);
	}
	
	@Path("dto/all")
	@GET
	@Produces( MediaType.APPLICATION_JSON)
	public List<ProductMasterDTO> getAllProductMasterDTOs(){
		return this.productMasterDAO.getAllProductMasterDTOs();
	}
	@Path("search")
	@POST
	@Produces( MediaType.APPLICATION_JSON)
	public List<ProductMaster> getProductMastersByCriteria(Object criterion){
		return this.productMasterDAO.getProductMastersByCriteria(criterion);
	}
}

