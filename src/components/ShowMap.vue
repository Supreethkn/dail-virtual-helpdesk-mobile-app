<template>
<div class="row mr-0">
    <div class="col-md-12 d-flex flex-row row-hl justify-content-between pr-4 pl-3 map-bg">
        <div class="floor-no d-flex flex-row">
            <p>{{departurename}}</p>
        </div>
        <p class="hotspot-name">{{hotspotName}}</p>
    </div>
    <div class="col-md-12 map-bg mb-1" v-if="svgMapToggle" >
        <MapFirstFloor class="svgMap" :mapName="svgMapName[1]" svgid="svgId2" :kioskxpos="kioskxpos" :kioskypos="kioskypos" :pathpoints="pathpoints[1]" :departurename="departurename" :showKioskPos="showKioskPos[1]" :mapType="mapType">
        </MapFirstFloor>
    </div>
    <div class="col-md-12 map-bg" >
        <Map class="svgMap" :mapName="svgMapName[0]" svgid="svgId" :kioskxpos="kioskxpos" :kioskypos="kioskypos" :pathpoints="pathpoints[0]" :departurename="departurename" :showKioskPos="showKioskPos[0]" :mapType="mapType">
        </Map>
    </div>
    <div class="col-md-12 mt-4" >
        <!-- <p class="path-direction" v-for="(val, i) in pathDirection" :key="i">{{ val }}</p> -->
    </div>
</div>
</template>

<script>
import Map from './Map.vue'
import MapFirstFloor from './MapFirstFloor.vue'
import Methods from '../utils/Methods'
import $ from 'jquery'
export default{
    components: {
        Map,
        MapFirstFloor
    },
    props: ['msg'],
    data() {
        return {
            drawLine: [false, false],
            kioskxpos: 0,
            kioskypos: 0,
            pathpoints : ['', ''],
            svgMapName: ['', ''],
            departurename: '',
            hotspotName: '',
            pathDirection: [],
            svgMapToggle: false,
            showKioskPos: [true, false],
            mapType: ''
        }
    },
    mounted() {
        try {
            
            let kioskid = parseInt(getUrlParameter('kid'))
            let hotspotid = parseInt(getUrlParameter('hid'))
            // let mapType = getUrlParameter('t')
            let departureType = getUrlParameter('d')
            let mapType = (kioskid == 114 ? 'pri' : 'dom')
            this.mapType = mapType
            if (hotspotid == 0) {
                let kioskAndMapData = Methods.mapWithoutHotspot(kioskid, mapType, departureType)
                this.kioskxpos = kioskAndMapData.kioskxpos
                this.kioskypos = kioskAndMapData.kioskypos
                this.svgMapName[0] = kioskAndMapData.mapname
                this.pathpoints[0] = kioskAndMapData.pathpoints
                this.departurename = kioskAndMapData.departurename
                this.hotspotName = kioskAndMapData.displayname.name
                this.pathDirection = kioskAndMapData.displayname.description
            } else {
                var kioskfloorno = Methods.getKioskFloorNo(kioskid)
                var hotspotfloorno = Methods.getHotspotFloorNo(hotspotid)               

                if(kioskfloorno != hotspotfloorno) {
                    let pathValues = Methods.getTransitPathPoints(kioskid, hotspotid,  kioskfloorno, hotspotfloorno, mapType, departureType)
                    var kioskPos = Methods.getKioskPos(kioskid, departureType)
                    this.svgMapName[0] = pathValues.map1points.mapname
                    this.pathpoints[0] = pathValues.map1points.path.pathpoints
                    this.departurename = (departureType == "dm" ? 'DOMESTIC DEPARTURE': 'INTERNATIONAL DEPARTURE')
                    this.kioskxpos = kioskPos.x
                    this.kioskypos = kioskPos.y
                    this.hotspotName = pathValues.map2points.hotspotname
                    
                    // this.pathDirection = kioskHotspotData.displayname.description
                    setTimeout(() => {
                        this.drawLine[0] = true
                        setTimeout(() => {
                            this.drawLine[1] = true
                            // this.grayOutSvg(hotspotid, kioskfloorno);
                            // this.svgMapToggle = false
                            this.svgMapName[1] = pathValues.map2points.mapname
                            this.pathpoints[1] = pathValues.map2points.path.pathpoints
                            setTimeout(()=>{ this.svgMapToggle = true },200)
                        }, 3000)
                    }, 500)
                } else if(kioskfloorno == hotspotfloorno)  {
                    var kioskHotspotData = Methods.getKioskAndHotspotData(kioskid, hotspotid, mapType);console.log(kioskHotspotData);
                    this.kioskxpos = kioskHotspotData.kioskxpos
                    this.kioskypos = kioskHotspotData.kioskypos
                    this.svgMapName[0] = kioskHotspotData.mapname
                    this.pathpoints[0] = kioskHotspotData.pathpoints
                    this.departurename = kioskHotspotData.departurename
                    this.hotspotName = kioskHotspotData.displayname.name || kioskHotspotData.displayname.toUpperCase();
                    this.pathDirection = kioskHotspotData.displayname.description
                }
            }
        } catch (error) {
            // console.log(error);
        }
        
        function getUrlParameter(sParam) {
            var sPageURL = window.location.search.substring(1),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');
                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
                }
            }
            return false;
        }
    },
    methods: {
    }
}
</script>
<style scoped>
.map-bg {
    background-image: url('../assets/mapBg.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    /* height: 100%; */
    /* height: 95.7vh; */
}
.svgMap {
    width: 100%;
    height: 100%;;
}

.col-md-12 {
    padding: 0;
}

.floor-no {
    width: 160px;
    height: 30px;
    background-image: url('../assets/textBg.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    font-size: 13px;
    padding: 5px 8px;
    margin: 5px 0 0 1px;
}
.floor-no p {
    text-align: center;
    width: 160px
}
.hotspot-name {
    margin: 5px 10px 5px 5px;
    text-align: right;
    color: #FFF;
    width: 50%;
    font-size: 14px;
}

.path-direction {
    color: #FFF;
    font-size: 13px;
    padding: 0px 10px;
    font-family: "Cervino-RegularNeue";
}

.path {
    stroke-dasharray: 1600;
    /* stroke-dashoffset: 0; */
    animation: dash 5s linear infinite;
    animation-iteration-count: 1;
    fill:none;
    stroke:red;
    stroke-width: 4;
}

@keyframes dash {
  from {
    stroke-dashoffset: 1550;
  }
  to {
    stroke-dashoffset: 0;
  }
}
</style>
