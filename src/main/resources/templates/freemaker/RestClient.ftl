package ${restPackage};

import java.util.List;

import javax.ws.rs.HttpMethod;

import ${modelPackage}.${className};
import ${dtoPackage}.${className}DTO;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.GenericType;


public class ${className}RESTClient  extends BaseRESTClient {
	
	public ${className}RESTClient(String baseUrl) {
		super(baseUrl);
	}

	public int add${className}(${className} ${variableName}) {

		ClientResponse response = this.processRequest("${variableName}/add", HttpMethod.POST, ${variableName});
		Integer id = response.getEntity(Integer.class);
		return id;
	}
	
	public void update${className}(${className} ${variableName}) {

		ClientResponse response = this.processRequest("${variableName}/update", HttpMethod.PUT, ${variableName});
	}
	
	public void delete${className}(${className} ${variableName}) {

		ClientResponse response = this.processRequest("${variableName}/" + ${variableName}.getId(), HttpMethod.DELETE, null);
	}
	
	public ${className} get${className}(int id) {

		ClientResponse response = this.processRequest("${variableName}/" + id , HttpMethod.GET, null);
		${className} ${variableName} = response.getEntity(${className}.class);
		return ${variableName};
	}
	
	public List<${className}> getAll${className}s() {

		ClientResponse response = this.processRequest("${variableName}/all", HttpMethod.GET, null);
		return response.getEntity(new GenericType<List<${className}>>() { });
		 
	}
	
	public ${className}DTO get${className}DTO(int id) {

		ClientResponse response = this.processRequest("${variableName}/dto/" + id , HttpMethod.GET, null);
		${className}DTO ${variableName}DTO = response.getEntity(${className}DTO.class);
		return ${variableName}DTO;
	}
	
	public List<${className}DTO> getAll${className}DTOs() {

		ClientResponse response = this.processRequest("${variableName}/dto/all", HttpMethod.GET, null);
		return response.getEntity(new GenericType<List<${className}DTO>>() { });
		 
	}

	
	
}