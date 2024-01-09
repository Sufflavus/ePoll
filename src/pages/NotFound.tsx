import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';

const NotFound = () => {
    const navigate = useNavigate();

    const onHomeClick = () => {
        navigate('/');
    };

    return (
        <Box>
            <Paper
                sx={{
                    width: '50%',
                    my: 5,
                    mx: 'auto',
                    p: 3
                }}
            >
                <Typography
                    fontWeight={600}
                    sx={{
                        textAlign: 'center',
                        fontSize: 80
                    }}
                >
                    404
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center', 
                        alignItems: 'center',
                        mt: 3
                    }}
                >
                    <IconButton 
                        color="primary" 
                        aria-label="home"
                        onClick={onHomeClick}
                    >
                        <HomeIcon />
                    </IconButton>
                </Box>
                
            </Paper>
        </Box>
    );
};

export default NotFound;
