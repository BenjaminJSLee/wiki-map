$( function() {

  const escape = function (str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const formatBorder = function(data) {
    let $map = `
    <div class="pinned-map">
    <header>${escape(data.name)}</header>
    <div id="mapid" style="height: 500px"></div>
    <footer><span>${data.created_at}</span><span>${data.views}</span></footer>
    </div>
    `;
    return $map;
  };

  const formatPin = function() {

  };

  const bindPins = function(map, pins) {
    for (const pin of pins) {
      console.log(pin.title);
      let marker = L.marker([pin.lat, pin.long]).addTo(map);
      marker.bindPopup(`
        <div class="pin">
        <header>${escape(pin.title)}</header>
        <div>${escape(pin.description)}</div>
        <img src="${escape(pin.img_url)}" placeholder="img-not-found"/>
        </div>
      `);
    }
  };

  const addPin = function(event) {
    let marker = L.marker(event.latlng).addTo(map);
    marker.bindPopup(`
    <div class="pin">
    <header>${escape(pin.title)}</header>
    <div>${escape(pin.description)}</div>
    <img src="${escape(pin.img_url)}" placeholder="img-not-found"/>
    </div>`
    ).openPopup();
  }

  const editPin = function(marker) {
    marker.setPopupContent(`test`);
  }

  const deletePin = function(map, marker) {
    map.removeLayer(marker);
  };

  const addPinnedMap = function(data) {
    const map = L.map('mapid',{
      minZoom: 10,
    }).setView([data.lat,data.long],10);

    const bounds = map.getBounds().pad(0.1);
    map.setMaxBounds([bounds.getSouthWest(),bounds.getNorthEast()]);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiYmVuamFtaW5qc2xlZSIsImEiOiJja2kzdnMwbDIwdTh1MnJsbDEydXRmbmlnIn0.a9_MKoOCA9hD9eWAirPiJw'
    }).addTo(map);

    bindPins(map,data.pins);

    map.on('click', addPin);
    map.off('click', addPin);
    return map;
  };

  const renderPinnedMap = function($target, promise) {
    return promise.then((data) => {
      let $map = formatBorder(data);
      $target.append($map);
      addPinnedMap(data);
    })
  };

  const loadPinnedMap = function($target, url) {
    renderPinnedMap($target, $.ajax({
      method: 'get',
      url: url,
    }))
      .catch(err => {
        $target.append(createError(err.message));
      });
  };

  loadPinnedMap($('#map'),window.location.pathname + "/json");

});
