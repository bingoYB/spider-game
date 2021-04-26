import React from 'react'
import { Box, Spinner, Text } from 'grommet'
const Loading: React.FunctionComponent = () => 
  <Box align="center" direction="row" gap="small" width="100%" height="100%" justify="center" >
  <Spinner
    border={[
      {
        side: 'all',
        color: 'brand',
        size: 'medium',
        style: 'dotted',
      },
    ]}
  />
  <Text>Loading...</Text>
</Box>

export default Loading