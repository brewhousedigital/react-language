import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import getListOfLanguageWords from "../helper-functions/getListOfLanguageWords";
import shuffleArray from "../helper-functions/shuffleArray";


export default function CourseBox(props) {
    const lessonCompletedStatus = React.createRef();


    const handleCheckbox = (event) => {
        let status = event.target.checked;
        let lessonNumber = props.index;

        if(status) {
            props.setLanguageProgress([...props.languageProgress, lessonNumber])
        } else {
            let newLanguageProgressArray = props.languageProgress.filter(lesson => lesson !== lessonNumber)
            props.setLanguageProgress(newLanguageProgressArray);
        }
    };


    const generateFlashCards = (type = "basic") => {
        // Set default parameters
        let totalNumberOfCards = 15;
        let totalNumberOfReviewCards = 10;
        let currentLessonId = props.index + 1;
        let listOfNewCardsArray = [];
        let listOfRandomCardsArray = [];

        // Get the list of words to generate the lesson cards
        let listOfLanguageWords = getListOfLanguageWords();

        if(currentLessonId > totalNumberOfCards) {
            // Grab the total number of review cards, counting backwards from the current lesson
            for(let i = currentLessonId; i > currentLessonId - totalNumberOfReviewCards; i--) {
                listOfNewCardsArray.push(listOfLanguageWords[i]);
            }

            // Put the rest of the cards into their own array so we can randomly search it
            for(let i = 0; i <= currentLessonId - totalNumberOfReviewCards; i++) {
                listOfRandomCardsArray.push(listOfLanguageWords[i]);
            }

            // Shuffle the review deck in a random order
            shuffleArray(listOfRandomCardsArray);


            // Choose 5 cards from the listOfRandomCardsArray and add it to the listOfNewCardsArray.
            for(let i = 0; i < 5; i++) {
                listOfNewCardsArray.push(listOfRandomCardsArray[i]);
            }
        } else {
            // The user is on a lesson less than 15
            for(let i = 0; i < currentLessonId; i++) {
                listOfNewCardsArray.push(listOfLanguageWords[i]);
            }

            // Reset the card total
            totalNumberOfCards = listOfNewCardsArray.length;
        }


        // Shuffle the new deck
        shuffleArray(listOfNewCardsArray);
        console.log(`Generating new flashcard list. ${listOfNewCardsArray.length} new cards generated.`)
        console.log(listOfNewCardsArray);

        // Reset the progress bar
        props.setModalProgressBar(0);

        props.setFlashCardsArray(listOfNewCardsArray);

        props.toggleDrawer(true)();
    }


    return (
        <Grid id={"lesson-box-" + props.index} item md={11} xs={6} sx={{marginBottom: "20px"}}>
            <Button
                    onClick={() => {generateFlashCards()}}
                    sx={{
                        width: "100%",
                        display: "block",
                        padding: "12px 0",
                        textTransform: "capitalize",
                        marginBottom: "8px"
                    }} variant="contained">
                <span style={{fontWeight: "100"}}>Lesson</span>
                <span style={{fontWeight: "700", display:"block"}}>{props.index + 1}</span>
            </Button>





            <p style={{textAlign: "center", "margin": 0}}>
                <FormControlLabel
                    sx={{
                        marginRight: "0",
                        color: "#fff"
                    }}
                    control={
                        <Checkbox
                            /*checked={lessonLearned}*/
                            onChange={handleCheckbox}
                            name={"lessonLearned" + (props.index + 1)}
                            color="primary"
                            checked={props.checkedStatus}
                            ref={lessonCompletedStatus}
                        />
                    }
                    label="Learned"
                />
            </p>
        </Grid>

    )
}