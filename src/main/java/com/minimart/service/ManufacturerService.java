package com.minimart.service;

import java.util.List;
import com.minimart.model.Manufacturer;
import com.minimart.dto.ManufacturerDTO;

public interface ManufacturerService {

	public int addManufacturer(Manufacturer manufacturer);
	public void updateManufacturer(Manufacturer manufacturer);
	public void deleteManufacturer(int id);
	public Manufacturer getManufacturerById(int id);
	public List<Manufacturer> getAllManufacturers();
	public List<Manufacturer> getManufacturersByCriteria(Object criterion);
	public ManufacturerDTO getManufacturerDTOById(int id);
	public List<ManufacturerDTO> getAllManufacturerDTOs();
}