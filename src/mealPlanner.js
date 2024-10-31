// API Endpoints
const categoriesAPI = "https://www.themealdb.com/api/json/v1/1/categories.php";
const mealDetailsAPI = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

// Initialize the meal planner
document.addEventListener('DOMContentLoaded', () => {
    loadCategories();
    displayMealPlanner();
});

// Load meal categories
function loadCategories() {
    fetch(categoriesAPI)
        .then(response => response.json())
        .then(data => {
            const categorySelect = document.getElementById('mealCategory');
            data.categories.forEach(category => {
                let option = document.createElement("option");
                option.value = category.strCategory;
                option.textContent = category.strCategory;
                categorySelect.appendChild(option);
            });
        });
}

// Fetch and display meals in selected category
function fetchMeals() {
    const category = document.getElementById('mealCategory').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then(response => response.json())
        .then(data => {
            const mealDetails = document.getElementById("mealDetails");
            mealDetails.innerHTML = data.meals.map(meal => `
                <div class="meal-box">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <h3>${meal.strMeal}</h3>
                    
                </div>
            `).join('');
        });
}

// <button class="add-button" onclick="addMealToPlanner('${meal.idMeal}')">Add to Planner</button>

// Add meal to planner
function addMealToPlanner(mealId) {
    fetch(`${mealDetailsAPI}${mealId}`)
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            let planner = JSON.parse(localStorage.getItem("mealPlanner")) || [];
            if (!planner.some(item => item.idMeal === meal.idMeal)) {
                planner.push(meal);
                localStorage.setItem("mealPlanner", JSON.stringify(planner));
                alert(`${meal.strMeal} added to planner!`);
                displayMealPlanner();
            }
        });
}

// Display meal planner
function displayMealPlanner() {
    const planner = JSON.parse(localStorage.getItem("mealPlanner")) || [];
    const mealPlannerList = document.getElementById("mealPlannerList");
    mealPlannerList.innerHTML = planner.map((meal, index) => `
        <div class="meal-planner-item">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h4>${meal.strMeal}</h4>
            <button onclick="updateMeal(${index})">Edit</button>
            <button onclick="deleteMeal(${index})">Delete</button>
        </div>
    `).join('');
}

// Update meal in planner
function updateMeal(index) {
    var newMealName = prompt("Enter a new name for the meal:");
    if (newMealName) {
        let planner = JSON.parse(localStorage.getItem("mealPlanner"));
        planner[index].strMeal = newMealName;
        localStorage.setItem("mealPlanner", JSON.stringify(planner));
        displayMealPlanner();
    }
}

// Delete meal from planner
function deleteMeal(index) {
    let planner = JSON.parse(localStorage.getItem("mealPlanner"));
    planner.splice(index, 1);
    localStorage.setItem("mealPlanner", JSON.stringify(planner));
    displayMealPlanner();
}














function createFile() {
    const meDetails = {
        name: document.getElementById('mealName').value,
        category: document.getElementById('mealCategory').value,
        area: document.getElementById('mealArea').value,
        instructions: document.getElementById('mealInstructions').value,
        ingredients: document.getElementById('mealIngredients').value.split(',').map(item => item.trim())
    };

    const fileName = document.getElementById('fileName').value || 'meal_details';
    const meContent = `
                    ${meDetails.name}
                    ${meDetails.category}
                    ${meDetails.area}
                    Instructions:   ${meDetails.instructions}
                    Ingredients:    ${meDetails.ingredients.join('\n')}
`;

    const filePath = path.join(filesFolderPath, `${fileName}.txt`);

    fs.writeFile(filePath, meContent, (err) => {
        if (err) {
            console.error('Error saving file:', err);
            alert('Failed to create file.');
        } else {
            alert(`File '${fileName}.txt' created successfully in the Files folder!`);
        }
    });
}



function readFile() {
    const fileName = document.getElementById('fileName').value;
    
    if (fileName) {
        const filePath = path.join(filesFolderPath, `${fileName}.txt`);
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                alert('Error reading file: ' + err.message);
            } else {
                document.getElementById('fileOutput').innerText = data;
            }
        });
    } else {
        alert('Please enter the file name.');
    }
}





function updateFile() {
    const mealDetails = {
        name: document.getElementById('mealName').value,
        category: document.getElementById('mealCategory').value,
        area: document.getElementById('mealArea').value,
        instructions: document.getElementById('mealInstructions').value,
        ingredients: document.getElementById('mealIngredients').value.split(',').map(item => item.trim())
    };

    const fileName = document.getElementById('fileName').value;
    const fileContent = `
${mealDetails.name}
${mealDetails.category}
${mealDetails.area}

Instructions: ${mealDetails.instructions}

Ingredients:
${mealDetails.ingredients.join('\n')}
    `;

    const filePath = path.join(filesFolderPath, `${fileName}.txt`);

    if (fs.existsSync(filePath)) {
        fs.writeFile(filePath, fileContent, (err) => {
            if (err) {
                alert('Error updating file: ' + err.message);
            } else {
                alert(`File '${fileName}.txt' updated successfully!`);
            }
        });
    } else {
        alert('File not found.');
    }
}



function deleteFile() {
    const fileName = document.getElementById('fileName').value;
    
    if (fileName) {
        const filePath = path.join(filesFolderPath, `${fileName}.txt`);
        if (fs.existsSync(filePath)) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    alert('Error deleting file: ' + err.message);
                } else {
                    alert(`File '${fileName}.txt' deleted successfully!`);
                    document.getElementById('fileOutput').innerText = '';
                }
            });
        } else {
            alert('File not found.');
        }
    } else {
        alert('Please enter the file name.');
    }
}