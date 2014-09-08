package com.minimart.restclient;

import java.util.List;

import javax.ws.rs.HttpMethod;

import com.minimart.model.Brand;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.GenericType;
import com.sun.jersey.api.client.WebResource;
import com.sun.jersey.api.client.config.ClientConfig;
import com.sun.jersey.api.client.config.DefaultClientConfig;
import com.sun.jersey.api.json.JSONConfiguration;

public class SampleRestClient extends BaseRESTClient {

	public SampleRestClient(String baseUrl) {
		super(baseUrl);
	}

	public int addBrand(Brand brand) {

		ClientResponse response = this.processRequest("brand/add", HttpMethod.POST, brand);
		Integer id = response.getEntity(Integer.class);
		return id;
	}
	
	public int updateBrand(Brand brand) {

		ClientResponse response = this.processRequest("brand/update", HttpMethod.PUT, brand);
		Integer id = response.getEntity(Integer.class);
		return id;
	}
	
	public Brand getBrand(int id) {

		ClientResponse response = this.processRequest("brand/" + id , HttpMethod.GET, null);
		Brand brand = response.getEntity(Brand.class);
		return brand;
	}
	
	public List<Brand> getAllBrands() {

		ClientResponse response = this.processRequest("brand/all", HttpMethod.GET, null);
		return response.getEntity(new GenericType<List<Brand>>() { });
		 
	}

	public static void testMethod() {

		Brand brand = new Brand(101, 1, "Rest Brand1");

		ClientConfig clientConfig = new DefaultClientConfig();
		clientConfig.getFeatures().put(JSONConfiguration.FEATURE_POJO_MAPPING,
				Boolean.TRUE);
		Client client = Client.create(clientConfig);
		WebResource webResource = client
				.resource("http://localhost:8080/brand/add");
		ClientResponse response = webResource.accept("application/json")
				.type("application/json").post(ClientResponse.class, brand);
		if (response.getStatus() != 200) {
			throw new RuntimeException("Failed : HTTP error code : "
					+ response.getStatus());
		}

		String output = response.getEntity(String.class);
		System.out.println("Server response .... \n");
		System.out.println(output);

	}

	public static void main(String[] args) {
		// testMethod();
		SampleRestClient client = new SampleRestClient("http://localhost:8080");

		List<Brand> brands = client.getAllBrands();
		System.out.println("No of brands:" + brands.size());

		for (Brand brand : brands){
			System.out.println(brand.toString());
		}
	}
}
