import json from '@/local-data/data.json';
// import Constants from './Constants';

export default {
    getAllFloorData() {
        return getAllFloorData(json)
    },

    getFloorData(floorNo) {
        let items = json.park[0].zone[0].building[0].floor
        let floorData = []
        for (let i in items) {
            if (floorNo == items[i].floornumber) {
                floorData.push(items[i]);
                break;
            }
        }
        return floorData;
    },

    getKioskFloorNo(kioskId) {
        let floorNo = ''
        var zones = json.park[0].zone
        var checkflag = false
        for (let k in zones) {
            let floors = zones[k].building[0].floor
            for (let i = 0; i < floors.length; i++) {
                for (let j = 0; j < floors[i].kiosklist.length; j++) {
                    if (floors[i].kiosklist[j].kioskid == kioskId) {
                        floorNo = (floors[i].floornumber)
                        checkflag = true
                        break;
                    }
                }
                if (checkflag) break;
            }
            if (checkflag) break;
        }
        return floorNo
    },

    getKioskPos(kioskId, zoneName) {
        let kioskPos = { x: 0, y: 0 }
            ////////////////////

        var floors = []
        if (zoneName == 'in') {
            floors = json.park[0].zone[1].building[0].floor
        } else {
            let items = json.park[0].zone[0].building[0].floor
            for (let i in items) {
                floors.push(items[i]);
            }
        }
        // let kioskId = Constants.kioskid
        // let kioskData = []
        // var floors = getAllFloorData(json)
        var checkflag = false
        for (let i = 0; i < floors.length; i++) {
            for (let j = 0; j < floors[i].kiosklist.length; j++) {
                if (floors[i].kiosklist[j].kioskid == kioskId) {
                    kioskPos.x = floors[i].kiosklist[j].kioskxpos
                    kioskPos.y = floors[i].kiosklist[j].kioskypos
                    checkflag = true
                    break;
                }
            }
            if (checkflag) break;
        }






        /////////////////
        // var zones = []
        // if (mapType == "pri") {
        //     zones = json.park[0].zone
        // } else {
        //     zones.push(json.park[0].zone[0])
        // }
        // var checkflag = false
        // for (let k in zones) {
        //     let floors = zones[k].building[0].floor
        //     for (let i = 0; i < floors.length; i++) {
        //         for (let j = 0; j < floors[i].kiosklist.length; j++) {
        //             if (floors[i].kiosklist[j].kioskid == kioskId) {
        //                 kioskPos.x = floors[i].kiosklist[j].kioskxpos
        //                 kioskPos.y = floors[i].kiosklist[j].kioskypos
        //                 checkflag = true
        //                 break;
        //             }
        //         }
        //         if (checkflag) break;
        //     }
        //     if (checkflag) break;
        // }
        return kioskPos
    },

    getHotspotFloorNo(hotspotId) {
        let floorNo = ''
        var zones = json.park[0].zone
        var checkflag = false
        for (let k in zones) {
            let floors = zones[k].building[0].floor
            for (let i = 0; i < floors.length; i++) {
                for (let j = 0; j < floors[i].hotspotlist.length; j++) {
                    if (floors[i].hotspotlist[j].hotspotid == hotspotId) {
                        floorNo = (floors[i].floornumber)
                        checkflag = true
                        break;
                    }
                }
                if (checkflag) break;
            }
            if (checkflag) break;
        }
        return floorNo
    },

    getHotspotPos(hotspotId) {
        let hotspotPos = { x: 0, y: 0 }
        var zones = json.park[0].zone
        var checkflag = false
        for (let k in zones) {
            let floors = zones[k].building[0].floor
            for (let i = 0; i < floors.length; i++) {
                for (let j = 0; j < floors[i].hotspotlist.length; j++) {
                    if (floors[i].hotspotlist[j].hotspotid == hotspotId) {
                        hotspotPos.x = floors[i].hotspotlist[j].hotspotxpos
                        hotspotPos.y = floors[i].hotspotlist[j].hotspotypos
                        checkflag = true
                        break;
                    }
                }
                if (checkflag) break;
            }
            if (checkflag) break;
        }
        return hotspotPos
    },

    mapWithoutHotspot(kioskId, mapType) {
        let mapAndKioskData = { kioskxpos: 0, kioskypos: 0, departurename: '', mapname: '', pathpoints: '', displayname: '' }
        var zones = []
        if (mapType == "pri") {
            zones = json.park[0].zone
        } else {
            zones.push(json.park[0].zone[0])
        }

        var checkflag = false
        for (let k in zones) {
            let floors = zones[k].building[0].floor
            for (let i = 0; i < floors.length; i++) {
                for (let l = 0; l < floors[i].kiosklist.length; l++) {
                    if (floors[i].kiosklist[l].kioskid == kioskId) {
                        mapAndKioskData.kioskxpos = floors[i].kiosklist[l].kioskxpos
                        mapAndKioskData.kioskypos = floors[i].kiosklist[l].kioskypos
                        mapAndKioskData.departurename = zones[k].zonename
                        let mapname = (mapType == 'pri' ? floors[i].mapname.pri : floors[i].mapname.dom)
                        mapAndKioskData.mapname = mapname
                        checkflag = true
                        break;
                    }
                }
                if (checkflag) break;
            }
            if (checkflag) break;
        }
        return mapAndKioskData
    },

    getKioskAndHotspotData(kioskId, hotspotId, mapType) {
        let kioskAndHotspotData = { kioskxpos: 0, kioskypos: 0, hotspotxpos: 0, hotspotypos: 0, departurename: '', mapname: '', pathpoints: '', displayname: '' }
        var zones = []
        if (mapType == "pri") {
            zones = json.park[0].zone
        } else {
            zones.push(json.park[0].zone[0])
        }
        var checkflag = false
        for (let k in zones) {
            let floors = zones[k].building[0].floor
            for (let i = 0; i < floors.length; i++) {
                for (let j = 0; j < floors[i].hotspotlist.length; j++) {
                    if (floors[i].hotspotlist[j].hotspotid == hotspotId) {
                        for (let l = 0; l < floors[i].kiosklist.length; l++) {
                            if (floors[i].kiosklist[l].kioskid == kioskId) {
                                kioskAndHotspotData.kioskxpos = floors[i].kiosklist[l].kioskxpos
                                kioskAndHotspotData.kioskypos = floors[i].kiosklist[l].kioskypos
                                kioskAndHotspotData.hotspotxpos = floors[i].hotspotlist[j].hotspotxpos
                                kioskAndHotspotData.hotspotypos = floors[i].hotspotlist[j].hotspotypos
                                kioskAndHotspotData.departurename = zones[k].zonename
                                let mapname = (mapType == 'pri' ? floors[i].mapname.pri : floors[i].mapname.dom)
                                kioskAndHotspotData.mapname = mapname
                                kioskAndHotspotData.displayname = floors[i].hotspotlist[j].hotspotdisplayname
                                for (let x = 0; x < floors[i].hotspotlist[j].path.length; x++) {
                                    if (floors[i].hotspotlist[j].path[x].kioskid == kioskId) {
                                        kioskAndHotspotData.pathpoints = floors[i].hotspotlist[j].path[x].pathpoints
                                    }
                                }
                                checkflag = true
                                break;
                            }
                        }
                    }
                    if (checkflag) break;
                }
                if (checkflag) break;
            }
            if (checkflag) break;
        }
        return kioskAndHotspotData
    },

    getTransitPathPoints(kioskId, hotspotId, kioskFloorNo, HotspotFloorNo, mapType, departureType) {
        let floorData = []
        if (departureType == "dm") {
            let items = json.park[0].zone[0].building[0].floor
            for (let i in items) {
                floorData.push(items[i]);
            }
        } else {
            let items = json.park[0].zone[1].building[0].floor
            for (let i in items) {
                floorData.push(items[i]);
            }
        }

        let map1Data = floorData.filter((element, index) => {
            return (element.floornumber == (kioskFloorNo))
        })

        let map2Data = floorData.filter((element, index) => {
            return (element.floornumber == (HotspotFloorNo))
        })

        let map2path = []
        for (let i = 0; i < map2Data[0].hotspotlist.length; i++) {
            if (map2Data[0].hotspotlist[i].hotspotid == hotspotId) {
                map2path = map2Data[0].hotspotlist[i]
                break;
            }
        }
        let map2pathPoints = {}
        let transitmode = []
        for (let i = 0; i < map2path.path.length; i++) {
            for (let j = 0; j < map2Data[0].hotspotlist.length; j++) {
                if (map2path.path[i].kioskid == map2Data[0].hotspotlist[j].hotspotid && map2Data[0].hotspotlist[j].transithotspot == 'yes') {
                    let mapname = (mapType == 'pri' ? map2Data[0].mapname.pri : map2Data[0].mapname.dom)
                    map2pathPoints = {
                        "mapname": mapname,
                        "transitmode": map2Data[0].hotspotlist[j].transitmode,
                        "hotspotxpos": map2path.hotspotxpos,
                        "hotspotypos": map2path.hotspotypos,
                        "hotspoticon": map2path.hotspoticon,
                        "hotspotdescription": map2path.hotspotdescription,
                        "hotspotid": map2path.hotspotid,
                        "hotspotdisplayname": map2path.hotspotdisplayname,
                        "hotspotname": map2path.hotspotname,
                        "path": map2path.path[i]
                    }
                    transitmode.push(map2Data[0].hotspotlist[j].transitmode)
                }
            }
        }

        let map1pathPoints = {};
        let breakloop = false
        for (let i = 0; i < transitmode.length; i++) {
            for (let j = 0; j < map1Data[0].hotspotlist.length; j++) {
                for (let k = 0; k < map1Data[0].hotspotlist[j].path.length; k++) {
                    if (transitmode[i] == map1Data[0].hotspotlist[j].transitmode && kioskId == map1Data[0].hotspotlist[j].path[k].kioskid) {
                        let mapname = (mapType == 'pri' ? map1Data[0].mapname.pri : map1Data[0].mapname.dom)
                        map1pathPoints = {
                            "mapname": mapname,
                            "transitmode": map1Data[0].hotspotlist[j].transitmode,
                            "hotspotxpos": map1Data[0].hotspotlist[j].hotspotxpos,
                            "hotspotypos": map1Data[0].hotspotlist[j].hotspotypos,
                            "hotspoticon": map1Data[0].hotspotlist[j].hotspoticon,
                            "hotspotdescription": map1Data[0].hotspotlist[j].hotspotdescription,
                            "hotspotid": map1Data[0].hotspotlist[j].hotspotid,
                            "hotspotdisplayname": map1Data[0].hotspotlist[j].hotspotdisplayname,
                            "hotspotname": map1Data[0].hotspotlist[j].hotspotname,
                            "path": map1Data[0].hotspotlist[j].path[k]
                        }
                        breakloop = true
                        break;
                    }
                }
                if (breakloop) break;
            }
            if (breakloop) break;
        }

        return {
            map1points: map1pathPoints,
            map2points: map2pathPoints
        }
    }

}

function getAllFloorData(floorJson) {
    let items = floorJson.park[0].zone[0].building[0].floor
    let floorData = []
    for (let i in items) {
        floorData.push(items[i]);
    }

    return floorData;
}