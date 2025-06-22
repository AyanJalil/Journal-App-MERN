import React from 'react'
import NavBar from '../../components/NavBar'
import CreateJournal from '../../components/CreateJournal'
import Dashboard from '../../components/Dashboard'

const Home = () => {
  return (
    <div className=''>
      <NavBar/>
      <CreateJournal/>
      <Dashboard/>
    </div>
  )
}

export default Home
