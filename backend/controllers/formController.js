// backend/controllers/formController.js
const Form = require("../models/Form");

// Get all forms
exports.getForms = async (req, res) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 });
    res.json(forms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single form
exports.getForm = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.json(form);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create form
exports.createForm = async (req, res) => {
  try {
    const { title, inputs } = req.body;

    if (!title || !inputs || !Array.isArray(inputs)) {
      return res.status(400).json({ message: "Invalid form data" });
    }

    const form = new Form({
      title,
      inputs,
    });

    const savedForm = await form.save();
    console.log(savedForm);
    res.status(201).json(savedForm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update form
exports.updateForm = async (req, res) => {
  try {
    const { title, inputs } = req.body;

    if (!title || !inputs || !Array.isArray(inputs)) {
      return res.status(400).json({ message: "Invalid form data" });
    }

    const form = await Form.findByIdAndUpdate(
      req.params.id,
      { title, inputs },
      { new: true, runValidators: true }
    );

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.json(form);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete form
exports.deleteForm = async (req, res) => {
  try {
    const form = await Form.findByIdAndDelete(req.params.id);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.json({ message: "Form deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Submit form (Optional - for storing responses)
exports.submitForm = async (req, res) => {
  try {
    // Here you could add logic to store form responses if needed
    res.json({ message: "Form submitted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
