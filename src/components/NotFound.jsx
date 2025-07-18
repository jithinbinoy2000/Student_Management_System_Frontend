import { Typography, Container } from '@mui/material';

function NotFound() {
  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" align="center">
        404 - Page Not Found
      </Typography>
    </Container>
  );
}

export default NotFound;
