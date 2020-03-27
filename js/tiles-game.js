let tileColorDefault = 'red';
let tileColorInactive = 'grey';
let showTileSeconds = 1;
let isGameGoing = false;
let tiles = Array();
let clickedTiles = Array();



function buildTiles() {
    var containerTiles = document.getElementById('tiles');
    var tilesSize = 4;

    for (let x = 0; x < tilesSize; x++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row';
        containerTiles.appendChild(rowDiv);

        for (let y = 0; y < tilesSize; y++) {
            const tileId = `tile-${x}-${y}`;
            const tileDiv = document.createElement('div');
            tileDiv.className = 'col card';
            tileDiv.style.backgroundColor = tileColorInactive;
            tileDiv.id = tileId;
            tileDiv.onclick = function () {
                clickTile(this)
            };
            rowDiv.appendChild(tileDiv)

            // 2. Add current tileId & assign hidden color to tiles[]
            tiles.push({id: tileId, color: getNextColor(), hidden: false});

        }
    }
}

function getRandColor() {
    const items = ["cyan", "blue", "green", "orange", "yellow", "black", "purple", "#FF00FF"];
    return items[Math.floor(Math.random() * items.length)];
}

function getNextColor() {
    // 1. Create variable to remember current color
    let currentColor = getRandColor();

    // 2. Check how many elements with color "purple" are in array
    if (tiles) {
        while (tiles.filter(t => t.color === currentColor).length === 2) {
            currentColor = getRandColor();
        }
    }

    return currentColor;
}

function clickTile(tile) {
    if (!isGameGoing) return;
    // find el in array tiles with id that corresponds with clicking id and take color
    const clickedTile = tiles
        .filter(t => t.id === tile.id)
        .pop();
    const colorForCurrentTile = clickedTile.color;
    tile.style.backgroundColor = colorForCurrentTile;

    // add tile to clickedTiles
    clickedTiles.push(clickedTile);

    // check how many tiles are opened
    if (clickedTiles.length === 2) {
        isGameGoing = false;
        // check if color match
        if (clickedTiles[0].color === clickedTiles[1].color) {
            // if color matched ...
            window.setTimeout(function () {
                clickedTiles.forEach(t => document.getElementById(t.id).style.visibility = 'hidden'
                    // .setAttribute('style', 'background-color: white; border: none;')
                );

                clickedTiles.forEach(t => tiles
                    .filter(tt => tt.id === t.id).forEach(ct => ct.hidden = true)
                );

                clickedTiles = Array();
                isGameGoing = true;

                if (tiles.filter(t => t.hidden === false).length === 0) {
                    // Game ended! Enable Start Game button
                    document.getElementById('startGameButton').disabled = false;
                    isGameGoing = false;
                }

            }, +showTileSeconds *1000);

        } else {
            window.setTimeout(function () {
                clickedTiles.forEach(t => document.getElementById(t.id).style.backgroundColor = tileColorDefault);
                clickedTiles = Array();
                isGameGoing = true;
            }, +showTileSeconds * 1000);
        }
    }
}

function startGame(buttonStart) {
    isGameGoing = true;

    if (tiles) {
        tiles.forEach(t => document.getElementById(t.id).style.backgroundColor = tileColorDefault);

        if (tiles.filter(t => t.hidden === false).length === 0) {
            // Clear all colors
            tiles.forEach(t => { t.color = ''; t.hidden = false});

            // Assign New colors
            tiles.forEach(t => t.color = getNextColor());

            // Make HTML elements visible
            tiles.forEach(t => document.getElementById(t.id).style.visibility = 'visible'); //visible
        }
    }

    buttonStart.disabled = true;

}


