//Функция открытия модального окна
export function openPopup(popup) {
	popup.classList.add('popup_opened');
	document.addEventListener('keydown', handleEscClose);
};

//Функция закрытия модального окна
export function closePopup(popup) {
	popup.classList.remove('popup_opened');
	document.removeEventListener('keydown', handleEscClose);
};

//Функция закрытия модального окна по Esc
export function handleEscClose(evt) {
	if (evt.key === 'Escape') {
		const openedPopup = document.querySelector('.popup_opened');
		closePopup(openedPopup);
	}
};

export function handleOverlayClose(popup) {
	popup.addEventListener('click', (evt) => {
		if(evt.target === popup){
			closePopup(popup);
		}
	})
};