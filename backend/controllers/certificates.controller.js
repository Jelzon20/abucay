import Certificate from '../models/certificates.model.js';

// Create certificate
export const createCertificate = async (req, res) => {
  try {
    const certificate = new Certificate(req.body);
    await certificate.save();
    res.status(201).json(certificate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all certificates
export const getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find()
      .populate('requestor', 'first_name middle_name last_name cur_address purok length_of_stay age precinct_no civil_status birthday') // populate fields from Resident
      .sort({ createdAt: -1 });
    res.status(200).json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single certificate
export const getCertificateById = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id)
      .populate('requestor', 'first_name middle_name last_name cur_address, purok');
    if (!certificate) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(certificate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCertificatesByUserId = async (req, res) => {
  try {
    const { id } = req.params;

    const certificates = await Certificate.find({ requestor: id })
      .sort({ createdAt: -1 });

    return res.status(200).json(certificates);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Update certificate
export const updateCertificate = async (req, res) => {
  try {
    const updated = await Certificate.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: 'Certificate not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete certificate
export const deleteCertificate = async (req, res) => {
  try {
    const deleted = await Certificate.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Certificate not found' });
    res.status(200).json({ message: 'Certificate deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
