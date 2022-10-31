import { styled } from '@mui/system'
import TabsUnstyled from '@mui/base/TabsUnstyled'
import TabsListUnstyled from '@mui/base/TabsListUnstyled'
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled'
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled'
import OverviewTab from './OverviewTab'
import AssetTab from './AssetTab'

const Tab = styled(TabUnstyled)`
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 500;
  padding: 10px 14px;
  margin: 6px 6px;
  border: none;
  background-color: transparent;
  border-radius: 6px;
  display: flex;
  color: #344054;

  &.${tabUnstyledClasses.selected} {
    background: #ffffff;
    box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);
  }
`

const TabPanel = styled(TabPanelUnstyled)(
  () => `
  font-family: "Inter", sans-serif;
  font-size: 0.875rem;
  background: #FFFFFF;
  border-radius: 12px;
  `,
)

const TabsList = styled(TabsListUnstyled)(
  () => `
  width: 100%;
  background-color: #F9FAFB;
  border-radius: 8px;
  border: 1px solid #F2F4F7;
  margin-bottom: 44px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  `,
)

export default function UnstyledTabsIntroduction() {
  return (
    <TabsUnstyled defaultValue={0}>
      <TabsList>
        <Tab>Overview</Tab>
        <Tab>Assets</Tab>
      </TabsList>
      <TabPanel value={0}>
        <OverviewTab />
      </TabPanel>
      <TabPanel value={1}>
        <AssetTab />
      </TabPanel>
    </TabsUnstyled>
  )
}
