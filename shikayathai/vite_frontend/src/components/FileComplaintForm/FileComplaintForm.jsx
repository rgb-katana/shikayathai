import { useState, useEffect } from 'react';
import { useModal } from '../../context/ModalContext';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';

const FileComplaintForm = () => {
  const { hideModal } = useModal();
  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('');
  const [brandPhone, setBrandPhone] = useState('');
  const [brandEmail, setBrandEmail] = useState('');
  const [brandWebsite, setBrandWebsite] = useState('');
  const [description, setDescription] = useState('');
  const [privateDetails, setPrivateDetails] = useState('');
  const [photos, setPhotos] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('api/companies/');
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };
    fetchCompanies();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('author', auth?.name);
    formData.append('company', company);
    formData.append('title', title);
    formData.append('brandPhone', brandPhone);
    formData.append('brandEmail', brandEmail);
    formData.append('brandWebsite', brandWebsite);
    formData.append('description', description);
    formData.append('privateDetails', privateDetails);
    photos.forEach((photo, index) => formData.append(`photos[${index}]`, photo));
    documents.forEach((document, index) => formData.append(`documents[${index}]`, document));
    try {
      await axios.post('api/complaints/create/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${auth?.access}`
        }
      });
      hideModal();
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  const handleFileChange = (event, setFiles) => {
    setFiles(Array.from(event.target.files));
  };

  return (
    <div>
      <div className="modal-header">
        <h5 className="modal-title">File a Complaint</h5>
        <button type="button" className="btn-close" onClick={hideModal} aria-label="Close"></button>
      </div>
      <div className="modal-body">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="company" className="form-label">Company Name</label>
            <input type="text" className="form-control" id="company" value={company} onChange={(e) => setCompany(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="brandPhone" className="form-label">Brand Phone</label>
            <input type="text" className="form-control" id="brandPhone" value={brandPhone} onChange={(e) => setBrandPhone(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="brandEmail" className="form-label">Brand Email</label>
            <input type="email" className="form-control" id="brandEmail" value={brandEmail} onChange={(e) => setBrandEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="brandWebsite" className="form-label">Brand Website</label>
            <input type="url" className="form-control" id="brandWebsite" value={brandWebsite} onChange={(e) => setBrandWebsite(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Complaint Description</label>
            <p className="form-description">
                Include any details that will help Company to identify your case resolve your issue as soon as possible. 
                E.g. order id, receipt number, payment amount etc. 
                Please note that the complaint description is public, please don’t include any personal details.
            </p>
            <textarea 
                className="form-control" 
                id="description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="privateDetails" className="form-label">Private Details</label>
            <textarea className="form-control" id="privateDetails" value={privateDetails} onChange={(e) => setPrivateDetails(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="photos" className="form-label">Photos and Images</label>
            <p className="form-description">
                please attache any valuable images or photos: payment screenshot, the photo of the broken product etc.
                Please note that the photos are public
            </p>
            <input type="file" className="form-control" id="photos" onChange={(e) => handleFileChange(e, setPhotos)} multiple />
          </div>
          <div className="mb-3">
            <label htmlFor="documents" className="form-label">Documents</label>
            <p className="form-description">
                Please attache any documents.
                All the document are private.
            </p>
            <input type="file" className="form-control" id="documents" onChange={(e) => handleFileChange(e, setDocuments)} multiple />
          </div>
          <button type="submit" className="btn btn-primary">Add complaint</button>
        </form>
      </div>
    </div>
  );
};

export default FileComplaintForm;
