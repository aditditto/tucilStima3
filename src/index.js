//DEFINISI KELAS
class Node {
    constructor(name, lat, lon) {
        this.name = name;
        this.lat = lat;
        this.lon = lon;
    }
    distanceTo(node) {
        return earthDistance(this.lat, this.lon, node.lat, node.lon);
    }
    getLatLon() {
        return [this.lat, this.lon];
    }
}
class Graph {
    constructor() {
        this.nodes = [];
        this.adjMatrix = []; //tar dibikin dari baca file le
        this.nodeCircles = L.layerGroup([]);
        this.edgePaths = L.layerGroup([]);
    }

    getNode(name) {
        return this.nodes.find(node => node.name == name);
    }

    makeNodeMarkers() {
        this.nodes.forEach(node =>
            this.nodeCircles
              .addLayer(L.circle(node.getLatLon(), {radius: 20}).bindPopup(node.name)));
    }

    makeEdgePath() {
        for (var i = 0; i < this.nodes.length; i++) {
            for (var j = 0; j <= i; j++) {
                if (this.adjMatrix[i][j] > 0) {
                    var line = L.polyline([this.nodes[i].getLatLon(), this.nodes[j].getLatLon()]);
                    line.bindPopup(String(this.adjMatrix[i][j]));
                    line.setText(String(this.adjMatrix[i][j]), {center: true});

                    this.edgePaths.addLayer(line);
                }
            }
        }
    }

    draw(map) {
        this.makeNodeMarkers();
        this.makeEdgePath();
        this.edgePaths.addTo(map);
        this.nodeCircles.addTo(map);
    }

    clear() {
        this.edgePaths.eachLayer(function (layer) {
            layer.remove();
        });
        this.nodeCircles.eachLayer(function (layer) {
            layer.remove();
        });
        this.edgePaths.clearLayers();
        this.nodeCircles.clearLayers();
    }
}

//DEFINISI FUNGSI HELPER
function earthDistance(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
function deg2rad(deg) {
    return deg * (Math.PI/180)
}

//VARIABEL GLOBAL
//Render map when landing on page
let map = L.map('mapid').setView([-6.889295, 107.610365], 17);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

L.marker([-6.889295, 107.610365]).addTo(map)
    .bindPopup('ITEBE')
    .openPopup();

function onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
}

// map.on('click', onMapClick);
// map.on('click', function(e){
//     var marker = new L.marker(e.latlng).addTo(map);
// });

const premain = (event) => {
    let rf = new FileReader();
    rf.onload = function(event){
        var data = JSON.parse(event.target.result);
        main(data.nodes, data.edges);
    };
    rf.readAsText(event.target.files[0]);
}

const main = (nodes, edges) => {
    //delete and render new map when file selected
    map.eachLayer((layer)=> {
        map.removeLayer(layer);
    })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([-6.889295, 107.610365]).addTo(map)
    .bindPopup('ITEBE')
    .openPopup();
    let nodeArr = [];
    for (let node of nodes) {
        let tnode = new Node(node.name, node.lat, node.lon);
        nodeArr.push(tnode);
    }

    let graph = new Graph();
    graph.clear();
    graph.nodes = nodeArr;
    
    let mtrx2D = [];
    for(let i=0; i<nodeArr.length; i++){
        mtrx2D[i] = [];
        for(let j=0; j<nodeArr.length; j++){
            mtrx2D[i][j] = 0;
        }
    }

    for (let edge of edges){
        var idx = 0;
        let idx_from_found = false;
        let idx_to_found = false;
        var idx_from=-1;
        var idx_to=-1;
        while (idx < nodeArr.length && (!idx_from_found || !idx_to_found)){
            // get index array of the edge.from node in nodeArr
            if (edge.from == nodeArr[idx].name && !idx_from_found){
                idx_from = idx;
                idx_from_found = true;
            } 
            
            if (edge.to == nodeArr[idx].name && !idx_to_found){
                idx_to = idx;
                idx_to_found = true;
            }

            idx++;
        }
        let dist = earthDistance(nodeArr[idx_from].lat, nodeArr[idx_from].lon, nodeArr[idx_to].lat, nodeArr[idx_to].lon);
        mtrx2D[idx_from][idx_to] = dist.toPrecision(4);
        mtrx2D[idx_to][idx_from] = dist.toPrecision(4);
    }
    
    graph.adjMatrix = mtrx2D;
    graph.draw(map);
}