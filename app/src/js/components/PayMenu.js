import React from 'react'

import { Menu, Button } from 'semantic-ui-react'

const PayMenu = ({payment}) =>
  <Menu vertical compact>
    <Menu.Item>
      <Button circular basic>
        Download CSV file
      </Button>
    </Menu.Item>
    <Menu.Item>
      <Button circular basic>
        Print
      </Button>
    </Menu.Item>
    <Menu.Item>
      <Button circular basic>
        Request refund
      </Button>
    </Menu.Item>
  </Menu>

export default PayMenu
