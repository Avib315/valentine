import React, { useState, useEffect } from 'react'
import { getDetailsFromUrlParams } from '../../CommonFunction/getDetailsFromUrlParams'
import { useNavigate } from 'react-router-dom'
import './style.scss'

export default function Invite() {
  const [qNum, setQNum] = useState(1)
  const [yesButtonSize, setYesButtonSize] = useState(1)
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 0, left: 0 })
  const { gender, name, time } = getDetailsFromUrlParams()
  
  const questionArray = [
    { q: `היי ${name} רוצה לצאת בוולנטיין הזה?` },
    { q: `אני מבטיח שיהיה ממש כיף` },
    { q: `נו באמת, תגיד/י כן` },
    { q: `אי אפשר לסרב להזמנה כזו` },
    { q: `זה יהיה ערב מושלם` }
  ]

  const navigate = useNavigate()

  useEffect(() => {
    // Redirect if no valid parameters
    if (!name || !time || !gender) {
      navigate('/')
    }
  }, [name, time, gender, navigate])

  const handleYesClicked = () => {
    const goTo = `../saidYes/?name=${encodeURIComponent(name)}&time=${encodeURIComponent(time)}&gender=${encodeURIComponent(gender)}`
    setYesButtonSize(prev => prev * 1.2) // Make yes button bigger
    setTimeout(() => {
      navigate(goTo)
    }, 500)
  }

  const moveNoButton = () => {
    if (qNum < questionArray.length) {
      setQNum(prev => prev + 1)
    }

  }

  return (
    <div className="invite-container">
      <div className="question-box">
        <h2>{questionArray[qNum - 1].q}</h2>
      </div>

      <div className="buttons-container">
        <button 
          onClick={handleYesClicked} 
          className="yes-button"
          style={{ transform: `scale(${yesButtonSize})` }}
        >
          כן 💝
        </button>

        <button 
          onClick={moveNoButton} 
          className="no-button"
  
        >
          לא
        </button>
      </div>
    </div>
  )
}