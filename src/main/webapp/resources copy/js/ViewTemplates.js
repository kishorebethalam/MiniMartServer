<script type="text/template" id="brand-list-template">
   <h3>Following are the brand's:</h3>
    <form class="list-group-form">
        <a href="/#create" class="btn btn-default ">Create Brand</a>
        <table class="table striped">
            <thead>
                <tr>
                    <th></th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Manufacturer Id</th>
                    <th>Manufacturer Name</th>
                </tr>
            </thead>
            <% _.each(brands,function(brand){%>
                <tr>
                    <td>
                        <input type="checkbox" /></td>
                    <td><%= brand.get('id')%></td>
                    <td><%= brand.get('name')%></td>
                    <td><%= brand.get('manufacturerId')%></td>
                    <td><%= brand.get('manufacturerName')%></td>
                    <td>
                        <a href="/#edit/<%= brand.get('Id')%>" class="btn btn-primary">Edit</a></td>
                </tr>
            <%});%>
        </table>
    </form>
</script>