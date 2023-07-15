let container = document.getElementById("line-container");

let screenWidth = window.innerWidth;

let columnWidth = screenWidth / 50;
let numColumns = Math.floor(screenWidth / columnWidth);
let randomValues = [];

let sleepDuaration = 10;

initBars(container, numColumns);
let bars = document.querySelectorAll('span');
let barArr = Array.from(bars);

selectionSort(randomValues);

//--------bubble sort--------//
async function bubblesort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          barArr[j].style.backgroundColor = "yellow";
          barArr[j + 1].style.backgroundColor = "yellow";
          swap(arr, j, j + 1);
          await sleep(sleepDuaration);
          barArr[j].style.backgroundColor = "black";
          barArr[j + 1].style.backgroundColor = "black";
      }
    }
    barArr[arr.length - 1 - i].style.backgroundColor = "green";
  }
  await animationEnd(barArr);
}

//--------selection sort--------//
async function selectionSort(arr) {
    const length = arr.length;
  
    for (let i = 0; i < length - 1; i++) {
      let minIndex = i;
      barArr[i].style.backgroundColor = "yellow";
  
      for (let j = i + 1; j < length; j++) {
        barArr[j].style.backgroundColor = "yellow";
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
        await sleep(sleepDuaration);
        barArr[j].style.backgroundColor = "black";
      }
  
      if (minIndex !== i) {
        swap(arr, i, minIndex);
      }
      barArr[i].style.backgroundColor = "green";
    }
    barArr[length - 1].style.backgroundColor = "green";
    await animationEnd(barArr);
  }

//--------insertion sort--------//
async function insertionSort(array) {
    for (let i = 1; i < array.length; i++) {
      let j = i;
      setBarColors(0, i, "green");
  
      while (j > 0 && array[j] < array[j - 1]) {
        sleep(sleepDuaration)
        setBarColors(0, j, "yellow");
        swap(array, j, j - 1);
        barArr[j].style.backgroundColor = "green";
        j--;
        setBarColors(0, j, "green");
        await sleep(sleepDuaration);
      }
      setBarColors(0, i, "green");
      
    }
    await animationEnd(barArr);
  }


//--------helper functions--------//

function initBars(container, numColumns){
    for (let i = 0; i < numColumns; i++) {
      randomValues.push(Math.random());
    }
    
    //append the bars to the DOM based on the randomValues array
    for (let i = 0; i < numColumns; i++) {
      let bar = document.createElement("span");
      
      bar.style.position = "absolute";
      bar.style.left = (i * columnWidth) + "px";
      bar.style.bottom = "0";
      bar.style.width = columnWidth - 1 + "px";
      bar.style.height = (randomValues[i] * 100) + "%";
      bar.style.backgroundColor = "black";
    
      container.appendChild(bar);
    }
}

function setBarColors(start, end, color) {
    for (let index = start; index < end; index++) {
      barArr[index].style.backgroundColor = color;
    }
}

async function animationEnd(barArr){
  for (let k = 0; k < barArr.length; k++) {
      barArr[k].style.backgroundColor = "red";
      await sleep(sleepDuaration)
  }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function swap(arr, a, b) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
  
    let tempHeight = barArr[a].style.height;
    barArr[a].style.height = barArr[b].style.height;
    barArr[b].style.height = tempHeight;
}

//-----------old ideas-----------//
// function swapDivs(span1, span2) {
//     let parent1 = span1.parentNode;
//     let sibling1 = span1.nextSibling === span2 ? span1 : span1.nextSibling;
    
//     span2.parentNode.insertBefore(span1, span2);
//     parent1.insertBefore(span2, sibling1);
// }

// function resizebars(barArr, arr){
//     for (let k = 0; k < barArr.length; k++) {
//         barArr[k].style.height = (arr[k] * 100) + "%";
//     }
// }
