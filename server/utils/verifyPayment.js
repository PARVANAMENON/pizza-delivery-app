const verifyPayment = async (paymentId, amount) => {
  return { success: true, paymentId, amount };
};

module.exports = verifyPayment;
