/**
 * Created by USER on 2016/4/30.
 */
(function (root, factory)
{
	if (typeof define === 'function' && define.amd)
	{
		// AMD
		define([], factory);
	}
	else if (typeof exports === 'object')
	{
		// CommonJS
		module.exports = factory();
	}
	else
	{
		// Browser globals
		root.loki = factory();
	}
}(this, function ()
  {
	  return (function ()
	  {
		  'use strict';

		  const Loki = require('lokijs');

		  (function (_fn)
		  {

			  Loki.prototype.getCollection = function (collectionName, failcallback)
			  {
				  var ret = _fn.apply(this, arguments);

				  if (ret === null && failcallback !== undefined)
				  {
					  if (typeof failcallback === 'function')
					  {
						  ret = failcallback(collectionName);

					  }
					  else if (failcallback === true)
					  {
						  ret = this.addCollection(collectionName);
					  }
					  else if (failcallback)
					  {
						  ret = this.addCollection(collectionName, failcallback);
					  }

					  if (ret && ret instanceof Loki.Collection)
					  {
						  return ret;
					  }

					  throw new Error('collection ' + collectionName + ' not found');

					  return null;
				  }

				  return ret;
			  };

		  })(Loki.prototype.getCollection);

		  return Loki;
	  }());
  }
));

function isPlainObject(obj)
{
	if (!obj || !obj.constructor || obj.constructor !== Object || obj.toString() !== '[object Object]')
	{
		return false;
	}

	return Object.prototype === obj.__proto__ && !obj.prototype;
}
