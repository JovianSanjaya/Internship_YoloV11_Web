// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";
import { getDatabase, ref as dbRef, set } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";



const firebaseConfig = {
    apiKey: "AIzaSyBYYHgbI13ckuX7eoHji0YggOkgcvAvZnI",
    authDomain: "sp-a-star-internship.firebaseapp.com",
    databaseURL: "https://sp-a-star-internship-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "sp-a-star-internship",
    storageBucket: "sp-a-star-internship.appspot.com",
    messagingSenderId: "8071237803",
    appId: "1:8071237803:web:e9b6d608c2e72c02f667ee",
    measurementId: "G-V6CX4RE22S"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase(app);





//Scrolling 
function scrollToElement (elementSelector, instance = 0){

    const elements = document.querySelectorAll(elementSelector);

    if(elements.length > instance){

        elements[instance].scrollIntoView({behavior: 'smooth'});
    }
}

const link1 = document.getElementById("link1"); 
const link2 = document.getElementById("link2"); 
const link3 = document.getElementById("link3");
const link4 = document.getElementById("link4");
const signup = document.getElementById("signup");
const link5 = document.getElementById("link5");

link1.addEventListener('click',() => {
    scrollToElement('.buffer');
});

link2.addEventListener('click',() => {
    scrollToElement('.right');
});

link3.addEventListener('click', () => {
    scrollToElement('.chatbot-container')
});

signup.addEventListener('click',() => {
    scrollToElement('.buffer');
});

link4.addEventListener('click', ()=>{
    scrollToElement('.realtime-sub-header')
});

link5.addEventListener('click', ()=>{
    scrollToElement('.stitching-sub-header')
});








// //display image
// function displayImage(event) {
//     const image = document.getElementById('input-image');
//     image.src = URL.createObjectURL(event.target.files[0]);
//     image.onload = () => {
//         URL.revokeObjectURL(image.src); 
//     }
// }

// window.displayImage = displayImage;







// Handle image paste from clipboard
document.addEventListener('paste', function (event) {
    const clipboardItems = event.clipboardData.items;

    // Look for image data in the clipboard
    for (let i = 0; i < clipboardItems.length; i++) {
        const item = clipboardItems[i];

        if (item.type.indexOf('image') === 0) {
            const file = item.getAsFile(); // Get the image file from clipboard

            // Update the file input with the clipboard image
            const imageInput = document.getElementById('image');
            const dataTransfer = new DataTransfer(); // Create a new DataTransfer object

            dataTransfer.items.add(file); // Add the file to the DataTransfer object
            imageInput.files = dataTransfer.files; // Override the files in the file input

            // Trigger the onchange event manually to process the image
            const event = new Event('change');
            imageInput.dispatchEvent(event);

            // Also update the preview image
            displayImage({ target: imageInput });
        }
    }
});

// Handle the image selection from file input (when a file is chosen)
function displayImage(event) {
    const imageInput = event.target;
    if (imageInput.files.length === 0) {
        alert("Please select an image to upload.");
        return;
    }

    const image = document.getElementById('input-image');
    const file = imageInput.files[0];

    image.src = URL.createObjectURL(file); // Create object URL from the selected file
    image.onload = () => {
        URL.revokeObjectURL(image.src); // Clean up the object URL after loading
    };

    image.style.display = "block"; // Show the image preview
}












document.addEventListener('DOMContentLoaded', () => {
    const subHeader = document.querySelector('.sub-header');
    const cards = document.querySelectorAll('.offline .card');
    const fullCard = document.querySelector('.card-full'); // Select the new full-width card

    const fullCardConfidence = document.querySelector('.card-full-confidence'); // Select the new full-width card



    const chatbotCard = document.querySelector('.chatbot-sub-header'); // Select the chatbot card
    const chatbotText = document.querySelector('.chatbot-text p'); // Select the chatbot card
    const chatbotButton = document.querySelector('.btn5'); // Select the chatbot button

    const realtimeSubHeader = document.querySelector('.realtime-sub-header');
    const realtimeText = document.querySelector('.realtime-text p'); // need the p
    const realtimeChart = document.querySelector('.realtime-chart-container');


    const realtimeText2 = document.querySelector('.realtime-text2 p'); // need the p
    const formContainer = document.querySelector('.form-container'); 
    const chartWrapperRealTime = document.querySelector('.chart-wrapper-realtime'); 

    const stitchingHeader = document.querySelector('.stitching-sub-header'); 
    const stitchingWrapper = document.querySelector('.wrapper'); 

    const stitchingResult = document.querySelector('.resultContainer')





    const revealElement = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    };

    const options = {
        root: null, // Use the viewport as the root
        threshold: 0.3 // Trigger when 50% of the element is visible
    };

    const observer = new IntersectionObserver(revealElement, options);

    observer.observe(subHeader); // Observe the sub-header

    cards.forEach(card => {
        observer.observe(card); // Observe each card
    });

    if (fullCard) {
        observer.observe(fullCard); // Observe the new full-width card
    }

    if (chatbotCard) {
        observer.observe(chatbotCard); // Observe the chatbot card
    }

    if(chatbotText){
        observer.observe(chatbotText);
    }

    if(chatbotButton){
        observer.observe(chatbotButton);
    }

    if(realtimeSubHeader){
        observer.observe(realtimeSubHeader)
    }

    if(realtimeText){
        observer.observe(realtimeText)
    }

    if(realtimeChart){
        observer.observe(realtimeChart)
    }

    if(realtimeText2){
        observer.observe(realtimeText2)
    }

    if(formContainer){
        observer.observe(formContainer)
    }

    if(fullCardConfidence){
        observer.observe(fullCardConfidence)
    }

    if(chartWrapperRealTime){
        observer.observe(chartWrapperRealTime)
    }

    if(stitchingHeader){
        observer.observe(stitchingHeader)
    }

    if(stitchingWrapper){
        observer.observe(stitchingWrapper)
    }

    if(stitchingResult){
        observer.observe(stitchingResult)
    }

});








