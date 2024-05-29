// start function of sidebar 

const icon = document.querySelectorAll('.icon-sidebar')
const list = document.getElementsByClassName('list')

icon.forEach((icon, index) => {
    icon.addEventListener('click', () => {
        icon.classList.toggle('active')
        list[index].classList.toggle('active')
    })
})

// end function of sidebar

// object of product

let products = [{
    id: 1,
    name: "Sun-Glasses",
    price: 300,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natusimpedit.",
    image: "imges/shop_01.jpg",
    type: "accessories",
    amount: 1,
    gender: "women",
},
{
    id: 2,
    name: "Dress",
    price: 500,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natusimpedit.",
    image: "imges/shop_02.jpg",
    type: "dress",
    amount: 1,
    gender: "women",
}, {
    id: 3,
    name: "Shoes",
    price: 199,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natusimpedit.",
    image: "imges/shop_04.jpg",
    type: "shoes",
    amount: 1,
    gender: "men",
}, {
    id: 4,
    name: "Bag",
    price: 50,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natusimpedit.",
    image: "imges/shop_11.jpg",
    type: "bag",
    amount: 1,
    gender: "women",
}, {
    id: 5,
    name: "Dress-Blue",
    price: 450,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natusimpedit.",
    image: "imges/shop_03.jpg",
    type: "dress",
    amount: 1,
    gender: "women",
}, {
    id: 6,
    name: "Phone",
    price: 1999,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natusimpedit.",
    image: "imges/shop_07.jpg",
    type: "accessories",
    amount: 1,
    gender: "men",
}, {
    id: 7,
    name: "watch",
    price: 1999,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natusimpedit.",
    image: "imges/shop_08.jpg",
    type: "accessories",
    amount: 1,
    gender: " women",
}
];

// start function of shop page to show products
$(document).ready(() => {
    var html = '';
    for (let i = 0; i < products.length; i++) {
        html += `<div class="card-content ${products[i].type} ${products[i].gender} ${products[i].type} ${products[i].id - 1}" onclick="showModal(${products[i].id - 1})">
        <div class="card">
            <div class="card-img">
                <img src="${products[i].image}" alt="">
            </div>
            <div class="card-body">
                <h3 class="card-title">${products[i].name}</h3>
                <p class="card-des">${products[i].des}
                </p>
                <p class="card-price">$ ${products[i].price}</p>
                <button class="card-btn">Add To Cart</button>
            </div>
        </div>
    </div>`
    }
    $("#content-box").html(html);
    //function for scolly auto when we click on card
    const cardclick = document.querySelectorAll('.card')
    cardclick.forEach((card) => {
        card.addEventListener('click', () => {
            window.scrollTo({ top: 600, behavior: 'smooth' });
        })
    })

})
// end function of shop page to show products

// function for search
function searchProduct(input) {
    let value = $('#' + input.id).val()
    html = ''
    for (let i = 0; i < products.length; i++) {
        if (products[i].type.includes(value) || products[i].name.toLocaleLowerCase().includes(value.toLocaleLowerCase())) {
            html += `<div class="card-content ${products[i].type} ${products[i].gender} " onclick="showModal(${products[i].id - 1})">
            <div class="card">
                <div class="card-img">
                    <img src="${products[i].image}" alt="">
                </div>
                <div class="card-body">
                    <h3 class="card-title">${products[i].name}</h3>
                    <p class="card-des">${products[i].des}
                    </p>
                    <p class="card-price">$ ${products[i].price}</p>
                    <button class="card-btn">Add To Cart</button>
                </div>
            </div>
        </div>`
        }
    }
    if (html == '') {
        $("#content-box").html(`<p>No product found</p>`);
    } else {
        $("#content-box").html(html);
    }
}

// end function for search

// strat function for category 

function fillter(cat) {
    $(".card-content").css('display', 'none')
    if (cat == 'all') {
        $(".card-content").css('display', 'flex')
    } else if ($("." + cat)) {
        $("." + cat).css('display', 'flex')
    }
}

