(function(){
    'use strict';
    
    const address = require('address');

    exports.scan = (onFound, range) => {
        return new Promise((resolve, reject) => {
            let myIp = address.ip();
            let lastDotIndex = myIp.lastIndexOf('.');
            let baseIp = myIp.substring(0, lastDotIndex);
            let ranges = range.split('-');
            if (ranges.length !== 2) {
                throw new Error('Expected a range string of the form {start}-{end}');
            }
            let start = ranges[0].trim();
            let end = ranges[1].trim();
            if (end < start) {
                throw new Error('Start range must be less than end range');
            }
            for (var i = start; i <= end; i++) {
                let ip = `${baseIp}.${i}`; 
                if (onFound(ip)) {
                    if (resolve) {
                        resolve(ip);
                    }
                } else {
                    if (reject) {
                        reject(ip);
                    }
                }
            }
        });
    };

})();