import React, { useState } from 'react'
import './style.scss'
import { getDetailsFromUrlParams } from '../../CommonFunction/getDetailsFromUrlParams'

export default function InvitationLink() {
  const [copySuccess, setCopySuccess] = useState('');
  const { gender, name, time } = getDetailsFromUrlParams()
  const inviteUrl = `http://valentine-invitation-foru.netlify.app/Invite/?name=${encodeURIComponent(name)}&time=${encodeURIComponent(time)}&gender=${encodeURIComponent(gender)}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopySuccess('הקישור הועתק!');
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      setCopySuccess('העתקה נכשלה, נסה שוב');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'הזמנה מיוחדת בשבילך',
          text: 'קיבלת הזמנה מיוחדת!',
          url: inviteUrl
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="invitation-link">
      <div className="success-message">
        <h2>הזמנה נוצרה בהצלחה!</h2>
        <div className="heart-icon">❤️</div>
      </div>

      <div className="link-container">
        <p>קישור להזמנה:</p>
        <div className="url-display">{inviteUrl}</div>
      </div>

      <div className="buttons-container">
        <button onClick={handleShare} className="share-button">
          שיתוף קישור
        </button>
        <button onClick={handleCopyLink} className="copy-button">
          העתקת קישור
        </button>
      </div>

      {copySuccess && (
        <div className="copy-notification">
          {copySuccess}
        </div>
      )}
    </div>
  )
}