const sizeOf = obj => {
  const size = encodeURI(JSON.stringify(obj)).split(/%..|./).length - 1;
  return size / 1024;
};

export const chunk = (array, count, maxKB) => {
  if (!array.length || !count) {
    return [];
  }

  let currentChunk = 0;
  let rollingKBSize = 0;
  const result = array.reduce((chunks, item, index) => {
    if (maxKB !== undefined) {
      rollingKBSize += sizeOf(item); // If we overflow chunk until the previous index, else keep going

      if (rollingKBSize >= maxKB) {
        chunks[++currentChunk] = [item];
        return chunks;
      }
    }

    if (index !== 0 && index % count === 0) {
      chunks[++currentChunk] = [item];
    } else {
      if (chunks[currentChunk] === undefined) {
        chunks[currentChunk] = [];
      }

      chunks[currentChunk].push(item);
    }

    return chunks;
  }, []);
  return result;
};
export const getAllPlugins = timeline => {
  const allPlugins = Object.values(timeline.plugins);

  if (allPlugins.length) {
    return allPlugins.reduce(function () {
      let prev = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      let curr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      return prev.concat(curr);
    });
  }

  return [];
};
export const getPluginsWithFlush = timeline => {
  if (!timeline) {
    return [];
  }

  const allPlugins = getAllPlugins(timeline); // checking for the existence of .flush()

  const eventPlugins = allPlugins === null || allPlugins === void 0 ? void 0 : allPlugins.filter(f => f.flush);
  return eventPlugins;
};
export const getPluginsWithReset = timeline => {
  if (!timeline) {
    return [];
  }

  const allPlugins = getAllPlugins(timeline); // checking for the existence of .reset()

  const eventPlugins = allPlugins === null || allPlugins === void 0 ? void 0 : allPlugins.filter(f => f.reset);
  return eventPlugins;
};
//# sourceMappingURL=util.js.map