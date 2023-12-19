const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');

// const dummyTransactions = [
//     {id: 1, text: 'Flower', amount: -20},
//     {id: 2, text: 'Salary', amount: 300},
//     {id: 3, text: 'Book', amount: -10},
//     {id: 4, text: 'Camera', amount: 150}
// ];

// Update local storage transactions

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}



const localStorageTransaction = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransaction : [];

// Add Transaction

function addTransaction(e) {
    e.preventDefault();

    if(textInput.value.trim() === '' || amountInput.value === '') {
        alert('Please add a text and amount')
    } else {
        const transaction = {
            id: randomID(),
            text: textInput.value,
            amount: Number(amountInput.value)
        }        

        transactions.push(transaction);
        addTransactionDOM(transaction);

        updateValue();

        updateLocalStorage();

        textInput.value = '';
        amountInput.value = '';
    }
}

// Generate random ID

function randomID() {
    return Math.floor(Math.random() * 100000000)
}

// Add transaction to DOM list

function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');

    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
    ${transaction.text}<span>${sign}${format(Math.abs(transaction.amount))}</span><button class="delete-btn" onclick="removeTransaction(${transaction.id})">
    <i class="fa-solid fa-xmark" style="color: #fff"></i></button>
    `;


    list.appendChild(item);
}

// Updating total, money-plus and money-minus

function updateValue() {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, curV) => (acc + curV), 0);
    
    const income = amounts
    .filter(item => item > 0)
    .reduce((acc, curV) => (acc + curV), 0);

    const expense = amounts
    .filter(item => item < 0)
    .reduce((acc, curV) => (acc + curV), 0) * -1;

    balance.innerText = `IRR ${format(total)}`;
    money_plus.innerText = `IRR ${format(income)}`;
    money_minus.innerText = `IRR ${format(expense)}`;
}

// Remove transaction by ID

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id)

    updateLocalStorage();
    init();
}

// init app

function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionDOM);

    updateValue();
}

init();

// Format number function

function format(number) {
    return (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67
}

// Event Listener

form.addEventListener('submit', addTransaction);
