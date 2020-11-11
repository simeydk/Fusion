const PDFMerger = require('pdf-merger-js');

async function merge(sources, destination) {
    var merger = new PDFMerger();
    sources.forEach(source => merger.add(source));
    await merger.save(destination);
}
exports.merge = merge;
