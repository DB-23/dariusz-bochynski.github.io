document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Get form values
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const gender = document.getElementById('gender').value;
    const isFan = document.querySelector('input[name="isFan"]:checked').value;
    const message = document.getElementById('message').value;

    // Validate form data
    if (!validateFormData(firstName, lastName, email, gender, isFan)) {
        return;
    }

    // Create an object to store the data
    const formData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        gender: gender,
        isFan: isFan,
        message: message
    };

    // Get existing data from localStorage
    const existingData = JSON.parse(localStorage.getItem('formData')) || [];

    // Add the new data
    existingData.push(formData);

    // Save updated data to localStorage
    localStorage.setItem('formData', JSON.stringify(existingData));

    // Clear the form
    document.getElementById('dataForm').reset();

    // Update the table
    displayData();
});

function validateFormData(firstName, lastName, email, gender, isFan) {
    if (firstName.length < 2 || firstName.length > 50) {
        alert("Imię musi mieć od 2 do 50 znaków.");
        return false;
    }
    if (lastName.length < 2 || lastName.length > 50) {
        alert("Nazwisko musi mieć od 2 do 50 znaków.");
        return false;
    }
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        alert("Podaj poprawny adres email.");
        return false;
    }
    if (gender === "") {
        alert("Wybierz płeć.");
        return false;
    }
    if (!isFan) {
        alert("Wybierz, czy jesteś kibicem.");
        return false;
    }
    return true;
}

function displayData() {
    const dataTable = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    dataTable.innerHTML = ''; // Clear existing data

    // Get data from localStorage
    const data = JSON.parse(localStorage.getItem('formData')) || [];

    // Populate the table
    data.forEach(function(item, index) {
        const row = dataTable.insertRow();
        const firstNameCell = row.insertCell(0);
        const lastNameCell = row.insertCell(1);
        const emailCell = row.insertCell(2);
        const genderCell = row.insertCell(3);
        const isFanCell = row.insertCell(4);
        const messageCell = row.insertCell(5);
        const actionCell = row.insertCell(6);

        firstNameCell.textContent = item.firstName;
        lastNameCell.textContent = item.lastName;
        emailCell.textContent = item.email;
        genderCell.textContent = item.gender;
        isFanCell.textContent = item.isFan === "yes" ? "Tak" : "Nie";
        messageCell.textContent = item.message;

        actionCell.innerHTML = `
            <span class="edit" data-index="${index}">Edytuj</span> | 
            <span class="delete" data-index="${index}">Usuń</span>
        `;
    });

    // Add event listeners for edit and delete buttons
    const editButtons = document.querySelectorAll('.edit');
    const deleteButtons = document.querySelectorAll('.delete');

    editButtons.forEach(button => {
        button.addEventListener('click', editData);
    });

    deleteButtons.forEach(button => {
        button.addEventListener('click', deleteData);
    });
}

function editData(event) {
    const index = event.target.getAttribute('data-index');
    const data = JSON.parse(localStorage.getItem('formData')) || [];
    const item = data[index];

    // Fill the form with the data to be edited
    document.getElementById('firstName').value = item.firstName;
    document.getElementById('lastName').value = item.lastName;
    document.getElementById('email').value = item.email;
    document.getElementById('gender').value = item.gender;
    document.querySelector(`input[name="isFan"][value="${item.isFan}"]`).checked = true;
    document.getElementById('message').value = item.message;

    // Remove the item from the data array
    data.splice(index, 1);

    // Update localStorage
    localStorage.setItem('formData', JSON.stringify(data));

    // Update the table
    displayData();
}

function deleteData(event) {
    const index = event.target.getAttribute('data-index');
    const data = JSON.parse(localStorage.getItem('formData')) || [];

    // Remove the item from the data array
    data.splice(index, 1);

    // Update localStorage
    localStorage.setItem('formData', JSON.stringify(data));

    // Update the table
    displayData();
}

// Display data when the page loads
displayData();
