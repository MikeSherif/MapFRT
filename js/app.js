const paths = document.querySelectorAll('svg path');
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
