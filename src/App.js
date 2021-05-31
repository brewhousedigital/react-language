import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import FooterBar from "./components/FooterBar";
import CourseBox from "./components/CourseBox";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import LessonModal from "./components/LessonModal";
import Drawer from "@material-ui/core/Drawer";
import LanguageTitle from "./components/LanguageTitle";
import LinearProgress from '@material-ui/core/LinearProgress';

import sortArrayNumerically from './helper-functions/sortArrayNumerically'
import scrollToLastLesson from './helper-functions/scrollToLastLesson'

import getListOfLanguageWords from "./helper-functions/getListOfLanguageWords";




// Define the localStorage name
const localStorageName = "italian-course-completion";


// Scroll to last lesson on page load
scrollToLastLesson(localStorageName);


export default function App() {
    // Set the global dark theme across the site
    const [theme, setTheme] = React.useState(true)
    const [themeName, setThemeName] = React.useState("dark");
    React.useEffect(() => {
        theme ? setThemeName("dark") : setThemeName("light");
    }, [theme]);
    const darkTheme = createTheme({palette: {mode: themeName}});


    // Get the list of words to generate the lesson cards
    let listOfLanguageWords = getListOfLanguageWords();


    // Set the state for the Lesson modal to an initial "off"
    const [modalState, setModalState] = React.useState(false);

    // Create a global state for the total number of lessons completed
    const [languageProgress, setLanguageProgress] = React.useState([]);


    // Create a global state for the total number of lessons completed
    const [flashCardsArray, setFlashCardsArray] = React.useState([]);


    // On page load, grab the value from local storage and save it
    React.useEffect(() => {
        setLanguageProgress(JSON.parse(window.localStorage.getItem(localStorageName)));
    }, []);


    // Sort the values numerically and re-save them back to localstorage with each lesson completed
    React.useEffect(() => {
        languageProgress.sort(sortArrayNumerically)
        window.localStorage.setItem(localStorageName, JSON.stringify(languageProgress));
    }, [languageProgress]);


    // Create a helper function to open the Lesson modal
    // I dont know how this functions in this context
    const toggleDrawer = (open) => () => {
        setModalState(open);
    };



    // When rendering the checkboxes, pass the checked state as a prop
    const handleLessonCompletedStatus = (index) => {
        // Returns a true or false depending on if the lesson is found in local storage
        return !!languageProgress.includes(index);
    }


    let [modalProgressBar, setModalProgressBar] = React.useState(0)

    return (
        /* Global Dark Theme */
        <ThemeProvider theme={darkTheme}>
            {/* Sets the Material UI base CSS */}
            <CssBaseline />

            {/* Creates a large container */}
            <Container maxWidth="lg" sx={{padding: "40px 0"}}>
                <LanguageTitle />

                <Switch
                    checked={theme}
                    onChange={(e) => {setTheme(e.target.checked)}}
                    inputProps={{ 'aria-label': 'controlled' }}
                    label="Dark Mode"
                />

                {/* Generates all the lesson boxes */}
                <Grid id="course-grid" container spacing={3}>
                    {listOfLanguageWords.map((lesson, index) => {
                        return (
                            <CourseBox
                                toggleDrawer={toggleDrawer}
                                key={index}
                                index={index}
                                checkedStatus={handleLessonCompletedStatus(index)}
                                languageProgress={languageProgress}
                                setLanguageProgress={setLanguageProgress}
                                setFlashCardsArray={setFlashCardsArray}
                                setModalProgressBar={setModalProgressBar}
                            />
                        )
                    })}
                </Grid>
            </Container>


            {/* This is the lesson modal */}
            <Drawer anchor="bottom" open={modalState} onClose={toggleDrawer(false)}>
                <Box sx={{
                    width: 'auto',
                    height: "100vh",
                    padding:"10px 60px 60px 60px"
                }} role="presentation">

                    <LinearProgress
                        sx={{
                            marginBottom: "60px"
                        }}
                        variant="determinate"
                        value={modalProgressBar} />

                    <LessonModal
                        toggleDrawer={toggleDrawer}
                        flashCardsArray={flashCardsArray}
                        setFlashCardsArray={setFlashCardsArray}
                        setModalProgressBar={setModalProgressBar}
                    />

                </Box>
            </Drawer>


            <FooterBar />
        </ThemeProvider>
    );
}