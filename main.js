
var imageCounter = 0; //stores globaly counter for creating unique ids for single images

/**
 * 
 * @param {*} string 
 * @returns Capitalized First Letter String
 */
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


/**
 * Entry point for JQuery, function manipulates app dom
 */
$(document).ready(function () {

    //hides empty sections on page load 
    $("#app-single-result").hide();
    $("#recent-container").hide();

    //extends click event of image-upload to add-image-button element
    $("#add-image-button").on("click", (e) => {
        $("#image-upload").trigger('click');
    });
    /* listens for image upload change*/
    $("#image-upload").on("change", handleImageChange);

    /**
     * Creates new Image object from url
     * @param {*} src url of image to be loaded
     * @returns Promise 
     */
    const loadMobilenetImage = (src) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.addEventListener('load', () => resolve(img));
            img.addEventListener('error', (err) => reject(err));
            img.src = src;
        })
    }


    var loadMobileNetModel = mobilenet.load();

    /**
     * Handles the classification, api fetches and upload of image with proper async order after upload button change event
     * @param {*} e Event 
     */
    function handleImageChange(e) {

        var imgUrl = URL.createObjectURL(e.target.files[0]);

        loadMobilenetImage(imgUrl).then(async img => {

            //classifies image
            const predictions = await (await (loadMobileNetModel)).classify(img);
            console.log(predictions);

            //fetch additional info about predicted image based on prediction title
            const wikipediaResponse = await fetch("https://en.wikipedia.org/w/rest.php/v1/search/page?" + new URLSearchParams({
                limit: 1,
                q: predictions[0].className.split(',')[0],
            }));
            const wikipediaData = (await wikipediaResponse.json()).pages[0];
            console.log(wikipediaResponse.status);

            //if success add data to dom
            if (wikipediaResponse.status === 200) {
                $("#app-single-result #result-image").attr('src', imgUrl);
                $("#app-single-result .app-result-desc").html(wikipediaData.description);
                $("#app-single-result .app-result-title").html(capitalizeFirstLetter(predictions[0].className.split(',')[0]));
                $("#app-single-result .app-result-excerpt").html(wikipediaData.title + " " + (wikipediaData.excerpt.replace(/<\/?[^>]+(>|$)/g, "").split(';')[0]));
                if ((parseFloat(predictions[0].probability).toFixed(2) * 100) < 50) {
                    $("#app-single-result .app-result-conf-perc").addClass("app-result-prob-low");
                } else {
                    $("#app-single-result .app-result-conf-perc").addClass("app-result-prob-high");
                }
                $("#app-single-result .app-result-conf-perc").html((parseFloat(predictions[0].probability).toFixed(2) * 100) + "%");
                $("#app-hello").hide();
                $("#app-single-result").show();
                $('#recent-gallery-container').append("<div class='recent-gallery-single-item' id='recent-gallery-single-item-" + imageCounter + "'></div>")
                $("#recent-gallery-container > #recent-gallery-single-item-" + imageCounter).append($('#app-single-result > .app-box-paper-result').clone());
                $("#recent-container").show();
            }
            imageCounter++;
        }).catch(err => console.error(err));

    }
});