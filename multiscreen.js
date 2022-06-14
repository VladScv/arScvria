const grid = document.querySelector(".grid-box");
const gridComputedStyle = window.getComputedStyle(grid);
document.addEventListener('click',()=>{
    // get number of grid rows
    const gridRowCount = gridComputedStyle.getPropertyValue("grid-template-rows").split(" ").length;

// get number of grid columns
    const gridColumnCount = gridComputedStyle.getPropertyValue("grid-template-columns").split(" ").length;

    grid.textContent='rows: '+gridRowCount + 'columns: '+gridColumnCount;

})
