import {GridScreen} from "./GridClass.js";

const grid=new GridScreen(window.innerWidth,window.innerHeight);
//-----------------------------------------------------------------------RESIZE-METHODS
let oldSize={width:grid.width,height:grid.height}
function resizeCmp(newSize,cmpWidth) {
    if(cmpWidth?(oldSize.width > newSize.width):(oldSize.height > newSize.height))return -1;
    else if(cmpWidth?(oldSize.width < newSize.width):(oldSize.height < newSize.height))return 1;
    else if(cmpWidth?(oldSize.width === newSize.width):(oldSize.height === newSize.height))return 0;
    else return null;
}
function resizeGrid(){
    const newSize=grid.calculateSizes();
    const widthCmp = resizeCmp(newSize, true);
    const heightCmp = resizeCmp(newSize, false);
    grid.updateCubes(widthCmp===1||heightCmp===1);
    oldSize=newSize;

}
let resizeTimer;
window.onresize=function (){
    clearTimeout(resizeTimer);
    resizeTimer=setTimeout(function (){resizeGrid()},100);
}
//RESIZE-----------------------------------------------------------------------\\
const eListeners={};
// grid.loadContent("home").activateListeners(eListeners);