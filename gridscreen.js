

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
        do{
            cubes[cubes.length] = new  DisplayCube(grid,cubes);
        }while(this.createMustContinue(cubes[cubes.length - 1]))
        return cubes;
    }


    createMustContinue(cube) {
        if (cube.divCube.getBoundingClientRect().bottom + cube.divCube.getBoundingClientRect().height > window.innerHeight){
            if(window.innerHeight - cube.divCube.getBoundingClientRect().bottom>100){
                this.gridEmenent.style.fontSize=this.gridEmenent.style.fontSize-1;
            }
            if(cube.divCube.getBoundingClientRect().right + (cube.divCube.getBoundingClientRect().width*3) > window.innerWidth){
                return false;
            }
        }
        return true;
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