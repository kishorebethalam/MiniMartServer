package com.minimart;

import java.util.Map;

import javax.ws.rs.ApplicationPath;

import com.sun.jersey.api.core.ResourceConfig;

@ApplicationPath("minimart")
public class MyApplication extends ResourceConfig{

	public MyApplication() {
//        packages("com.mycompany.resources.search");
	}

	@Override
	public boolean getFeature(String arg0) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Map<String, Boolean> getFeatures() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Map<String, Object> getProperties() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Object getProperty(String arg0) {
		// TODO Auto-generated method stub
		return null;
	}
	

}
