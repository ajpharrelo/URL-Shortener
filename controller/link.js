const fs = require('fs');
const path = require('path');
let linkData = require('../data/links.json');

const saveFolder = path.join(__dirname, '/../data/');

function generateID() {
    let newId = "";

    const idCharList ="abcdefghijklmnopqrstuvwxyz1234567890";
    let len = idCharList.length - 1;
    for (let i = 0; i < 8; i++) {
        let randInt = Math.floor((Math.random() * len) + 1);
        newId += idCharList[randInt];
    }

    return newId;
}

function checkIDExists(id)
{
    let found = linkData.find(x => x.id === id);
    return found == undefined ? false : true;
}

function addLink(url, callback)
{
    // Check if URL is already shortened
    let foundUrl = linkData.find(x => x.url === url);

    if(!foundUrl)
    {
        let newId = generateID();

        linkData.push({url: url, id: newId, useCount: 0});

        fs.writeFile(saveFolder + 'links.json', JSON.stringify(linkData, null, 4), { encoding: 'utf-8', flag: 'w',}, (err) => {
            if(err)console.log(err);
        });

        return callback({existing: false, newId: newId});
    }
    else
    {
        return callback({existing: true, existingId: foundUrl.id});
    }
}

function getLink(id)
{
    return linkData.find(x => x.id === id);
}

// To be called when a shortened URL is accessed
function linkUsed(id)
{
    let link = linkData.find(x => x.id === id);
    link.useCount += 1;

    fs.writeFile(saveFolder + 'links.json', JSON.stringify(linkData, null, 4), { encoding: 'utf-8', flag: 'w',}, (err) => {
        if(err)console.log(err);
    });
}

module.exports = {
    addLink,
    generateID,
    checkIDExists,
    getLink,
    linkUsed
}