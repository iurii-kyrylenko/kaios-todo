const MAX_ITEMS = 3;

let id = 1;
const getId = () => id++;

export const getSelectedDown = (selected, length) =>
  selected === length ? 0 : selected + 1;

export const getSelectedUp = (selected, length) =>
  selected === 1 ? 0 : !selected ? length : selected - 1;

export const getSelectedDelete = (selected, length) => {
  if (length === 1) {
    return 0;
  }
  if (selected === length) {
    return selected - 1;
  }
  return selected;
}
  
export const getOffsetDown = (offset, selected, length) => {
  if (!selected) {
    return 0;
  }
  if (selected !== length && selected === offset + MAX_ITEMS) {
    return offset + 1;
  }
  return offset;
}

export const getOffsetUp = (offset, selected, length) => {
  if (offset && selected === offset + 1) {
    return offset - 1;
  }
  if (selected === 1 && length - MAX_ITEMS >= 0) {
    return length - MAX_ITEMS;
  }
  return offset;
}

export const getOffsetCreate = length => Math.max(0, length - MAX_ITEMS + 1);

export const getOffsetDelete = (offset, length) => {
  if (offset + MAX_ITEMS === length) {
    return Math.max(0, offset - 1);
  }
  return offset;
}

export const getTodosCreate = (todos, input) =>
  [...todos, { id: getId(), name: input, completed: false }];

export const getTodosDelete = (todos, selected) => {
  const fst = todos.slice(0, selected - 1);
  const snd = todos.slice(selected);
  return [...fst, ...snd];
}

export const getTodosToggle = (todos, selected) => {
  const fst = todos.slice(0, selected - 1);
  const snd = todos.slice(selected);
  const target = todos[selected - 1];
  return [
    ...fst,
    { ...target, completed: !target.completed },
    ...snd
  ];
}

export const getTodosSlice = (todos, offset) =>
  todos.slice(offset, offset + MAX_ITEMS);
