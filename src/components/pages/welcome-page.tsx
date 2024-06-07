import React from 'react';
import {useLocation} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import {Avatar, Button, Card, CardContent, CardHeader, CardMedia} from "@mui/material";
import flowersImage from '../../assets/images/flowers.jpg';

const Welcome: React.FC = () => {
    const location = useLocation();
    const {name, surname, email, flower, dob} = location.state || {};

    const handleRestart = () => {
        window.location.href = '/';
    };
    const avatarInitials = `${name?.charAt(0) || ''}${surname?.charAt(0) || ''}`;
    const cardHeaderTitle = `${name} ${surname}`;
    const cardHeaderSubheader = dob ? `Date of Birth: ${dob}` : '';

    return (
        <div className="flex flex-col items-center justify-center mt-3">
            <Typography variant="h2">Welcome, {name}!</Typography>
            <Card
                className="my-3"
                sx={{maxWidth: 345}}>
                <CardHeader
                    avatar={
                        <Avatar sx={{bgcolor: 'red'}} aria-label="avatar" className="uppercase">
                            {avatarInitials}
                        </Avatar>
                    }
                    title={cardHeaderTitle}
                    subheader={cardHeaderSubheader}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={flowersImage}
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Email: {email}
                        <br/>
                        Favorite Flower: {flower}
                    </Typography>
                </CardContent>
            </Card>
            <Button variant="contained" onClick={handleRestart}>Start Over</Button>
        </div>
    );
};

export default Welcome;
