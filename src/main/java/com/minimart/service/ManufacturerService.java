package com.minimart.service;

import java.util.List;
import com.minimart.model.Manufacturer;

public interface ManufacturerService {

	public int addManufacturer(Manufacturer manufacturer);
	public void updateManufacturer(Manufacturer manufacturer);
	public void deleteManufacturer(int id);
	public Manufacturer getManufacturerById(int id);
	public List<Manufacturer> getAllManufacturers();
	public List<Manufacturer> getManufacturersByCriteria(Object criterion);
}