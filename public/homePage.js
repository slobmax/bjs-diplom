const logoutButton = new LogoutButton();

logoutButton.action = () => {
	ApiConnector.logout((response) => {
		console.log(response);
		if(response.success) {
			location.reload();
		} 
	});
}

ApiConnector.current((response) => {
	console.log(response);
	if(response.success) {
		ProfileWidget.showProfile(response.data);
	} 
});

const ratesBoard = new RatesBoard();

ApiConnector.getStocks((response) => {
	console.log(response);
	if(response.success) {
		ratesBoard.clearTable();
		ratesBoard.fillTable(response.data);
	} 
});

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
	ApiConnector.addMoney(data, (response) => {		
		if(response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, 'Успешно!');
		} else {			
			moneyManager.setMessage(false, response.error);
		}
	});
}

moneyManager.conversionMoneyCallback = (data) => {
	ApiConnector.convertMoney(data, (response) => {		
		if(response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, 'Успешно!');
		} else {			
			moneyManager.setMessage(false, response.error);
		}
	});
}

moneyManager.sendMoneyCallback = (data) => {
	ApiConnector.transferMoney(data, (response) => {		
		if(response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, 'Успешно!');
		} else {			
			moneyManager.setMessage(false, response.error);
		}
	});
}

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
	console.log(response);
	if(response.success) {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(response.data);
		moneyManager.updateUsersList(response.data);
	} 
});

favoritesWidget.addUserCallback = (data) => {
	ApiConnector.addUserToFavorites(data, (response) => {		
		if(response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
		} else {			
			favoritesWidget.setMessage(false, response.error);
		}
	});
}

favoritesWidget.removeUserCallback = (data) => {
	ApiConnector.removeUserFromFavorites(data, (response) => {		
		if(response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
		} else {			
			favoritesWidget.setMessage(false, response.error);
		}
	});
}