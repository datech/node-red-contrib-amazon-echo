module.exports = function(){

  this.formatUUID = function(id) {

    if (id === null || id === undefined)
      return '';
    return ('' + id).replace('.', '').trim();
  }

  this.hueUniqueId = function(id) {
    return (id + '0000').replace(/(.{2})/g, "$1:").substring(0, 23) + '-00';
  }

  this.getHueHubId = function(config) {

    var uuid = '00112233-4455-6677-8899-';
    uuid += formatUUID(config.id);
    return uuid;
  }

};
