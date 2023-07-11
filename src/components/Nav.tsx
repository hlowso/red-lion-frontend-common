import React from 'react'
import { APP_NAME } from 'common'
import { usePlayContext, useUIContext, useVendorContext } from '../contexts'

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
  const { Div, Button, Link, Spinner, Span, Navbar } = useUIContext()
  const {
    username,
    imageUrl: profileImageUrl,
    gameName,
    isLoading
  } = usePlayContext()
  const { shopping, toggleShopping } = useVendorContext()
  const vendorButtonVariant = shopping ? 'secondary' : 'outline-secondary'

  return (
    <Navbar fixed='top' bg='dark'>
      <Div className='justify-content-start'>
        <Link href='#home'>{`${APP_NAME} / ${
          isLoading ? '...' : gameName
        }`}</Link>
        <Button variant={vendorButtonVariant} onClick={toggleShopping}>
          Vendor
        </Button>
      </Div>
      <Div className='justify-content-end'>
        <Span>
          {isLoading ? (
            <Spinner />
          ) : (
            <Profile username={username!} imageUrl={profileImageUrl!} />
          )}
        </Span>
      </Div>
    </Navbar>
  )
}

export default Nav
