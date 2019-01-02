var jsonfile = require('jsonfile');

module.exports.updateOrAddItem = function(item, filename){
  try{
    var json = jsonfile.readFileSync(filename, {
      encoding: 'utf-8',
      reviver: null,
      throws: false
    }) || [];

    var current_item = json.filter(function(j){
      if (j.base_url == item.base_url) return true;
    })[0];

    var is_updated = false;
    if (current_item != null){
      if (current_item.date != item.date){
        is_updated = true;
        current_item.date = item.data;
        current_item.sub_title = item.sub_title;
        current_item.view_url = item.view_url;
      }else{
        return false;
      }
    }else{
      is_updated = true;
      json.push(item);
    }

    jsonfile.writeFileSync(filename, json, {
      encoding: 'utf-8',
      replacer: null,
      spaces: 2
    });

    return is_updated;
  }catch(e){
    console.log(e);
    return false;
  }
}
