let goods = [];

let filterArr = [];

function createGoodElem(arr) {
    arr.forEach(element => {
        document.querySelector('main').innerHTML += `
        <div class="item">
             <img src="${element.image}" alt="">
             <h3>${element.name}</h3>
             <p>${element.price}$</p>
             <div class="groupBtn">
                 <button class="edit">Edit</button>
                 <button class="delete">Delete</button>
             </div>
         </div>
         `;

    });
}

async function getGoods() {
    fetch('https://632a072a713d41bc8e6941d6.mockapi.io/krok/data')
        .then(res => res.json())
        .then(data => {
            goods = data;
            document.querySelector('main').replaceChildren();
            createGoodElem(goods);
            getTotalPrice(goods)
        })
        .catch(err => console.log(err));
}


function getTotalPrice(arr) {
    let amount = arr.reduce((total, x) => {
        return total + x.price;
    }, 0);
    document.querySelector('#totalPrice').textContent = `${amount}$`;
}

function sort(arr) {
    arr.sort((a, b) => {
        return b.price - a.price;
    });
    document.querySelector('main').replaceChildren();
    createGoodElem(arr);
}

function sortByPrice() {
    if (document.querySelector('#byPrice').checked) {
        if (document.querySelector('#searchPlc').value) {
            sortByPrice(filterArr);
        } else {
            sortByPrice(goods);
        }
    } else if (!document.querySelector('#searchPlc').value) {
        document.querySelector('main').replaceChildren();
        getGoods();
    }
}


const searchInput = document.querySelector('#searchPlc');
searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();
    const filteredArr = goods.filter((good) => {
        return (good.name.toLowerCase().includes(value)
        );
    });
    document.querySelector('main').replaceChildren();
    createGoodElem(filteredArr);
    getTotalPrice(filteredArr);
});

getGoods();