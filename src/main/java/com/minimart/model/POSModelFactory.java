package com.minimart.model;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.json.JSONObject;

import com.minimart.annotation.POSFieldAnnotation;

public class POSModelFactory {

	public POSModelFactory() {
		// TODO Auto-generated constructor stub
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static Object createFromJSON(JSONObject jsonObject,
			Class<? extends POSModel> modelClass) throws Exception {

		try {
			Object entity = modelClass.newInstance();
			for (Field field : getAllFields(modelClass)) {
				try {
					String jsonKey = field.getName();
					Object value = null;

					if (jsonObject.has(jsonKey)) {
						value = jsonObject.get(jsonKey);
					}

					if (value == null) {
						if (field.getType().equals(String.class)) {
							value = "";
						} else {
							value = 0;
						}
					}

					if (value != null) {
						if (field.getType().isEnum()) {
							Object enumObject = Enum.valueOf(
									(Class<Enum>) field.getType(), value
											.toString().toUpperCase());
							BeanUtils.setProperty(entity, field.getName(),
									enumObject);
						} else {

							BeanUtils.setProperty(entity, field.getName(),
									value);
						}
					}
				} catch (Exception ex) {
					ex.printStackTrace();
					throw ex;
				}
			}
			return entity;
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	public static List<Field> getAllFields(Class<?> type) {
		List<Field> fields = new ArrayList<Field>();
		for (Class<?> c = type; c != null; c = c.getSuperclass()) {
			fields.addAll(Arrays.asList(c.getDeclaredFields()));
		}
		return fields;
	}
}
