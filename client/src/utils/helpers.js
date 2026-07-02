export const formatCurrency = (value) => `$${Number(value || 0).toFixed(2)}`;
export const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-');
