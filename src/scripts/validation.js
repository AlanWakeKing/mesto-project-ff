const showInputError = (formElement, inputElement, errorMessage) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.add('form__input_type_error');
	errorElement.textContent = errorMessage;
	errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.remove('form__input_type_error');
	errorElement.classList.remove('form__input-error_active');
	errorElement.textContent = '';
};

function hasInvalidInput(inputList) {
return inputList.some(inputElement => {
	return !inputElement.validity.valid;
})
}

function toggleButtonState(inputList, buttonElement) {
if(hasInvalidInput(inputList)) {
	buttonElement.classList.add('popup__button_disabled');
	buttonElement.setAttribute('disabled', true);
} else {
	buttonElement.classList.remove('popup__button_disabled');
	buttonElement.removeAttribute('disabled');
}
}

// const disableButton = (buttonElement) => {
// buttonElement.classList.add('popup__button_disabled');
// buttonElement.setAttribute('disabled', true);
// }

// const enableButton = (buttonElement) => {
// buttonElement.classList.remove('popup__button_disabled');
// buttonElement.removeAttribute('disabled');
// }

const checkInputValidity = (formElement, inputElement) => {
if (inputElement.validity.patternMismatch) {
	inputElement.setCustomValidity(inputElement.dataset.errorMessage);
} else {
	inputElement.setCustomValidity("");
}

if (!inputElement.validity.valid) {
		showInputError(formElement, inputElement, inputElement.validationMessage);
} else {
		hideInputError(formElement, inputElement);
}
};

const setEventListeners = (formElement) => {
	const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
	const buttonElement = formElement.querySelector('.popup__button');
	toggleButtonState(inputList, buttonElement);
	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', function () {
			checkInputValidity(formElement, inputElement);
			toggleButtonState(inputList, buttonElement);
		});
	});
};

export function enableValidation() {
	const popupFormsList = Array.from(document.querySelectorAll('.popup__form'));
	popupFormsList.forEach(formElement => {
		setEventListeners(formElement);
	})
}

export function clearValidation(formElement, formElementConfig) {
formElementConfig.forEach(formInput => {
	hideInputError(formElement, formInput);
});
const buttonElement = formElement.querySelector('.popup__button');
buttonElement.classList.add('popup__button_disabled');
buttonElement.setAttribute('disabled', true);
}