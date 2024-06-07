import React from 'react';
import { AppBar, Box, Toolbar, Typography, Button, IconButton } from '@mui/material';


const AppBarComponent = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" color="text" component="div" sx={{ flexGrow: 1 }}>
                        React Form
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default AppBarComponent;
