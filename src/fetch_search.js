function buttonClicked() {
    const category = document.getElementById('category').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then(response => response.json())
        .then(data => {
            const mealList = data.meals;
            let mealHTML = '<h3>Meal List</h3>';

            mealList.forEach(meal => {
                mealHTML += `
                    <div class="meal-box">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-thumb">
                        <div class="meal-info">
                            <h4>${meal.strMeal}</h4>
                            <button onclick="getMealDetails(${meal.idMeal})" class="details-button">Click for more details</button>
                        </div>
                    </div>`;
            });

            document.getElementById('mealList').innerHTML = mealHTML;
        });
}

// Function to search by ingredient
function searchByIngredient() {
    const ingredient = document.getElementById('ingredient').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
        .then(response => response.json())
        .then(data => {
            const mealList = data.meals;
            let mealHTML = '<h3>Meal List by Ingredient</h3>';

            mealList.forEach(meal => {
                mealHTML += `
                    <div class="meal-box">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-thumb">
                        <div class="meal-info">
                            <h4>${meal.strMeal}</h4>
                            <button onclick="getMealDetails(${meal.idMeal})" class="details-button">Click for more details</button>
                        </div>
                    </div>`;
            });

            document.getElementById('mealList').innerHTML = mealHTML;
        });
}





let currentMealDetails = ''; 

function getMealDetails(mealId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            const youtubeUrl = meal.strYoutube;
            const videoId = youtubeUrl.split("v=")[1];
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;

            // Create meal details HTML
            const mealDetailsHTML = `
                <center><h3>${meal.strMeal}</h3></center>
                <center><img src="${meal.strMealThumb}" alt="${meal.strMeal}"></center>
                <p><strong>Category:</strong> ${meal.strCategory}</p>
                <p><strong>Area:</strong> ${meal.strArea}</p>
                <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
                <p><strong>Ingredients and Measurements:</strong></p>
                <ul>
                    ${Array.from({ length: 20 }).map((_, i) => meal[`strIngredient${i + 1}`] && meal[`strMeasure${i + 1}`] 
                        ? `<li>${meal[`strIngredient${i + 1}`]} - ${meal[`strMeasure${i + 1}`]}</li>`
                        : '').join('')}
                </ul> 
                <p><strong>Watch on YouTube:</strong></p>
                <a href="${youtubeUrl}" target="_blank" class="youtube-link">
                    <img src="${thumbnailUrl}" alt="Watch ${meal.strMeal} on YouTube" class="youtube-thumbnail">
                    <div class="play-button-overlay">▶</div>
                </a><br>
                <button id="btnCopyToMealPlanner" class="btn">Copy to Meal Planner</button>
            `;

            // Set currentMealDetails to use in the "Copy to Meal Planner" button
            currentMealDetails = `
            ${meal.strMeal}
            Grocery List:
            ${Array.from({ length: 20 })
                .map((_, i) =>
                    meal[`strIngredient${i + 1}`] && meal[`strMeasure${i + 1}`]
                        ? `${meal[`strIngredient${i + 1}`].padEnd(20, ' ')} - ${meal[`strMeasure${i + 1}`]}`
                        : ''
                )
                .filter(Boolean)
                .join('\n')}
            `;
            

        
            // Insert the meal details into the mealDetails section
            document.getElementById('mealDetails').innerHTML = mealDetailsHTML;

            // Add event listener to the "Copy to Meal Planner" button after inserting it in the DOM
            document.getElementById("btnCopyToMealPlanner").addEventListener("click", function() {
                document.getElementById("fileContents").value = currentMealDetails;
            });
        });
}

