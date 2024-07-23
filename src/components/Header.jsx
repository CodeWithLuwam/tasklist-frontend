import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';

const Header = () => {
    return (
        <AppBar position="static" color="primary" elevation={4}>
            {/* Toolbar component to structure the content within the AppBar */}
            <Toolbar>
                {/* Box component to create a flex container for icon and text */}
                <Box display="flex" alignItems="center">
                    {/* Icon component with custom styling */}
                    <InventoryOutlinedIcon sx={{ mr: 2, fontSize: 32 }} />
                    {/* Typography component for the header text */}
                    <Typography 
                        variant="h5" 
                        component="h1" 
                        sx={{ 
                            fontWeight: 500, 
                            letterSpacing: 0.5,
                            position: 'relative', // Set position for pseudo-element
                            // Pseudo-element for animated underline
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                width: '0',
                                height: '2px',
                                bottom: '-4px',
                                left: '50%',
                                background: 'white',  // Underline color
                                transition: 'all 0.3s ease-in-out', // Smooth transition for animation
                            },
                            // Hover effect for animated underline
                            '&:hover::after': {
                                width: '100%', // Expand to full width
                                left: '0', // Align to left
                            }
                        }}
                    >
                        My Tasks and Goals
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;