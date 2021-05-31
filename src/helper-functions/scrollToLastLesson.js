/**
 * Scroll Users To Last Lesson
 *
 * This function will scroll users to their latest lesson on page load
 * It uses an interval timer to make sure React has rendered before going there
 *
 * The below parameter is a global variable that is used in other parts of the site
 * @param localStorageName
 */
export default function scrollToLastLesson(localStorageName) {
    // Check and see if something exists in the local storage
    let languageProgress = JSON.parse(window.localStorage.getItem(localStorageName));

    // If its null, set it to a blank array, otherwise keep the original result
    languageProgress = languageProgress === null ? [] : languageProgress;

    // Find the last item in the array
    let lastLesson = languageProgress.pop();

    // Check if user has completed at least one lesson
    // If not, a blank array will return undefined since the index would be -1
    if(lastLesson !== undefined) {
        // Construct the ID name. This is found in the <CourseBox/> component
        let lastLessonElement = "lesson-box-" + lastLesson;

        // Set the interval to search for the DOM node
        let searchForLastLesson = setInterval(function() {
            if(document.getElementById(lastLessonElement) !== null) {
                // If the node is found, clear the interval
                clearInterval(searchForLastLesson);

                // Scroll into view!
                document.getElementById(lastLessonElement).scrollIntoView(true)
            }
        }, 100)
    }
}