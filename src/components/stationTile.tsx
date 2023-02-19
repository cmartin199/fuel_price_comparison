import { Grid, Typography } from '@mui/material';

interface Station {
    distanceFromSearchPostcode: number;
    fuelPriceList: Array<any>;
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
};

export const StationTile = ({
    distanceFromSearchPostcode,
    fuelPriceList,
    name,
    postcode,
    street
}: Station) => {
    return (
        <Grid item container sx={{ ...commonStyles, borderRadius: '16px' }} md={12} spacing={0} padding={3} >
            <Grid item sm={9} spacing={1}>
                <Typography>{name}, {street}</Typography>
            </Grid>
            <Grid item sm={3} spacing={1}>
                <Typography>{Math.round(distanceFromSearchPostcode)} miles away</Typography>
            </Grid>
            <Grid item sm={12} spacing={1}>
                <Typography>{postcode}</Typography>
            </Grid>
            {
                fuelPriceList.map((item, key) => {

                    return (
                        <Grid key={key} item container sm={12}>
                            <Grid item sm={4}>
                                <Typography>{item.FuelType}</Typography>
                            </Grid>
                            <Grid item sm={4}>
                                <Typography>£{item.LatestRecordedPrice.InGbp}</Typography>
                            </Grid>
                        </Grid>


                    );
                })
            }
        </Grid>
    );
}