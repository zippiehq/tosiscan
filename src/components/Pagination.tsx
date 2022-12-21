import React from 'react'

import { Typography, List, ListItem, Button, ToggleButton } from '@mui/material'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import { usePagination, DOTS } from '../hooks/usePagination'

const Pagination = (props: any) => {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize } = props

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  if (paginationRange && (currentPage === 0 || paginationRange.length === 0)) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  const lastPage = paginationRange?.[paginationRange.length - 1]

  return (
    <List
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: 1.75,
        paddingBottom: 2.25,
        paddingX: 3,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'grey.200',
        borderTop: 'none',
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
      }}
    >
      <ListItem disablePadding>
        <Button
          disabled={currentPage === 1}
          variant="outlined"
          onClick={onPrevious}
          sx={{
            margin: 0,
            '&.Mui-disabled p': { opacity: 0.3 },
            '&.Mui-disabled svg': { opacity: 0.3 },
          }}
        >
          <ArrowBackIcon style={{ width: '20px', height: '20px', fill: '#344054' }} />

          <Typography variant="body2" ml={1} sx={{ fontWeight: 500, color: 'grey.700' }}>
            Previous
          </Typography>
        </Button>
      </ListItem>

      <ListItem disablePadding>
        <List sx={{ display: 'flex', margin: 'auto', padding: 0 }}>
          {paginationRange?.map((pageNumber) => {
            if (pageNumber === DOTS) {
              return (
                <ListItem key={pageNumber} className="pagination-item dots">
                  &#8230;
                </ListItem>
              )
            }

            return (
              <ListItem key={pageNumber} disablePadding sx={{ marginRight: 0.25 }}>
                <ToggleButton
                  value={pageNumber}
                  selected={pageNumber === currentPage}
                  onClick={() => onPageChange(pageNumber)}
                  sx={{
                    paddingY: 1.25,
                    paddingX: 2,
                    color: 'grey.500',
                    backgroundColor: 'transparent',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    border: 'none',

                    '&.Mui-selected': {
                      color: 'grey.800',
                      backgroundColor: 'grey.50',
                      border: 'none',
                      cursor: 'default',
                      '&:hover': { backgroundColor: 'grey.50' },
                    },
                    '&:last-of-type': { marginRight: 0 },
                    '&:hover': { backgroundColor: 'transparent' },
                  }}
                  disableRipple
                >
                  <Typography variant="body2" color="grey.800" sx={{ fontWeight: 500 }}>
                    {pageNumber}
                  </Typography>
                </ToggleButton>
              </ListItem>
            )
          })}
        </List>
      </ListItem>

      <ListItem disablePadding>
        <Button
          variant="outlined"
          disabled={currentPage === lastPage}
          onClick={onNext}
          sx={{
            margin: 0,
            marginLeft: 'auto',
            '&.Mui-disabled p': { opacity: 0.3 },
            '&.Mui-disabled svg': { opacity: 0.3 },
          }}
        >
          <Typography variant="body2" mr={1} sx={{ fontWeight: 500, color: 'grey.700' }}>
            Next
          </Typography>

          <ArrowForwardIcon style={{ width: '20px', height: '20px', fill: '#344054' }} />
        </Button>
      </ListItem>
    </List>
  )
}

export default Pagination
