(() => {
    const authToken = localStorage.getItem('authtoken');

    const apiUrl = 'http://localhost:9988';

    if(!authToken){
        window.location = '/';
    }

    const buildProductsTable = (products) =>{
        return `
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-5">
                ${buildProductRows(products)}
            </div>`;
    };

    const buildProductRows = (products) => {

        let productRows = '';

        for(let i = 0; i < products.length; i++){
            productRows += buildProductRow(products[i]);
        }

        return productRows;
    }

    const buildProductRow = (product) => {
        return `
            <div class="col">
                <a href="../product/?id=${product.id}" class="card shadow border-0">
                    <div class="link card-img-top p-3 d-flex justify-content-center" style="height:300px;">
                        <img src="${apiUrl}/images/${product.small_image}" style="max-height:90%; max-width:100%" alt="...">
                    </div>
                    <div class="card-body text-dark">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text text-success mb-0">${product.price} €</p>
                        <div class="stars text-primary">
                            ${getStars(product.satisfaction_rate)}
                        </div>
                    </div>
                </a>
            </div>`;
    };

    function getStars(num) {
        let full = 0;
        let empty = 0;
        let half = 0;
        let stars = '';
    
        if(num == 1) {
            full = 1;
            empty = 4;
            half = 0;
        }else if (num == 2) {
            full = 2;
            empty = 3;
            half = 0;
        }else if (num == 3) {
            full = 3;
            empty = 2;
            half = 0;
        }else if (num == 4) {
            full = 4;
            empty = 1;
            half = 0;
        } else if (num > 1 && num < 2) {
            full = 1;
            half = 1;
            empty = 3;
        } else if (num > 2 && num < 3) {
            full = 2;
            half = 1;
            empty = 2;
        } else if (num > 3 && num < 4) {
            full = 3;
            half = 1;
            empty = 1;
        } else if(num > 4) {
            full = 4;
            half = 1;
            empty = 0;
        }
    
        for(let i = 0; i < full; i++) {
            stars += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>`
        }
        for(let f = 0; f < half; f++) {
            stars += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-half" viewBox="0 0 16 16">
                            <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z"/>
                        </svg>`
        }
        for(let g = 0; g < empty; g++) {
            stars += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                        </svg>`
        }
        return stars
    }


    fetch('http://localhost:9988/products', {
            headers: { 
                "Content-Type": "application/json; charset=utf-8",
                "x-access-token": authToken
            },
            method: 'POST'
        })
        .then(response => response.json())
        .then(response => {
            if(!response){
                throw new Error(response);
            }

            const productsTable = buildProductsTable(response);

            const productsTableContainer = document.createElement('div');

            productsTableContainer.innerHTML = productsTable;

            const productsContainer = document.getElementById('productsContainer');

            productsContainer.appendChild(productsTableContainer);
        }).then(() => {
            const searchButtom = document.querySelector('.searchButtom');
            const inputSearch = document.querySelector('.inputSearch');
            const productsNames = document.querySelectorAll('.card-title');
            const cards = document.querySelectorAll('.card');
            
            searchButtom.addEventListener('click', () => {
                if(inputSearch.value != ''){
                    Array.from(productsNames).forEach( item => {
                        if(!item.textContent.toLowerCase().includes(inputSearch.value.toLowerCase())){
                            item.parentElement.parentElement.setAttribute('Style', 'opacity: 0.3;')
                        }
                    })
                }
            })
            inputSearch.addEventListener('input', () => {
                if(inputSearch.value === '') {
                    Array.from(cards).forEach(card => card.setAttribute('Style', 'opacity: 1;'))
                }
            })
        })
})();