// Store the uploaded image file and annotation in zip
let uploadedFile = null;
let annotationJSON = null;


function uploadImage() {
    const imageInput = document.getElementById('image');
    if (imageInput.files.length === 0) {
        alert("Please select an image to upload.");
        return;
    }
    uploadedFile = imageInput.files[0];
    alert("Image uploaded. Click 'Apply Detection' to process.");
}

window.uploadImage = uploadImage;






// Counter for unique user IDs
let imageCounter = 1; // Start with user1


async function applyDetection() {
    if (!uploadedFile) {
        alert("Please upload an image first.");
        return;
    }

    // Show loader
    const loader = document.getElementById('loader');
    loader.style.display = 'block';

    const formData = new FormData();
    formData.append('file', uploadedFile);

    try {
        const response = await fetch('/object-detection/', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            // Get the zip file from the response
            const zipBlob = await response.blob();
            const zipFile = await JSZip.loadAsync(zipBlob);

            // Extract the image and annotations from the zip file
            const imageFile = zipFile.file("prediction_visual.png");
            const annotationFile = zipFile.file("annotations.json");

            if (imageFile && annotationFile) {
                // Display the image
                const imageBlob = await imageFile.async("blob");
                const imageURL = URL.createObjectURL(imageBlob);
                const outputImage = document.getElementById('output-image');
                outputImage.src = imageURL;
                outputImage.style.display = 'block';

                // Display the annotations as JSON
                const annotationText = await annotationFile.async("string");
                annotationJSON = JSON.parse(annotationText);

                // Upload image to Firebase Storage
                await uploadImageToFirebase(imageBlob, annotationJSON);
            }
        } else {
            const errorText = await response.text();
            console.error('Error:', errorText);
            alert('Error: ' + errorText);
        }
    } catch (error) {
        console.error('Error processing detection:', error);
        alert('An error occurred while processing the detection.');
    } finally {
        // Hide loader
        loader.style.display = 'none';
    }
}





// Upload image to Firebase Storage and store the image URL and annotations in Realtime Database
async function uploadImageToFirebase(imageBlob, annotationJSON) {


     // Create a unique filename by appending the counter
     const uniqueFileName = `prediction_visual_${imageCounter}.png`;

     // Convert the Blob to a File object with a unique name
     const file = new File([imageBlob], uniqueFileName, { type: "image/png" });

    try {
        if (!file) {
            console.log("No file selected.");
            return;
        }
    
        // Define the storage reference
        const mountainsRef = ref(storage, `images/${file.name}`);
    
        // Upload the file
        uploadBytes(mountainsRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
    
            // Get the download URL
            getDownloadURL(mountainsRef).then((downloadURL) => {
                console.log('File available at', downloadURL);
                // Store the URL and JSON data in the Realtime Database
                writeDataToDatabase(downloadURL,annotationJSON);
            });

            
        }).catch((error) => {
            console.error("Error uploading file:", error);
        });

    } catch (error) {
        console.error("Error uploading to Firebase:", error);
    }
}

