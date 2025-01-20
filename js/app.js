const paths = document.querySelectorAll('.map svg path');
const popup = document.querySelector('.popup');
const popupTitle = popup.querySelector('#popup-title');

// Функция для отображения попапа с данными региона
function showPopup(id, event) {
  const pathElement = event.target;
  const regionName = pathElement.getAttribute('name');

  if (regionName) {
    // Устанавливаем текст заголовка попапа на значение атрибута name
    popupTitle.textContent = regionName;
  }

  // Получаем размер попапа
  const popupHeight = popup.offsetHeight;
  const popupWidth = popup.offsetWidth;

  const cursorX = event.clientX;
  const cursorY = event.clientY;

  // Проверяем, не выходит ли попап за пределы экрана
  const screenHeight = window.innerHeight;
  const screenWidth = window.innerWidth;

  // Вычисляем начальные координаты (справа сверху от курсора)
  let popupLeft = cursorX + 10; // Смещение вправо
  let popupTop = cursorY - popupHeight - 260; // Смещение вверх

  // Если попап выходит за верхнюю границу экрана, опускаем его ниже курсора
  if (popupTop < 0) {
    popupTop = cursorY + 10; // Смещение вниз
  }

  // Если попап выходит за правую границу экрана, показываем его слева от курсора
  if (popupLeft + popupWidth > screenWidth) {
    popupLeft = cursorX - popupWidth - 10; // Смещение влево
  }

  // Позиционируем попап
  popup.style.left = `${popupLeft}px`;
  popup.style.top = `${popupTop}px`;

  // Показываем попап
  popup.style.display = 'flex';
}

function hidePopup() {
  popup.style.display = 'none';
}

paths.forEach(path => {
  path.addEventListener('mouseover', (event) => {
    showPopup(path.id, event);
  });

  path.addEventListener('mouseout', hidePopup);
});

//Навигация
const menuItems = document.querySelectorAll('.mini__header-content-nav-element');

if (menuItems.length > 1) {
  const svgArrow = `
    <svg xmlns="http://www.w3.org/2000/svg" width="5" height="15" viewBox="0 0 5 15" fill="none">
        <path d="M4.57031 7.82031C4.6224 7.8724 4.64844 7.93229 4.64844 8C4.64844 8.06771 4.6224 8.1276 4.57031 8.17969L0.929688 11.8203C0.877604 11.8724 0.817708 11.8984 0.75 11.8984C0.682292 11.8984 0.622396 11.8724 0.570312 11.8203L0.179688 11.4297C0.127604 11.3776 0.101562 11.3177 0.101562 11.25C0.101562 11.1823 0.127604 11.1224 0.179688 11.0703L3.25 8L0.179688 4.92969C0.127604 4.8776 0.101562 4.81771 0.101562 4.75C0.101562 4.68229 0.127604 4.6224 0.179688 4.57031L0.570312 4.17969C0.622396 4.1276 0.682292 4.10156 0.75 4.10156C0.817708 4.10156 0.877604 4.1276 0.929688 4.17969L4.57031 7.82031Z" fill="#B5BDC2" style="fill:#B5BDC2;fill:color(display-p3 0.7098 0.7412 0.7608);fill-opacity:1;"/>
    </svg>
    `;

  menuItems.forEach((item, index) => {
    if (index > 0) {
      item.insertAdjacentHTML('beforebegin', svgArrow);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('open-select');
  const select = document.getElementById('region-select');

  button.addEventListener('click', () => {
    select.focus(); // Устанавливаем фокус на select
    select.size = select.options.length; // Разворачиваем список
  });

  // Скрытие раскрытого списка при потере фокуса
  select.addEventListener('blur', () => {
    select.size = 1; // Сворачиваем список
  });
});

let select = function () {
  let selectHeader = document.querySelectorAll('.select__header');
  let selectItem = document.querySelectorAll('.select__item');

  selectHeader.forEach(item => {
    item.addEventListener('click', selectToggle)
  });

  selectItem.forEach(item => {
    item.addEventListener('click', selectChoose)
  });

  document.addEventListener('click', function(event) {
    let dropdown = document.querySelector('.select.is-active');
    if (dropdown && !dropdown.contains(event.target)) {
      dropdown.classList.remove('is-active');
    }
  });

  function selectToggle() {
    this.parentElement.classList.toggle('is-active');
  }

  function selectChoose() {
    let text = this.innerText,
      select = this.closest('.select'),
      currentText = select.querySelector('.select__current');
    currentText.innerText = text;
    select.classList.remove('is-active');
    select.classList.add('is-chosen');
  }

};

select();

const popupHelp = document.querySelector(".need-help-popup");
const popupOverlay = document.querySelector(".popup-overlay");
const openButton = document.querySelector(".searching-advantages-help");
const popupContent = popupHelp.querySelector(".popup__content");
const form = popupHelp.querySelector(".popup__form");
const body = document.body;


const centerPopup = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop; // Current scroll position
  const windowHeight = window.innerHeight; // Viewport height
  const popupHeight = popupHelp.offsetHeight; // Popup height

  // Calculate the top position to center the popup vertically
  const topPosition = scrollTop + (windowHeight / 2) - (popupHeight / 12);

  // Set the popup's top position
  popupHelp.style.top = `${topPosition}px`;
};
// Функция открытия попапа
const openPopup = () => {
  popupHelp.style.display = "block";
  popupOverlay.style.display = "block";
  body.style.overflow = "hidden";
  body.style.overflow = "hidden"; // Блокировка прокрутки фона
  body.style.backdropFilter = "blur(5px)"; // Размытие фона
  centerPopup();
};

// Функция закрытия попапа
const closePopup = () => {
  popupHelp.style.display = "none";
  popupOverlay.style.display = "none";
  body.style.overflow = ""; // Разблокировка прокрутки фона
  body.style.backdropFilter = ""; // Удаление размытия фона
};

// Открытие попапа при клике на кнопку
openButton.addEventListener("click", openPopup);

popupOverlay.addEventListener("click", closePopup);

// Обработка отправки формы
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Отменяем стандартное поведение формы

  // Проверка валидности полей (можно заменить на более сложную валидацию)
  const inputs = form.querySelectorAll("input, textarea");
  let isValid = true;
  inputs.forEach((input) => {
    if (!input.checkValidity()) {
      isValid = false;
    }
  });

  if (isValid) {
    // Замена контента на сообщение
    popupContent.innerHTML = `
          <div class="popup__message">
          <h2 class="popup__title" style="text-align: center; line-height: 36px">Спасибо! Ваше обращение принято.</h2>
          <p class="popup__title" style="text-align: center; line-height: 36px">С вами свяжется менеджер по подбору недвижимости.</p>
          </div>
        `;

    // Закрытие попапа через 2 секунды
    setTimeout(closePopup, 2000);
  }
});

