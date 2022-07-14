// read local JSON file in javascript
fetch("./sample.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
