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
  
  function createLinkUnder(elem, pos, details) {
      const anchor = document.createElement("a");
      anchor.className = "anchor-links"

      const coords = getCoords(elem);

      anchor.style.left = coords.left + pos.xCoord + "px";
      anchor.style.top = coords.top + pos.yCoord + "px";
      anchor.style.zIndex = 1000;

      anchor.href = details.href;
      anchor.id = details.anchorId

      return anchor;
  }

  function createLinks(imageElem, links) {
      for (let index = 0; index < links.length; index++) {
          const link = links[index];
          const coords = link.coords
          const details = link.details

          const anchorLink = createLinkUnder(imageElem, coords, details)

          document.body.append(anchorLink)
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
        coords: {xCoord: 208, yCoord: 225},
        details: {
          href: "www.google.com", anchorId: "anchor_0", 
          category:"Lower Back Pain", examples:["Sciatica", "Sacroiliac Joint Dysfunction"]
        },
      },
      {
        name: "hips",
        coords: {xCoord: 280, yCoord: 265},
        details: {
          href: "www.google.com", anchorId: "anchor_1",
          category:"Hip Pain", examples:["OA", "RA", "Bursitis", "ITB"]
        },
      },
      {
        name: "skin_and_nail_conditions",
        coords: {xCoord: 312, yCoord: 507},
        details: {
          href: "www.google.com", anchorId: "anchor_2",
          category:"Skin and Nail Conditions", examples:["Corns & calluses", "Fungal Toenails", "Warts", "Athletes Foot", "Ingrown toenails", "Cracked Heels", "Diabetic Foot Ulcer", "Blister"]
        }
      },
      {
        name: "heels",
        coords: {xCoord: 220, yCoord: 468},
        details: {
          href: "www.google.com", anchorId: "anchor_3",
          category:"Heel Pain", examples:["Plantar Fasciitis", "Achilles Tendinopathy", "Heel Spurs"]
        }
      },
      {
        name: "knee",
        coords: {xCoord: 347, yCoord: 355},
        details: {href: "www.google.com", anchorId: "anchor_4",
          category:"Knee Pain", examples:["OA", "Osgood-Schlatters", "ITB", "Patellofemoral Pain Syndrome (PFPS)"]
        }
      },
      {
        name: "shin",
        coords: {xCoord: 317, yCoord: 415},
        details: {
          href: "www.google.com", anchorId: "anchor_5",
          category:"Leg Pain", examples:["Shin Splints"]
        }
      },
      {
        name: "ankle",
        coords: {xCoord: 99, yCoord: 441},
        details: {
          href: "www.google.com", anchorId: "anchor_6",
          category:"Ankle Pain", examples:["Achilles Tendinopathy", "Ankle Sprain", "Posterior Tibial Tendinopathy", "Peroneal Tendinopathy", "Tarsal Coalition"]
        }
      },
      {
        name: "foot",
        coords: {xCoord: 38, yCoord: 465},
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
