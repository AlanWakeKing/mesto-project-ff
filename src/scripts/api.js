const config = {
	baseUrl: 'https://nomoreparties.co/v1/pwff-cohort-1',
	headers: {
		authorization: '5baf78f7-af76-4c15-9381-f1f4ae1be00d',
		'Content-Type': 'application/json'
	}
}
const handleResponse = res => {
	if(res.ok) {
			return res.json();
	}
	return Promise.reject(`Ошибка: ${res.status}`);
};
export function getUserData() {
	return fetch(`${config.baseUrl}/users/me`, {
		headers: config.headers
		})
		.then(res => handleResponse(res));
}

export function getCardsArray() {
	return fetch(`${config.baseUrl}/cards`, {
		headers: config.headers
		})
		.then(res => handleResponse(res));
}

export function sendUserData(userData) {
	return fetch(`${config.baseUrl}/users/me`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
				name: userData.name,
				about: userData.about
		})
		})
		.then(res => handleResponse(res));
}

export function sendCardData(cardData) {
	return fetch(`${config.baseUrl}/cards`, {
		method: 'POST',
		headers: config.headers,
		body: JSON.stringify({
				name: cardData.name,
				link: cardData.link
		})
		})
		.then(res => handleResponse(res));
}

export function deleteCardRequest(cardId) {
	return fetch(`${config.baseUrl}/cards/` + cardId, {
		method: 'DELETE',
		headers: config.headers,
	})
	.then(res => handleResponse(res));
}

export function addLikeRequest(cardId) {
	return fetch(`${config.baseUrl}/cards/likes/` + cardId, {
		method: 'PUT',
		headers: config.headers,
	})
	.then(res => handleResponse(res));
}

export function deleteLikeRequest(cardId) {
	return fetch(`${config.baseUrl}/cards/likes/` + cardId, {
		method: 'DELETE',
		headers: config.headers,
	})
	.then(res => handleResponse(res));
}

export function changeUserAvatar(avatarUrl) {
	return fetch(`${config.baseUrl}/users/me/avatar`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
				avatar: avatarUrl,
		})
})
	.then(res => handleResponse(res));
}