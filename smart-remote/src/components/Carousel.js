import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import Slide from "@mui/material/Slide";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

import React, { ReactElement } from "react";

function Carousel(){
    const [cards, setCards] = React.useState<React.ReactElement>([]);
    const [index, setIndex] = React.useState(0);
    const [direction, setDirection] = React.useState("left");

    const carouselLength = 4;

    const dummyCards = [
        {
            title: "Title 1",
            description: "Description 1",
            image: "https://source.unsplash.com/random",
        },
        {
            title: "Title 2",
            description: "Description 2",
            image: "https://source.unsplash.com/random",
        },
        {
            title: "Title 3",
            description: "Description 3",
            image: "https://source.unsplash.com/random",
        },
        {
            title: "Title 4",
            description: "Description 4",
            image: "https://source.unsplash.com/random",
        },
    ];

    


    const handleNext = () => {
        setDirection("left");
        setIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }

    const handlePrev = () => {
        setDirection("right");
        setIndex((prevIndex) => (prevIndex - 1) % cards.length);
    }

    return(
        <div>
            <Box sx={{display:'flow',flexDirection:'row'}}>
                <IconButton onClick={handlePrev}>
                    <NavigateBefore />
                </IconButton>
                <Box sx={{display:'flow',flexDirection:'row'}}>
                    <Slide direction={direction} in={index === 0} mountOnEnter unmountOnExit>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={dummyCards[0].image}
                                alt={dummyCards[0].title}
                            />
                            <CardContent>
                                <h2>{dummyCards[0].title}</h2>
                                <p>{dummyCards[0].description}</p>
                            </CardContent>
                        </Card>
                    </Slide>
                    <Slide direction={direction} in={index === 1} mountOnEnter unmountOnExit>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={dummyCards[1].image}
                                alt={dummyCards[1].title}
                            />
                            <CardContent>
                                <h2>{dummyCards[1].title}</h2>
                                <p>{dummyCards[1].description}</p>
                            </CardContent>
                        </Card>
                    </Slide>
                    <Slide direction={direction} in={index === 2} mountOnEnter unmountOnExit>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={dummyCards[2].image}
                                alt={dummyCards[2].title}
                            />
                            <CardContent>
                                <h2>{dummyCards[2].title}</h2>
                                <p>{dummyCards[2].description}</p>
                            </CardContent>
                        </Card>
                    </Slide>
                    <Slide direction={direction} in={index === 3} mountOnEnter unmountOnExit>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={dummyCards[3].image}
                                alt={dummyCards[3].title}
                            />
                            <CardContent>
                                <h2>{dummyCards[3].title}</h2>
                                <p>{dummyCards[3].description}</p>
                            </CardContent>
                        </Card>
                    </Slide>
                </Box>
                <IconButton onClick={handleNext}>
                    <NavigateNext />
                </IconButton>
            </Box>
        </div>
    )
}

export default Carousel;