onmessage = async function (e) {
  if (e.data === "start") {
    let a = [];

    async function getData() {
      return fetch("http://localhost:3000/getData")
        .then((res) => res.json())
        .then((data) => {
          a = data;
        });
    }

    function bubbleSort(a) {
      var swapped;
      do {
        swapped = false;
        for (var i = 0; i < a.length - 1; i++) {
          if (a[i] > a[i + 1]) {
            var temp = a[i];
            a[i] = a[i + 1];
            a[i + 1] = temp;
            swapped = true;
          }
        }
      } while (swapped);
    }
    var start = new Date().getTime();
    getData()
      .then(() => {
        bubbleSort(a);
      })
      .then(() => {
        var end = new Date().getTime();
        var time = end - start;
        postMessage(time);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
