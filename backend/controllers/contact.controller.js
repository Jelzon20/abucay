import Contact from "../models/contact.model.js";

// Create contact report
export const createContactReport = async (req, res) => {
  try {
    const contactReport = new Contact(req.body);
    await contactReport.save();

    res.status(201).json(contactReport);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Get all contact requests
export const getContactReports = async (req, res) => {
  try {
    const reports = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update contact request (comments + state)
export const updateContactReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { newComment, state } = req.body;

    const updatePayload = {};

    /* ADD COMMENT (PUSH, NOT REPLACE) */
    if (newComment) {
      updatePayload.$push = {
        comments: {
          message: newComment,
          commentedAt: new Date(),
        },
      };

      // If comment is added, force In-progress
      updatePayload.state = "In-progress";
    }

    /* UPDATE STATE ONLY (Resolve / Close) */
    if (state && !newComment) {
      updatePayload.state = state;
    }

    const updatedReport = await Contact.findByIdAndUpdate(
      id,
      updatePayload,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedReport) {
      return res.status(404).json({
        message: "Contact request not found",
      });
    }

    res.status(200).json(updatedReport);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

