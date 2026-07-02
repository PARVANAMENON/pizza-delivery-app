exports.getIngredients = (req, res) => {
  res.status(200).json({ message: 'Ingredient list route ready' });
};

exports.createIngredient = (req, res) => {
  res.status(201).json({ message: 'Create ingredient route ready' });
};
