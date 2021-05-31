import * as React from 'react';
import Box from '@material-ui/core/Box';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AppsIcon from '@material-ui/icons/Apps';
import RotateRightIcon from '@material-ui/icons/RotateRight';
import SwapCallsIcon from '@material-ui/icons/SwapCalls';

export default function FooterBar() {
    return (
        <Box sx={{
            position: "sticky",
            bottom: "0",
            zIndex: "1020"
        }}>
            <BottomNavigation

                showLabels
            >
                <BottomNavigationAction label="15 Random" icon={<SwapCallsIcon />} />
                <BottomNavigationAction label="All Words" icon={<AppsIcon />} />
                <BottomNavigationAction label="Last 50" icon={<RotateRightIcon />} />
            </BottomNavigation>
        </Box>
    )
}