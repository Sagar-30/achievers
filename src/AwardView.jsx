import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { FaDownload, FaTrophy, FaUser, FaMapMarkerAlt, FaCalendarAlt, FaAward, FaCheckCircle, FaMedal } from 'react-icons/fa';
import './AwardView.css';

const AwardView = () => {
  const { id } = useParams();
  const [award, setAward] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    fetchAward();
  }, [id]);

  const fetchAward = async () => {
    try {
      const docRef = doc(db, 'awards', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setAward({ id: docSnap.id, ...docSnap.data() });
      }
    } catch (error) {
      console.error('Error fetching award:', error);
    }
    setLoading(false);
  };

  const downloadCertificate = async () => {
    if (!award?.certificateLink) return;
    
    setDownloading(true);
    try {
      let fileId = '';
      if (award.certificateLink.includes('drive.google.com')) {
        const match = award.certificateLink.match(/[-\w]{25,}/);
        if (match) fileId = match[0];
      }
      
      const downloadUrl = fileId 
        ? `https://drive.google.com/uc?export=download&id=${fileId}`
        : award.certificateLink;
      
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${award.name.replace(/\s/g, '_')}_Certificate.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading certificate:', error);
      alert('Error downloading certificate. Please try again.');
    }
    setDownloading(false);
  };

  if (loading) {
    return (
      <div className="loading-container-light">
        <div className="loader-light"></div>
        <p>Loading achievement details...</p>
      </div>
    );
  }

  if (!award) {
    return (
      <div className="error-container-light">
        <h2>Award Not Found</h2>
        <p>The achievement you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="award-view-container-light">
      <div className="certificate-wrapper">
        <div className="certificate">
          {/* Watermark Logo */}
          <div className="watermark">
            <img src="/logo.jpg" alt="Achievers Book of Records" />
          </div>
          
          {/* Certificate Border */}
          <div className="certificate-border">
            <div className="certificate-inner">
              
              {/* Top Decorative Line */}
              <div className="top-decoration"></div>
              
              {/* Header */}
              <div className="certificate-header">
                <div className="gold-seal-left">
                  <FaMedal />
                </div>
                <div className="header-text">
                  <h1>ACHIEVERS BOOK OF RECORDS</h1>
                  <p>Official Certificate of Achievement</p>
                </div>
                <div className="gold-seal-right">
                  <FaTrophy />
                </div>
              </div>

              {/* Award Badge */}
              <div className="award-badge">
                <FaCheckCircle />
                <span>RECOGNIZED ACHIEVEMENT</span>
              </div>

              {/* This is to certify that */}
              <div className="certify-text">
                <p>This is to certify that</p>
              </div>

              {/* Awardee Name */}
              <div className="awardee-name">
                <h2>{award.name}</h2>
                <div className="name-underline"></div>
              </div>

              {/* Achievement Details */}
              <div className="achievement-details-light">
                <div className="detail-row">
                  <div className="detail-label">Age</div>
                  <div className="detail-value">{award.age} years</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Place</div>
                  <div className="detail-value">{award.place}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Achievement</div>
                  <div className="detail-value achievement-name-light">{award.achievementName}</div>
                </div>
              </div>

              {/* Achievement Description */}
              <div className="description-section">
                <div className="description-label">ACHIEVEMENT DESCRIPTION</div>
                <p className="achievement-description-light">{award.achievementDescription}</p>
              </div>

              {/* Verification and Signature Section */}
              {/* <div className="verification-section">
                <div className="verification-left">
                  <div className="signature-line"></div>
                  <p>Authorized Signatory</p>
                  <p className="title">Records Director</p>
                </div>
                <div className="verification-center">
                  <div className="gold-stamp">
                    <div className="stamp-inner">
                      <span>APPROVED</span>
                    </div>
                  </div>
                </div>
                <div className="verification-right">
                  <div className="qr-code-light">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${window.location.origin}/award/${award.id}`} 
                      alt="Verification QR Code"
                    />
                  </div>
                  <p>Scan to Verify</p>
                </div>
              </div> */}

              {/* Certificate ID and Date */}
              <div className="certificate-footer">
                <div className="certificate-id">
                  Certificate ID: ABR-{award.id.slice(-8).toUpperCase()}
                </div>
                <div className="certificate-date">
                  Date of Issue: {new Date(award.createdAt).toLocaleDateString()}
                </div>
              </div>

              {/* Bottom Border Decoration */}
              <div className="bottom-decoration"></div>
            </div>
          </div>

          {/* Download Button */}
          <div className="download-section">
            <button onClick={downloadCertificate} className="download-certificate-btn" disabled={downloading}>
              <FaDownload />
              {downloading ? 'Downloading...' : 'Download Official Certificate'}
            </button>
            <p className="secure-note">
              <FaCheckCircle /> This certificate is digitally verified and recognized globally
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwardView;