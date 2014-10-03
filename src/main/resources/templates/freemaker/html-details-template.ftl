   <h3>${modelClassName} Details:</h3>
    <table>
	    
		<#list fields as fieldName>
		<#if fieldName != "id">
		<tr>
		<td>${fieldName?upper_case}</td>
		<td>:</td>
        <td>
        	<input type="text" class="${modelClassName?uncap_first}-${fieldName}" value="<%= ${modelClassName?uncap_first} ? ${modelClassName?uncap_first}.get('${fieldName}') : '' %>"  />
        </td>
        </tr>
        </#if>
        
        <#if fieldName == "id">
        <input type="text" class="${modelClassName?uncap_first}-${fieldName}" value="<%= ${modelClassName?uncap_first} ? ${modelClassName?uncap_first}.get('${fieldName}') : '' %>" hidden />
        </#if>
        
		</#list>
    
    </table>

    <input type="button" value="Save" id="<%= ${modelClassName?uncap_first} ? 'update${modelClassName}' : 'create${modelClassName}' %>"/>
    <input type="button" value="Cancel" id="closeDetails"/>

    
