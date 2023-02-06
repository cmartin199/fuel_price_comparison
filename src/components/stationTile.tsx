import { Box, Typography } from '@mui/material';

interface Station {
    distanceFromSearchPostcode: number;
    fuelPriceList: Array<{}>;
    name: string;
    postcode: string;
    street: string
}

const commonStyles = {
    bgcolor: 'background.paper',
    m: 2,
    borderColor: 'black',
    border: 1,
    width: '50rem',
    height: '5rem',
};

export const StationTile = ({
    distanceFromSearchPostcode,
    fuelPriceList,
    name,
    postcode,
    street
}: Station) => {
    return (
        <Box sx={{ ...commonStyles, borderRadius: '16px' }} >
            <Typography>{name}</Typography>
        </Box>
    );
}