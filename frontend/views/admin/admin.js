
$(document).ready(function() {
    // Function to fetch existing cells and populate the select element
    function fetchCellsAndPopulateSelect() {
        $.get("http://localhost:3000/api/cells", function(cells) {
            // Clear the existing options in the select element
            $("#cell-id-select").empty();
            
            // Iterate over each cell and append an option to the select element
            cells.forEach(function(cell) {
                $("#cell-id-select").append(`<option value="${cell.cellId}">${cell.name}</option>`);
            });
        });
    }

    // Call the fetchCellsAndPopulateSelect function when the page loads
    fetchCellsAndPopulateSelect();
    // Fetch existing cells from the backend and populate the table
    function fetchCells() {
        $.get("http://localhost:3000/api/cells", function(cells) {
            // Clear the existing table rows
            $("#cell-table-body").empty();
            
            // Iterate over each cell and append a new row to the table
            cells.forEach(function(cell) {
                // Create a new row
                var row = $("<tr>");
                
                // Append cell ID and name to the row
                row.append($("<td>").text(cell.cellId));
                row.append($("<td>").text(cell.name));
                
                // Append the row to the table body
                $("#cell-table-body").append(row);
            });
        });
    }

    // Call the fetchCells function to populate the table when the page loads
    fetchCells();


    // Function to handle form submission for adding a new cell
    $('#add-cell-form').submit(function(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        const cellId = $('#cell-id').val(); // Get the value of cell ID input field
        const cellName = $('#cell-name').val(); // Get the value of cell name input field
        
        // Create a data object with the cell details
        const data = {
            cellId: cellId,
            name: cellName
        };

        // Send a POST request to the backend API endpoint to add the cell
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/api/cells',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function(response) {
                // Handle the success response here, such as displaying a success message
                console.log('Cell added successfully:', response);
                // You can also update the UI to display the newly added cell
                // After adding the cell, fetch updated cells and repopulate the select element
                fetchCells();
            },
            error: function(xhr, status, error) {
                // Handle any errors that occur during the request
                console.error('Error adding cell:', error);
                // You can display an error message to the user if needed
            }
        });
    });

    // Function to handle form submission for adding a new cell coordinator
    // Function to handle form submission for adding a new cell coordinator
    $('#add-cell-coordinator-form').submit(function(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        const cellName = $('#cell-id-select option:selected').text(); // Get the text of the selected option
        const coordinatorId = $('#coordinator-id').val(); // Get the value of coordinator ID input field
        const coordinatorName = $('#coordinator-name').val(); // Get the value of coordinator name input field
        
        // Create a data object with the cell coordinator details
        const data = {
            cellName: cellName,
            coordinatorId: coordinatorId,
            coordinatorName: coordinatorName
        };
    
        // Send a POST request to the backend API endpoint to add the cell coordinator
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/api/cell-coordinators',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function(response) {
                // Handle the success response here, such as displaying a success message
                console.log('Cell coordinator added successfully:', response);
                // You can also update the UI to display the newly added cell coordinator
            },
            error: function(xhr, status, error) {
                // Handle any errors that occur during the request
                console.error('Error adding cell coordinator:', error);
                // You can display an error message to the user if needed
            }
        });
    });
});
