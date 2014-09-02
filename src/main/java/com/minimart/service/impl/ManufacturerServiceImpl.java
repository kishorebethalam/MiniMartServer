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
import com.minimart.model.Manufacturer;
import com.minimart.service.ManufacturerService;
import com.minimart.dao.ManufacturerDAO;
import com.minimart.dao.impl.ManufacturerDAOImpl;

@Provider
@Path("manufacturer")
public class ManufacturerServiceImpl implements ManufacturerService {

	protected ManufacturerDAO manufacturerDAO ;
	public ManufacturerServiceImpl() {
		this.manufacturerDAO = new ManufacturerDAOImpl();
	}
	
	@Path("add")
	@POST
	@Consumes( MediaType.APPLICATION_JSON)
	public int addManufacturer(Manufacturer manufacturer){
		return this.manufacturerDAO.addManufacturer(manufacturer);
	}
	
	@Path("update")
	@PUT
	@Consumes( MediaType.APPLICATION_JSON)
	public void updateManufacturer(Manufacturer manufacturer){
		this.manufacturerDAO.updateManufacturer(manufacturer);
	}
	
	@Path("{id}")
	@DELETE
	public void deleteManufacturer(@PathParam("id") int id){
		this.manufacturerDAO.deleteManufacturer(id);
	}
	
	@Path("{id}")
	@GET
	@Produces( MediaType.APPLICATION_JSON)
	public Manufacturer getManufacturerById(@PathParam("id") int id){
		return this.manufacturerDAO.getManufacturerById(id);
	}
	
	@Path("all")
	@GET
	@Produces( MediaType.APPLICATION_JSON)
	public List<Manufacturer> getAllManufacturers(){
		return this.manufacturerDAO.getAllManufacturers();
	}
	
	@Path("search")
	@POST
	@Produces( MediaType.APPLICATION_JSON)
	public List<Manufacturer> getManufacturersByCriteria(Object criterion){
		return this.manufacturerDAO.getManufacturersByCriteria(criterion);
	}
}

