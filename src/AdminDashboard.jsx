import { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { QRCode } from 'react-qr-code';
import html2canvas from 'html2canvas';
import { FaTrash, FaDownload, FaShare, FaPlus, FaSpinner } from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [awards, setAwards] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    place: '',
    achievementName: '',
    achievementDescription: '',
    certificateNumber:'',
    certificateLink: ''
  });
  const [selectedAward, setSelectedAward] = useState(null);

  useEffect(() => {
    fetchAwards();
  }, []);

  const fetchAwards = async () => {
    const querySnapshot = await getDocs(collection(db, 'awards'));
    const awardsData = [];
    querySnapshot.forEach((doc) => {
      awardsData.push({ id: doc.id, ...doc.data() });
    });
    setAwards(awardsData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, 'awards'), {
        ...formData,
        createdAt: new Date().toISOString(),
        awardId: Date.now().toString()
      });
      setFormData({
        name: '',
        age: '',
        place: '',
        achievementName: '',
        achievementDescription: '',
        certificateNumber:'',
        certificateLink: ''
      });
      setShowForm(false);
      fetchAwards();
      alert('Award created successfully!');
    } catch (error) {
      console.error('Error adding award:', error);
      alert('Error creating award');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this award?')) {
      await deleteDoc(doc(db, 'awards', id));
      fetchAwards();
    }
  };

  const downloadQR = async (award) => {
    const qrElement = document.getElementById(`qr-${award.id}`);
    if (qrElement) {
      const canvas = await html2canvas(qrElement);
      const link = document.createElement('a');
      link.download = `${award.name}-qr.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const shareQR = async (award) => {
    const qrElement = document.getElementById(`qr-${award.id}`);
    if (qrElement) {
      const canvas = await html2canvas(qrElement);
      canvas.toBlob((blob) => {
        if (navigator.share) {
          navigator.share({
            title: `${award.name}'s Award`,
            text: `Check out ${award.name}'s achievement!`,
            files: [new File([blob], 'qr.png', { type: 'image/png' })]
          });
        } else {
          alert('Share not supported on this browser');
        }
      });
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Achievers Admin Dashboard</h1>
        <button onClick={() => setShowForm(!showForm)} className="create-btn">
          <FaPlus /> Create New Award
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Create New Award</h2>
            <form onSubmit={handleSubmit} className="award-form">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Age"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Place/City"
                value={formData.place}
                onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Achievement Name"
                value={formData.achievementName}
                onChange={(e) => setFormData({ ...formData, achievementName: e.target.value })}
                required
              />
              <textarea
                placeholder="Achievement Description"
                value={formData.achievementDescription}
                onChange={(e) => setFormData({ ...formData, achievementDescription: e.target.value })}
                rows="4"
                required
              />
              <input
                type="text"
                placeholder="Certificate Number"
                value={formData.certificateNumber}
                onChange={(e) => setFormData({ ...formData, certificateNumber: e.target.value })}
                required
              />
              <input
                type="url"
                placeholder="Certificate Link (Google Drive)"
                value={formData.certificateLink}
                onChange={(e) => setFormData({ ...formData, certificateLink: e.target.value })}
                required
              />
              <div className="form-buttons">
                <button type="submit" disabled={loading}>
                  {loading ? <FaSpinner className="spinner" /> : 'Create Award'}
                </button>
                <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="awards-grid">
        {awards.map((award) => (
          <div key={award.id} className="award-card">
            {/* <div className="award-card-header">
              <h3>{award.name}</h3>
              <button onClick={() => handleDelete(award.id)} className="delete-btn">
                <FaTrash />
              </button>
            </div> */}
            <div className="award-details">
              <p><strong>Age:</strong> {award.age}</p>
              <p><strong>Place:</strong> {award.place}</p>
              <p><strong>Achievement:</strong> {award.achievementName}</p>
              <p><strong>Description:</strong> {award.achievementDescription}</p>
            </div>
            <div className="qr-section">
              <div id={`qr-${award.id}`} className="qr-code">
                <QRCode value={`${window.location.origin}/award/${award.id}`} size={150} />
              </div>
              <div className="qr-actions">
                <button onClick={() => downloadQR(award)} className="qr-btn">
                  <FaDownload /> Download QR
                </button>
                <button onClick={() => shareQR(award)} className="qr-btn">
                  <FaShare /> Share QR
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;