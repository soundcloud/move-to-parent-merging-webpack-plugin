function MoveToParentMergingPlugin(chunkCount) {
  this.chunkCount = chunkCount || 2;
}
module.exports = MoveToParentMergingPlugin;

MoveToParentMergingPlugin.prototype.constructor = MoveToParentMergingPlugin;

function getFirstCommonParent (chunks) {
  var parents = [];
  var counts = [];
  for (var n = 0, chunk; chunk = chunks[n++];) {
    for (var m = 0, parentChunk; parentChunk = chunk.parents[m++];) {
      var i = parents.indexOf(parentChunk);
      if (i < 0) {
        parents.push(parentChunk);
        counts.push(0);
        i = parents.length - 1;
      }

      counts[i]++;
      if (counts[i] === chunks.length) {
        return parentChunk;
      }
    }
  }
  return null;
}

MoveToParentMergingPlugin.prototype.apply = function (compiler) {
  var chunkCount = this.chunkCount;

  compiler.plugin("compilation", function (compilation) {
    compilation.plugin("optimize-chunks", function (chunks) {
      var nonEntryChunks = chunks.filter(function (chunk) {
        return !chunk.entry;
      });
      var modules = {};
      nonEntryChunks.forEach(function (chunk) {
        chunk.modules.slice(0).forEach(function (module) {
          var request = module.request;
          var handle = modules[request] = modules[request] || {
            module: module,
            chunks: []
          };

          handle.chunks.push(chunk);
        });
      });

      for (var key in modules) {
        var handle = modules[key];
        if (handle.chunks.length >= chunkCount) {
          var parent = getFirstCommonParent(handle.chunks);
          var module = handle.module;
          if (parent) {
            handle.chunks.forEach(function (chunk) { chunk.removeModule(module); });
            if (!handle.moved) {
              parent.addModule(module);
              module.addChunk(parent);
            }
          }
        }
      }
    });
  });
};
