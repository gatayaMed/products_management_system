const API_URL = 'http://localhost:8000/api/products/';

function fetchProducts() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('product-list');
            productList.innerHTML = '';
            data.forEach(product => {
                const productItem = document.createElement('div');
                productItem.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>$${product.price}</p>
                    <hr>
                `;
                productList.appendChild(productItem);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
}

function addProduct() {
    //  we have this object in JavaScript
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description, price }), // JavaScript function JSON.stringify() to convert oject js into a string,
                                                             // The result will be a string following the JSON notation.now the object is a json string, and ready to be sent to a server:
    })
    .then(response => response.json())
    .then(() => {
        fetchProducts();
        document.getElementById('name').value = '';
        document.getElementById('description').value = '';
        document.getElementById('price').value = '';
    })
    .catch(error => console.error('Error adding product:', error));
}

// Fetch products on page load
fetchProducts();