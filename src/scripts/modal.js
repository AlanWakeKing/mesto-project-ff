//Функция открытия модального окна
export function openPopup(popup) {
	setTimeout(() => {
		popup.classList.add('popup_is-opened');
	},100);
	popup.classList.add('popup_is-animated');
	document.addEventListener('keydown', handleEscClose);
	document.addEventListener('click', handleOverlayClose);
};

//Функция закрытия модального окна
export function closePopup(popup) {
setTimeout(() => {
	popup.classList.remove('popup_is-animated');
}, 600);
popup.classList.remove('popup_is-opened');
document.removeEventListener('keydown', handleEscClose);
document.removeEventListener('click', handleOverlayClose);
};

//Функция закрытия модального окна по Esc
export function handleEscClose(evt) {
	if (evt.key === 'Escape') {
		closePopup(document.querySelector('.popup_is-opened'));
	}
};

export function handleOverlayClose(evt) {
	if(evt.target.classList.contains('popup')) {
		closePopup(evt.target);
	}
};