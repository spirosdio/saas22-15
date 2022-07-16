
var temp = {};
temp['condition1'] = false;
temp['condition2'] = false;
temp['data1'] = {};
temp['data2'] = {};

setTimeout(() => {
    temp.condition1 = true;
    temp.data1 = {"data1": "data1"};
}, 3000);

setTimeout(() => {
    temp.condition2 = true;
    temp.data2 = {"data2": "data2"};
}, 2000);

function waitForCondition(obj, field, data) {
    return new Promise(resolve => {
      function checkFlag() {
        if (obj[field]) {
          resolve();
        } else {
          setTimeout(checkFlag, 100); 
        }
      }
      checkFlag();
    });
}
  
async function run(obj, field, data) {
    await waitForCondition(obj, field, data);
    console.log(obj[data]);
}

//run(temp, 'condition1', 'data1');
//run(temp, 'condition2', 'data2');



let p = new Promise(resolve => {
    function checkFlag() {
      if (temp['condition1']) {
        resolve();
      } else {
        setTimeout(checkFlag, 100); 
      }
    }
    checkFlag();
    });

    p.then(() => {
        console.log(temp);
        console.log(temp['data1']);
        delete temp['condition1'];
        delete temp['data1'];
        console.log(temp);
    });