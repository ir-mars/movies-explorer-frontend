import {
  QTY_INITIAL_CARDS_FOR_PC, //  ПК
  QTY_INITIAL_CARDS_FOR_PHONE, // мобилы
  QTY_INITIAL_CARDS_FOR_TABLET, // для планшетов
  QTY_CARDS_BUTTON_MORE_FOR_PC, // ЕЩЕ - ПК
  QTY_CARDS_BUTTON_MORE_FOR_TABLET, // ЕЩЕ - планшеты
  QTY_CARDS_BUTTON_MORE_FOR_PHONE, // ЕЩЕ - мобилы
  WIDTH_FOR_PC, // эндпоинт ПК
  WIDTH_FOR_PHONE, // эндпоинт мобил
  WIDTH_FOR_TABLET, // эндпоинт для планшетов
  WIDTH_FOR_SMALL_PC,
  QTY_CARDS_BUTTON_MORE_FOR_SMALL_PC
} from './constants';

export function timeConvertor (duration) {
  const minutes = duration % 60;
  const hours = (duration - minutes) / 60;
  if (hours < 1) {
    return `${minutes}м`;
  } else {
    return `${hours}ч ${minutes}м`;
  }
};

//сколько карточек показывать
export function calcQtyCards () {
  const widthWindow = window.innerWidth;
  let qtyInitialCards, qtyCardsButtonMore;

  if (widthWindow >= WIDTH_FOR_PC) {
    qtyCardsButtonMore = QTY_CARDS_BUTTON_MORE_FOR_PC;
    qtyInitialCards = QTY_INITIAL_CARDS_FOR_PC;

  } else if (widthWindow >= WIDTH_FOR_SMALL_PC) {
    qtyCardsButtonMore = QTY_CARDS_BUTTON_MORE_FOR_SMALL_PC;
    qtyInitialCards = QTY_INITIAL_CARDS_FOR_PC;

  } else if (widthWindow >= WIDTH_FOR_TABLET) {
    qtyCardsButtonMore = QTY_CARDS_BUTTON_MORE_FOR_TABLET;
    qtyInitialCards = QTY_INITIAL_CARDS_FOR_TABLET;

  } else if (widthWindow >= WIDTH_FOR_PHONE) {
    qtyCardsButtonMore = QTY_CARDS_BUTTON_MORE_FOR_PHONE;
    qtyInitialCards = QTY_INITIAL_CARDS_FOR_PHONE;
  }
  return { qtyInitialCards, qtyCardsButtonMore };
}
