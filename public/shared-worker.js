onconnect = function (e) {
  let port = e.ports[0];

  port.onmessage = function (e) {
    fetch(`${e.data[2]}/multiply?number1=${e.data[0]}&number2=${e.data[1]}`)
      .then((res) => res.json())
      .then((data) => {
        port.postMessage([data.result]);
      });
  };
};
