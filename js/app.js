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
