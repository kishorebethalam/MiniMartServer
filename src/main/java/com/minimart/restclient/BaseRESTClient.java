package com.minimart.restclient;

import javax.ws.rs.HttpMethod;

import com.google.common.base.Joiner;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import com.sun.jersey.api.client.config.ClientConfig;
import com.sun.jersey.api.client.config.DefaultClientConfig;
import com.sun.jersey.api.json.JSONConfiguration;

public class BaseRESTClient {

	protected String baseUrl;
	protected ClientConfig clientConfig;

	public BaseRESTClient(String baseUrl) {
		this.baseUrl = baseUrl;
		clientConfig = new DefaultClientConfig();
	}

	public String getBaseUrl() {
		return baseUrl;
	}

	public void setBaseUrl(String baseUrl) {
		this.baseUrl = baseUrl;
	}

	public ClientResponse processRequest(String relativeUrl, String method, Object param) {

		ClientConfig clientConfig = new DefaultClientConfig();
        clientConfig.getFeatures().put(
                JSONConfiguration.FEATURE_POJO_MAPPING, Boolean.TRUE);
        Client client = Client.create(clientConfig);
		
        String fullUrl =  this.getBaseUrl()  + "/" + relativeUrl;
	    WebResource webResource = client.resource(fullUrl);
	    
	    ClientResponse response = null;
	    if (method.equals(HttpMethod.POST)  ){
	    	response = webResource.accept("application/json")
					.type("application/json").post(ClientResponse.class, param);
	    }
	    else if (method.equals(HttpMethod.PUT)){
	    	response = webResource.accept("application/json")
					.type("application/json").put(ClientResponse.class, param);
	    }
	    else if (method.equals(HttpMethod.GET)){
	    	response = webResource.accept("application/json")
					.type("application/json").get(ClientResponse.class);
	    }
	    else if (method.equals(HttpMethod.DELETE)){
	    	response = webResource.accept("application/json")
					.type("application/json").delete(ClientResponse.class);
	    }
	    if (!(response.getStatus() == 200 || response.getStatus() == 204)) {
			throw new RuntimeException("Failed : HTTP error code : "
					+ response.getStatus());
		}
		return response;
	}

}
