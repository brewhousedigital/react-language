import * as React from 'react';
import Container from "@material-ui/core/Container";
import LessonWord from "./LessonWord";
import Button from "@material-ui/core/Button";
import UnitedStatesFlag from "./svgFlagUnitedStates";
import LanguageFlag from "./svgFlagItaly";

export default function LessonModal(props) {
    let [activeFlashCard, setActiveFlashCard] = React.useState(0);

    if(activeFlashCard >= props.flashCardsArray.length) {
        return (
            <Container maxWidth="sm" sx={{textAlign: "center"}}>
                <h1>Finito!</h1>
                <Button sx={{color: "#fff", textDecoration:"underline"}} onClick={props.toggleDrawer(false)}>Close Lesson</Button>
            </Container>
        )
    } else {
        return (
            <Container maxWidth="sm" sx={{textAlign: "center"}}>
                {props.flashCardsArray.map((item, index) => {
                    // 50/50 chance to swap Answer and Question to switch things up!
                    let questionText = item['en'];
                    let answerText = item['new'];
                    let textToSpeechContent = answerText;
                    let showFlag = () => {return (<UnitedStatesFlag />)};

                    if(Math.random() < 0.5) {
                        questionText = item['new'];
                        answerText = item['en'];
                        textToSpeechContent = questionText;
                        showFlag = () => {return (<LanguageFlag />)};
                    }

                    return (
                        <LessonWord
                            activeFlashCard={activeFlashCard}
                            setActiveFlashCard={setActiveFlashCard}
                            key={index}
                            index={index}
                            word={item}
                            questionText={questionText}
                            answerText={answerText}
                            textToSpeechContent={textToSpeechContent}
                            showFlag={showFlag}
                            flashCardsArray={props.flashCardsArray}
                            setFlashCardsArray={props.setFlashCardsArray}
                            setModalProgressBar={props.setModalProgressBar}
                        />
                    )
                })}

                <Button sx={{color: "#fff", textDecoration:"underline"}} onClick={props.toggleDrawer(false)}>Close Lesson</Button>
            </Container>

        )
    }


}
