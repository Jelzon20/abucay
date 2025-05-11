import Document from "../models/document.model.js";

export const test = (req, res) => {
    res.json({message: 'API is working'});
}

export const addDocument = async (req, res, next) => {

    const { title, description, files } = req.body;

    const newDocument = new Document({
      ...req.body,
    });
    try {
      await newDocument.save();
      res.json('New document has been added successfully.');
    } catch (error) {
      next(error);
    }
  };

  export const getDocuments = async (req, res, next) => {
    try {
      const { page, search } = req.query;
      const pageNumber = parseInt(page, 10) || 1;
      const pageSize = 12;
  
      // Search and pagination logic
      const documents = await Document.find({ title: new RegExp(search, 'i') })
        .sort({ updatedAt: -1 })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize);
      const total = await Document.countDocuments({ title: new RegExp(search, 'i') });
  
      // Log the response to inspect the data
  
      res.json({
        documents,
        total,
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching documents", error: error.message });
    }
  };

  export const updateDocument = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, description, files } = req.body;
  
      const updatedDocument = await Document.findByIdAndUpdate(
        id,
        {title: title,
        description: description,
        files: files},
        { new: true, runValidators: true }
      );
      
      if (!updatedDocument) {
        return res.status(404).json({ message: "Document not found" });
      }
  
      res.status(200).json({ message: "Document updated successfully", document: updatedDocument });
    } catch (error) {
      res.status(500).json({ message: "Error updating document", error: error.message });
    }
   
  };

  export const deleteDocument = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await Document.findByIdAndDelete(id);
  
      if (!result) {
        return res.status(404).json({ message: "Document not found" });
      }
  
      res.status(200).json({ message: "Document deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting document", error: error.message });
    }
  };