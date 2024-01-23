import { browser } from '$app/environment';
import { derived, writable } from 'svelte/store';

export type Card = {
  id: string;
  title: string;
  effort: number;
  impact: number;
  index?: number;
};

const getCardsFromLocalStorage = (): Card[] => {
  if (browser) {
    const cards = localStorage.getItem('cards');
    try {
      return cards ? JSON.parse(cards) : [];
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  return [];
};

const cards = writable<Card[]>(getCardsFromLocalStorage());

cards.subscribe((cards) => {
  if (browser) {
    localStorage.setItem('cards', JSON.stringify(cards));
  }
});

const get = (id: Card['id']) => {
  const { subscribe } = derived(cards, ($cards) => $cards.find((c) => c.id === id));
  return { subscribe, update: update.bind(null, id), remove: remove.bind(null, id) };
};

const add = (card: Omit<Card, 'id'>) => {
  cards.update((cards) => [...cards, { ...card, id: Date.now().toString() }]);
};

const update = (id: Card['id'], card: Partial<Omit<Card, 'id'>>) => {
  cards.update((cards) => {
    const index = cards.findIndex((c) => c.id === id);

    if (index === -1) {
      console.error(`Card with id ${id} not found`);
      return cards;
    }

    cards[index] = { ...cards[index], ...card };
    return cards;
  });
};

const remove = (id: Card['id']) => {
  cards.update((cards) => cards.filter((c) => c.id !== id));
};

export default {
  subscribe: cards.subscribe,
  get,
  update,
  add,
  remove,
};
