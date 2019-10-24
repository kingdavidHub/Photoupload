const fs = require('fs');

module.exports = {
    dateHolder: () => {
        return new Date().toISOString()
    },
    unlinkFile: (file) => {
        fs.unlink(file, (err) => {
            if (err) throw err;
        });
    }
}
