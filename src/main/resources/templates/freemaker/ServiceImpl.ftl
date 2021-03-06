package ${serviceImplPackage};

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
import ${modelPackage}.${className};
import ${servicePackage}.${className}Service;
import ${daoPackage}.${className}DAO;
import ${daoImplPackage}.${className}DAOImpl;
import ${dtoPackage}.${className}DTO;

@Path("${variableName}")
public class ${className}ServiceImpl implements ${className}Service {

	protected ${className}DAO ${variableName}DAO ;
	public ${className}ServiceImpl() {
		this.${variableName}DAO = new ${className}DAOImpl();
	}
	
	@Path("add")
	@POST
	@Consumes( MediaType.APPLICATION_JSON)
	public int add${className}(${className} ${variableName}){
		return this.${variableName}DAO.add${className}(${variableName});
	}
	
	@Path("update")
	@PUT
	@Consumes( MediaType.APPLICATION_JSON)
	public int update${className}(${className} ${variableName}){
		this.${variableName}DAO.update${className}(${variableName});
		return ${variableName}.getId();
	}
	
	@Path("{id}")
	@DELETE
	public int delete${className}(@PathParam("id") int id){
		this.${variableName}DAO.delete${className}(id);
		return id;
	}
	
	@Path("{id}")
	@GET
	@Produces( MediaType.APPLICATION_JSON)
	public ${className} get${className}ById(@PathParam("id") int id){
		return this.${variableName}DAO.get${className}ById(id);
	}
	
	@Path("all")
	@GET
	@Produces( MediaType.APPLICATION_JSON)
	public List<${className}> getAll${classNamePlural}(){
		return this.${variableName}DAO.getAll${classNamePlural}();
	}
	
	@Path("dto/{id}")
	@GET
	@Produces( MediaType.APPLICATION_JSON)
	public ${className}DTO get${className}DTOById(@PathParam("id") int id){
		return this.${variableName}DAO.get${className}DTOById(id);
	}
	
	@Path("dto/all")
	@GET
	@Produces( MediaType.APPLICATION_JSON)
	public List<${className}DTO> getAll${className}DTOs(){
		return this.${variableName}DAO.getAll${className}DTOs();
	}
	@Path("search")
	@POST
	@Produces( MediaType.APPLICATION_JSON)
	public List<${className}> get${classNamePlural}ByCriteria(Object criterion){
		return this.${variableName}DAO.get${classNamePlural}ByCriteria(criterion);
	}
}

