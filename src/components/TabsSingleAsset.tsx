import React from 'react'

import TabsUnstyled from '@mui/base/TabsUnstyled'
import TabsListUnstyled from '@mui/base/TabsListUnstyled'
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled'
import TabUnstyled from '@mui/base/TabUnstyled'
import { styled } from '@mui/system'

import SingleAssetDetailsTab from './SingleAssetDetailsTab'
import SingleAssetAttributeTab from './SingleAssetAttributeTab'

const TabsList = styled(TabsListUnstyled)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  marginBottom: theme.spacing(5.5),
  padding: theme.spacing(0.75),
  backgroundColor: theme.palette.grey['50'],
  borderRadius: '8px',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: theme.palette.grey['100'],
}))

const Tab = styled(TabUnstyled)(({ theme }) => ({
  paddingTop: theme.spacing(1.25),
  paddingRight: theme.spacing(1.75),
  paddingBottom: theme.spacing(1.25),
  paddingLeft: theme.spacing(1.75),
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  lineHeight: 1.5,
  fontWeight: 500,
  color: theme.palette.grey['700'],
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',

  '&.Mui-selected': {
    backgroundColor: 'white',
    boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
  },
}))

const TabsSingleAsset = () => (
  <TabsUnstyled defaultValue={0}>
    <TabsList>
      <Tab>Details</Tab>
      <Tab>Attributes</Tab>

      {/* <Tab>History</Tab> */}
    </TabsList>

    <TabPanelUnstyled value={0}>
      <SingleAssetDetailsTab />
    </TabPanelUnstyled>

    <TabPanelUnstyled value={1}>
      <SingleAssetAttributeTab />
    </TabPanelUnstyled>

    {/* <TabPanelUnstyled value={4}>
      4sdfsdf
    </TabPanelUnstyled> */}
  </TabsUnstyled>
)

export default () => <TabsSingleAsset />
