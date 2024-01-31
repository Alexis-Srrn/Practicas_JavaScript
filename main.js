const db = {
    methods: {
        find:(id) => {
            return db.items.find((item) => item.id === id);
        },
        remove: (items) => {
            items.forEach((item) => {
                const product = db.methods.find(item.id);
                product.qty = product.qty - item.qty;
            });

            console.log(db);
        }, 
    },
    items: [
        {
            id:0,
            title: 'Funko Pop',
            price: 550,
            qty: 5
        },
        {
            id:1,
            title: 'Figuras de Acción',
            price: 1200,
            qty: 32
        },
        {
            id:2,
            title: 'Revistas',
            price: 60,
            qty: 300
        },
        {
            id:3,
            title: 'Botones',
            price: 15,
            qty: 200
        },
    ],
};


const shoppingCart = {
    items: [],
    methods: {
        add: (id,qty) => {
            const cartItem = shoppingCart.methods.get(id);

            if (cartItem){
                if(shoppingCart.methods.hasInventory(id, qty + cartItem.qty)){
                        cartItem.qty ++;
                }else{
                    alert('No hay inventario suficiente');
                }
            }else{
                shoppingCart.items.push({ id, qty});
            }
        },
        remove: (id,qty) => {
            const cartItem = shoppingCart.methods.get(id);
            if(cartItem.qty - 1 > 0){
                cartItem.qty--;
            }else{
                shoppingCart.items = shoppingCart.items.filter(item => item.id !== id);
            }

        },
        count: () => {
            return shoppingCart.items.reduce((acc, item) => acc + item.qty, 0);
        },
        get: (id) => {
            const index = shoppingCart.items.findIndex((item) => item.id === id);
            return index >= 0 ? shoppingCart.items[index] : null;
        },
        getTotal: () => {
            let total = 0;
            shoppingCart.items.forEach((item) => {
                const found = db.methods.find(item.id);
                total += found.price * item.qty;
            });
            return total;
        },
        hasInventory: (id,qty) => {
            return db.items.find(item => item.id === id).qty - qty >= 0;
        },
        purchase: () => {
            console.log(shoppingCart.items);
            db.methods.remove(shoppingCart.items);
            shoppingCart.items = [];
        },
    }
};

renderStore();


function renderStore(){
    const html = db.items.map(item =>{
        return `
            <div class="item">
                <div class="title">${item.title}</div>
                <div class="price">${numberToCurrency(item.price)}</div>
                <div class="qty">${item.qty} unidad(es)</div>

                <div class="actions">
                    <button class="add" data-id="${item.id}">Agregar al carrito</button> 
                </div>

            </div>
        `;
    });

    document.querySelector('#store-container').innerHTML = html.join("");


    document.querySelectorAll('.item .actions .add').forEach(button => {
        button.addEventListener('click', e =>{
            const id = parseInt(button.getAttribute('data-id'));
            const item = db.methods.find(id);

            if(item && item.qty - 1 > 0){
                //añadir al carrito de compras
                shoppingCart.methods.add(id, 1);
                console.log(shoppingCart);
                renderShoppingCart();
            }else{
                console.log('Ya no hay inventario');
            }

        });
    });
};


function renderShoppingCart(){
    const html = shoppingCart.items.map(item => {
        const dbItem = db.methods.find(item.id);
        return `
            <div class="item">
                <div class="title">${dbItem.title}</div>
                <div class="price">${numberToCurrency(dbItem.price)}</div>
                <div class="qty">${item.qty} unidad(es)</div>
                <div class="subtotal">
                Subtotal: ${numberToCurrency(item.qty * dbItem.price)}
                </div>

                <div class="actions">
                    <button class="addOne" data-id="${dbItem.id}">+</button>
                    <button class="removeOne" data-id="${dbItem.id}">-</button>
                </div>
            </div>
        `;
    });

    const closeButton = `
    <div class="cart-header">
        <button class="bClose">Cerrar</button>
    </div>`;

    const purchaseButton = shoppingCart.items.length > 0 ? `
    <div class="cart-actions">
        <button id="bPurchase">Comprar</button>
    </div>`
    : "";

    const total = shoppingCart.methods.getTotal();
    const totalContainer = `<div class="total">Total: ${numberToCurrency(total)}</div>`;

    

    const shoppingCartContainer = document.querySelector('#shopping-cart-container');
    
    shoppingCartContainer.classList.remove("hide");
    shoppingCartContainer.classList.add("show");
    
    shoppingCartContainer.innerHTML = closeButton + html.join('') + totalContainer + purchaseButton;

    document.querySelectorAll('.addOne').forEach(button =>{
        button.addEventListener('click', e => {
            const id = parseInt(button.getAttribute('data-id'));
            shoppingCart.methods.add(id, 1);
            renderShoppingCart();
        });
    });

    document.querySelectorAll('.removeOne').forEach(button =>{
        button.addEventListener('click', e => {
            const id = parseInt(button.getAttribute('data-id'));
            shoppingCart.methods.remove(id, 1);
            renderShoppingCart();
        });
    });


    document.querySelector('.bClose').addEventListener('click', e =>{
            shoppingCartContainer.classList.remove("show");
            shoppingCartContainer.classList.add("hide");
    });

    const bPurchase = document.querySelector('#bPurchase');
    if(bPurchase){
        bPurchase.addEventListener('click', e =>{
            shoppingCart.methods.purchase();
            renderStore();
            renderShoppingCart();
        });
    }
}

function numberToCurrency(n){
    return new Intl.NumberFormat('en-US',{
        maximumSignificantDigits: 4,
        style: 'currency',
        currency: 'USD'
    }).format(n);
}


