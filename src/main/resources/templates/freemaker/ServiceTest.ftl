package ${serviceTestPackage};

import static org.junit.Assert.assertEquals;

import java.util.List;

import org.junit.Test;

import com.minimart.model.${className};
import com.minimart.model.POSModel;
import com.minimart.service.impl.${className}ServiceImpl;
import com.minimart.TestDataUtil;

public class ${className}ServiceTest {

	${className}Service service ;
	public ${className}ServiceTest() {
		// TODO Auto-generated constructor stub
		service = new ${className}ServiceImpl();
	}
	
	@Test
	public void test${className}CRUD() throws Exception
	{
		//Get the original list of items from db, if any.
		List<${className}> originalItems = service.getAll${classNamePlural}();
		
		//Get the list of items to be used for testing.
		List<POSModel> test${classNamePlural} = TestDataUtil.getTestData("${className}");
		if (test${classNamePlural} == null || test${classNamePlural}.size() ==0) {
			assertEquals(true, false);
		}
		
		//Start inserting all test data and test for proper insertion

		for (POSModel model : test${classNamePlural}) {
			${className} ${variableName} = (${className}) model;
			int generated${className}Id = service.add${className}(${variableName});

			//Ensure that it's inserted properly by retrieving and verifying it.
			${className} fetch${className} = service.get${className}ById(generated${className}Id);
			assertEquals(${variableName}, fetch${className});
		}
		
		//Ensure that all inserts are successful by verifying the size in db post insert.
		List<${className}> allItemsAfterInsert = service.getAll${classNamePlural}();
		assertEquals(allItemsAfterInsert.size(), test${classNamePlural}.size() + originalItems.size());
		
		for (POSModel model : test${classNamePlural}) {
			${className} ${variableName} = (${className}) model;
			service.delete${className}(${variableName}.getId());;

			${className} fetch${className}AfterDelete = service.get${className}ById(${variableName}.getId());
			assertEquals(fetch${className}AfterDelete, null);
		}		

		//Ensure that all deletes are successful by verifying the size in db post delete.
		List<${className}> allItemsAfterDelete = service.getAll${classNamePlural}();
		assertEquals(allItemsAfterDelete.size(), originalItems.size());
	}
	
	

}
