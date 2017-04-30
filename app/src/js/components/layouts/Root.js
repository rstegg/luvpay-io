import React from 'react'

import Menu from '../Menu'
import Header from '../Header'
import SignupSuccess from '../SuccessMessage'

import isMobile, { isTablet } from '../../utils/isMobile'

export default ({children}) =>
  <div className='root'>
    <Header isMobile={isMobile()} />
      <div className='main'>
        {children}
      </div>
    <Menu isMobile={isMobile()} isTablet={isTablet()} />
    <SignupSuccess />
  </div>
