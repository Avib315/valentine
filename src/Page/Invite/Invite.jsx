import React, { useState, useEffect } from 'react'
import { getDetailsFromUrlParams } from '../../CommonFunction/getDetailsFromUrlParams'
import { useNavigate } from 'react-router-dom'
import './style.scss'

export default function Invite() {
  const [qNum, setQNum] = useState(1)
  const [yesButtonSize, setYesButtonSize] = useState(1)
  const [yesBtnText, setYesBtnText] = useState("כן")
  const { gender, name, time } = getDetailsFromUrlParams()
  const isMale = gender == "male" 
    const word = {
      promise: isMale ? "מבטיחה" : "מבטיח",
      say:isMale ? "תגיד" : "תגידי"
    } 
  const questionArray = [
    { q: `היי ${name} רוצה לצאת בוולנטיין הזה?` },
    { q: `אני ${word.promise} שיהיה ממש כיף` },
    { q: `נו באמת, ${word.say} כן` },
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
    setYesBtnText("ידעתי שאשכנע אותך")
    setTimeout(() => {
      navigate(goTo)
    }, 1000)
  }

  const moveNoButton = () => {
    if (qNum < questionArray.length) {
      setQNum(prev => prev + 1)
      setYesButtonSize(prev => prev  + 1)
    }
    else{
      setQNum(1)
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
          className={`yes-button size${yesButtonSize}`}
       
        >
          {yesBtnText} 💝
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