//function for modal
function showModal(index) {
    var modal = ''
    $(".modal-container").css('display', 'flex')
    modal += `<div class="modal">
     <div class="modal-img">
         <img src="${products[index].image}" alt="">
     </div>
     <div class="card-info">
         <h2>Name: ${products[index].name}</h2>
         <h3>Price: ${products[index].price}$</h3>
         <h4>Details:</h4>
         <p>${products[index].des}</p>
         <button class="modal-btn" onclick="addToCart(${index})">Add to cart</button>
         <button class="modal-close" onclick="closeModal()">Close</button>
     </div>
 </div>`
    $("#modal-container").html(modal);
}

// function for close modal
function closeModal() {
    $(".modal-container").css('display', 'none')
}


let cart = [];

function addToCart(index) {
    let pass = true;

    for (let i = 0; i < cart.length; i++) {
        if (index === cart[i].index) {
            console.log("found sane");
            pass = false;
            cart[i].amount++;
        }
    }


    if (pass) {
        let obj = {
            index: index,
            id: products[index].id,
            name: products[index].name,
            price: products[index].price,
            img: products[index].image,
            amount: 1
        };
        cart.push(obj);
    }
    console.log(cart);
    Swal.fire({
        icon: 'success',
        title: 'Added ' + products[index].name + ' to cart',
    })
    $(".modal-container").css('display', 'none')
    $("#cart-count").css('display', 'block').text(cart.reduce((total, item) => total + item.amount, 0));
}


// function for show cart
function showCart() {
    $(".cart-container").css('display', 'flex')
    renderCart();
}

// function for close cart
function closeCart() {
    $(".cart-container").css('display', 'none')
}

// function for render cart
function renderCart() {
    if (cart.length > 0) {
        let productToCart = '';
        for (let i = 0; i < cart.length; i++) {
            productToCart += `
                <div class="card-item">
                <div class="cart-img">
                    <img src="${cart[i].img}" alt="">
                </div>
                <div class="cart-info">
                    <h2>${cart[i].name}</h2>
                    <h3 class="price-${cart[i].name}" id="price-${i}">$${cart[i].price * cart[i].amount}</h3>
                </div>
                <div class="cart-btn">
                    <i class="fa-solid fa-minus" onclick="deninitem('-',${i})"></i>
                    <div class="total-item"><span class="total-amount-${cart[i].name}" id="total-amount-${i}">${cart[i].amount}</span></div>
                    <i class="fa-solid fa-plus" onclick="deninitem('+',${i})""></i> 
                </div>
            </div>`
        }
        $("#cart-item").html(productToCart);
        $(".container-checkout").css('display', 'flex')

        let totalPrice = cart.reduce((total, item) => total + (item.price * item.amount), 0)
        $(".total-price-amount").text("$" + totalPrice)

    }

    if (cart.length === 0) {
        $("#cart-item").html('<p class= "not-found">Not found froduct!!</p>');
        $(".container-checkout").css('display', 'none')
    }



}

function deninitem(action, index) {
    if (action == '-') {
        if (cart[index].amount > 0) {
            cart[index].amount--;
            $("#total-amount-" + index).text(cart[index].amount);
            $("#price-" + index).text(cart[index].amount * cart[index].price);
            if (cart[index].amount <= 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Are you sure to delete ' + cart[index].name,
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Delete',
                    cancelButtonText: 'Cancel',
                }).then((res) => {
                    if (res.isConfirmed) {
                        cart.splice(index, 1);
                        renderCart();
                    } else {
                        cart[index].amount++;
                        renderCart();
                    }
                })
            }
        }


    }

    if (action == '+') {
        cart[index].amount++;
        $("#total-amount-" + index).text(cart[index].amount);
        $("#price-" + index).text(cart[index].amount * cart[index].price);
    }
    $("#cart-count").css('display', 'block').text(cart.reduce((total, item) => total + item.amount, 0));
    let totalPrice = cart.reduce((total, item) => total + (item.price * item.amount), 0)
    $(".total-price-amount").text("$" + totalPrice)

}

function goToCheckout() {
    window.location.href = "checkoutpage.html"
    localStorage.setItem('order', JSON.stringify(cart));
}


// end shoppage

// start checkoutpage

function openForm() {
    $(".form-container").css('display', 'flex')

}





// start checkoutpage

// let customer_address = [];