window.applyDetection = applyDetection;


// Write data (image URL and annotations) to Firebase Realtime Database
function writeDataToDatabase(imageUrl, jsonAnnotation) {
     // Create a unique user ID
     const imageId = `image${imageCounter++}`; // Increment the counter for the next user

     // Example JSON data
     const jsonData = jsonAnnotation
 
     // Store the data in the Realtime Database
     set(dbRef(database, 'Defects/' + imageId), {
         image_url: imageUrl,
         annotations: jsonData
     })
     .then(() => {
         console.log("Data saved successfully.");
     })
     .catch((error) => {
         console.error("Error saving data:", error);
     });
}










// Display the graph and remove the previous instance
let defectChartInstance = null;

function freqchart() {
    if (!annotationJSON) {
        alert("Please apply detection first to load annotations.");
        return;
    }

    const jsonData = annotationJSON;

    const defectCounts = { "Nicks": 0, "Dents": 0, "Scratches": 0, "Pittings": 0 };

    jsonData.forEach(item => {
        if (item.category_name in defectCounts) {
            defectCounts[item.category_name]++;
        }
    });

    const xValues = ["Nicks", "Dents", "Scratches", "Pittings"];
    const yValuesCounts = [
        defectCounts["Nicks"],
        defectCounts["Dents"],
        defectCounts["Scratches"],
        defectCounts["Pittings"]
    ];
    const barColors = ["#FF3838", "#FF9D97", "#FF701F", "#FFB21D"];

    // Defect Count Bar Chart
    if (defectChartInstance) {
        defectChartInstance.destroy();
    }

    defectChartInstance = new Chart("defectChart", {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                label: "Defect Counts",
                backgroundColor: barColors,
                data: yValuesCounts
            }]
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: "Defect Counts"
            }
        }
    });
}


window.freqchart = freqchart;



let chartInstances = {}; // Store chart instances

function areachart() {
    if (!annotationJSON) {
        alert("Please apply detection first to load annotations.");
        return;
    }

    const jsonData = annotationJSON;
    const defectAreas = { "Nicks": [], "Dents": [], "Scratches": [], "Pittings": [] };

    // Collect areas for each defect type
    jsonData.forEach(item => {
        if (item.category_name in defectAreas) {
            defectAreas[item.category_name].push(item.area);
        }
    });

    // Destroy all previous chart instances
    Object.keys(chartInstances).forEach(chartId => {
        chartInstances[chartId].destroy();
    });
    chartInstances = {}; // Clear the chartInstances object

    // Create individual charts for each defect type
    const defectTypes = Object.keys(defectAreas);
    defectTypes.forEach((defectType, index) => {
        if (defectAreas[defectType].length > 0) { // Only create a chart if there are areas
            const labels = Array.from({ length: defectAreas[defectType].length }, (_, i) => i + 1);
            const chartId = `areaChart${defectType}`; // Unique ID for each chart

            // Create the chart instance and store it in chartInstances
            chartInstances[chartId] = new Chart(chartId, {
                type: "bar", // Using bar chart for histograms
                data: {
                    labels: labels,
                    datasets: [{
                        label: defectType,
                        data: defectAreas[defectType],
                        backgroundColor: [
                            "#FF3838", // Nicks
                            "#FF9D97", // Dents
                            "#FF701F", // Scratches
                            "#FFB21D"  // Pittings
                        ][index] // Assign a specific color for each defect
                    }]
                },
                options: {
                    plugins: {
                        legend: { display: true },
                        title: {
                            display: true,
                            text: `Distribution of ${defectType} Areas`
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: "Area"
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: "Data Point"
                            }
                        }
                    },
                    barPercentage: 1.0,
                    categoryPercentage: 0.8
                }
            });
        }
    });
}



// Assign function to window object for accessibility
window.areachart = areachart;











let chartInstancesConfidence = {}; // Store chart instances for confidence

