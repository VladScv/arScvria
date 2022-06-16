

export class GridScreen {
    constructor() {
        this.gridEmenent = document.querySelector(".grid-box");
        this.pixWidth = window.innerWidth;
        this.pixHeight = window.innerHeight;
        this.displayCubes = this.createCubes(this);
        this.gridColumns = this.getGridColumns();
        this.gridRows = this.getGridRows();
        // this.stateManager={
        //     currentState: 0,
        //     stateList:['loading','idle','performing','surfing','reading'],
        //     getCurrentState : function (){
        //         return(this.stateList[this.currentState])
        //     },
        //     setNewState:function (newState){
        //         this.currentState= isNaN(newState)?newState:this.stateList.indexOf(newState);
        //         switch (this.getCurrentState()) {
        //           case 'loading':
        //               break;
        //           case 'idle':
        //               break;
        //           case 'performing':
        //               break;
        //           case 'surfing':
        //               break;
        //           case 'reading':
        //               break;
        //           default:
        //               break;
        //       }
        //     }
        // }

    }
    createCubes(grid) {
        const cubes = [];
        do{
            cubes[cubes.length] = new  DisplayCube(grid,cubes);
        }while(this.createMustContinue(cubes[cubes.length - 1]))
        return cubes;
    }
    updateCubes(grid){
        const cubes = grid.displayCubes;
        let limitReached = false;
        for(let i=0; i<cubes.length;i++){
            if(!this.createMustContinue(cubes[i])){
                limitReached=true;
                cubes.splice(i,(cubes.length - i));
                break;
            };
        }
        if (!limitReached){
            do{
                cubes[cubes.length] = new  DisplayCube(grid,cubes);
            }while(this.createMustContinue(cubes[cubes.length - 1]));
        }
        grid.displayCubes=cubes;
    }
    createMustContinue(cube) {
        if (cube.divCube.getBoundingClientRect().bottom + cube.divCube.getBoundingClientRect().height > window.innerHeight){
            if(window.innerHeight - cube.divCube.getBoundingClientRect().bottom>120){

            }
            if(cube.divCube.getBoundingClientRect().right + (cube.divCube.getBoundingClientRect().width) > window.innerWidth){
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
    calculatePosition
}