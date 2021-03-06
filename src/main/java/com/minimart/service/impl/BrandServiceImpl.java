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
import com.minimart.model.Brand;
import com.minimart.service.BrandService;
import com.minimart.dao.BrandDAO;
import com.minimart.dao.impl.BrandDAOImpl;
import com.minimart.dto.BrandDTO;

@Path("brand")
public class BrandServiceImpl implements BrandService {

	protected BrandDAO brandDAO ;
	public BrandServiceImpl() {
		this.brandDAO = new BrandDAOImpl();
	}
	
	@Path("add")
	@POST
	@Consumes( MediaType.APPLICATION_JSON)
	public int addBrand(Brand brand){
		return this.brandDAO.addBrand(brand);
	}
	
	@Path("update")
	@PUT
	@Consumes( MediaType.APPLICATION_JSON)
	public int updateBrand(Brand brand){
		this.brandDAO.updateBrand(brand);
		return brand.getId();
	}
	
	@Path("{id}")
	@DELETE
	public int deleteBrand(@PathParam("id") int id){
		this.brandDAO.deleteBrand(id);
		return id;
	}
	
	@Path("{id}")
	@GET
	@Produces( MediaType.APPLICATION_JSON)
	public Brand getBrandById(@PathParam("id") int id){
		return this.brandDAO.getBrandById(id);
	}
	
	@Path("all")
	@GET
	@Produces( MediaType.APPLICATION_JSON)
	public List<Brand> getAllBrands(){
		return this.brandDAO.getAllBrands();
	}
	
	@Path("dto/{id}")
	@GET
	@Produces( MediaType.APPLICATION_JSON)
	public BrandDTO getBrandDTOById(@PathParam("id") int id){
		return this.brandDAO.getBrandDTOById(id);
	}
	
	@Path("dto/all")
	@GET
	@Produces( MediaType.APPLICATION_JSON)
	public List<BrandDTO> getAllBrandDTOs(){
		return this.brandDAO.getAllBrandDTOs();
	}
	@Path("search")
	@POST
	@Produces( MediaType.APPLICATION_JSON)
	public List<Brand> getBrandsByCriteria(Object criterion){
		return this.brandDAO.getBrandsByCriteria(criterion);
	}
}

