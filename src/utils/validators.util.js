export const validateProductInput = ({ name, category, quantity }) => {
  if (!name || !category || quantity == null) return false;
  return true;
};
