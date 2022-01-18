objects = []
sound = ""
stats = ""

function preload() {
    sound = loadSound("beep.mp3")
    console.warn("Sound Loaded!")
}

function setup() {
    canvas = createCanvas(600, 400)
    canvas.center()
    
    video = createCapture(VIDEO)
    video.size(600, 400)
    video.hide()

    
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
  
    document.getElementById("status").innerHTML = "Status: Detecting Baby"
}

function modelLoaded() {
    console.warn("Model Loaded!!!!!!!")
    stats = true;
}

function gotResult(error, results) {
    if (error) {
        console.error(error)
    }
    console.warn(results)
    objects = results
}

function draw() {
    image(video, 0, 0, 600, 400)

    if (stats != "") {
        console.log("hi")
        objectDetector.detect(video, gotResult)
        for (x = 0; x < objects.length; x++) {
            document.getElementById("status").innerHTML = "Staus: Object Detected"
            fill("#FF0000")
            percent = floor(objects[x].confidence * 100)
            text(objects[x].label + " " + percent + "%", objects[x].x + 15, objects[x].y + 15)
            noFill()
            stroke("#FF0000")
            rect(objects[x].x, objects[x].y, objects[x].width, objects[x].height)

            if (objects[x].label == 'person') {
                document.getElementById("baby").innerHTML = "Baby Found"
                sound.stop()
            } else {
                document.getElementById("baby").innerHTML = "Baby Not Found"
                sound.play()
            }
            if (objects.length == 0) {
                document.getElementById("baby").innerHTML = "Baby Not Found"
                sound.play()
            }
        }
    }
}