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

    var is_changed = false;
    if (current_item != null){
      if (current_item.date == item.date) return false;

      is_changed = true;
      current_item.date = item.date;
      current_item.sub_title = item.sub_title;
      current_item.view_url = item.view_url;
    }else{
      is_changed = true;
      json.push(item);
    }

    jsonfile.writeFileSync(filename, json, {
      encoding: 'utf-8',
      replacer: null,
      spaces: 2
    });

    return is_changed;
  }catch(e){
    console.log(e);
    return false;
  }
}
