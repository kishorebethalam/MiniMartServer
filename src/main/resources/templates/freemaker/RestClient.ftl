package ${restPackage};

import java.util.List;

import javax.ws.rs.HttpMethod;

import ${modelPackage}.${className};
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
	
	public int update${className}(${className} ${variableName}) {

		ClientResponse response = this.processRequest("${variableName}/update", HttpMethod.PUT, ${variableName});
		Integer id = response.getEntity(Integer.class);
		return id;
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

	
	
}