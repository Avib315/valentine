// CreateInvite.jsx
import React, { useState } from 'react'
import "./style.scss"

export default function CreateInvite() {
    const [name, setName] = useState('')
    const [time, setTime] = useState('')

    const handleCreateInvite = () => {
        if (!name || !time) {
            alert('Please fill in both name and time')
            return
        }
    }

    return (
        <div className="create-invite">
            <h1>צור הזמנה</h1>
            
            <div className="form-container">
                <div className="form-group">
                    <label htmlFor="name">שם הבת זוג</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="time">שעה</label>
                    <input
                        type="time"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                </div>

                <button onClick={handleCreateInvite}>
                    Create Invite
                </button>
            </div>
        </div>
    )
}