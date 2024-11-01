const fs = require('fs');
const path = require('path');

// Directory to store saved files
const pathName = path.join(__dirname, 'Files');
if (!fs.existsSync(pathName)) {
    fs.mkdirSync(pathName);
}

// CRUD Elements
const btnSave = document.getElementById('btnCreate');
const btnRead = document.getElementById('btnRead');
const btnDelete = document.getElementById('btnDelete');
const fileName = document.getElementById('fileName');
const fileContents = document.getElementById('fileContents');

// Display meal details in the content area
function setMealContent(content) {
    fileContents.value = content;
}

// Create File
btnSave.addEventListener('click', function () {
    const filePath = path.join(pathName, fileName.value + '.txt');
    const content = fileContents.value;

    fs.writeFile(filePath, content, function (err) {
        if (err) {
            const errorMessage = "Error: " + err.message;
            document.getElementById('error').innerHTML = errorMessage; // Display error
            return;
        }
        const successMessage = `${fileName.value} created successfully!`;
        document.getElementById('error').innerHTML = successMessage; // Display success

        displaySavedFiles(); // Refresh the list of txt files
    });
});

// Read File
btnRead.addEventListener('click', function () {
    const filePath = path.join(pathName, fileName.value + '.txt');

    fs.readFile(filePath, 'utf-8', function (err, data) {
        if (err) {
            const errorMessage = "Error: " + err.message;
            document.getElementById('error').innerHTML = errorMessage; // Display error
            return;
        }
        fileContents.value = data;
        const successMessage = `${fileName.value} read successfully!`;
        document.getElementById('error').innerHTML = successMessage; // Display success
    });
});

// Delete File
btnDelete.addEventListener('click', function () {
    const filePath = path.join(pathName, fileName.value + '.txt');

    fs.unlink(filePath, function (err) {
        if (err) {
            const errorMessage = "Error: " + err.message;
            document.getElementById('error').innerHTML = errorMessage; // Display error
            return;
        }
        fileName.value = '';
        fileContents.value = '';
        const successMessage = `${fileName.value} deleted successfully!`;
        document.getElementById('error').innerHTML = successMessage; // Display success

        displaySavedFiles(); // Refresh the list of txt files
    });
});


// Function to clear content
function clearContent() {
    document.getElementById('fileName').value = ''; // Clear file name input
    document.getElementById('fileContents').value = ''; // Clear textarea
    document.getElementById('error').innerHTML = ''; // Clear error/success messages
}


// Function to display saved files
function displaySavedFiles() {
    const fileListContainer = document.getElementById('fileList');
    fileListContainer.innerHTML = ''; // Clear previous list

    fs.readdir(pathName, (err, files) => {
        if (err) {
            document.getElementById('error').innerHTML = "Error: " + err.message;
            return;
        }

        files.forEach(file => {
            // Create a button or link for each file
            const fileButton = document.createElement('button');
            fileButton.innerText = file;
            fileButton.classList.add('file-item');
            fileButton.onclick = () => {
                fileName.value = file.replace('.txt', '');
                readFile(fileName.value); // Optional: auto-load file content when clicked
            };
            fileListContainer.appendChild(fileButton);
        });
    });
}

// Call displaySavedFiles on page load
document.addEventListener('DOMContentLoaded', () => {
    displaySavedFiles();
});


