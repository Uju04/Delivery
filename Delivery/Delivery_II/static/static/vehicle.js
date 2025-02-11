let vehicles = []; // Array to hold vehicles

// Fetch vehicles from the backend API
async function fetchVehicles() {
    try {
        const response = await fetch('http://localhost:8080/api/v1/vehicle/get-all-vehicles'); // Adjust the URL as needed
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        vehicles = await response.json(); // Parse the JSON response
        renderVehicles(); // Render the vehicles in the table
    } catch (error) {
        console.error('Error fetching vehicles:', error);
    }
}

// Call fetchVehicles when the page loads
document.addEventListener('DOMContentLoaded', fetchVehicles);

// Handle form submission to add a new vehicle
document.getElementById('vehicleForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get values from the form inputs
    const name = document.getElementById('name').value;
    const plateNumber = document.getElementById('plateNumber').value;
    const type = document.getElementById('type').value;
    const carryingWeight = parseFloat(document.getElementById('carryingWeight').value);
    const status = document.getElementById('status').value;
    const fuelCapacity = parseFloat(document.getElementById('fuelCapacity').value);
    const totalWeight = parseFloat(document.getElementById('totalWeight').value);

    // Create a new vehicle object
    const newVehicle = {
        name: name,
        plateNumber: plateNumber,
        type: type,
        carryingWeight: carryingWeight,
        status: status,
        fuelCapacity: fuelCapacity,
        totalWeight:totalWeight
    };

    // Send the new vehicle to the backend
    try {
        const response = await fetch('http://localhost:8080/api/v1/vehicle/create-vehicle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newVehicle) // Convert the vehicle object to JSON
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Fetch the updated list of vehicles after adding a new one
        await fetchVehicles(); // Refresh the vehicle list

        // Reset the form fields
        this.reset();
    } catch (error) {
        console.error('Error adding vehicle:', error);
    }
});

// Function to render vehicles in the table
function renderVehicles() {
    const tableBody = document.getElementById('vehicleTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    vehicles.forEach(vehicle => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${vehicle.name}</td>
            <td>${vehicle.plateNumber}</td>
            <td>${vehicle.type}</td>
            <td>${vehicle.carryingWeight} kg</td>
            <td>${vehicle.status}</td>
            <td>${vehicle.fuelCapacity} L</td>
            <td>${vehicle.currentWeight ? vehicle.currentWeight + ' kg' : 'N/A'}</td>
            <td>${vehicle.totalWeight} kg</td>
            <td>
                <button class="btn btn-danger" onclick="removeVehicle(${vehicle.id})">Remove</button>
                <button class="btn btn-warning" onclick="updateVehicle(${vehicle.id})">Update</button>
            </td>
        `;
        tableBody.appendChild(newRow); // Append the new row to the table body
    });
}

// Function to remove a vehicle from the table
function removeVehicle(id) {
    // Here you would typically send a DELETE request to the backend to remove the vehicle
    fetch(`http://localhost:8080/api/v1/vehicle/delete-vehicle/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Remove vehicle from the array and re-render the table
        vehicles = vehicles.filter(vehicle => vehicle.id !== id);
        renderVehicles();
    })
    .catch(error => console.error('Error removing vehicle:', error));
}

// Function to update a vehicle
function updateVehicle(id) {
    const vehicle = vehicles.find(vehicle => vehicle.id === id);
    if (vehicle) {
        const newName = prompt("Enter new name:", vehicle.name);
        const newPlateNumber = prompt("Enter new plate number:", vehicle.plateNumber);
        const newType = prompt("Enter new type:", vehicle.type);
        const newCarryingWeight = prompt("Enter new carrying weight (kg):", vehicle.carryingWeight);
        const newStatus = prompt("Enter new status:", vehicle.status);
        const newFuelCapacity = prompt("Enter new fuel capacity (L):", vehicle.fuelCapacity);

        if (newName && newPlateNumber && newType && newCarryingWeight && newStatus && newFuelCapacity) {
            vehicle.name = newName;
            vehicle.plateNumber = newPlateNumber;
            vehicle.type = newType;
            vehicle.carryingWeight = parseFloat(newCarryingWeight);
            vehicle.status = newStatus;
            vehicle.fuelCapacity = parseFloat(newFuelCapacity);

            // Send the updated vehicle to the backend
            fetch(`http://localhost:8080/api/v1/vehicle/update-vehicle/${vehicle.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(vehicle) // Convert the updated vehicle object to JSON
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Refresh the vehicle list
                fetchVehicles();
            })
            .catch(error => console.error('Error updating vehicle:', error));
        }
    }
}