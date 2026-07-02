const Address = require("../models/Address");

// ==============================
// Add Address
// ==============================

exports.addAddress = async (req, res) => {
  try {

    const { name, phone, houseName, street, city, state } = req.body;

    const address = await Address.create({
      user: req.user._id,
      name,
      phone,
      houseName,
      street,
      city,
      state,
    });

    res.status(201).json({
      success: true,
      message: "Address Added Successfully",
      address,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==============================
// Get User Addresses
// ==============================

exports.getAddresses = async (req, res) => {
  try {

    const addresses = await Address.find({
      user: req.user._id,
    });

    res.status(200).json({
      success: true,
      addresses,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==============================
// Update Address
// ==============================

exports.updateAddress = async (req, res) => {
  try {

    const address = await Address.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Address Updated",
      address,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==============================
// Delete Address
// ==============================

exports.deleteAddress = async (req, res) => {
  try {

    const address = await Address.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Address Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};