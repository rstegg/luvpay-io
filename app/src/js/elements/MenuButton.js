import React from 'react'

import { Popup, Button } from 'semantic-ui-react'

export default ({onClick, icon, text}) =>
  <Popup
    position='top center'
    trigger={<Button basic circular onClick={onClick} icon={icon} size='massive' className='menu--button' />}
    content={text} />
