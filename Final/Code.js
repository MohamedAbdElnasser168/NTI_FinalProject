var Books = JSON.parse(localStorage.getItem('books')) || [
    { Title: "French Book", Image: "images/french.jpg", Description: "Explore the beauty of the French language and culture through this captivating book.", Price: 55 },
    { Title: "Science Book", Image: "images/science.jpg", Description: "Uncover the mysteries of the universe with our in-depth science collection.", Price: 66 },
    { Title: "Math Book", Image: "images/math.jpg", Description: "Solve complex problems and master mathematical concepts with ease.", Price: 30 },
    { Title: "History Book", Image: "images/history.jpg", Description: "Journey through time and learn about the world's most significant events.", Price: 27 },
    { Title: "Germany Book", Image: "images/germany.jpg", Description: "Dive into German culture and history with our exclusive book selection.", Price: 10 },
    { Title: "English Book", Image: "images/English.jpg", Description: "Improve your language skills and explore classic English literature.", Price: 40 },
];

function saveData() {
    localStorage.setItem('books', JSON.stringify(Books));
}

function ViewAllBooks(isManagementPage) {
    var BooksContainer = document.getElementById("Books");
    if (!BooksContainer) return;
    BooksContainer.innerHTML = "";
    for (let i = 0; i < Books.length; i++) {
        let actionButton = '';
        if (isManagementPage) {
            actionButton = `<button class="btn btn-outline-danger" data-index="${i}">Remove</button>`;
        } else {
            actionButton = `<a href="#" class="btn btn-outline-success">Buy</a>`;
        }
        BooksContainer.innerHTML += `
        <div class="col-md-6 col-lg-4 ">
            <div class="card my-3 shadow"  id="productCard">
                <div class="card-body">
                    <img src="${Books[i].Image}" class="img-fluid" alt="">
                    <h5 class="fw-bold my-2">${Books[i].Title}</h5>
                    <p class="text-muted">${Books[i].Description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="text-success fw-bold">$${Books[i].Price}</span>
                        ${actionButton}
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}

function RemoveBook() {
    const removeButtons = document.querySelectorAll(".btn-outline-danger");
    removeButtons.forEach(button => {
        button.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, remove it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Books.splice(index, 1);
                    saveData();
                    ViewAllBooks(true);
                    Swal.fire('Removed!', 'The book has been removed.', 'success');
                }
            });
        });
    });
}

function setupAddBookForm() {
    const form = document.getElementById("form");
    if (!form) return;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const price = document.getElementById("price").value;
        const image = document.getElementById("image").value;

        if (!name || !price || !image) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill all fields!',
            });
            return;
        }

        const newBook = {
            Title: name,
            Price: parseFloat(price),
            Image: image,
            Description: "A fascinating new book for your collection."
        };

        Books.push(newBook);
        saveData();

        Swal.fire({
            icon: 'success',
            title: 'Book Added!',
            text: 'The book has been added successfully.',
            showConfirmButton: false,
            timer: 1500
        });

        form.reset();
    });
}


function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentPage = window.location.pathname.split('/').pop();

    if (isLoggedIn !== 'true' && currentPage !== 'index.html') {
        window.location.href = 'index.html';
    }
}


function handleLogin() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

       
        if (email === 'test@example.com' && password === '123') {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'Home.html';
        } else {
            alert('Invalid email or password.');
        }
    });
}


function handleLogout() {
    const logoutLink = document.querySelector('a[href="index.html"]');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault(); 
            localStorage.setItem('isLoggedIn', 'false');
            window.location.href = 'index.html';
        });
    }
}


document.addEventListener("DOMContentLoaded", function () {
    checkLoginStatus();
    
    
    handleLogin();
    handleLogout();

    
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage === 'Product.html') {
        ViewAllBooks(true);
        RemoveBook();
    } else if (currentPage === 'Home.html') {
        ViewAllBooks(false);
    } else if (currentPage === 'AddProduct.html') {
        setupAddBookForm();
    }
});


function handleLogin() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        
        if (email === 'test@example.com' && password === '123') {
            localStorage.setItem('isLoggedIn', 'true');
            Swal.fire({
                icon: 'success',
                title: 'Login Successful!',
                text: 'You have been successfully logged in.',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.href = 'Home.html';
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed!',
                text: 'Invalid email or password.',
            });
        }
    });
}