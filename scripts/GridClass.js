
//======================================================================================================================
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX   GRID-SCREEN CLASS   XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//======================================================================================================================
export class GridScreen {
    cubeSize=150;
    listeners= [];
    cubes=[]
    width;
    height;
    titleSize= 3;

    constructor(width,height) {
        this.idCounter= 0;
        this.gridEmenent = document.querySelector(".grid-box");
        this.calculateSizes();
        this.cubes = this.createCubes(this);
        this.gridColumns = this.getGridColumns();
        this.gridRows = this.getGridRows();
        this.activateListeners(this.listeners);
    }

    calculateSizes() {
        this.width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        this.height = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        return {width:this.width,height:this.height};
    }

    get getIdCounter(){
        this.idCounter++;
        return this.idCounter;
    }
    createCubes(grid) {
        const cubes = []
        let num=(Math.trunc(this.height/this.cubeSize)*Math.trunc(this.width/this.cubeSize))-this.titleSize;
        console.log(this.height+" X "+this.width+"="+num)
        for(num;num>0;num--){
            cubes[cubes.length] = new  DisplayCube(grid);
        }
        return cubes;
    }
    updateCubes(increase){
        let num = (Math.trunc(this.height / this.cubeSize) * Math.trunc(this.width / this.cubeSize)) - this.titleSize;
        if(increase){
            num -= this.cubes.length;
            for (let i = 0; i < num; i++) {
                this.cubes.push(new DisplayCube(this))
            }
            console.log(this.height + " X " + this.width + "=" + this.cubes.length)
        }else{
            num= this.cubes.length-num;
            for (let i = 0; i< num; i++) {
                this.cubes.pop().delete();
            }
            console.log(this.height + " X " + this.width + "=" + this.cubes.length)
        }
    }
    deleteRandomCubes(num){
        for (let i = 0; i < num; i++) {
            this.cubes.pop().delete();
        }
    }
    createMustContinue(cube) {
        if (cube.boundingSize.bottom + cube.boundingSize.height > window.innerHeight){
            if(window.innerHeight - cube.boundingSize.bottom>120) {

            }
            if(cube.boundingSize.right + (cube.boundingSize.width) > window.innerWidth){
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

    loadContent(sectionName) {
        //TODO
        return this;
    }
    activateListeners(listeners){
        for(let i=0; i<this.cubes.length; i++) {
            listeners.push(this.cubes[i].createListener());
        }
        //TODO
        return this;
    }
    deleteCubeFromGrid(cube){
        for( let i = 0; i < this.cubes.length; i++){
            if ( this.cubes[i] === cube) {
                this.cubes.splice(i, 1);
                i--;
            }
        }
    }
}
//======================================================================================================================
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX   CUBE CLASS   XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//======================================================================================================================
class Cube{
    #parentGrid;
    #cubeId;
    #boundingSize;
    #divCube;
    constructor(grid,id,html) {
        this.#parentGrid=grid;
        this.#cubeId = id+"_"+String(Date.now()).slice(-6);
        html=html.replace("$$ID$$",this.#cubeId)
        this.#parentGrid.gridEmenent.insertAdjacentHTML("beforeend",html);
        this.#divCube=document.querySelector('#'+this.#cubeId);
        this.#boundingSize=this.#divCube.getBoundingClientRect();
    }
    //-----------------------------------------------------------------------Getters&Setters

    get parentGrid() {
        return this.#parentGrid;
    }
    get cubeId() {
        return this.#cubeId;
    }
    get boundingSize() {
        return this.#boundingSize;
    }
    get divCube() {
        return this.#divCube;
    }
    //-----------------------------------------------------------------------METHODS
//---------------------------------VIEWPORT

    checkViewport(){ //Returns 1 if Cube is full on screen, 0 if only partialy, -1 when it's all out screen
        let size=this.parentGrid.calculateSizes();
        this.updateSize();
        if(this.isOnScreen(size)){
            if(this.isWholeOnScreen(size))return 1;
            else return 0;
        }
        else return -1;
    }
    isWholeOnScreen(screenSize) {
        return this.boundingSize.bottom < screenSize.height && this.boundingSize.right < screenSize.width;
    }
    updateSize() {
        this.#boundingSize = this.divCube.getBoundingClientRect();
    }
    isOnScreen(screenSize) {
        return this.boundingSize.x < screenSize.width && this.boundingSize.y < screenSize.height;
     }


    calcSizePosition(){

    }
    migrateCubeType(){
        this.divCube.innerHTML=this instanceof DisplayCube?GridCube.HTML: DisplayCube.HTML
        //TODO instatiate new cube object and put it in the original list position
    }
}
//======================================================================================================================
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX   DISPLAY-CUBE CLASS   XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//======================================================================================================================
export class DisplayCube extends Cube{
    static get HTML(){return `<div class="display-cube" id="$$ID$$"> <img src="../images/icon.png" alt="a Display Cube, press X to accesibility version"> </div>`}
    static get TYPE(){return ["button","grow","mask","display"]}
    #type
    constructor(grid) {
        super(grid,"DC"+grid.getIdCounter,DisplayCube.HTML);
    }
    //-----------------------------------------------------------------------Getters&Setters
    get type() {
        return this.#type;
    }
    get typeIndex() {
        return DisplayCube.TYPE.indexOf(this.#type);
    }
    set type(index) {
        if(index<DisplayCube.TYPE.length-1)this.#type = DisplayCube.TYPE[index];
    }

    //-----------------------------------------------------------------------METHODS
    scaledResize(col, row){
        console.log(this.parentGrid.width)
        this.resizeCube(col,row,false)
    }
    resizeCube(col,row,force){
        if(this.isActive&& !force){
            this.divCube.style.gridColumnEnd = ""
            this.divCube.style.gridRowEnd = ""
            this.isActive=false;
            this.parentGrid.updateCubes(true)
        }else {
            this.divCube.style.gridColumnEnd = "span "+col ;
            this.divCube.style.gridRowEnd = "span " + row;
            this.parentGrid.deleteRandomCubes((col*row)-1);
            this.isActive=true;
        }
        // this.parentGrid.updateCubes(this.parentGrid)
    }
    createListener(){
        let fnListener;
        switch (this.type) {

            case "button":
                break;
            case "grow":
                break;
            case "mask":
                break;
            case "display":
                break;
            default:
                fnListener = ()=>{this.scaledResize('3','3',)};
                // fnListener = ()=>{this.delete();}
                break;
        }
        // const fnListener = ()=>{this.scaledResize('3','3',)};
        const typeListener= "click";
        this.divCube.addEventListener(typeListener,fnListener)
        return {type:typeListener,callback:fnListener};
    }
    delete(){
        // console.log("BEFORE cubes:"+this.parentGrid.cubes.length)
        const cube = this;
        this.divCube.parentNode.removeChild(this.divCube);
        this.parentGrid.deleteCubeFromGrid(cube);
        // console.log("AFTER cubes:"+cube.parentGrid.cubes.length)
    }
}
//======================================================================================================================
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX   GRID-CUBE CLASS   XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//======================================================================================================================
export class GridCube extends Cube{
    static get HTML(){return `<div class="grid-cube" id="$$ID$$"> </div>`;}

    //TODO special cube that contains 4 MiniDisplays, it uses .mini-grid style
    #miniCubes=[] ;
    #childNum
    constructor(grid,child) {
        super(grid,"GC"+grid.getIdCounter,GridCube.HTML);
        this.#childNum=child;
        this.#miniCubes=this.createMiniCubes(child);
    }
    delete(){
        for (let i = 0; i < this.#miniCubes.length; i++) {
            this.#miniCubes[i].delete();
        }
    }

    createMiniCubes(child){
        const miniCubes=[];
        for (let i=0;i<child;i++){
            miniCubes.add(new MiniDisplay(this),i)
        }
        return miniCubes;
    }
}
//======================================================================================================================
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX   MINI-DISPLAY CLASS   XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//======================================================================================================================
export class MiniDisplay extends DisplayCube{
    //TODO display cube 1/4 size of a DisplayCube and placed into a GridCube
    constructor(gridCube,index) {
        super(gridCube);

    }
}