/**
 * global OpenSeadragon
 */

/**
 * @file
 * Defines the source for exposing Djatoka to OpenSeadragon.
 * Taken from https://github.com/Islandora/islandora_openseadragon
 */
export function DjatokaTileSourcePlugIn ($) {
  // Remove IIFTileSource, as it assumes Djatoka responses belong to it for some reason.
  $.IIIFTileSource = undefined

  /**
   * @class DjatokaTileSource
   * @classdesc A client implementation for Djatoka
   *
   * @memberof OpenSeadragon
   * @extends OpenSeadragon.TileSource
   */
  $.DjatokaTileSource = function (options) {
    $.extend(true, this, options)
    $.TileSource.apply(this, [options])
  }

  $.extend($.DjatokaTileSource.prototype, $.TileSource.prototype, {
    success: function (event) {
      if (event.tileSource !== undefined) {
        $.extend(true, this, event.tileSource)
      }
    },
    /**
     * Determine if the data and/or url imply the image service is supported by
     * this tile source.
     * @function
     */
    supports: function () {
      return true
    },
    /**
     * Responsible for parsing and configuring the
     * image metadata pertinent to this TileSources implementation.
     * @function
     * @param {Object} data - the raw configuration
     */
    configure: function (options) {
      // Identifier is required for fetching the meta-data and rendering.
      if (!options.identifier) {
        throw Error('Can not create DjatokaTileSource without an identifier.')
      }
      return {
        endpoint: process.env.VUE_APP_METADATAENDPOINT,
        identifier: options.identifier,
        width: parseInt(options.width, 10),
        height: parseInt(options.height, 10),
        tileWidth: parseInt(options.tileWidth, 10) || 256,
        tileHeight: parseInt(options.tileHeight, 10) || 256,
        tileOverlap: parseInt(options.tileOverlap, 10) || 0,
        minLevel: parseInt(options.minLevel, 10) || 0,
        maxLevel: parseInt(options.maxLevel, 10) || parseInt(options.levels, 10)
      }
    },
    /**
     * Djatoka helper function for determining the region to request.
     * @function
     * @param {String} url
     * @throws {Error}
     */
    getRegion: function (level, x, y) {
      const bounds = this.getTileBounds(level, x, y)
      const region = {
        x: (bounds.x * this.dimensions.x).toFixed(),
        y: (bounds.y * this.dimensions.y * this.aspectRatio).toFixed(),
        width: this._tileWidth,
        height: this._tileHeight
      }
      return `${region.y},${region.x},${region.width},${region.height}`
    },
    /**
     * Responsible for retrieving the url which will return an image for the
     * region specified by the given x, y, and level components.
     * @function
     * @param {Number} level - z index
     * @param {Number} x
     * @param {Number} y
     * @throws {Error}
     */
    getTileUrl: function (level, x, y) {
      const region = this.getRegion(level, x, y)
      return `${this.endpoint}/tile?id=${this.identifier}&region=${region}&level=${level}`
    }
  })
}
