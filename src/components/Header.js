import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function formatDescription(key) {
  let formattedKey = key.replace(/([A-Z])/g, ' $1');
  formattedKey = formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1);
  return formattedKey;
}

export default function Header({ header, descriptions}) {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      sx={{
        alignItems: { xs: 'flex-start', md: 'flex-end' },
        justifyContent: 'space-between',
        gap: 2,
        my: 2,
      }}
    >
      <Stack sx={{ maxWidth: 800 }}>
        <Typography variant="h4" component="h1">
          {header}
        </Typography>
        {Object.entries(descriptions).map(([key, value]) => (
        <Typography key={key} sx={{ color: 'text.secondary' }}>
          {formatDescription(key) + ": " + value}
        </Typography>
      ))}
      </Stack>
    </Stack>
  );
}
