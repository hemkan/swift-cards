'use client'
import { useSearchParams } from 'next/navigation';
import { Container, Typography, Button, Box } from '@mui/material';

export default function ResultPage() {
  const searchParams = useSearchParams();
  const session_id = searchParams.get('session_id');

  return (
    <Container component="main" maxWidth="xs">
      <Box 
        sx={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: 3 
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Thank You for Your Purchase!
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Your payment was successful. We&apos;ve received your order and are processing it.
        </Typography>
        <Box 
          sx={{ 
            marginY: 2, 
            textAlign: 'center' 
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Order Details:
          </Typography>
          <Typography variant="body1">
            <strong>Session ID:</strong> {session_id}
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          color="primary" 
          href="/" 
          sx={{ 
            marginTop: 2 
          }}
        >
          Return to Home
        </Button>
      </Box>
    </Container>
  );
}
