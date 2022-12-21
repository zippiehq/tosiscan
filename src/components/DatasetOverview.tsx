import React from 'react'

import { Box, Typography, Link } from '@mui/material'

const DatasetOverviewLohko = () => (
  <Typography>
    Lohko Gold bars are numbered and stored in a secure vault and owners have a legal right to claim them anytime.
  </Typography>
)

const DatasetOverviewNguru = () => (
  <Typography>
    The Nguru mountains is a rare rainforest in Eastern Africa which has lost 80% of the forest coverage during the last
    couple of hundred years. Pilot phase of the project is already ongoing with 300,000 seedlings being planted into
    Nguru mountains. The total scale of the project is 225 km2 and 15 million trees.
  </Typography>
)

const DatasetOverviewCarbon = () => (
  <Box>
    <Typography variant="body1" color="grey.600" mb={2} sx={{ lineHeight: 1.5 }}>
      Lohko carbon credit futures are issued from a high-quality tropical reforestation project that prioritizes
      original forest growth, biodiversity, and community livelihood.
    </Typography>

    <Typography variant="body1" color="grey.600" sx={{ lineHeight: 1.5 }}>
      Each future gives right to 1 carbon credit (1 ton carbon) from the
      <Link
        href="https://app.lohkoinvest.com/products/carbon_credit_futures"
        target="_blank"
        rel="noreferrer nofollow"
        sx={{ fontWeight: 500, color: 'primary.600', textDecoration: 'none' }}
      >
        &nbsp;Nguru Project
      </Link>
      .
    </Typography>
  </Box>
)

const DatasetOverviewVerra = () => (
  <>
    <Typography variant="body1" color="grey.600" mb={2} sx={{ lineHeight: 1.5 }}>
      The Verified Carbon Standard (VCS) Program is the world’s most widely used greenhouse gas (GHG) crediting program.
      It drives finance toward activities that reduce and remove emissions, improve livelihoods, and protect nature. VCS
      projects have reduced or removed nearly one billion tons of carbon and other GHG emissions from the atmosphere.
    </Typography>

    <Typography variant="body1" color="grey.600" sx={{ lineHeight: 1.5 }}>
      The Verra Registry is a cornerstone for the implementation of Verra’s standards and programs. It facilitates the
      transparent listing of information on certified projects, issued and retired units, and enables the trading of
      units. The Verra Registry also ensures the uniqueness of projects and credits in the system.
    </Typography>
  </>
)
const DefaultOverviewVerra = ({ description }: { description?: string }) => (
  <Typography variant="body1" color="grey.600" mb={2} sx={{ lineHeight: 1.5 }}>
    {description}
  </Typography>
)

export const getOverviewComponent = (name: string, description?: string) => {
  switch (name) {
    case 'Lohko Gold':
      return DatasetOverviewLohko
    case 'Carbon Credit Futures':
      return DatasetOverviewCarbon
    case 'Nguru Satellite Image':
      return DatasetOverviewNguru
    case 'Verra Carbon Registry':
      return DatasetOverviewVerra
    default:
      return () => <DefaultOverviewVerra description={description} />
  }
}
