const fs = require('fs');
const restaurants_info = require("./restaurantsInfo.json");
const restaurants_list = require("./restaurants_list.json");

map = new Map();
result = restaurants_info.concat(restaurants_list).reduce(function (r, o) {
var temp;
if (map.has(o.id)) {
    Object.assign(map.get(o.id), o);
        } else {
            temp = Object.assign({}, o);
            map.set(temp.id, temp);
            r.push(temp);
        }
        return r;
    }, []);


console.log(result);

var jsonContent = JSON.stringify(result,null, 4);
// console.log(jsonContent);

/****************  WRITE JSON OBJ TO OUTPUT FILE ****************/

fs.writeFile("output.json", jsonContent, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
 
    console.log("JSON file has been saved.");
});


