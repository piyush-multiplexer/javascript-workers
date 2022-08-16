const endpoint = window.origin;
if (typeof Worker === "undefined") {
  alert("Oops, your browser doesn't support Web Worker!");
}

function nonWebWorker() {
  cleanWindowAndStart();
  let a = [];
  async function getData() {
    return fetch(`${endpoint}/getData`)
      .then((res) => res.json())
      .then((data) => {
        a = data;
      });
  }

  function bubbleSort(a) {
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < a.length - 1; i++) {
        if (a[i] > a[i + 1]) {
          let temp = a[i];
          a[i] = a[i + 1];
          a[i + 1] = temp;
          swapped = true;
        }
      }
    } while (swapped);
  }

  let start = new Date().getTime();
  getData()
    .then(() => {
      bubbleSort(a);
    })
    .then(() => {
      let end = new Date().getTime();
      let time = end - start;
      afterStop(time, false);
    });
}

function withWebWorker() {
  cleanWindowAndStart();
  let worker = new Worker("worker.js");
  worker.onmessage = function (e) {
    afterStop(e.data, true);
  };
  worker.postMessage("start");
}

function cleanWindowAndStart() {
  $("#resultBox").hide(500);
  $("#withWW").hide();
  $("#withoutWW").hide();
  $("#progressbar").addClass("d-flex").show(500);
}

function afterStop(spentTime, mode) {
  $("#timespent").html(spentTime + "ms");
  $("#progressbar")
    .hide(500, function () {
      mode ? $("#withWW").show() : $("#withoutWW").show();
      $("#resultBox").show(500);
    })
    .removeClass("d-flex");
}

function multiply() {
  let first = document.querySelector("#number1");
  let second = document.querySelector("#number2");

  let multiplied = document.querySelector(".result1");

  if (!!window.SharedWorker) {
    let myWorker = new SharedWorker("shared-worker.js");

    myWorker.port.postMessage([first.value, second.value, endpoint]);

    myWorker.port.onmessage = function (e) {
      multiplied.textContent = e.data;
    };
  }
}
