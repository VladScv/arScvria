import {GridScreen} from "./GridClass.js";

let grid=new GridScreen();
//-----------------------------------------------------------------------RESIZE-METHODS
let oldSize={width:grid.width,height:grid.height}
function resizeCmp(newSize,cmpWidth) {
    console.log(`resizeCmp: oldsize=${oldSize.width} x ${oldSize.height}newSize=${newSize.width} x ${newSize.height}`)
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
    grid.checkCubesIntegrity();

}
let resizeTimer;
window.onresize=function (){
    clearTimeout(resizeTimer);
    resizeTimer=setTimeout(function (){resizeGrid()},100);
}
document.querySelector("#footer-button1").addEventListener("click",()=>{
    resizeGrid();
})
document.querySelector("#footer-button2").addEventListener("click",()=>{
})
document.querySelector("#footer-button3").addEventListener("click",()=>{
})
document.querySelector("#footer-button4").addEventListener("click",()=>{
})
//RESIZE-----------------------------------------------------------------------\\
const eListeners={};
// grid.loadContent("home").activateListeners(eListeners);