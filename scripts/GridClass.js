import {Content} from "./ContentClass.js";
//======================================================================================================================
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX   GRID-SCREEN CLASS   XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//======================================================================================================================
export class GridScreen {
    static get MODAL(){
        return{}
    }
    static get HOME(){
        return{
            title:"Home",
            buttons: [{name:"About",type:"new_content",ref:"about_"},{name: "Gallery",type:"new_content",ref: "gallery_"}]

        }
    }
    #cubeSize=150;
    #listeners= [];
    #cubes=[];
    #width;
    #height;
    #titleSize= 3;
    #idCounter
    #gridElement;
    #content;

    constructor() {
        this.#idCounter= 0;
        this.gridElement=".grid-box";
        this.calculateSizes();
        this.#cubes = this.createCubes(this);
        this.gridColumns = this.getGridColumns();
        this.gridRows = this.getGridRows();
        this.activateListeners(this.#listeners);
    }
    get width() {
        return this.calculateSizes().width;
    }
    get height() {
        return this.calculateSizes().height;
    }
    get gridElement() {
        return this.#gridElement;
    }
    set gridElement(selector) {
        this.#gridElement =document.querySelector(selector)
    }

    get gridColumns() {
        return this._gridColumns;
    }

    set gridColumns(value) {
        this._gridColumns = value;
    }

    get gridRows() {
        return this._gridRows;
    }

    set gridRows(value) {
        this._gridRows = value;
    }

    get cubes() {return this.#cubes;}
    set cubes(cube) {this.#cubes.add(cube);}
    get cubeSize() {return this.#cubeSize; }
    set cubeSize(value) {this.#cubeSize = value;}
    get listeners(){ return this.#listeners;  }
    get titleSize(){
        return this.#titleSize;
    }
    set titleSize(cubes) {
        this.#titleSize = cubes;
    }
    get idCounter(){
        this.#idCounter++;
        return this.#idCounter;
    }

    checkCubesIntegrity(width,height){
        let num= Math.trunc((width/this.cubeSize)*(height/this.cubeSize))-3;
        if(this.cubes.length>num)this.updateCubes(false);
        else if(this.cubes.length<num)this.updateCubes(true);
    }
    calculateSizes() {
        this.#width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        this.#height = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        return {width:this.#width,height:this.#height};
    }
    createCubes(grid) {
        const cubes = []
        let num=(Math.trunc(this.height/this.#cubeSize)*Math.trunc(this.width/this.#cubeSize))-this.titleSize;
        console.log(this.height+" X "+this.width+"="+num)
        for(num;num>0;num--){
            cubes[cubes.length] = new  DisplayCube(grid);
        }
        return cubes;
    }
    updateCubes(increase){
        let num = (Math.trunc(this.height / this.#cubeSize) * Math.trunc(this.width / this.#cubeSize)) - this.titleSize;
        console.log(this.height + " X " + this.width + "=" + num)
        if(increase){
            num -= this.cubes.length;
            let cube;
            for (let i = 0; i < num; i++) {
                cube=(new DisplayCube(this)).integrityCheck()
                if(cube!==null) this.cubes.push(cube);

                else {
                }
            }
        }else{
            num= this.cubes.length-num;
            for (let i = 0; i< num; i++) {
                this.cubes.pop().delete();
            }
            console.log(this.height + " X " + this.width + "=" + this.cubes.length)
        }
        return this.cubes;
    }
    deleteRandomCubes(num){
        for (let i = 0; i < num; i++) {
            this.cubes.pop().delete();
        }
    }

    getGridSize() {
        return {rows: this.getGridRows(), columns: this.getGridColumns()};
    }
    getGridRows() {
        return window.getComputedStyle(this.gridElement).getPropertyValue("grid-template-rows").split(" ").length;
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
        this.#parentGrid.gridElement.insertAdjacentHTML("beforeend",html);
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
    applyLayout(){
        //todo aply responsive type based on layout
    }
}
//======================================================================================================================
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX   DISPLAY-CUBE CLASS   XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//======================================================================================================================
export class DisplayCube extends Cube{
    static get HTML(){return `<div class="display-cube" id="$$ID$$"><img src="$$IMG$$" alt="a Display Cube, press X to accesibility version"></div>`}
    static get IMG_STD(){return `../images/icon.png`}
    static get TYPE(){return ["button","grow","mask","display"]}
    #type
    constructor(grid) {
        super(grid,"DC"+grid.idCounter,DisplayCube.HTML.replace("$$IMG$$",DisplayCube.IMG_STD));
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
        this.resizeCube(col,row,false)
    }
    resizeCube(col,row,force){
        if(this.isActive&& !force){
            this.divCube.classList.remove("glitch");
            this.divCube.style.gridColumnEnd = ""
            this.divCube.style.gridRowEnd = ""
            this.isActive=false;
            this.parentGrid.updateCubes(true)
        }else {
            this.divCube.classList.add("glitch")
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
                fnListener = ()=>{this.scaledResize('2','2',)};
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
    integrityCheck(){
        switch (this.checkViewport()){
            case -1:
                this.delete();
                return null;
            case 0:
            case 1:
                return this;
        }
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
        super(grid,"GC"+grid.idCounter,GridCube.HTML);
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