function areachartconfidence() {
    if (!annotationJSON) {
        alert("Please apply detection first to load annotations.");
        return;
    }

    const jsonData = annotationJSON;
    const defectAreas = { "Nicks": [], "Dents": [], "Scratches": [], "Pittings": [] };

    // Collect areas for each defect type
    jsonData.forEach(item => {
        if (item.category_name in defectAreas) {
            defectAreas[item.category_name].push(item.area);
        }
    });

    // Destroy all previous chart instances
    Object.keys(chartInstancesConfidence).forEach(chartId => {
        chartInstancesConfidence[chartId].destroy();
    });
    chartInstancesConfidence = {}; // Clear the chartInstancesConfidence object

    // Create individual charts for each defect type
    const defectTypes = Object.keys(defectAreas);
    defectTypes.forEach((defectType, index) => {
        if (defectAreas[defectType].length > 0) { // Only create a chart if there are areas
            // Initialize frequency counts
            const frequency = {
                "below 25": 0,
                "25 to 75": 0,
                "above 75": 0
            };

            // Count frequencies based on area size
            defectAreas[defectType].forEach(area => {
                if (area < 25) {
                    frequency["below 25"]++;
                } else if (area <= 75) {
                    frequency["25 to 75"]++;
                } else {
                    frequency["above 75"]++;
                }
            });

            // Data for the chart
            const labels = ["below 25", "25 to 75", "above 75"];
            const data = [
                frequency["below 25"],
                frequency["25 to 75"],
                frequency["above 75"]
            ];

            const chartId = `areaChartConfidence${defectType}`; // Unique ID for each chart

            // Create the chart instance and store it in chartInstancesConfidence
            chartInstancesConfidence[chartId] = new Chart(chartId, {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [{
                        label: `Frequency of ${defectType} Areas`,
                        data: data,
                        backgroundColor: [
                            "#FF3838", // Nicks
                            "#FF9D97", // Dents
                            "#FF701F", // Scratches
                            "#FFB21D"  // Pittings
                        ][index] // Assign a specific color for each defect
                    }]
                },
                options: {
                    plugins: {
                        legend: { display: true },
                        title: {
                            display: true,
                            text: `Distribution of ${defectType} Areas`
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: "Frequency"
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: "Area Range"
                            }
                        }
                    },
                    barPercentage: 0.8,
                    categoryPercentage: 0.7
                }
            });
        }
    });
}

// Assign function to window object for accessibility
window.areachartconfidence = areachartconfidence;















let socket;
        
// Chart.js setup with custom colors and grid lines
const ctx = document.getElementById('realtimedefectChart').getContext('2d');
const defectChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Nicks', 'Dents', 'Scratches', 'Pittings'],
        datasets: [{
            label: 'Defect Counts',
            data: [0, 0, 0, 0],  // Initial data
            backgroundColor: ["#FF3838", "#FF9D97", "#FF701F", "#FFB21D"],  // Custom colors for each defect type
            borderColor: ["#FF3838", "#FF9D97", "#FF701F", "#FFB21D"],  // Matching border colors
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            x: {
                beginAtZero: true,
                grid: {
                    display: true,  // Show grid lines on x-axis
                    color: 'rgba(200, 200, 200, 0.3)'  // Grid line color
                },
                title: {
                    display: true,
                    text: 'Defect Type'  // Label for the x-axis
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    display: true,  // Show grid lines on y-axis
                    color: 'rgba(200, 200, 200, 0.3)'  // Grid line color
                },
                title: {
                    display: true,
                    text: 'Frequency'  // Label for the y-axis
                }
            }
        }
    }
});




// Handle IP and port form submission
document.getElementById('ipForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page reload
    
    // Get the IP address and port from user input
    const ipAddress = document.getElementById('ipAddress').value;
    const port = document.getElementById('port').value;
    

    // Connect to the Socket.IO server with the specified IP and port
    socket = io.connect(`http://${ipAddress}:${port}`);

    // Show the chart canvas
    document.getElementById('realtimedefectChart').style.display = 'block';





    // Listen for updates from the server (Raspberry Pi)
    socket.on('update_counts', function(defectCounts) {
        // Update the chart with new defect counts
        defectChart.data.datasets[0].data = [
            defectCounts.Nicks,
            defectCounts.Dents,
            defectCounts.Scratches,
            defectCounts.Pittings
        ];

        defectChart.update();  // Redraw the chart with the updated data
    })


});



// Declare input outside the load event listener to make it globally accessible
const input = document.getElementById("upload"); // Global declaration
const filewrapper = document.getElementById("filewrapper");
const submitButton = document.querySelector(".submitBtnInputStitching");
const stitchedImage = document.getElementById("stitchedImage");

let selectedFiles = [];

