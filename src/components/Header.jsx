import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';

const Header = () => {
    return (
        <AppBar position="static" color="primary" elevation={4}>
            <Toolbar>
                <Box display="flex" alignItems="center">
                    <InventoryOutlinedIcon sx={{ mr: 2, fontSize: 32 }} />
                    <Typography variant="h5" component="h1" sx={{ fontWeight: 500, letterSpacing: 0.5 }}>
                        My Tasks and Goals
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;