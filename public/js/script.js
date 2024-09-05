$(document).ready(function() {
  // Establish a connection to the server using Socket.IO
  const socket = io();

  // Load cat food products on page load
  getProducts();

  // Listen for 'product-added' events from the server (real-time updates)
  socket.on('product-added', function(product) {
    M.toast({html: 'A new product was added: ' + product.title});
    getProducts(); // Refresh the list of products after receiving the new product
  });

  // Handle add product form submission
  $('#add-product-form').on('submit', function(event) {
    event.preventDefault();
    const product = {
      title: $('#title').val(),
      brand: $('#brand').val(),
      image: $('#image').val(),
      description: $('#description').val()
    };

    // Emit the new product to the server for real-time updates
    socket.emit('new-product', product);

    // Send the product to the server via POST request
    $.post('/api/products', product, (response) => {
      if (response.statusCode === 200) {
        M.toast({html: 'Product added successfully!'});
        getProducts(); // Refresh the list of products
      } else {
        M.toast({html: 'Failed to add product.'});
      }
    });
  });

  // Function to load products from the server
  const getProducts = () => {
    $.get('/api/products', (response) => {
      if (response.statusCode === 200) {
        addProductCards(response.data);
      }
    });
  };

  // Function to dynamically add product cards to the page
  function addProductCards(items) {
    $('#card-section').empty(); // Clear existing content
    items.forEach(item => {
      let card = `<div class="col s12 m6 l4">
                    <div class="card">
                      <div class="card-image">
                        <img src="${item.image}" alt="${item.title}">
                        <span class="card-title">${item.title}</span>
                      </div>
                      <div class="card-content">
                        <p><strong>Brand:</strong> ${item.brand}</p>
                        <p>${item.description}</p>
                      </div>
                      <div class="card-action">
                        <a href="#">Rate this product</a>
                      </div>
                    </div>
                  </div>`;
      $('#card-section').append(card);
    });
  }

  // Handle contact form submission
  $('#contact-form').on('submit', function(event) {
    event.preventDefault();
    const name = $('#name').val();
    const email = $('#email').val();
    const message = $('#message').val();

    M.toast({html: `Thank you, ${name}! We will get back to you shortly.`});
    
    // Clear form fields
    $('#name').val('');
    $('#email').val('');
    $('#message').val('');
  });
});


