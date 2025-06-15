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
        name: "hips",
        coords: {xCoord: 208, yCoord: 225},
        details: {href: "www.google.com", anchorId: "anchor_0"}
      },
      {
        name: "toes",
        coords: {xCoord: 312, yCoord: 507},
        details: {href: "www.google.com", anchorId: "anchor_1"}
      },
      {
        name: "heels",
        coords: {xCoord: 220, yCoord: 468},
        details: {href: "www.google.com", anchorId: "anchor_2"}
      },
      {
        name: "knee",
        coords: {xCoord: 347, yCoord: 355},
        details: {href: "www.google.com", anchorId: "anchor_3"}
      },
      {
        name: "shin",
        coords: {xCoord: 317, yCoord: 415},
        details: {href: "www.google.com", anchorId: "anchor_4"}
      },
      {
        name: "ankle",
        coords: {xCoord: 99, yCoord: 441},
        details: {href: "www.google.com", anchorId: "anchor_5"}
      },
      {
        name: "arch",
        coords: {xCoord: 38, yCoord: 465},
        details: {href: "www.google.com", anchorId: "anchor_6"}
      },
  ]

  const imageElem = document.querySelector("#conditions-women-running")
  createLinks(imageElem, links);

  window.addEventListener('resize', function(event) {
      updateLinks(imageElem, links);
  }, true);
}
