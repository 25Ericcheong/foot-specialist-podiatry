window.onload = function () {
  // Reference: https://javascript.info/coordinates
  function getCoords(elem) {
      let box = elem.getBoundingClientRect();

      return {
          top: box.top + window.pageYOffset,
          right: box.right + window.pageXOffset,
          bottom: box.bottom + window.pageYOffset,
          left: box.left + window.pageXOffset
      };
  }
  

  function handleOnClick(e) {
    console.log(e.target.getAttribute('category'))
    console.log(e.target.getAttribute('examples'))

    const val = e.target.getAttribute('examples')
    const examples = val.split(',')

    for (let index = 0; index < examples.length; index++) {
      const element = array[index];
      console.log(element)
    }

    console.log(e.target.id)
  }

  function createElementUnder(elem, pos, details) {
      const div = document.createElement("div");
      div.className = "cat-examples"
      div.onclick = handleOnClick

      const coords = getCoords(elem);

      div.style.left = coords.left + pos.xCoord + "px";
      div.style.top = coords.top + pos.yCoord + "px";
      div.style.zIndex = 1000;

      div.setAttribute('category', details.category)
      div.setAttribute('examples', details.examples)

      div.href = details.href;
      div.id = details.anchorId

      return div;
  }

  function createLinks(imageElem, links) {
      for (let index = 0; index < links.length; index++) {
          const link = links[index];
          const coords = link.coords
          const details = link.details

          const element = createElementUnder(imageElem, coords, details)

          document.body.append(element)
      }
  }

  function updateLinks(imageElem, links) {
      for (let index = 0; index < links.length; index++) {
          const link = links[index];
          const elemId = link.details.anchorId
          const pos = link.coords

          const anchor = document.querySelector(`#${elemId}`)

          if (anchor === null) {
              continue
          }

          const imageElemCoords = getCoords(imageElem);

          anchor.style.left = imageElemCoords.left + pos.xCoord + "px";
          anchor.style.top = imageElemCoords.top + pos.yCoord + "px";
      }
  }

  const links = [
      {
        name: "lower_back",
        coords: {xCoord: 175, yCoord: 190},
        details: {
          href: "www.google.com", anchorId: "anchor_0", 
          category:"Lower Back Pain", examples:["Sciatica", "Sacroiliac Joint Dysfunction"]
        },
      },
      {
        name: "hips",
        coords: {xCoord: 240, yCoord: 220},
        details: {
          href: "www.google.com", anchorId: "anchor_1",
          category:"Hip Pain", examples:["OA", "RA", "Bursitis", "ITB"]
        },
      },
      {
        name: "skin_and_nail_conditions",
        coords: {xCoord: 268, yCoord: 430},
        details: {
          href: "www.google.com", anchorId: "anchor_2",
          category:"Skin and Nail Conditions", examples:["Corns & Calluses", "Fungal Toenails", "Warts", "Athletes Foot", "Ingrown Toenails", "Cracked Heels", "Diabetic Foot Ulcer", "Blister"]
        }
      },
      {
        name: "heels",
        coords: {xCoord: 185, yCoord: 400},
        details: {
          href: "www.google.com", anchorId: "anchor_3",
          category:"Heel Pain", examples:["Plantar Fasciitis", "Achilles Tendinopathy", "Heel Spurs"]
        }
      },
      {
        name: "knee",
        coords: {xCoord: 300, yCoord: 300},
        details: {href: "www.google.com", anchorId: "anchor_4",
          category:"Knee Pain", examples:["OA", "Osgood-Schlatters", "ITB", "Patellofemoral Pain Syndrome (PFPS)"]
        }
      },
      {
        name: "shin",
        coords: {xCoord: 270, yCoord: 360},
        details: {
          href: "www.google.com", anchorId: "anchor_5",
          category:"Leg Pain", examples:["Shin Splints"]
        }
      },
      {
        name: "ankle",
        coords: {xCoord: 85, yCoord: 380},
        details: {
          href: "www.google.com", anchorId: "anchor_6",
          category:"Ankle Pain", examples:["Achilles Tendinopathy", "Ankle Sprain", "Posterior Tibial Tendinopathy", "Peroneal Tendinopathy", "Tarsal Coalition"]
        }
      },
      {
        name: "foot",
        coords: {xCoord: 30, yCoord: 400},
        details: {
          href: "www.google.com", anchorId: "anchor_7",
          category:"Foot Pain", examples:["Bunions", "Plantar Fasciitis", "Plantar Fibroma", "Morton's Neuroma", "Bursitis", "Osteoarthritis", "Rheumatoid Arthritis", "Stress Fracture"]
        }
      },
  ]

  const imageElem = document.querySelector("#conditions-women-running")
  createLinks(imageElem, links);

  window.addEventListener('resize', function(event) {
      updateLinks(imageElem, links);
  }, true);
}
