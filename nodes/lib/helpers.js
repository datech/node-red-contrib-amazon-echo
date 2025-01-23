module.exports = function() {
  const os = require('os');

  function formatUUID(id) {
    if (id === null || id === undefined)
      return '';
    return ('' + id).replace('.', '').trim();
  }

  function hueUniqueId(id) {
    return (id + '0000').replace(/(.{2})/g, "$1:").substring(0, 23) + '-00';
  }

  function getHueHubId(config) {
    var uuid = '00112233-4455-6677-8899-';
    uuid += formatUUID(config.id);
    return uuid;
  }

  function getNetworkInterfaces() {
    const networkInterfaces = os.networkInterfaces();
    let interfaces = {
      "all": "0.0.0.0"
    };
  
    // Find IPv4 addresses
    Object.keys(networkInterfaces).filter(name => name !== 'lo').forEach(interfaceName => {
      const details = networkInterfaces[interfaceName].find(detail => detail.family === 'IPv4' && !detail.internal);
      if (details) {
        interfaces[interfaceName] = details.address;
      }
    });
  
    return interfaces;
  }

  return {
    formatUUID,
    hueUniqueId,
    getHueHubId,
    getNetworkInterfaces
  };
};
