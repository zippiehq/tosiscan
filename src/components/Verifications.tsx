import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { Box, Typography, Link } from '@mui/material'
import { styled } from '@mui/system'

import IconLocationMark from '../assets/images/icon-location-mark.svg'
import IconDownload from '../assets/images/icon-download.svg'

const CustomLink = styled(Link)(({ theme }) => ({
  fontSize: '16px',
  lineHeight: 1.5,
  color: theme.palette.primary['600'],
  textDecoration: 'none',
})) as typeof Link

const SectionWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(3),
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: theme.palette.grey['200'],
  borderRadius: '10px',
}))

const VerificationLohko = () => (
  <SectionWrapper mt={2}>
    <Typography variant="body2" color="grey.500" mb={0.25} sx={{ lineHeight: 1.43 }}>
      Physical Custody
    </Typography>
    <Typography variant="subtitle1" color="grey.900" mb={1} sx={{ fontSize: '20px', fontWeight: 500, lineHeight: 1.5 }}>
      BullionStar
    </Typography>

    <Box mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
      <img src={IconLocationMark} width="20" height="20" alt="Address pin" />
      <Typography variant="body2" color="grey.600" ml={1} sx={{ lineHeight: 1.43 }}>
        45 New Bridge Rd, Singapore 059398
      </Typography>
    </Box>

    <Typography variant="body1" color="grey.600" mb={2.75} sx={{ lineHeight: 1.5 }}>
      We have partnered with Singapore-based gold and silver trading company BullionStar to ensure a safe and secure
      investment process
    </Typography>

    <Box mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
      <img src={IconDownload} width="18" height="18" alt="Download Icon" />
      <Typography variant="body1" color="grey.800" ml={1.5} sx={{ fontWeight: 500, lineHeight: 1.5 }}>
        Insurance Document
      </Typography>
    </Box>

    <Typography variant="body1" color="grey.600" sx={{ linHeight: 1.5 }}>
      Verified by
      <CustomLink
        href="https://www.bullionstar.com/"
        target="_blank"
        rel="noreferrer nofollow"
        style={{
          fontSize: '16px',
          fontWeight: 500,
          lineHeight: 1.5,
          color: 'primary.600',
          textDecoration: 'none',
        }}
      >
        &nbsp;BullionStar
      </CustomLink>
    </Typography>
  </SectionWrapper>
)
const VerificationCarbon = () => (
  <Box mt={4} mb={6}>
    <Typography variant="body2" mb={2} sx={{ fontSize: '16px', lineHeight: 1.5, color: '#667085' }}>
      This dataset does not have additional verifications.
    </Typography>

    <Typography variant="body2" sx={{ fontSize: '16px', lineHeight: 1.5, color: '#667085' }}>
      Are you the owner of this dataset? <br />
      Increase your asset’s reliability by adding supporting verifications.
      <CustomLink component={RouterLink} to="/coming-soon" sx={{ fontWeight: 600 }}>
        &nbsp;Learn more
      </CustomLink>
    </Typography>
  </Box>
)

const Verifications = {
  'Lohko Gold': VerificationLohko,
  'Carbon Credit Futures': VerificationCarbon,
}

export default Verifications
