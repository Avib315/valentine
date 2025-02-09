
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateInvite from './Page/CreateInvite/CreateInvite'
import Invite from './Page/Invite/Invite'
import SaidYes from './Page/SaidYes/SaidYes'
import InvitationLink from './Page/InvitationLink/InvitationLink'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateInvite />} />
        <Route path="/InvitationLink/*" element={<InvitationLink />} />
        <Route path="/invite/*" element={<Invite />} />
        <Route path="/saidYes" element={<SaidYes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App