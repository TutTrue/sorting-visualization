let container = document.getElementById("line-container");

let screenWidth = window.innerWidth;

let columnWidth = screenWidth / 50;
let numColumns = Math.floor(screenWidth / columnWidth);
let randomValues = [];

let sleepDuaration = 10;

initBars(container, numColumns);
let bars = document.querySelectorAll('span');
let barArr = Array.from(bars);

bubblesort(randomValues);

//--------sfrequancy sort--------//
async function frequancysort(arr){
    for (let i = 0; i < arr.length; i++) {
        barArr[i].style.backgroundColor = "yellow";
        await sleep(sleepDuaration)
        barArr[i].style.backgroundColor = "black";
    }
    arr.sort();
    await resizebars(barArr, arr)
    await animationEnd(barArr)
}
//--------selection sort--------//
async function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
      const partitionIndex = await partition(arr, left, right);

      await quickSort(arr, left, partitionIndex - 1);
      barArr[right].style.backgroundColor = "green";
      await quickSort(arr, partitionIndex + 1, right);
      await setBarColors(left, right, "green")
      barArr[right].style.backgroundColor = "green";
    }
    if (left == 0 && right == arr.length - 1)
        animationEnd(barArr)
  }
  
  async function partition(arr, left, right) {
    const pivot = arr[right];
    barArr[right].style.backgroundColor = "yellow";
    await setBarColors(left, right, "green")
    await setBarColors(left, right, "black")

    let i = left - 1;
    
    for (let j = left; j < right; j++) {
      if (arr[j] < pivot) {
        i++; 
        swap(arr, i, j);
      }
      await sleep(sleepDuaration)
    }
    
    swap(arr, i + 1, right);
    return i + 1;
  }
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
      insertionSetBarColors(0, i, "green");
  
      while (j > 0 && array[j] < array[j - 1]) {
        sleep(sleepDuaration)
        insertionSetBarColors(0, j, "yellow");
        swap(array, j, j - 1);
        barArr[j].style.backgroundColor = "green";
        j--;
        insertionSetBarColors(0, j, "green");
        await sleep(sleepDuaration);
      }
      insertionSetBarColors(0, i, "green");
      
    }
     animationEnd(barArr);
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

async function setBarColors(start, end, color) {
    for (let index = start; index < end; index++) {
      barArr[index].style.backgroundColor = color;
      await sleep(sleepDuaration)
    }
}
function insertionSetBarColors(start, end, color) {
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

async function resizebars(barArr, arr){
    for (let k = 0; k < barArr.length; k++) {
        barArr[k].style.height = (arr[k] * 100) + "%";
        barArr[k].style.backgroundColor = "green";
        await sleep(sleepDuaration)
    }
}

//-----------old ideas-----------//
// function swapDivs(span1, span2) {
//     let parent1 = span1.parentNode;
//     let sibling1 = span1.nextSibling === span2 ? span1 : span1.nextSibling;
    
//     span2.parentNode.insertBefore(span1, span2);
//     parent1.insertBefore(span2, sibling1);
// }

