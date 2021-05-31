import * as React from 'react';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

export default function LessonWord(props) {

    let correctBtn = React.createRef();
    let wrongBtn = React.createRef();

    const [btnDisabled, setBtnDisabled] = React.useState(true)


    let questionRef = React.createRef();
    let answerRef = React.createRef();






    function clickToCheckWord() {
        setBtnDisabled(false);
        answerRef.current.style.opacity = "1";


        let textToSpeechAPISetup = new SpeechSynthesisUtterance();
        let voices = window.speechSynthesis.getVoices();
        textToSpeechAPISetup.voice = voices[9];
        textToSpeechAPISetup.lang = 'it';

        // Adding periods to make the speech synthesis pause between words
        if(props.textToSpeechContent.includes(", ")) {
            props.textToSpeechContent = props.textToSpeechContent.replace(", ", " . . . ");
        }

        // Read the word aloud using the browser API
        textToSpeechAPISetup.text = props.textToSpeechContent;
        window.speechSynthesis.speak(textToSpeechAPISetup);
    }


    function clickToMarkContinue(type) {
        if(type === "wrong") {
            // Push this word to the back to retry
            props.setFlashCardsArray([...props.flashCardsArray, props.word]);
        }

        // Move to the next flashcard
        props.setActiveFlashCard(props.activeFlashCard + 1);
        console.log("current card:", props.activeFlashCard)
        console.log("all cards?", props.flashCardsArray.length);

        let percentageComplete = Math.round((((props.activeFlashCard + 1) / props.flashCardsArray.length)) * 100)
        percentageComplete = percentageComplete > 100 ? 100 : percentageComplete;
        props.setModalProgressBar(percentageComplete);
    }


    // Initial styles
    let displayStatus = {
        marginBottom: "30px",
        display: "none"
    }


    // Check if this is the current active flash card
    if(props.activeFlashCard === props.index) {
        displayStatus['display'] = "block"
    }


    return (
        <div style={displayStatus}>

            {props.showFlag()}

            <div ref={questionRef} className="question">{props.questionText}</div>
            <div ref={answerRef} className={"answer"}>{props.answerText}</div>


            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Button className="word-check"
                            variant="contained"
                            onClick={() => {clickToCheckWord()}}>Check</Button>
                </Grid>


                <Grid item xs={6}>
                    <Button sx={{color: "#fff"}}
                            className="word-correct"
                            color="success"
                            variant="contained"
                            ref={correctBtn}
                            disabled={btnDisabled}
                            onClick={() => {clickToMarkContinue("correct")}}>Correct!</Button>
                </Grid>


                <Grid item xs={6}>
                    <Button sx={{backgroundColor: "#dc3545", ":hover": {backgroundColor: "#c82333"}}}
                            className="word-wrong"
                            color="error"
                            variant="contained"
                            ref={wrongBtn}
                            disabled={btnDisabled}
                            onClick={() => {clickToMarkContinue("wrong")}}>Dang</Button>
                </Grid>
            </Grid>
        </div>
    )
}

