# MoveToParentMergingPlugin
A simple merging plugin that attempts to lift modules required by several child chunks up to the parent chunk. This is mostly useful if you are code-splitting your bundles into one primary (entry) chunk and several smaller chunks that all have similar dependencies.

Modules will only be moved from a chunk if, for *all chunks that contain that module*, there is a common parent chunk.

There is a simple [example][1] in the repo to illustrate how this works.

## Usage
Install with npm:

```shell
npm install move-to-parent-merging-webpack-plugin
```

Then, use as a plugin in your `webpack.config.js`:

```javascript
var MoveToParentMergingPlugin = require('move-to-parent-merging-webpack-plugin');

module.exports = {
    
    ... your config ...

    plugins: [
        new MoveToParentMergingPlugin();
    ]
};
```

### MoveToParentMerginPlugin([chunkCount])
The plugin can optionally take an argument that specifies how many chunks must contain a module for it to be considered "common" enough to be lifted to a parent chunk. Default = `2` (aggressive.)

[1]: example/webpack.config.js
