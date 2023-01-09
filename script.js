const incomeArea = document.querySelector('.income-area');
const expenseArea = document.querySelector('.expense-area');
const deleteBtns = document.getElementsByClassName('delete');

const availableMoney = document.querySelector('.available-money');
const addTransaction = document.querySelector('.add-transaction');
const deleteAllBtn = document.querySelector('.delete-all');
const lightBtn = document.querySelector('.light');
const darkBtn = document.querySelector('.dark');

const addTransactionPanel = document.querySelector('.add-transaction-panel');
const transactionNameInput = addTransactionPanel.querySelector('#name');
const transactionAmountInput = addTransactionPanel.querySelector('#amount');
const transactionCategorySelect =
	addTransactionPanel.querySelector('#category');
const saveBtn = addTransactionPanel.querySelector('.save');
const cancelBtn = addTransactionPanel.querySelector('.cancel');

let transactionID = 0;
let moneyArr = [];

const showPanel = () => {
	addTransactionPanel.style.display = 'flex';
};

const closePanel = () => {
	addTransactionPanel.style.display = 'none';
	clearInputs();
};

const clearInputs = () => {
	transactionNameInput.value = '';
	transactionAmountInput.value = '';
	transactionCategorySelect.selectedIndex = 0;
};

const validateForm = () => {
	if (
		transactionNameInput.value === '' &&
		transactionAmountInput.value === '' &&
		transactionCategorySelect.value === 'none'
	) {
		alert('Wypełnij wszystkie pola!');
		return false;
	}

	createNewTransaction();
	countMoney(moneyArr);

	closePanel();
	clearInputs();
};

const createNewTransaction = () => {
	const newTransaction = document.createElement('div');
	newTransaction.classList.add('transaction');
	newTransaction.setAttribute('id', transactionID);

	const amount = transactionAmountInput.value;
	const categoryIcon = getTransactionCategoryIcon(
		transactionCategorySelect.value
	);
	const categoryName = transactionNameInput.value;

	newTransaction.innerHTML = `
	<p class="transaction-name">${categoryIcon} ${categoryName}</p>
	<p class="transaction-amount">${amount}zł <button class="delete" onclick="deleteTransaction(${transactionID})"><i class="fas fa-times"></i></button>
	</p>
	`;

	amount > 0
		? incomeArea.append(newTransaction)
		: expenseArea.append(newTransaction);

	moneyArr.push(parseFloat(amount));
	transactionID++;
};

const getTransactionCategoryIcon = (categoryId) => {
	switch (categoryId) {
		case 'income':
			return '<i class="fas fa-money-bill-wave"></i>';
		case 'shopping':
			return '<i class="fas fa-cart-arrow-down"></i>';
		case 'food':
			return '<i class="fas fa-hamburger"></i>';
		case 'cinema':
			return '<i class="fas fa-film"></i>';
	}
};

const countMoney = (money) => {
	const newMoney = money.reduce((a, b) => a + b, 0);
	availableMoney.textContent = `${newMoney}zł`;
};

const deleteTransaction = (id) => {
	const transactionToDelete = document.getElementById(id);
	const transactionAmount = parseFloat(
		transactionToDelete.childNodes[3].innerText
	);
	const indexOfTransaction = moneyArr.indexOf(transactionAmount);
	moneyArr.splice(indexOfTransaction, 1);

	transactionToDelete.outerHTML = '';

	countMoney(moneyArr);
};

const deleteAllTransactions = () => {
	incomeArea.innerHTML = '<h3>Przychód:</h3>';
	expenseArea.innerHTML = '<h3>Wydatki:</h3>';
	availableMoney.textContent = '0zł';
	moneyArr = [];
};

const changeStyleToDark = () => {
	const root = document.documentElement;
	root.style.setProperty('--first-color', '#14161f');
	root.style.setProperty('--second-color', '#f9f9f9');
	root.style.setProperty('--border-color', 'rgba(255, 255, 255, 0.2');
};

const changeStyleToLight = () => {
	const root = document.documentElement;
	root.style.setProperty('--first-color', '#f9f9f9');
	root.style.setProperty('--second-color', '#14161f');
	root.style.setProperty('--border-color', 'rgba(0, 0, 0, 0.2');
};

addTransaction.addEventListener('click', showPanel);
cancelBtn.addEventListener('click', closePanel);
saveBtn.addEventListener('click', validateForm);
deleteAllBtn.addEventListener('click', deleteAllTransactions);
lightBtn.addEventListener('click', changeStyleToLight);
darkBtn.addEventListener('click', changeStyleToDark);