//stitching
window.addEventListener("load",()=>{

    input.addEventListener("change",(e)=>{
        let fileName = e.target.files[0].name;
        let filetype = e.target.value.split(".").pop();
        fileshow(fileName,filetype);
    })

    const fileshow=(fileName,filetype)=>{
        const showfileboxElem = document.createElement("div");
        showfileboxElem.classList.add("showfilebox");
        const leftElem = document.createElement("div");
        leftElem.classList.add("left");
        const fileTypeElem = document.createElement("span");
        fileTypeElem.classList.add("filetype");
        fileTypeElem.innerHTML=filetype;
        leftElem.append(fileTypeElem);
        const filetitleElem = document.createElement("h3");
        filetitleElem.innerHTML=fileName;
        leftElem.append(filetitleElem);
        showfileboxElem.append(leftElem);
        const rightElem = document.createElement("div");
        rightElem.classList.add("right");
        showfileboxElem.append(rightElem);
        const crossElem = document.createElement("span");
        crossElem.innerHTML="&#215;";
        rightElem.append(crossElem);
        filewrapper.append(showfileboxElem);

        crossElem.addEventListener("click",()=>{
            filewrapper.removeChild(showfileboxElem);
            
        })
    }

})







// Capture selected files
input.addEventListener("change", function (event) {
    // Append all selected files to the `selectedFiles` array
    selectedFiles = selectedFiles.concat(Array.from(event.target.files)); // Concatenate the new files to the existing array
    console.log(selectedFiles); // Debugging to check files are being added correctly
});

// Handle submit button click
submitButton.addEventListener("click", async function () {
    // Make sure more than one file is selected
    if (selectedFiles.length < 2) {
        alert("Please upload at least two images.");
        return;
    }

    // Create FormData object to send files
    let formData = new FormData();
    selectedFiles.forEach((file) => {
        formData.append("images", file); // Append each file with the key "images"
    });

    try {
        // Send files to the backend
        let response = await fetch("/upload", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            // If the response is successful, display the stitched image
            let blob = await response.blob();
            let url = URL.createObjectURL(blob);
            stitchedImage.src = url;
            stitchedImage.style.display = "block";
        } else {
            // Handle errors
            let errorData = await response.json();
            alert(`Stitching failed: ${errorData.error}`);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while uploading the images.");
    }
});


// document.addEventListener("DOMContentLoaded", function () {
//     document.querySelector(".deleteAllBtn").addEventListener("click", function () {
//         if (confirm("Are you sure you want to delete all images?")) {
//             fetch("/delete-images", { method: "POST" })
//                 .then(response => response.json())
//                 .then(data => alert(data.message))
//                 .catch(error => console.error("Error:", error));
//         }
//     });
// });


// document.addEventListener("DOMContentLoaded", function () {
//     document.querySelector(".deleteAllBtn").addEventListener("click", function () {
//         if (confirm("Are you sure you want to delete all images?")) {
//             fetch("/delete-images", { method: "POST" })
//                 .then(response => response.json())
//                 .then(data => {
//                     alert(data.message);
                    
//                     // Remove all elements inside showfileboxElem
//                     let fileWrapper = document.querySelector(".showfilebox");
//                     if (fileWrapper) {
//                         fileWrapper.innerHTML = ""; // Clears all content
//                     }

//                     // Hide stitched image
//                     let stitchedImage = document.getElementById("stitchedImage");
//                     if (stitchedImage) {
//                         stitchedImage.style.display = "none";
//                     }
//                 })
//                 .catch(error => console.error("Error:", error));
//         }
//     });
// });


document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".deleteAllBtn").addEventListener("click", function () {
        if (confirm("Are you sure you want to delete all images?")) {
            fetch("/delete-images", { method: "POST" })
                .then(response => response.json())
                .then(data => {
                    alert(data.message);
                    
                    // Remove all elements inside .filewrapper (all showfilebox elements)
                    let fileWrapper = document.querySelector("#filewrapper"); // Assuming filewrapper is the container
                    if (fileWrapper) {
                        // Select all .showfilebox elements inside .filewrapper
                        const showFileBoxElems = fileWrapper.querySelectorAll(".showfilebox");
                        showFileBoxElems.forEach((elem) => {
                            fileWrapper.removeChild(elem); // Remove each .showfilebox element
                        });
                    }

                    // Optionally, hide stitched image if visible
                    let stitchedImage = document.getElementById("stitchedImage");
                    if (stitchedImage) {
                        stitchedImage.style.display = "none"; // Hide the stitched image
                    }

                    // Optionally, reset the input field
                    let fileInput = document.getElementById("fileInput");
                    if (fileInput) {
                        fileInput.value = ""; // Reset the file input value
                    }
                })
                .catch(error => console.error("Error:", error));
        }
    });
});
