let items = []; // Array to hold items

// Fetch items from the backend API
async function fetchItems() {
    try {
        const response = await fetch('http://localhost:8080/api/v1/item'); // Adjust the URL as needed
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        items = await response.json(); // Parse the JSON response
        renderItems(); // Render the items in the table
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}

// Call fetchItems when the page loads
document.addEventListener('DOMContentLoaded', fetchItems);

document.getElementById('itemForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get values from the form inputs
    const itemName = document.getElementById('itemName').value;
    const itemWeight = parseFloat(document.getElementById('itemWeight').value);
    const code = document.getElementById('code').value;

    // Create a new item object
    const newItem = {
        name: itemName,
        weight: itemWeight,
        code: code
    };

    // Send the new item to the backend
    try {
        const response = await fetch('http://localhost:8080/api/v1/item/create-item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newItem) // Convert the item object to JSON
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const createdItem = await response.json(); // Get the created item from the response
        items.push(createdItem); // Add the created item to the local items array
        addItemToTable(createdItem); // Add the item to the table

        // Reset the form fields
        this.reset();
    } catch (error) {
        console.error('Error adding item:', error);
    }
});

// Function to add an item to the table
function addItemToTable(item) {
    const tableBody = document.getElementById('itemTableBody');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>${item.name}</td>
        <td>${item.weight} kg</td>
        <td>${item.code}</td>
        <td>
            <button class="btn btn-danger" onclick="removeItem(${item.id})">Remove</button>
            <button class="btn btn-warning" onclick="updateItem(${item.id})">Update</button>
        </td>
    `;

    tableBody.appendChild(newRow); // Append the new row to the table body
}

// Function to remove an item from the table
async function removeItem(id) {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/item/delete-item/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Remove item from the array and re-render the table
        items = items.filter(item => item.id !== id);
        renderItems();
    } catch (error) {
        console.error('Error removing item:', error);
    }
}

// Function to update an item
async function updateItem(id) {
    const item = items.find(item => item.id === id);
    if (item) {
        const newName = prompt("Enter new name:", item.name);
        const newWeight = prompt("Enter new weight (kg):", item.weight);
        const newCode = prompt("Enter new code:", item.code);
        if (newName && newWeight && newCode) {
            item.name = newName;
            item.weight = parseFloat(newWeight);
            item.code = newCode;

            // Send the updated item to the backend
            try {
                const response = await fetch(`http://localhost:8080/api/v1/item/update-item/${item.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(item) // Convert the updated item object to JSON
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                // Refresh the items list
                fetchItems();
            } catch (error) {
                console.error('Error updating item:', error);
            }
        }
    }
}

// Function to render items in the table
function renderItems() {
    const tableBody = document.getElementById('itemTableBody');
    tableBody.innerHTML = ''; // Clear the table body
    items.forEach(item => addItemToTable(item)); // Re-add all items
}