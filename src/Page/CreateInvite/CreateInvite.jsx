import React, { useState } from 'react'
import "./style.scss"

export default function CreateInvite() {
    const [name, setName] = useState('')
    const [time, setTime] = useState('')
    const [gender, setGender] = useState('female')
    const baseUrl = `https://valentine-invitation-foru.netlify.app/invite/?name=${name}&time=${time}&gender=${gender}`
    const handleCreateInvite = () => {
        if (!name || !time) {
            alert('נא מלא את שדה השם והשעה')
            return
        }
    }

    return (
        <div className="create-invite">
            <h1>פרטי הזמנה</h1>
            
            <div className="form-container">
                <div className="form-group">
                    <label htmlFor="name">שם בן/בת הזוג</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="שם"
                    />
                </div>

                <div className="form-group">
                    <label className="gender-label">אני רוצה לשלוח ל:</label>
                    <div className="radio-group">
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={gender === 'male'}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            <span>בן זוג שלי</span>
                        </label>
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={gender === 'female'}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            <span>בת הזוג שלי</span>
                        </label>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="time">אני רוצה לקבוע לשעה:</label>
                    <input
                        type="time"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                </div>

                <button onClick={handleCreateInvite}>
                    יצירת הזמנה
                </button>
            </div>
        </div>
    )
}