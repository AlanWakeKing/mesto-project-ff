const showInputError = (formElement, inputElement, errorMessage,inputErrorClass, errorClass) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.add(inputErrorClass);
	errorElement.textContent = errorMessage;
	errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement,inputErrorClass, errorClass) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.remove(inputErrorClass);
	errorElement.classList.remove(errorClass);
	errorElement.textContent = '';
};

function hasInvalidInput(inputList) {
return inputList.some(inputElement => {
	return !inputElement.validity.valid;
})
}

function toggleButtonState(inputList, buttonElement,inactiveButtonClass) {
if(hasInvalidInput(inputList)) {
	disableButton(buttonElement, inactiveButtonClass);
} else {
	enableButton(buttonElement, inactiveButtonClass);
}
}

const disableButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
	buttonElement.classList.add('popup__margin-button');
}

const enableButton = (buttonElement, inactiveButtonClass) => {
	
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
	buttonElement.classList.remove('popup__margin-button');
}

const checkInputValidity = (formElement, inputElement,inputErrorClass, errorClass) => {
if (inputElement.validity.patternMismatch) {
	inputElement.setCustomValidity(inputElement.dataset.errorMessage);
} else {
	inputElement.setCustomValidity("");
}

if (!inputElement.validity.valid) {
		showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
} else {
		hideInputError(formElement, inputElement, inputErrorClass, errorClass);
}
};

const setEventListeners = ({
	formElement,
	inputSelector,
	submitButtonSelector,
	inactiveButtonClass,
	inputErrorClass,
	errorClass
}) => {
	const inputList = Array.from(formElement.querySelectorAll(inputSelector));
	const buttonElement = formElement.querySelector(submitButtonSelector);
	toggleButtonState(inputList, buttonElement, inactiveButtonClass);
	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', function () {
			checkInputValidity(formElement, inputElement,inputErrorClass, errorClass);
			toggleButtonState(inputList, buttonElement,inactiveButtonClass);
		});
	});
};

export function enableValidation(
  {
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
  }) {
    const popupFormsList = Array.from(document.querySelectorAll(formSelector));
    popupFormsList.forEach((formElement) => {
      setEventListeners({
        formElement,
        inputSelector,
        submitButtonSelector,
        inactiveButtonClass,
        inputErrorClass,
        errorClass
      });
    })
}

export function clearValidation(formElement, {
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
  }) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  inputList.forEach(inputElement => {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  });
	const buttonElement = formElement.querySelector(submitButtonSelector);
  disableButton(buttonElement, inactiveButtonClass);
}