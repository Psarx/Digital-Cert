$(document).ready(function() {
    // Function to fetch cells from the backend
    function fetchCells() {
        $.ajax({
            url: '/api/cells', // Endpoint to fetch cells from the backend
            type: 'GET',
            success: function(cells) {
                // Render cells in the table
                renderCells(cells);
            },
            error: function(error) {
                console.error('Error fetching cells:', error);
            }
        });
    }

    // Function to render cells in the table
    function renderCells(cells) {
        const cellTableBody = $('#cell-table-body');
        cellTableBody.empty(); // Clear existing table rows
        cells.forEach(function(cell) {
            // Append a new row for each cell
            const row = $('<tr>');
            row.append($('<td>').text(cell.cellId));
            row.append($('<td>').text(cell.name));
            row.append($('<td>').text(cell.cellCoordinatorId));
            row.append($('<td>').text(cell.cellCoordinatorName));
            cellTableBody.append(row);
        });
    }

    // Fetch cells when the document is ready
    fetchCells();
});
