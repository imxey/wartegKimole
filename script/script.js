document.addEventListener('DOMContentLoaded', function() {
    const foodForm = document.getElementById('foodForm');
    const foodTableBody = document.getElementById('foodTableBody');
    const loginForm = document.getElementById('loginForm');
    const logoutButton = document.getElementById('logoutButton');
    const loginError = document.getElementById('loginError');
    let sisa = 3;
    const validUsername = 'admin';
    const validPassword = 'admin123';

    // Login Handling
    loginForm?.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        
        
        if (username === validUsername && password === validPassword) {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = '../html/admin.html';
        } else {
            sisa--;
            if(sisa > 0){
            loginForm.reset();
            loginError.textContent = 'Username atau password salah! sisa percobaan sebanyak ' + sisa + " kali";
            }
            else{
                loginForm.reset();
                window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUJcmljayByb2xs';
            }
        }
        
    });

    if (logoutButton) {
        if (!localStorage.getItem('isLoggedIn')) {
            window.location.href = '../html/login.html';
        }

        logoutButton.addEventListener('click', function() {
            localStorage.removeItem('isLoggedIn');
            window.location.href = '../html/login.html';
        });
    }

    // Food Form Handling
  
    foodForm?.addEventListener('submit', function(event) {
        event.preventDefault();
        var box = document.getElementById('box');
        const foodName = document.getElementById('foodName').value;
        const foodPrice = document.getElementById('foodPrice').value;
        const foodImageUrl = document.getElementById('foodImageUrl').value;
        

        

        // Show confirmation box
        box.style.display = "block";
        document.getElementById("okTambah").addEventListener("click", function() {
            box.style.display = "none";
        });

        let foods = JSON.parse(localStorage.getItem('foods')) || [];
        foods.push({ name: foodName, price: foodPrice, imageUrl: foodImageUrl});
        
        localStorage.setItem('foods', JSON.stringify(foods));

        renderFoodList();
        foodForm.reset();
    });
        // Rendering the Food List
        function renderFoodList() {
            foodTableBody.innerHTML = "";
            const foods = JSON.parse(localStorage.getItem('foods')) || [];
            foods.forEach((food, index) => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${food.name}</td>
                    <td>${food.price}</td>
                    <td><img src="${food.imageUrl}" alt="${food.name}" width="50"></td>
                    <td>
                        <button onclick="editFood(${index})">Edit</button>
                        <button onclick="deleteFood(${index})">Delete</button>
                    </td>
                `;
                foodTableBody.appendChild(tr);
            });
        }
    

    // Deleting a Food Item
    window.deleteFood = function(index) {
        let foods = JSON.parse(localStorage.getItem('foods')) || [];
        foods.splice(index, 1);
        localStorage.setItem('foods', JSON.stringify(foods));
        renderFoodList();
    }

    // Editing a Food Item
    window.editFood = function(index) {
        let foods = JSON.parse(localStorage.getItem('foods')) || [];
        const food = foods[index];
        document.getElementById('foodName').value = food.name;
        document.getElementById('foodPrice').value = food.price;
        document.getElementById('foodImageUrl').value = food.imageUrl;

        const submitButton = document.getElementById('tambahMakanan');
        submitButton.textContent = 'Update Makanan';
        submitButton.onclick = function(event) {
            event.preventDefault();
            updateFood(index);
        }
    }

    // Updating a Food Item
    function updateFood(index) {
        let foods = JSON.parse(localStorage.getItem('foods')) || [];
        foods[index] = {
            name: document.getElementById('foodName').value,
            price: document.getElementById('foodPrice').value,
            imageUrl: document.getElementById('foodImageUrl').value
        };
        localStorage.setItem('foods', JSON.stringify(foods));

        const submitButton = document.getElementById('tambahMakanan');
        submitButton.textContent = 'Tambah Makanan';
        submitButton.onclick = foodForm.onsubmit;

        foodForm.reset();
        renderFoodList();
    }

    renderFoodList();
});
