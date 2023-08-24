import React, { useContext } from 'react'
import { APP_NAME } from 'common'
import { usePlayContext, useUIContext, useVendorContext } from '../contexts'
import { ViewsContext } from '../contexts/ViewsContext'

const Profile = ({
  username,
  imageUrl
}: {
  username: string
  imageUrl: string
}) => {
  const { Image } = useUIContext()
  return (
    <Image
      className='border border-white'
      style={{ width: '50px' }}
      src={imageUrl}
      title={username}
      roundedCircle
    />
  )
}

const Nav = () => {
  const ui = useUIContext()
  const { view, setView } = useContext(ViewsContext)
  const {
    username,
    imageUrl: profileImageUrl,
    gameName,
    isLoading
  } = usePlayContext()
  const { shopping, toggleShopping } = useVendorContext()
  const vendorButtonVariant = shopping ? 'secondary' : 'outline-secondary'

  return (
    <ui.Navbar fixed='top' bg='dark' style={{ padding: '10px 20px' }}>
      <ui.NavbarCollapse className='justify-content-start'>
        <ui.NavbarBrand style={{ color: 'white' }}>{`${APP_NAME} / ${
          isLoading ? '...' : gameName
        }`}</ui.NavbarBrand>
        <ui.Button variant={vendorButtonVariant} onClick={toggleShopping}>
          Vendor
        </ui.Button>
        <ui.Span
          style={{
            cursor: 'pointer',
            margin: '0 0 0 20px',
            color: 'white',
            textDecoration: view === 'play' ? 'underline' : undefined
          }}
          onClick={() => setView('play')}
        >
          Play
        </ui.Span>
        <ui.Span
          style={{
            cursor: 'pointer',
            margin: '0 0 0 20px',
            color: 'white',
            textDecoration: view === 'journal' ? 'underline' : undefined
          }}
          onClick={() => setView('journal')}
        >
          Journal
        </ui.Span>
      </ui.NavbarCollapse>
      <ui.NavbarCollapse className='justify-content-end'>
        <ui.Span>
          {isLoading ? (
            <ui.Spinner />
          ) : (
            <Profile username={username!} imageUrl={profileImageUrl!} />
          )}
        </ui.Span>
      </ui.NavbarCollapse>
    </ui.Navbar>
  )
}

export default Nav
