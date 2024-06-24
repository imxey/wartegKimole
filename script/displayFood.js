document.addEventListener('DOMContentLoaded', function() {
    const foodList = document.getElementById('foodList');
    const publicFoodList = document.getElementById('publicFoodList');
function renderFoodList() {
    foodList.innerHTML = '';
    const foods = JSON.parse(localStorage.getItem('foods')) || [];
    foods.forEach((food) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${food.imageUrl}" alt="${food.name}" style="width: 100px; height: auto;">
            ${food.name} - Rp ${food.price}
        `;
        foodList.appendChild(li);
    });
}

if (foodList) renderFoodList();

// Render for publicFoodList
if (publicFoodList) {
    publicFoodList.innerHTML = '';
    const foods = JSON.parse(localStorage.getItem('foods')) || [];
    foods.forEach((food) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${food.imageUrl}" alt="${food.name}" style="width: 100px; height: 100px;"><br>
            ${food.name} - Rp ${food.price}
        `;
        publicFoodList.appendChild(li);
    });
}
});