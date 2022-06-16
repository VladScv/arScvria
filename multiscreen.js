
import {GridScreen} from "./gridclass.js";
window.addEventListener("resize",()=>{
    //TODO avoid multiple trigger while resizing
    document.querySelectorAll('.display-cube').forEach(box => {
         box.remove();//TODO may fail due that actually we are removing it from de DOM?
    });
    grid.createCubes(grid);
})
const grid=new GridScreen();




//INTERSECTION DETECTOR
//source: https://usefulangle.com/post/113/javascript-detecting-element-visible-during-scroll
{
    // const observer = new IntersectionObserver(function (entries) {
    //     // isIntersecting is true when element and viewport are overlapping
    //     // isIntersecting is false when element and viewport don't overlap
    //     if (entries[0].isIntersecting === true)
    //         console.log('Element has just become visible in screen');
    // }, {threshold: [1]});
    //
    // observer.observe(document.querySelector("#main-container"));
    // const grid = document.querySelector(".grid-box");
// const gridComputedStyle = window.getComputedStyle(grid);/
}