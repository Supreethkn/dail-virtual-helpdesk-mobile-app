<template>
    <!-- <div class="loader" v-if="loading"></div> -->

    <div class="map-holder" :id="svgid">
        <svg :class="svgid" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        </svg>
    </div>
</template>
<script>
import $ from 'jquery'

var viewBox = {x: 0, y:0, w:1000, h:900}, movedViewBox = viewBox, myPointers = [], lastDif = -1, scale = 1, startPoint = {x: 0, y: 0}, endPoint = startPoint, isSinglePointer = true;
var svgSize = {
    w:1000,
    h:900
};
export default{
    props: ["mapName","svgid", "kioskxpos", "kioskypos", 'pathpoints', "departurename", "showKioskPos", "mapType"],
    data() {
        return {
            loading: true
        }
    },
    mounted(){
        let departurename = this.departurename
        var svgMapName = this.mapName;
        setTimeout(() => {
            let svgid = this.svgid;
            let mapLoaded = false
            let screenWidth = screen.availWidth
            let screenHeight = screen.availHeight
            let mapType = this.mapType
            $.ajax({
                url: require(`@/assets/map/${this.mapName}`) ,
                dataType: 'html',
                type: 'GET',
                success: function(data) 
                {       
                    // console.log(data);  
                    $(`#${svgid} .${svgid}`).replaceWith(data);
                    if(svgMapName == 'domesticFoodCourt.svg'){
                        viewBox = {x: -140, y:-90, w:1296, h:787}
                    } else if(svgMapName == 'internationalFoodCourt.svg'){
                        viewBox = {x: 50, y:-0, w:1296, h:787}
                    } else {
                        let sx = 0
                        let sh = (screenHeight + 100 < 787 ? (screenHeight) : screenHeight > (787+100) ? 787 : (screenHeight - 787 > 100) ? screenHeight : screenHeight-100 );
                        if (mapType == "dom") {
                            sx = 0
                        } else {
                            sx = (departurename == "DOMESTIC DEPARTURE" ? 165 : 350)
                        }
                        viewBox = {x: sx, y:0, w:viewBox.w, h: (screenWidth < 500 ? 787 : sh)}
                    }
                    movedViewBox = viewBox
                    const svgImage = document.getElementsByTagName("svg")[0];
                    svgImage.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
                    mapLoaded = true
                }
            });
            var pathinterval;
            pathinterval = setInterval(() => {
                if(mapLoaded){
                    this.loading = false;
                    const svgCotainer = document.getElementById(this.svgid)
                    const svgImage = svgCotainer.getElementsByTagName("svg")[0];
                    if (this.showKioskPos) {
                        svgImage.innerHTML += `<image id="kiosk-img" class="blink2" x="${this.kioskxpos}" y="${this.kioskypos}" width="50" height="50" href="${require('@/assets/locate.png')}" />`
                        svgImage.innerHTML += `<polyline class="path" points="${this.pathpoints}" /> <use xlink:href="#kiosk-img"/>`;
                    } else {
                        svgImage.innerHTML += `<polyline class="path path-first-floor" points="${this.pathpoints}"/>`;
                    }
                   
                    setTimeout(() => {
                        document.getElementsByClassName("path")[0].style.display = 'block'
                    }, 500)
                    this.zoomPan();
                    mapLoaded = false;
                    clearInterval(pathinterval);
                }
            }, 10)
        }, 50)
    },
    methods: {
        zoomPan(){
            const svgCotainer = document.getElementById(this.svgid)
            const svgImage = svgCotainer.getElementsByTagName("svg")[0];

            /////// Pinch and Swipe start ////////////////
            function myPointerDown(evt) {
                myPointers.push(evt);
                if (myPointers.length == 1) {
                    isSinglePointer = true
                    movedViewBox = viewBox
                } else if (myPointers.length > 1){
                    isSinglePointer = false
                }
                this.setPointerCapture(evt.pointerId);
            }

            function myPointerUp(evt) {
                for (var i = 0; i < myPointers.length; i++) {
                    if (myPointers[i].pointerId == evt.pointerId) {
                        myPointers.splice(i, 1);
                        break;
                    }
                }
                if(myPointers.length == 0) {
                    viewBox = movedViewBox
                }

                if (myPointers.length < 2) {
                    lastDif = -1;
                }
            }

            function myPointerMove(evt) {
                for (var i = 0; i < myPointers.length; i++) {
                    if (evt.pointerId == myPointers[i].pointerId) {
                        myPointers[i] = evt;
                        break;
                    }
                }

                if (myPointers.length >= 2) {
                    var w = viewBox.w;
                    var h = viewBox.h;
                    var mx = myPointers[0].clientX; 
                    var my = myPointers[0].clientY;

                    var curDif = Math.abs(myPointers[0].clientX - myPointers[1].clientX);
                    if (lastDif > 0) {
                        if (curDif > lastDif) {
                        // console.log("Zoom in");
                            var dw = w * Math.sign(100) * 0.05;
                            var dh = h * Math.sign(100) * 0.05;
                            var dx = dw * mx / svgSize.w;
                            var dy = dh * my / svgSize.h;
                
                            if (viewBox.w > 50) {
                                let x = (viewBox.x + dx <= 0 ? 0 : viewBox.x + dx )
                                let y = (viewBox.y + dy <= 0 ? 0 : viewBox.y + dy )
                                viewBox = {
                                    x: x,
                                    y: y,
                                    w: viewBox.w - dw,
                                    h: viewBox.h - dh
                                };
                            }
                        }
                        if (curDif < lastDif) {
                            var dw = w * Math.sign(-100) * 0.05;
                            var dh = h * Math.sign(-100) * 0.05;
                            var dx = dw * mx / svgSize.w;
                            var dy = dh * my / svgSize.h;
                            viewBox = {
                                x: viewBox.x + dx,
                                y: viewBox.y + dy,
                                w: viewBox.w - dw,
                                h: viewBox.h - dh
                            };
                        }
                        movedViewBox = viewBox
                    }
                }
                svgImage.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
                lastDif = curDif;
            }

            svgImage.addEventListener("pointerdown", myPointerDown, false);
            svgImage.addEventListener("pointermove", myPointerMove, false);
            svgImage.addEventListener("pointerup", myPointerUp, false);
            svgImage.addEventListener("pointercancel", myPointerUp, false); 
            
            svgImage.addEventListener('touchstart', function(e) {
                var touchobj = e.changedTouches[0]
                startPoint = {
                    x: touchobj.pageX,
                    y: touchobj.pageY
                };
                e.preventDefault()
            }, false)

            svgImage.addEventListener('touchmove', function(e) {
                // e.preventDefault() // prevent scrolling when inside DIV
                if (isSinglePointer) {
                    var touchobj = e.changedTouches[0]
                    endPoint = {
                        x: touchobj.pageX,
                        y: touchobj.pageY
                    };
                    var dx = (startPoint.x - endPoint.x) / scale;
                    var dy = (startPoint.y - endPoint.y) / scale;
                    // let x = (viewBox.x + dx <= 0 ? 0 : viewBox.x + dx )
                    // let y = (viewBox.y + dy <= 0 ? 0 : viewBox.y + dy )
                    let x = (viewBox.x + dx )
                    let y = (viewBox.y + dy )
                    let xyPos = getXYMoveLimit()
                    movedViewBox = {
                        // x: (xyPos[0] < viewBox.x ? xyPos[0] : x),
                        // y: (xyPos[1] < viewBox.y ? xyPos[1] : y),
                        x: viewBox.x + dx,
                        y: viewBox.y + dy,
                        w: viewBox.w, 
                        h: viewBox.h
                    };
                    // console.log(movedViewBox);
                    svgImage.setAttribute('viewBox', `${movedViewBox.x} ${movedViewBox.y} ${movedViewBox.w} ${movedViewBox.h}`);
                }
            }, false)

            function getXYMoveLimit() {
                var moveLimits = [
                    {x: 1457, y: 700, w: 174, h: 787},
                    {x: 1354, y: 625, w: 302, h: 787},
                    {x: 1244, y: 550, w: 430, h: 787},
                    {x: 1163, y: 500, w: 558, h: 787},
                    {x: 1000, y: 455, w: 750, h: 787},
                    {x: 820, y: 400, w: 942, h: 787},
                    {x: 493, y: 286, w: 1134, h: 787},
                    {x: 347, y: 157, w: 1326, h: 787},
                    {x: 136, y: 68, w: 1518, h: 787},
                    {x: 0, y: 0, w: 1646, h: 787},
                ]
                let x = 0, y = 0
                for (let i = 0; i < moveLimits.length; i++) {
                    if (viewBox.w <= moveLimits[i].w) {
                        x = moveLimits[i].x
                        y = moveLimits[i].y
                        break;
                    }
                }
                return [x, y]
            }
            /////// Pinch and Swipe End ////////////////
        },
        mapViewBox(viewValues) {
            const svgImage = document.getElementsByTagName("svg")[0];
            viewBox = {
                x: viewValues[0],
                y: viewValues[1],
                w: viewValues[2],
                h: viewValues[3]
            };
            movedViewBox = viewBox
            svgImage.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
        },
    }
}
</script>
<style>
@font-face {
  font-family: "Amplitude-Regular";
  src: local("Amplitude-Regular"),
   url(../fonts/Amplitude/Amplitude-Regular.ttf) format("truetype");
}

@font-face {
  font-family: "Amplitude-Bold";
  src: local("Amplitude-Bold"),
   url(../fonts/Amplitude/Amplitude-Bold.ttf) format("truetype");
}
.map-holder{
    /* height: 93vx; */
    /* height: 100%; */
    width: 100%;
    /* overflow: hidden */
}

.path {
    stroke-dasharray: 1600;
    animation: dash 13s linear infinite;
    animation-iteration-count: 1;
    fill:none;
    stroke:red;
    stroke-width: 1.2;
    display: none;
    filter: drop-shadow(0 0 .8px #e60000);
    stroke-linejoin: round;
}

.path-first-floor {
    stroke-width: 3;
    filter: drop-shadow(0 0 1.5px #e60000);
}

@keyframes dash {
  from {
    stroke-dashoffset: 1550;
  }
  to {
    stroke-dashoffset: 0;
  }
}

.loader {
  /* Loader Div Class */
  position: absolute;
  top: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  background-color: #dfdfdf;
  background-image: url("../assets/loading.gif");
  background-size: 50px;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 27;
  opacity: 0.4;
  filter: alpha(opacity=40);
}
</style>