function getInformationCustomer() {
    information = {
        name: "Name : " + $("#name").val(),
        phone: "Phone : " + $("#phone").val(),
        address: "Address : " + $("#address").val(),


    }
    // customer_address.push(information);
    $('.ad-name').text(information.name)
    $('.ad-phone').text(information.phone)
    $('.ad-ad').text(information.address)


    $(".form-container").css('display', 'none')
}

//get information form local storage
let odered = JSON.parse(localStorage.getItem('order'))

function showOder() {
    oder = '';
    for (let i = 0; i < odered.length; i++) {
        oder += `
        <div class="card-item">
                <div class="cart-img">
                    <img src="${odered[i].img}" alt="">
                </div>
                <div class="cart-info">
                    <h2>${odered[i].name}</h2>
                    <h3 class="price-${odered[i].name}" id="price-${i}">$${odered[i].price * odered[i].amount}</h3>
                </div>
                <div class="cart-btn">
                    <i class="fa-solid fa-minus" onclick="deninitemForcheckout('-',${i})"></i>
                    <div class="total-item"><span class="total-amount-${odered[i].name}" id="total-amount-${i}">${odered[i].amount}</span></div>
                    <i class="fa-solid fa-plus" onclick="deninitemForcheckout('+',${i})""></i> 
                </div>
            </div>
            `

        $('.order-item').html(oder)

    }
    if (odered.length === 0) {
        $('.order-item').html('<p class= "not-found">Do not have froduct!!</p>');
    }


}

function deninitemForcheckout(action, index) {
    if (action == '-') {
        if (odered[index].amount > 0) {
            odered[index].amount--;
            $("#total-amount-" + index).text(odered[index].amount);
            $("#price-" + index).text(odered[index].amount * odered[index].price);
            localStorage.setItem('order', JSON.stringify(odered));
            if (odered[index].amount <= 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Are you sure to delete ' + odered[index].name,
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Delete',
                    cancelButtonText: 'Cancel',
                }).then((res) => {
                    if (res.isConfirmed) {
                        odered.splice(index, 1);
                        localStorage.setItem('order', JSON.stringify(odered));
                        showOder()

                    } else {
                        odered[index].amount++;
                        localStorage.setItem('order', JSON.stringify(odered));
                        showOder()
                        let totalPrice = odered.reduce((total, item) => total + (item.price * item.amount), 0)
                        $(".total-price-amount-checkout").text("$" + totalPrice)
                    }

                })
            }
        }
    }
    if (action == '+') {
        odered[index].amount++;
        $("#total-amount-" + index).text(odered[index].amount);
        $("#price-" + index).text(odered[index].amount * odered[index].price);
        localStorage.setItem('order', JSON.stringify(odered));

    }
    totalPrice = odered.reduce((total, item) => total + (item.price * item.amount), 0)
    $(".total-price-amount-checkout").text("$" + totalPrice)

}

showOder();

// show total price in checkout
let totalPrice = odered.reduce((total, item) => total + (item.price * item.amount), 0)
$(".total-price-amount-checkout").text("$" + totalPrice)


//function for payment method 

function openFormPayment() {
    let listPay = document.querySelectorAll('.payment-item')

    for (let i = 0; i < listPay.length; i++) {
        listPay[i].addEventListener('click', () => {
            listPay.forEach((item) => {
                item.classList.remove('active')
            })
            listPay[i].classList.add('active')
            //show Qrcode 
            if (listPay[0].classList.contains('active')) {
                $('.QRpayment').addClass('show')

            } else {
                $('.QRpayment').removeClass('show')
            }

            if (listPay[1].classList.contains('active')) {
                $('.creditpayment').css('display', 'flex')
            }else {
                $('.creditpayment').css('display', 'none')
            }

            if(listPay[2].classList.contains('active')){
                $('.clashpayment' ).css('display', 'block')
            } else 
            {
                $('.clashpayment').css('display', 'none')
            }
        })
    }

}


// function for focus searchinput when we click on search icon
function focussearchinput() {
    const searchIcon = document.querySelector('.fa-magnifying-glass')

searchIcon.addEventListener('click', () => {
    $('#search').focus()
})
}







window.onload = openFormPayment;