
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateInvite from './Page/CreateInvite/CreateInvite'
import Invite from './Page/Invite/Invite'
import SaidYes from './Page/SaidYes/SaidYes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateInvite />} />
        <Route path="/saidYes" element={<SaidYes />} />
        <Route path="/invite" element={<Invite />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App