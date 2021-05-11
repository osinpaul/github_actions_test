const fs = require('fs');

// BEGIN

const updateFile = (json, url) => {
    if (json == null) {
        throw new Error('abscent value of version');
    }
    fs.writeFileSync(url != null ? url : 'package.json', JSON.stringify(json));
};

const readFileAsJson = (file) => {
    if (file == null) {
        throw new Error('file Error :(');
    }

    try {
        const json = fs.readFileSync(file, 'utf8');
        return JSON.parse(json);
    } catch (e) {
        throw new Error('File is not exists or unreadable');
    }
};

const upVersion = (fileURI, type = 'patch') => {
    // 'patch' | 'minor' | 'major'

    if (fileURI == null
        || typeof fileURI !== 'string') {
        throw new Error('abscent value of file');
    }

    const json = readFileAsJson(fileURI);
    const { version } = json;

    if (type === 'patch') {
        const splittedVersion = version.split('.');
        splittedVersion[2] = +splittedVersion[2] + 1;
        const result = { ...json, version: splittedVersion.join('.') };
        updateFile(result, fileURI);
        return result;
    } if (type === 'minor') {
        const splittedVersion = version.split('.');
        splittedVersion[2] = 0;
        splittedVersion[1] = +splittedVersion[1] + 1;
        const result = { ...json, version: splittedVersion.join('.') };
        updateFile(result, fileURI);
        return result;
    } if (type === 'major') {
        const splittedVersion = version.split('.');
        splittedVersion[2] = 0;
        splittedVersion[1] = 0;
        splittedVersion[0] = +splittedVersion[0] + 1;
        const result = { ...json, version: splittedVersion.join('.') };
        updateFile(result, fileURI);
        return result;
    }
    throw new Error('unexpected value of type');
};
// END

module.exports = { upVersion, updateFile, readFileAsJson };
