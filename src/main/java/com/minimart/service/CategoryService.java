package com.minimart.service;

import java.util.List;
import com.minimart.model.Category;

public interface CategoryService {

	public int addCategory(Category category);
	public void updateCategory(Category category);
	public void deleteCategory(int id);
	public Category getCategoryById(int id);
	public List<Category> getAllCategories();
	public List<Category> getCategoriesByCriteria(Object criterion);
}