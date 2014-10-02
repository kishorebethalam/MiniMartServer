   <h3>${modelClassName} Details:</h3>
    <table>
	    
		<#list fields as fieldName>
		<tr>
		<td>${fieldName?upper_case}</td>
		<td>:</td>
        <td>
        	<input type="text" class="${modelClassName?lower_case}-${fieldName}" value="<%= ${modelClassName?uncap_first} ? ${modelClassName?uncap_first}.get('${fieldName}') : '' %>"/>
        </td>
        </tr>
		</#list>
    
    </table>

    <input type="button" value="Save" id="<%= ${modelClassName?uncap_first} ? 'update${modelClassName}' : 'create${modelClassName}' %>"/>
    <input type="button" value="Cancel" id="closeDetails"/>

    
