import { Typography, Container } from '@mui/material';

function Unauthorized() {
  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" align="center" color="error">
        Unauthorized Access
      </Typography>
      <Typography align="center">You don't have permission to view this page.</Typography>
    </Container>
  );
}

export default Unauthorized;
