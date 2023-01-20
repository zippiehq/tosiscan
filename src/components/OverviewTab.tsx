import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'

import {
  Box,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Typography,
  Link,
  TableHead,
  Stack,
  Button,
  Tooltip,
} from '@mui/material'
import { styled } from '@mui/system'
import { TableBodyRow } from './TableStyles'

import { useDataSetAssetsContext, StatusType, IVerifications, IFinalAsset } from '../hooks/useDatachainOutput'
import { formatTimeStamp, formatDate, formatTimeLeft } from '../utils/timestapFormater'

import { getVerificationComponent } from './Verifications'
import { getOverviewComponent } from './DatasetOverview'
import Issuer from './Issuer'

import { ReactComponent as IconVerifiedTick } from '../assets/images/icon-verified-tick.svg'
import { ReactComponent as IconRight } from '../assets/arrow-right.svg'
import IconAlertCircle from '../assets/images/info-circle.png'
import IconAlertTriangle from '../assets/images/alert-triangle.png'
import { AssetFile } from './AssetFileComponent'

interface IVerificationsErrors {
  verifications: IVerifications[]
}

const LastFiles = ({ datasetId }: { datasetId: string }) => {
  const { datasetOutputs } = useDataSetAssetsContext()

  const dataSetData = datasetOutputs ? datasetOutputs[datasetId] : null

  const assets = dataSetData?.assets || []
  const navigate = useNavigate()
  return (
    <Box display="flex" flexDirection="column" mt={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography fontSize="20px" fontWeight={600} color="grey.9900">
          Latest files
        </Typography>

        <Button variant="outlined" endIcon={<IconRight />} onClick={() => navigate('files')}>
          View all
        </Button>
      </Box>

      <Box display="flex" flexWrap="wrap" mt={2}>
        {assets.map((asset, index) => (index > 3 ? null : <AssetFile {...asset} key={asset.assetName} />))}
      </Box>
    </Box>
  )
}

const LinkedVerifiedFiles = ({ datasetId }: { datasetId: string }) => {
  const { datasetOutputs, selectedDataSet } = useDataSetAssetsContext()

  const navigate = useNavigate()
  const onClickToDataset = (id: string) => navigate(`/dataset/${id}`)

  const datasets = Object.values(datasetOutputs)
  const DigitalDatasets = datasets.filter(
    (object) => object.metadata?.['asset-class'].toLocaleLowerCase() === 'digital asset',
  )

  return selectedDataSet?.metadata?.['asset-class'].toLocaleLowerCase() === 'digital asset' ? (
    <Box>
      <Typography variant="h2" color="grey.900" mb={2} sx={{ fontSize: '20px', lineHeight: 1.5 }}>
        Linked datasets
      </Typography>

      <Box>
        <TableContainer>
          <Table sx={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'grey.200' }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableCell
                  sx={{
                    paddingY: 2.25,
                    paddingX: 3,
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: 1.43,
                    color: '#667085',
                  }}
                >
                  Dataset
                </TableCell>
                <TableCell sx={{ fontSize: '12px', fontWeight: 500, lineHeight: 1.5, color: '#667085' }}>
                  Last verified
                </TableCell>
                <TableCell sx={{ fontSize: '12px', fontWeight: 500, lineHeight: 1.5, color: '#667085' }}>
                  Publisher
                </TableCell>
                <TableCell sx={{ fontSize: '12px', fontWeight: 500, lineHeight: 1.5, color: '#667085' }}>
                  Issuer/s
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {DigitalDatasets.map((dataset) => (
                <TableBodyRow
                  key={dataset.id}
                  onClick={() => {
                    onClickToDataset(dataset.id)
                  }}
                  sx={{ borderBottom: '1px solid #eaecf0' }}
                >
                  <TableCell
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      paddingY: 2.5,
                      paddingX: 3,
                      borderBottom: 'none',
                    }}
                  >
                    <img
                      src={dataset?.metadata?.image}
                      width="40px"
                      height="40px"
                      style={{ borderRadius: '5px' }}
                      alt="."
                    />

                    <Stack ml={2}>
                      <Typography
                        variant="h4"
                        sx={{ fontSize: '16px', fontWeight: 500, lineHeight: 1.5, color: '#101828' }}
                      >
                        {dataset.metadata?.name}
                      </Typography>

                      {dataset.metadata?.contract ? (
                        <Typography
                          variant="body2"
                          sx={{ fontSize: '12px', fontWeight: 500, lineHeight: 1.5, color: '#07939c' }}
                        >
                          {`${dataset.metadata?.contract?.substring(0, 4)}...${dataset.metadata?.contract?.substring(
                            10,
                            30,
                          )}`}
                        </Typography>
                      ) : (
                        <Typography
                          variant="body2"
                          sx={{ fontSize: '12px', fontWeight: 500, lineHeight: 1.5, color: '#07939c' }}
                        >
                          {`${dataset.metadata?.contract?.substring(0, 4)}...${dataset.metadata?.contract?.substring(
                            10,
                            30,
                          )}`}
                        </Typography>
                      )}
                    </Stack>
                  </TableCell>

                  <TableCell sx={{ fontSize: '13px', lineHeight: 1.43, color: '#667085', borderBottom: 'none' }}>
                    {`${formatDate(dataset.lastVerified)} (${formatTimeLeft(dataset.lastVerified)})`}
                  </TableCell>

                  <TableCell sx={{ borderBottom: 'none' }}>
                    <Stack
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        fontSize: '14px',
                        lineHeight: 1.43,
                        color: '101828',
                      }}
                    >
                      {dataset.metadata?.publisher}
                      <IconVerifiedTick style={{ width: '12px', height: '12px', marginLeft: '6px' }} />
                    </Stack>
                  </TableCell>

                  <TableCell sx={{ borderBottom: 'none' }}>
                    <Stack
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        fontSize: '14px',
                        lineHeight: 1.43,
                        color: '101828',
                      }}
                    >
                      {dataset.metadata?.publisher}
                      <IconVerifiedTick style={{ width: '12px', height: '12px', marginLeft: '6px' }} />
                    </Stack>
                  </TableCell>
                </TableBodyRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  ) : null
}
const getStatusIcon = (iconType: StatusType) => {
  switch (iconType) {
    case StatusType.failure:
      return {
        Icon: IconAlertCircle,
      }
    case StatusType.warning:
      return {
        Icon: IconAlertTriangle,
      }

    default:
      return null
  }
}
const VerificationsErrors = ({ verifications }: IVerificationsErrors) => {
  const [datasetErrorsOpen, setDatasetErrorsOpen] = useState(false)
  const lastVerificationError = verifications.find(
    (verification) => verification.status === StatusType.failure || verification.status === StatusType.warning,
  )
  const latestTimeVerification = Math.max(...verifications.map((item) => item.timestamp))
  const latestVerificationObject = verifications.find((obj) => obj.timestamp === latestTimeVerification)

  const colors = {
    [StatusType.warning]: 'warning.700',
    [StatusType.failure]: 'error.600',
    [StatusType.success]: 'success.600',
  }
  const message = {
    [StatusType.warning]: 'WARNING',
    [StatusType.failure]: 'ERROR',
    [StatusType.success]: 'SUCCESS',
  }

  const timeFormat = 'yyyy-MM-DD HH:mm:ss'
  const timestamp = latestVerificationObject?.timestamp ? latestVerificationObject.timestamp : ''
  const trimmedTimestamp = Number(timestamp) / 1000
  const failedVerificationDate = formatDate(trimmedTimestamp, timeFormat)

  const IconOptions = latestVerificationObject?.status ? getStatusIcon(latestVerificationObject?.status) : null

  return !lastVerificationError ? (
    <Typography>&mdash;</Typography>
  ) : (
    <>
      <Box display="flex" alignItems="flexStart">
        <Typography variant="body2" color={colors[lastVerificationError.status]} ml={1}>
          <img src={IconOptions?.Icon} alt="" style={{ width: 15, height: 15 }} />
          &nbsp;
          {latestVerificationObject?.message} . {failedVerificationDate} ({formatTimeLeft(trimmedTimestamp)})
        </Typography>
      </Box>
      <Typography
        variant="body2"
        color="gray.500"
        sx={{ cursor: 'pointer' }}
        mt={2}
        onClick={() => setDatasetErrorsOpen(!datasetErrorsOpen)}
      >
        {datasetErrorsOpen ? 'Hide logs' : 'View logs'}
      </Typography>
      <Box display="flex" flexDirection="column" marginLeft="-270px" mt={3}>
        {datasetErrorsOpen
          ? verifications.map((verification) => (
              <Typography variant="body2" key={verification.timestamp} color={colors[verification.status]} mt={1}>
                [{message[verification.status]} - {formatDate(verification.timestamp / 1000, timeFormat)}]{' '}
                {verification.message}.
              </Typography>
            ))
          : null}
      </Box>
    </>
  )
}

const SectionWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(3),
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: theme.palette.grey['200'],
  borderRadius: '10px',
}))

const TableNameCell = styled(TableCell)(({ theme }) => ({
  width: '266px',
  paddingTop: theme.spacing(1.5),
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(1.5),
  paddingLeft: theme.spacing(2),
  fontSize: '16px',
  lineHeight: 1.5,
  color: theme.palette.grey['600'],
  borderBottom: 'none',
  borderTopLeftRadius: '4px',
  borderBottomLeftRadius: '4px',
}))

const TableValueCell = styled(TableCell)(({ theme }) => ({
  paddingTop: theme.spacing(1.5),
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(1.5),
  fontSize: '16px',
  lineHeight: 1.5,
  color: theme.palette.grey['900'],
  borderBottom: 'none',
  borderTopRightRadius: '4px',
  borderBottomRightRadius: '4px',
}))
const OverviewTab = () => {
  const { isLoading, selectedDataSet } = useDataSetAssetsContext()

  const metaData = selectedDataSet?.metadata
  const creationDate = selectedDataSet?.creationDate
  const lastVerified = selectedDataSet?.lastVerified
  const datasetName = metaData?.name || 'Lohko Gold'
  const datasetVerifications = selectedDataSet?.verifications || []
  const description = metaData ? metaData['asset-description'] : ''

  // @ts-ignore
  const Verification = getVerificationComponent(datasetName)
  // @ts-ignore
  const Header = getOverviewComponent(datasetName, description)
  return (
    <Box sx={{ display: 'flex', marginBottom: '160px' }}>
      <Box mr={5.25} sx={{ maxWidth: { xl: '820px' } }}>
        <SectionWrapper>
          <Typography variant="h2" color="grey.900" mb={1.25} sx={{ fontSize: '20px', lineHeight: 1.5 }}>
            Summary
          </Typography>
          <Header />
        </SectionWrapper>

        <SectionWrapper>
          <Typography variant="h2" color="grey.900" mb={1.25} sx={{ fontSize: '20px', lineHeight: 1.5 }}>
            General information
          </Typography>

          <TableContainer>
            <Table>
              <TableBody>
                <TableRow sx={{ backgroundColor: 'grey.50' }}>
                  <TableNameCell>Data contract</TableNameCell>
                  <TableValueCell>{metaData?.contract}</TableValueCell>
                </TableRow>

                <TableRow>
                  <TableNameCell>Dataset name</TableNameCell>
                  <TableValueCell>{metaData?.name}</TableValueCell>
                </TableRow>

                <TableRow sx={{ backgroundColor: 'grey.50' }}>
                  <TableNameCell>Asset description</TableNameCell>
                  <TableValueCell>{metaData?.['asset-description']}</TableValueCell>
                </TableRow>

                <TableRow>
                  <TableNameCell>Asset class</TableNameCell>
                  <TableValueCell>{metaData?.['asset-class']}</TableValueCell>
                </TableRow>

                <TableRow sx={{ backgroundColor: 'grey.50' }}>
                  <TableNameCell>Main location</TableNameCell>
                  <TableValueCell>{metaData?.['main-location']}</TableValueCell>
                </TableRow>

                <TableRow>
                  <TableNameCell>Supported assets location</TableNameCell>
                  <TableValueCell sx={{ display: 'flex', flexDirection: 'column' }}>
                    {metaData?.['supported-locations'].map((item) => (
                      <Typography key={item}>{item}</Typography>
                    ))}
                  </TableValueCell>
                </TableRow>

                <TableRow sx={{ backgroundColor: 'grey.50' }}>
                  <TableNameCell>Creation date</TableNameCell>
                  <TableValueCell>
                    {isLoading || !creationDate
                      ? 'loading...'
                      : `${formatDate(creationDate)} (${formatTimeLeft(creationDate)})`}
                  </TableValueCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </SectionWrapper>

        <SectionWrapper>
          <Typography variant="h2" color="grey.900" mb={1.25} sx={{ fontSize: '20px', lineHeight: 1.5 }}>
            Verifications
          </Typography>

          <TableContainer>
            <Table>
              <TableBody>
                <TableRow sx={{ backgroundColor: 'grey.50' }}>
                  <TableNameCell>Verification frequency</TableNameCell>
                  <TableValueCell>
                    <Box display="flex" alignItems="center">
                      <Typography color="textPrimary" mr={1}>
                        Weekly
                      </Typography>{' '}
                      {/* <Tooltip title=" Some assets could not be verified" placement="top">
                        <img
                          src={IconAlertTriangle}
                          alt=""
                          style={{ flexShrink: 0, marginTop: '2px', cursor: 'pointer' }}
                        />
                      </Tooltip> */}
                    </Box>
                  </TableValueCell>
                </TableRow>

                <TableRow>
                  <TableNameCell>Last successful verification</TableNameCell>
                  <TableValueCell>
                    {isLoading || !lastVerified
                      ? 'loading...'
                      : `${formatDate(lastVerified)} (${formatTimeLeft(lastVerified)})`}
                  </TableValueCell>
                </TableRow>

                <TableRow sx={{ backgroundColor: 'grey.50', verticalAlign: 'baseline' }}>
                  <TableNameCell>Last failed verification</TableNameCell>
                  <TableValueCell>
                    <VerificationsErrors verifications={datasetVerifications} />
                  </TableValueCell>
                </TableRow>
                <TableRow>
                  <TableNameCell>Availability score</TableNameCell>
                  <TableValueCell>
                    <Typography
                      variant="body2"
                      py={0.5}
                      px={1.5}
                      color="#1B876A"
                      sx={{
                        display: 'inline-block',
                        fontWeight: 500,
                        backgroundColor: '#F5FCFA',
                        borderRadius: '16px',
                      }}
                    >
                      100%
                    </Typography>
                  </TableValueCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </SectionWrapper>

        <Box mt={6} sx={{ width: '100%' }}>
          <Typography variant="h2" color="grey.900" sx={{ fontSize: '20px', lineHeight: 1.5 }}>
            Supporting verification
          </Typography>

          <Verification />
        </Box>

        {selectedDataSet?.metadata?.datasetLinked ? (
          <LinkedVerifiedFiles datasetId={selectedDataSet?.metadata?.datasetLinked[0]} />
        ) : (
          ''
        )}

        {metaData?.['asset-class'] === 'Satellite image' && <LastFiles datasetId={selectedDataSet?.id || ''} />}
      </Box>

      <Box sx={{ maxWidth: { xl: '378px' } }}>
        <SectionWrapper sx={{ paddingY: 2.5, paddingX: 2 }}>
          <Typography variant="body2" color="grey.600" mb={1}>
            Publisher staking
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Typography
              variant="body1"
              color="grey.900"
              mr={0.75}
              sx={{ fontSize: '30px', fontWeight: 600, lineHeight: 1.27 }}
            >
              100,000
            </Typography>
            <Typography variant="body1" color="grey.900" sx={{ fontSize: '20px', fontWeight: 500, lineHeight: 1.5 }}>
              TOSI
            </Typography>
          </Box>
        </SectionWrapper>

        <Issuer />

        <SectionWrapper>
          <Typography variant="h2" color="grey.900" mb={1.25} sx={{ fontSize: '20px', lineHeight: 1.5 }}>
            Dataset disputes
          </Typography>

          <TableContainer>
            <Table>
              <TableBody>
                <TableRow sx={{ backgroundColor: 'grey.50' }}>
                  <TableNameCell>All-time disputes</TableNameCell>
                  <TableValueCell sx={{ textAlign: 'center' }}>0</TableValueCell>
                </TableRow>

                <TableRow>
                  <TableNameCell>Publisher success rate</TableNameCell>
                  <TableValueCell sx={{ textAlign: 'center' }}>
                    <Typography
                      variant="body2"
                      py={0.5}
                      px={1.5}
                      color="#1B876A"
                      sx={{
                        display: 'inline-block',
                        fontWeight: 500,
                        backgroundColor: '#F5FCFA',
                        borderRadius: '16px',
                      }}
                    >
                      100%
                    </Typography>
                  </TableValueCell>
                </TableRow>

                <TableRow sx={{ backgroundColor: 'grey.50' }}>
                  <TableNameCell>Open disputes</TableNameCell>
                  <TableValueCell sx={{ textAlign: 'center' }}>0</TableValueCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </SectionWrapper>
      </Box>
    </Box>
  )
}

export default () => <OverviewTab />
