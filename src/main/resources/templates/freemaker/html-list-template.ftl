   <h3>${modelClassName}Collection:</h3>
    <form class="list-group-form">
        
        <a href="/#${modelClassName?uncap_first}/create" class="btn btn-default ">Create ${modelClassName}</a>
        <table class="table striped">
            <thead>
                <tr>
                	<td>
                        <input type="checkbox" /></td>
					<#list fields as fieldName>
					<th>${fieldName}</th>
					</#list>
                </tr>
            </thead>
            <% _.each(${modelClassName?uncap_first}Collection,function(${modelClassName?uncap_first}){%>
                <tr>
                    <td>
                        <input type="checkbox" /></td>
                        
					<#list fields as fieldName>
					<td><%= ${modelClassName?uncap_first}.get('${fieldName}')%></td>
					</#list>
                    <td>
                        <a href="/#${modelClassName?uncap_first}/edit/<%= ${modelClassName?uncap_first}.get('id')%>" class="btn btn-primary">Edit</a>
                    </td>
                    <td>
                        <a href="/#${modelClassName?uncap_first}/delete/<%= ${modelClassName?uncap_first}.get('id')%>" class="btn btn-primary">Delete</a>
                    </td>
                </tr>
            <%});%>
        </table>
    </form>
