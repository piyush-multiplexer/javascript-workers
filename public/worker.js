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
        postMessage(time);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
