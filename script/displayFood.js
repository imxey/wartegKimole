document.addEventListener('DOMContentLoaded', function() {
    const foodList = document.getElementById('foodList');
    const publicFoodList = document.getElementById('publicFoodList');
    const beli = document.getElementById('beli');
    const chatId = -1002197890358;
    const token = '7243735582:AAFK1CMy8I4x302RNdDBI68eL1mSLz2oNZM';
    const beliMakanForm = document.getElementById('beliMakanForm');
    const formIlang = document.querySelector('.formIlang');
    const checkout = document.getElementById('checkout');
    const keluar = document.getElementById('keluar');
    let purchasedItems = JSON.parse(localStorage.getItem('purchasedItems')) || [];
    if (!localStorage.getItem('foods')) {
        window.location.reload();

        const defaultFoods = [
            {
                name: "Kentang Balado",
                price: 4000,
                imageUrl: "https://asset.kompas.com/crops/jbRtm27K1RSbjbCMaII4gPtH41Q=/67x0:723x437/750x500/data/photo/2018/10/24/3144434666.jpg"
            },
            {
                name: "Ayam Goreng",
                price: 7000,
                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw3lPdQ6nAgWUnMZeQVdffvsmz5W93uQN_Vw&s"
            },
            {
                name: "Tempe Orek",
                price: 4000,
                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAjgwPCJo26S4Y_z7kodYDtnSj8gD8myl2pQ&s"
            },
            {
                name: "Telur Balado",
                price: 4000,
                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtH3xmEtKP6pmOBTPagkz0L0LQEHeufx-rDQ&s"
            },
            {
                name: "Telur Dadar",
                price: 4000,
                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb829Rd4hMcImUKQs159KpNeVFFfHvblm6BA&s"
            }
        ];
        localStorage.setItem('foods', JSON.stringify(defaultFoods));
        renderFoodList();
    }
    // Fungsi untuk merender daftar makanan
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

    // Render untuk publicFoodList
    if (publicFoodList) {
        publicFoodList.innerHTML = '';
        const foods = JSON.parse(localStorage.getItem('foods')) || [];
        foods.forEach((food, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${food.imageUrl}" alt="${food.name}" onclick="buyFood(${index})" id="gambarMakanan" style="width: 100px; height: 100px;"><br>
                ${food.name} - Rp ${food.price} 
            `;
            publicFoodList.appendChild(li);
        });
    }

    // Fungsi untuk membeli makanan
    window.buyFood = function(index) {
        const quantity = prompt("Masukkan jumlah item yang ingin dibeli:");
        if (quantity === null || isNaN(quantity) || quantity <= 0) {
            alert("Jumlah tidak valid. Silakan masukkan angka positif.");
            return;
        }

        const foods = JSON.parse(localStorage.getItem('foods')) || [];
        const selectedFood = foods[index];
        const totalPrice = selectedFood.price * quantity;

        // Buat objek untuk item yang dibeli
        const purchasedItem = {
            name: selectedFood.name,
            price: selectedFood.price,
            quantity: quantity,
            totalPrice: totalPrice,
            imageUrl: selectedFood.imageUrl
        };

        // Tambahkan item yang dibeli ke array purchasedItems
        purchasedItems.push(purchasedItem);
        // Simpan array ke localStorage
        localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems));
        // Hitung total harga semua item yang dibeli
        let finalPrice = purchasedItems.reduce((acc, item) => acc + item.totalPrice, 0);
        // Tampilkan total harga ke elemen beli
        beli.innerHTML = `Beli - Total Harga: Rp ${finalPrice}`;
        // Tampilkan daftar pembelian
        renderPurchasedItems();
    };

    // Fungsi untuk merender daftar item yang dibeli
    function renderPurchasedItems() {
        const purchasedList = document.getElementById('purchasedList');
        if (!purchasedList) return;

        purchasedList.innerHTML = '';
        purchasedItems.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}" style="width: 50px; height: auto;">
                ${item.name} - Rp ${item.price} x ${item.quantity} = Rp ${item.totalPrice}
                <button onclick="removeItem(${index})">Hapus</button>
            `;
            purchasedList.appendChild(li);
        });
    }

    // Fungsi untuk menghapus item tertentu
    window.removeItem = function(index) {
        purchasedItems.splice(index, 1); // Hapus item dari array
        localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems)); // Perbarui localStorage
        renderPurchasedItems(); // Perbarui tampilan

        // Hitung ulang total harga semua item yang dibeli
        let finalPrice = purchasedItems.reduce((acc, item) => acc + item.totalPrice, 0);
        beli.innerHTML = `Total Harga: Rp ${finalPrice}`;
    };

    // Event listener untuk tombol beli
    beli.addEventListener('click', function() {
        // Munculkan form pembelian
        formIlang.style.display = 'block';
        keluar.addEventListener('click', function() {
            // Sembunyikan form pembelian
            formIlang.style.display = 'none';
        })
        // Event listener untuk tombol checkout di dalam form pembelian
        checkout.addEventListener('click', async function(event) {
            event.preventDefault();

            // Ambil nilai terbaru dari input pembeli
            const namaBuyerValue = document.getElementById('namaBuyer').value;
            const noBuyerValue = document.getElementById('noBuyer').value;
            const alamatBuyerValue = document.getElementById('alamatBuyer').value;
            const emailBuyerValue = document.getElementById('emailBuyer').value;
            if (namaBuyerValue === '' || noBuyerValue === '' || alamatBuyerValue === '') {
                alert('Semua field harus diisi!');
                return;
            }
            // Hitung ulang total harga semua item yang dibeli
            const finalPrice = purchasedItems.reduce((acc, item) => acc + item.totalPrice, 0);
            
              if (namaBuyerValue != '' || noBuyerValue != '' || alamatBuyerValue != '' || emailBuyerValue != '') {
                const data = {
                    namaBuyerValue: namaBuyerValue,
                    noBuyerValue: noBuyerValue,
                    alamatBuyerValue: alamatBuyerValue,
                    emailBuyerValue: emailBuyerValue,
                    finalPrice: finalPrice
                  };
                  try {
                    const response = await fetch('../script/app.php', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(data)
                    });
                    const token = await response.text();
                    
                    window.snap.embed(token, {
                        embedId: 'snap-container',
                        onSuccess: function (result) {
                          /* You may add your own implementation here */
                          kirimTele()
                          alert(strukk()); console.log(result);
                          
                        },
                        onPending: function (result) {
                          /* You may add your own implementation here */
                          alert("wating your payment!"); console.log(result);
                        },
                        onError: function (result) {
                          /* You may add your own implementation here */
                          alert("payment failed!"); console.log(result);
                        },
                        onClose: function () {
                          /* You may add your own implementation here */
                          alert('you closed the popup without finishing the payment');
                        }
                      });
                  } catch (err) {
                    console.error(err);
                  }
            }
            
            function strukk(){
                let textStruck = `Pembayaran berhasil\nNama: ${namaBuyerValue}\n`;
            textStruck += `No. HP: ${noBuyerValue}\n`;
            textStruck += `Alamat: ${alamatBuyerValue}\n`;
            purchasedItems.forEach((item) => {
                textStruck += `- ${item.name} x ${item.quantity} = Rp ${item.totalPrice}\n`;
            });
            textStruck += `Total Harga: Rp ${finalPrice}\n`;
            textStruck += `Mohon tunggu konfirmasi dari admin kami melalui telegram`
            return textStruck;
            }
            
            formIlang.style.display = 'none';
            document.getElementById('beliMakanForm').reset();
            
            function kirimTele(){
            let text = `NOTIFIKASI PEMBELIAN BARU %0A%0APembelian atas nama : %0ANama: ${namaBuyerValue}%0ANo. HP: ${noBuyerValue}%0AAlamat: ${alamatBuyerValue}
            %0A%0ARincian Pembelian :%0A`
            purchasedItems.forEach((item) => {
                text += `- ${item.name} x ${item.quantity} = Rp ${item.totalPrice}%0A`;
            });
            text += `Total Harga: Rp ${finalPrice}%0A%0A`;
            text += "Mohon untuk konfirmasi pembelian pada nomor yang tertera!";
            // Hapus dari localStorage      
            renderPurchasedItems(); // Perbarui tampilan
            beli.innerHTML = 'Beli'; // Atur kembali teks tombol beli
            // Kirim pesan ke Telegram jika diperlukan
            const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${text}`;
            let api = new XMLHttpRequest();
            api.open('GET', url, true);
            api.send();
        }purchasedItems = []; // Kosongkan array
        localStorage.removeItem('purchasedItems'); 
        });
    });

    // Render daftar item yang dibeli saat halaman dimuat
    renderPurchasedItems();
});
