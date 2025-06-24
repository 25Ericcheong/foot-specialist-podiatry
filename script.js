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
    const category = e.target.getAttribute('category')
    
    let parentElement = document.getElementById(e.target.id)
    const childAnchor = parentElement.getElementsByTagName('a')[0]; 
    childAnchor.style.display = 'block'

    setTimeout(() => {
      childAnchor.style.display = 'none'
    }, 2000); // Remove after 3 seconds
  }


  function createElementUnder(elem, pos, anchorMargin, details) {
      let div = document.createElement("div");
      div.className = "cat-examples"
      div.onclick = handleOnClick

      const coords = getCoords(elem);

      div.style.cursor = "pointer";
      div.style.left = coords.left + pos.xCoord + "px";
      div.style.top = coords.top + pos.yCoord + "px";
      div.style.zIndex = 999;

      div.setAttribute('category', details.category)

      let anchor = document.createElement("a");
      anchor.href = details.href;
      anchor.textContent = details.category;
      anchor.style.marginTop = anchorMargin.topMargin
      anchor.style.marginLeft = anchorMargin.leftMargin

      anchor.style.zIndex = 1000;
      anchor.style.display = 'none'
      
      div.append(anchor)
      div.id = details.elemId

      return div;
  }

  function createLinks(imageElem, links) {
      for (let index = 0; index < links.length; index++) {
          const link = links[index];
          const coords = link.coords
          const anchorMargin = link.anchorMargin
          const details = link.details

          const element = createElementUnder(imageElem, coords, anchorMargin, details)

          document.body.append(element)
      }
  }

  function updateLinks(imageElem, links) {
      for (let index = 0; index < links.length; index++) {
          const link = links[index];
          const elemId = link.details.elemId
          const pos = link.coords

          const elem = document.querySelector(`#${elemId}`)

          if (elem === null) {
              continue
          }

          const imageElemCoords = getCoords(imageElem);

          elem.style.left = imageElemCoords.left + pos.xCoord + "px";
          elem.style.top = imageElemCoords.top + pos.yCoord + "px";
      }
  }

  const links = [
      {
        name: "lower_back",
        coords: {xCoord: 175, yCoord: 185},
        anchorMargin: {leftMargin: "-80px", topMargin: "15px"},
        details: {
          href: "www.google.com", elemId: "elem_0", elemInnerId: "inner_elem_0",
          category:"Lower Back Pain"
        },
      },
      {
        name: "hips",
        coords: {xCoord: 240, yCoord: 220},
        anchorMargin: {leftMargin: "-30px", topMargin: "15px"},
        details: {
          href: "www.google.com", elemId: "elem_1", elemInnerId: "inner_elem_1",
          category:"Hip Pain"
        },
      },
      {
        name: "skin_and_nail_conditions",
        coords: {xCoord: 268, yCoord: 430},
        anchorMargin: {leftMargin: "-100px", topMargin: "15px"},
        details: {
          href: "www.google.com", elemId: "elem_2", elemInnerId: "inner_elem_2",
          category:"Skin and Nail Conditions"
        }
      },
      {
        name: "heels",
        coords: {xCoord: 185, yCoord: 400},
        anchorMargin: {leftMargin: "-40px", topMargin: "15px"},
        details: {
          href: "www.google.com", elemId: "elem_3", elemInnerId: "inner_elem_3",
          category:"Heel Pain"
        }
      },
      {
        name: "knee",
        coords: {xCoord: 300, yCoord: 300},
        anchorMargin: {leftMargin: "-40px", topMargin: "15px"},
        details: {href: "www.google.com", elemId: "elem_4", elemInnerId: "inner_elem_4",
          category:"Knee Pain"
        }
      },
      {
        name: "shin",
        coords: {xCoord: 270, yCoord: 360},
        anchorMargin: {leftMargin: "-20px", topMargin: "15px"},
        details: {
          href: "www.google.com", elemId: "elem_5", elemInnerId: "inner_elem_5",
          category:"Leg Pain"
        }
      },
      {
        name: "ankle",
        coords: {xCoord: 85, yCoord: 380},
        anchorMargin: {leftMargin: "-10px", topMargin: "15px"},
        details: {
          href: "www.google.com", elemId: "elem_6", elemInnerId: "inner_elem_6",
          category:"Ankle Pain"
        }
      },
      {
        name: "foot",
        coords: {xCoord: 30, yCoord: 400},
        anchorMargin: {leftMargin: "-30px", topMargin: "15px"},
        details: {
          href: "www.google.com", elemId: "elem_7", elemInnerId: "inner_elem_7",
          category:"Foot Pain"
        }
      },
  ]

  const imageElem = document.querySelector("#conditions-women-running")
  createLinks(imageElem, links);

  window.addEventListener('resize', function(e) {
      updateLinks(imageElem, links);
  }, true);
}
