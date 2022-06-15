

export class GridScreen {

    constructor() {

        this.gridEmenent = document.querySelector(".grid-box");
        this.pixWidth = window.innerWidth;
        this.pixHeight = window.innerHeight;
        this.displayCubes = this.createCubes(this);
        this.gridColumns = this.getGridColumns();
        this.gridRows = this.getGridRows();
        }

    createCubes(grid) {
        const cubes = [];
        do{            console.log("cube num"+cubes.length)
            cubes[cubes.length] = new  DisplayCube(grid,cubes);
        }while((cubes[cubes.length-1].divCube.getBoundingClientRect().bottom+200 <= window.innerHeight)||(cubes[cubes.length-1].divCube.getBoundingClientRect().right+600 <= window.innerWidth))
        return cubes;
    }


    getGridSize() {
        return {rows: this.getGridRows(), columns: this.getGridColumns()};
    }


    getGridRows() {
        return window.getComputedStyle(this.gridEmenent).getPropertyValue("grid-template-rows").split(" ").length;
    }

    getGridColumns() {

        return window.getComputedStyle(document.querySelector(".grid-box")).getPropertyValue("grid-template-columns").split(" ").length;
    }
}
export class DisplayCube{
    constructor(grid,list) {
        this.cubeId = "tile-"+ list.length;
        this.parentGrid=grid;
        this.parentGrid.gridEmenent.insertAdjacentHTML("beforeend",`<div class="display-cube" id="${this.cubeId}"> <img src="images/icon.png" alt="a Display Cube, press X to accesibility version"> </div>`);
        this.divCube=document.querySelector('#'+this.cubeId);
        this.divCube.addEventListener("click",()=>{console.log("cubeclicked")})
    }
}