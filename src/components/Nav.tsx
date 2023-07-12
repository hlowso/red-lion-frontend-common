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
  const { Button, Spinner, Span, Navbar, NavbarCollapse, NavbarBrand } =
    useUIContext()
  const {
    username,
    imageUrl: profileImageUrl,
    gameName,
    isLoading
  } = usePlayContext()
  const { shopping, toggleShopping } = useVendorContext()
  const vendorButtonVariant = shopping ? 'secondary' : 'outline-secondary'

  return (
    <Navbar fixed='top' bg='dark' style={{ padding: '10px 20px' }}>
      <NavbarCollapse className='justify-content-start'>
        <NavbarBrand style={{ color: 'white' }}>{`${APP_NAME} / ${
          isLoading ? '...' : gameName
        }`}</NavbarBrand>
        <Button variant={vendorButtonVariant} onClick={toggleShopping}>
          Vendor
        </Button>
      </NavbarCollapse>
      <NavbarCollapse className='justify-content-end'>
        <Span>
          {isLoading ? (
            <Spinner />
          ) : (
            <Profile username={username!} imageUrl={profileImageUrl!} />
          )}
        </Span>
      </NavbarCollapse>
    </Navbar>
  )
}

export default Nav