const input = document.querySelector('.real-estate-form-input');
const dropdown = document.querySelector('.dropdown-search');
const listItems = document.querySelectorAll('.dropdown-search-list-item');

// Function to show the dropdown
function showDropdown() {
  dropdown.classList.add('show');
}

// Function to hide the dropdown
function hideDropdown() {
  dropdown.classList.remove('show');
}

// Show dropdown when input is focused
input.addEventListener('focus', showDropdown);

// Hide dropdown when input loses focus
input.addEventListener('blur', hideDropdown);

// Handle Escape key press
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' && input === document.activeElement) {
    hideDropdown();
    input.blur();
  }
});

// Prevent dropdown from hiding when clicking on items
listItems.forEach(function(item) {
  item.addEventListener('click', function(event) {
    event.stopPropagation();
  });
});

// Handle item selection
listItems.forEach(function(item) {
  item.addEventListener('click', function() {
    input.value = this.textContent;
    hideDropdown();
    input.blur();
  });
});

const buyList = document.querySelector('.real-estate-buy-list');
const showAllButton = document.querySelector('.real-estate-buy-show-all-button');
const buyCountSpan = document.querySelector('.real-estate-buy-count');

// Function to initialize the list and button
function initializeList() {
  const items = buyList.querySelectorAll('.real-estate-buy-item');
  const totalItems = items.length;

  // Update the count in the button
  buyCountSpan.textContent = totalItems;

  // If there are more than 6 items, hide the extras and show the button
  if (totalItems > 6) {
    for (let i = 6; i < totalItems; i++) {
      items[i].style.display = 'none'; // Hide items beyond the first 6
    }
    showAllButton.style.display = 'block'; // Show the button
  } else {
    showAllButton.style.display = 'none'; // Hide the button if there are 6 or fewer items
  }
}

// Function to show all items when the button is clicked
function showAllItems() {
  const items = buyList.querySelectorAll('.real-estate-buy-item');
  items.forEach(item => item.style.display = 'flex'); // Show all items
  showAllButton.style.display = 'none'; // Hide the button after showing all items
}

// Event listener for the button
showAllButton.addEventListener('click', showAllItems);

// Initialize the list when the page loads
initializeList();
