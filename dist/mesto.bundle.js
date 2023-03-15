(()=>{"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(t,o){for(var r=0;r<o.length;r++){var n=o[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,i=function(t,o){if("object"!==e(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==e(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===e(i)?i:String(i)),n)}var i}var o=function(){function e(t,o,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._cardDataObj=t,this._cardSelectorsObj=o,this._openPopupImg=r}var o,r;return o=e,(r=[{key:"_getTemplate",value:function(){return document.querySelector(this._cardSelectorsObj.photoCardTemplateSelector).content.querySelector(this._cardSelectorsObj.photoCardElementSelector).cloneNode(!0)}},{key:"_toggleLike",value:function(e,t){e.classList.toggle(t)}},{key:"_removePhotoCard",value:function(){this._newPhotoCard.remove()}},{key:"_setEventListeners",value:function(){var e=this;this._newPhotoCard.querySelector(this._cardSelectorsObj.photoCardLikeSelector).addEventListener("click",(function(t){e._toggleLike(t.target,e._cardSelectorsObj.photoLikeIsActive)})),this._newPhotoCard.querySelector(this._cardSelectorsObj.photoCardTrashSelector).addEventListener("click",(function(t){e._removePhotoCard(t)})),this._cardImage.addEventListener("click",this._openPopupImg)}},{key:"renderPhotoCard",value:function(){return this._newPhotoCard=this._getTemplate(),this._cardImage=this._newPhotoCard.querySelector(this._cardSelectorsObj.photoCardImageSelector),this._setEventListeners(),this._newPhotoCard.querySelector(this._cardSelectorsObj.photoCardNameSelector).textContent=this._cardDataObj.name,this._cardImage.src=this._cardDataObj.link,this._cardImage.alt=this._cardDataObj.name,this._newPhotoCard}}])&&t(o.prototype,r),Object.defineProperty(o,"prototype",{writable:!1}),e}();function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}function n(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(void 0,i=function(e,t){if("object"!==r(e)||null===e)return e;var o=e[Symbol.toPrimitive];if(void 0!==o){var n=o.call(e,"string");if("object"!==r(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n.key),"symbol"===r(i)?i:String(i)),n)}var i}var i=function(){function e(t,o){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._formSelectorsObj=t,this._singleFormElement=o,this._inputList=Array.from(this._singleFormElement.querySelectorAll(this._formSelectorsObj.formInputSelector)),this._buttonSubmit=this._singleFormElement.querySelector(this._formSelectorsObj.formSubmitButtonSelector)}var t,o;return t=e,(o=[{key:"_showInputError",value:function(e,t){var o=this._singleFormElement.querySelector(".".concat(e.id,"-error"));e.classList.add(this._formSelectorsObj.inputElementErrorClass),o.classList.add(this._formSelectorsObj.errorMessageActiveClass),o.textContent=t}},{key:"_hideInputError",value:function(e){var t=this._singleFormElement.querySelector(".".concat(e.id,"-error"));e.classList.remove(this._formSelectorsObj.inputElementErrorClass),t.classList.remove(this._formSelectorsObj.errorMessageActiveClass),t.textContent=""}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?(this._buttonSubmit.setAttribute("disabled","disabled"),this._buttonSubmit.classList.add(this._formSelectorsObj.submitButtonDisabledClass)):(this._buttonSubmit.removeAttribute("disabled"),this._buttonSubmit.classList.remove(this._formSelectorsObj.submitButtonDisabledClass))}},{key:"_setEventListener",value:function(){var e=this;this._toggleButtonState(),this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._checkInputValidity(t),e._toggleButtonState()}))})),this._singleFormElement.addEventListener("reset",(function(){setTimeout((function(){e._toggleButtonState(),e._inputList.forEach((function(t){e._hideInputError(t)}))}),0)}))}},{key:"enableValidation",value:function(){this._singleFormElement.addEventListener("submit",(function(e){e.preventDefault()})),this._setEventListener()}}])&&n(t.prototype,o),Object.defineProperty(t,"prototype",{writable:!1}),e}(),s=document.querySelector(".elements"),a=document.querySelector(".profile__add-button"),u=document.querySelector(".popup_type_photoAdd"),l=document.querySelector("#photoAdd-form"),c=document.querySelector(".popup__input_type_photoAdd-place"),p=document.querySelector(".popup__input_type_photoAdd-link"),d=document.querySelector(".popup_type_photoFullScreen"),m=d.querySelector(".popup__image_type_photoFullScreen"),_=d.querySelector(".popup__substring_type_photoFullScreen"),h=document.querySelector(".profile__edit-button"),f=document.querySelector(".popup_type_editForm"),y=document.querySelector("#profileEdit-form"),v=document.querySelector(".profile__name"),b=document.querySelector(".profile__description"),S=document.querySelector(".popup__input_type_editForm-name"),g=document.querySelector(".popup__input_type_editForm-description"),k={photoCardTemplateSelector:"#photo-card",photoCardElementSelector:".element",photoCardNameSelector:".element__name",photoCardLikeSelector:".element__like",photoCardTrashSelector:".element__trash",photoCardImageSelector:".element__image",photoLikeIsActive:"element__like_active",popupIsFullScreen:".popup_type_photoFullScreen"},E={formInputSelector:".popup__input",formSubmitButtonSelector:".popup__submit",inputElementErrorClass:"popup__input_type_error",errorMessageActiveClass:"popup__input-error_active",submitButtonDisabledClass:"popup__submit_type_disabled"};function C(e){m.src=e.target.src,m.alt=e.target.alt,_.textContent=e.target.alt,L(d)}function L(e){e.classList.add("popup_opened"),document.addEventListener("keydown",w)}function j(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",w)}function q(e){e.reset()}function w(e){"Escape"===e.key&&j(document.querySelector(".popup_opened"))}function O(e,t){e.prepend(t)}function I(e){return new o(e,k,C).renderPhotoCard()}function P(e){Array.isArray(e)?e.forEach((function(e){O(s,I(e))})):O(s,I(e))}document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("click",(function(t){var o=t.target.classList;(o.contains("popup__close")||o.contains("popup"))&&j(e)}))})),P([{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}]),a.addEventListener("click",(function(){q(l),L(u)})),l.addEventListener("submit",(function(e){e.preventDefault();var t={};t.name=c.value,t.link=p.value,q(l),P(t),j(u)})),h.addEventListener("click",(function(){q(y),setTimeout((function(){S.value=v.textContent,g.value=b.textContent,L(f)}),0)})),y.addEventListener("submit",(function(e){e.preventDefault(),v.textContent=S.value,b.textContent=g.value,q(y),j(f)})),Array.from(document.querySelectorAll(".popup__form")).forEach((function(e){new i(E,e).enableValidation()}))})();