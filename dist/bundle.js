(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.rpgTableRandomizer = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind,
    nativeCreate       = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.8.3';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };
  _.iteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = property('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  function createReduce(dir) {
    // Optimized iterator function as using arguments.length
    // in the main function will deoptimize the, see #1991.
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }

    return function(obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // Determine the initial value if none is provided.
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var key;
    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, startIndex) {
    var output = [], idx = 0;
    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        //flatten current level of array or arguments object
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0, len = value.length;
        output.length += len;
        while (j < len) {
          output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    return _.unzip(arguments);
  };

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a predicate test
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions
  function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
            i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  }

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var args = slice.call(arguments, 2);
    var bound = function() {
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object
  // In contrast to _.map it returns an object
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys =  _.keys(obj),
          length = keys.length,
          results = {},
          currentKey;
      for (var index = 0; index < length; index++) {
        currentKey = keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(object, oiteratee, context) {
    var result = {}, obj = object, iteratee, keys;
    if (obj == null) return result;
    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      keys = flatten(arguments, false, false, 1);
      iteratee = function(value, key, obj) { return key in obj; };
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), and in Safari 8 (#1929).
  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = property;

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    return obj == null ? function(){} : function(key) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return '' + this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}.call(this));

},{}],2:[function(require,module,exports){
'use strict';

var randomizer = require('./randomizer.js');
var random_table = require('./random_table.js');
var table_normalizer = require('./table_normalizer.js');

module.exports = {
	randomizer: randomizer,
	RandomTable: random_table,
	TableNormalizer: table_normalizer
};

},{"./random_table.js":3,"./randomizer.js":4,"./table_normalizer.js":5}],3:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _ = require('underscore');
var randomizer = require('./randomizer.js');

/**
 * Capitalize a string
 */
var capitalize = function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
};
/**
 * Flatten array into comma separated, capitalized string
 */
var flatten = function flatten(arr) {
	var o = '';
	arr.forEach(function (v) {
		o += capitalize(v) + ', ';
	});
	o = $.trim(o);
	o = o.replace(/,$/, '');
	return o;
};

/**
 * RandomTable: Model for tables used by Randomizer
* @param {Object} config the tables non-default attributes
 */

var RandomTable = function RandomTable(config) {
	this.key = '';
	/**
  * Defaults for the attributes;
  */
	this.defaults = function () {
		return {
			id: 0,
			appv: '',
			key: '',
			title: '',
			author: '',
			description: '',
			source: '',
			tags: [],
			sequence: '', // where to start rolling and if other tables should always be rolled on
			tables: {}, // subtables
			result: []
		};
	};
	/**
  * The primary attributes of this table
  */
	this.attributes = _.extend(this.defaults(), config);
	/**
  * Retrieve an attribute
  * @param {String} attr an attribute
  * @return {String|Number|Object|Array} the attribute's current value
  */
	this.get = function (attr) {
		return this.attributes[attr] ? this.attributes[attr] : '';
	};
	/**
  * Set an attribute
  * @param {String} attr an attribute
  * @param {String|Number|Object|Array} val new value of the attribute
  * @return null
  */
	this.set = function (attr, val, opts) {
		if (opts && opts.silent && opts.silent === true) {
			// dont save right away?
		}
		this.attributes[attr] = val;
	};
	/**
  * Remove attribute
  */
	this.unset = function (attr) {
		delete this.attributes[attr];
	};
	/**
  * This is the model for Random Tables.
  *
  * @constructs
  * @property {String} key identifier for the table
  * @property {String} id id for the table if it is locally saved
  * @property {String} [title] title of the table
  * @property {String} [author] author of the table
  * @property {String} [description] description of the table
  * @property {String} [source] source of the table
  * @property {Array} [tags] subject tags
  * @property {String|Array} [sequence] tables to roll on. if array it can be an array of strings (table names) or objects (two properties table: the table to roll on and times: the number of times to roll)
  * @property {Array} [table] default table. array of strings or objects. removed after initialization.
  * @property {Object} [tables] a property for each subtables. if table property is not set then the first propery of this Object is used to start rolling
  * @property {Object} [result] current result
  */
	this.initialize = function () {
		this.normalize();
		if (this.key === '') {
			if (this.get('key') !== '') {
				this.key = this.get('key');
				return;
			}
			this.key = this.get('id');
			this.set('key', this.key);
		}
	};
	/**
  * validate fields before saving
  * @param {Object} attributes new attributes to save
  * @returns {Object} error information
  */
	this.validate = function (attributes) {
		// console.log(attributes);
		var error = { fields: [], general: '' };

		if (attributes.title === '') {
			error.fields.push({ field: 'title', message: 'Title cannot be blank' });
			error.general += 'Title cannot be blank. ';
		}

		if (typeof attributes.tables === 'string' || _.isEmpty(attributes.tables)) {
			error.fields.push({ field: 'title', message: 'Table cannot be empty' });
			error.general += 'Table cannot be empty. ';
		}

		if (!_.isEmpty(error.fields) || !_.isEmpty(error.general)) {
			return error;
		}
		return true;
	};
	/**
  * Normalize data - mostly move "table" to "table.default"
  * For some reason related to ease of table creation????
  */
	this.normalize = function () {
		if (!_.isEmpty(this.get('table'))) {
			var tables = this.get('tables');
			tables.default = this.get('table');
			this.set('tables', tables);
			this.unset('table');
		}
		/*
  		@todo normalize the table data so it's always an array of objects with the value property?
  		if (!_.isEmpty(this.get('tables'))) {
  			const tables = this.get('tables');
  				
  		}
  */
	};
	/**
  * Start the process of rolling
  * @param {String} [start=''] subtable to roll on
  * @returns {Boolean} success (always true right now)
  */
	this.generateResult = function (start) {
		var _this = this;

		if (typeof start === 'undefined') {
			start = '';
		}
		// we look in the start table for what to roll if the start wasn't explicitly set in the call
		var sequence = start === '' ? this.get('sequence') : start;

		if (sequence === 'rollall') {
			// roll all the tables in order
			sequence = _.keys(this.get('tables'));
		}

		if (sequence === '') {
			// if no start attribute
			// try for "default" table
			if (typeof this.get('tables')['default'] !== 'undefined') {
				this.set('result', this.selectFromTable('default'), { silent: true });
			} else {
				// select first item from tables
				var k = _.keys(this.get('tables'));
				this.set('result', this.selectFromTable(k[0]), { silent: true });
			}
		} else if (typeof sequence === 'string') {
			this.set('result', this.selectFromTable(sequence), { silent: true });
		} else {
			var result = [];
			sequence.forEach(function (v) {
				var r = '';
				if (_.isString(v)) {
					r = _this.selectFromTable(v);
					result = result.concat(r);
					return;
				}
				// its an object
				var times = typeof v.times === 'number' ? v.times : 1;
				for (var i = 1; i <= times; i++) {
					r = _this.selectFromTable(v.table);
					result = result.concat(r);
				}
			});

			this.set('result', result, { silent: true });
		}

		return true;
	};
	/**
  * Get a result from a table/subtable
  * DANGER: you could theoretically put yourself in an endless loop if the data were poorly planned
  * ...but at worst that would just crash the users browser since there's no server processing involved... (???)
  * @todo we'll have to fix for this with a node version
  * @param {String} table table to roll on
  * @returns {Array} array of object results { table: table that was rolled on, result: result string, desc: description string }
  */
	this.selectFromTable = function (table) {
		var _this2 = this;

		if (typeof table === 'undefined') {
			return [{ table: 'Error', result: 'No table found to roll on.', desc: '' }];
		}
		// console.log(table);
		var o = []; // output for sequence of rolls/selections
		var t = this.get('tables')[table]; // the table/subtable
		var result = randomizer.rollRandom(t); // the random string or object from the table (this is the actual result but can include other instructions or parameters)
		var r = ''; // the string result from the table
		var result_print = true; // are we going to show this result

		if (_.isUndefined(t[result])) {
			// table is an array
			r = _.findWhere(t, { label: result });
			if (_.isUndefined(r)) {
				// it's just an array of strings so we can stop here
				o.push({ table: table, result: result, desc: '' });
				return o;
			}
			result_print = typeof r['print'] === 'undefined' ? true : r['print'];
		} else {
			r = t[result];
			result_print = typeof t[result]['print'] === 'undefined' ? true : t[result]['print'];
		}
		// r is now the result object

		// if print==false we suppress the output from this table (good for top-level tables)
		if (result_print === true) {
			// add the description if there is one
			var desc = _.isString(r['description']) ? r['description'] : '';
			// replace any tokens
			var t_result = randomizer.findToken(result, this.get('key'));
			o.push({ table: table, result: t_result, desc: desc });
		}

		// are there subtables to roll on?
		var subtable = r.subtable;
		var r2 = ''; // subtable results
		if (typeof subtable === 'undefined') {
			// no subtables
			return o;
		} else if (_.isString(subtable)) {
			// subtables is a string reference to a table so we run this function again
			r2 = this.selectFromTable(subtable);
			o = o.concat(r2);
		} else if (_.isArray(subtable)) {
			// subtables is an array, assume reference to other tables, roll on each in turn
			subtable.forEach(function (v) {
				r2 = _this2.selectFromTable(v);
				o = o.concat(r2);
			});
		} else if (_.isObject(subtable)) {
			// subtable is object assume embedded table(s)
			// loop over keys
			var k = Object.keys(subtable);
			k.forEach(function (kx) {
				var result = randomizer.rollRandom(subtable[kx]);
				var desc = '';
				if (_.isUndefined(subtable[kx][result])) {
					r2 = _.findWhere(subtable[kx], { label: result });
					if (_.isObject(r2)) {
						desc = _.isString(r2.description) ? r2.description : '';
					}
				} else {
					desc = _.isString(subtable[kx][result]['description']) ? subtable[kx][result]['description'] : '';
				}
				result = randomizer.findToken(result, _this2.get('key'));

				o.push({ table: kx, result: result, desc: desc });
			});
		}

		return o;
	};
	/**
  * Show the results as a string
  * @todo make this nicer/clearer #23
  * Alternate: write a template to use in the views?
  * @param {Boolean} [simple=false] if true only output the first result label
  * @returns {String} the results
  */
	this.niceString = function (simple) {
		if (typeof simple === 'undefined') {
			simple = false;
		}
		var r = this.get('result'); // array
		if (r === '' || r.length === 0) {
			return '';
		}

		if (_.isString(r)) {
			return r;
		} // will this ever happen?
		if (simple) {
			return r[0]['result'];
		} // @todo maybe use shift() instead, if editing this array won't be a problem. (else we could clone it...

		var o = '';
		var print_opt = this.get('print') ? this.get('print') : {};
		r.forEach(function (v) {
			if (print_opt[v.table]) {
				if (!print_opt[v.table].hide_table || print_opt[v.table].hide_table === 0) {
					o += capitalize(v.table) + ': ';
				}
				if (!print_opt[v.table].hide_result || print_opt[v.table].hide_result === 0) {
					o += capitalize(v.result) + '<br/>';
				}
				if (!print_opt[v.table].hide_desc || print_opt[v.table].hide_desc === 0) {
					if (v.desc !== '') {
						o += v.desc + '<br/>';
					}
				}
			} else {
				if (v.table === 'default') {
					o += capitalize(v.result) + '<br/>';
				} else {
					o += capitalize(v.table) + ': ' + capitalize(v.result) + '<br/>';
				}
				if (v.desc !== '') {
					o += v.desc + '<br/>';
				}
			}
		});
		o = o.replace(/<br\/>$/, '');
		return o;
	};
	/**
  * Show the table options as a list
  * @returns {String} the table as html lists
  */
	this.niceList = function () {
		// iterature through each table

		// count the number of entries so we can columnize if necessary
		var t_length = 0;
		var t_tables = 0;
		_.each(this.get('tables'), function (v, k, l) {
			t_length++;
			t_tables++;
			if (_.isArray(v)) {
				t_length = t_length + v.length;
			} else {
				for (var key in v) {
					if (v.hasOwnProperty(key)) {
						t_length++;
					}
				}
			}
		}, this);

		var use_columns = false;
		var breakpoint = false;
		if (t_length > 50) {
			use_columns = true;
			breakpoint = Math.ceil(t_length / 2);
		}

		var ct = 0;

		var o = '<div class="rtable_select">';

		if (use_columns) {
			o += '<div class="row">';
			o += '<div class="col-xs-6">';
		}

		_.each(this.get('tables'), function (v, k, l) {
			// most of the time we break in between tables (except single long tables, see below)
			if (use_columns && breakpoint) {
				if (ct >= breakpoint) {
					o += '</div><div class="col-xs-6">';
					breakpoint = false;
				}
			}

			if (k !== 'default') {
				o += '<header>' + capitalize(k) + '</header>';
				ct++;
			}
			o += '<ol class="list-unstyled">';

			var tweight1 = 0;
			var tweight0 = 0;
			_.each(v, function (vx, kx, lx) {
				tweight0 = tweight1 + 1;
				var weight1 = typeof vx.weight !== 'undefined' ? vx.weight : 1;
				tweight1 = tweight1 + weight1;
				var num = tweight0 === tweight1 ? tweight0 : tweight0 + '-' + tweight1;

				if (_.isArray(lx) && _.isString(vx)) {
					// its an Array of strings
					o += '<li>' + num + '. ' + capitalize(vx);
					ct++;
				} else if (_.isString(kx)) {
					o += '<li>' + num + '. ' + capitalize(kx);
					ct++;
					// vx is an object
					if (typeof vx.description !== 'undefined') {
						o += ' - ' + vx.description;
					}
					if (typeof vx.subtable !== 'undefined') {
						if (_.isArray(vx.subtable)) {
							o += '<div class="subtable_roll">Roll on: ' + flatten(vx.subtable) + '</div>';
						} else if (_.isString(vx.subtable)) {
							o += '<div class="subtable_roll">Roll on: ' + capitalize(vx.subtable) + '</div>';
						} else {
							_.each(vx.subtable, function (vz, kv) {
								o += '<div class="subtable_roll">Roll ' + capitalize(kv) + ':<ol class="list-inline">';
								var t2weight0 = 0;
								var t2weight1 = 0;
								_.each(vz, function (q, w, qw) {
									t2weight0 = t2weight1 + 1;
									var weight2 = typeof q.weight !== 'undefined' ? q.weight : 1;
									t2weight1 = t2weight1 + weight2;
									var num2 = t2weight0 === t2weight1 ? t2weight0 : t2weight0 + '-' + t2weight1;
									if (_.isArray(qw) && _.isString(q)) {
										o += '<li>' + num2 + '. ' + capitalize(q) + '</li>';
									} else if (_.isString(w)) {
										o += '<li>' + num2 + '. ' + capitalize(w) + '</li>';
									} else {
										o += '<li>' + num2 + '. ' + capitalize(q.label) + '</li>';
									}
								}, this);
								o += '</ol></div>';
							}, this);
						}
					}
				} else {
					o += '<li>' + num + '. ' + vx.label;
					ct++;
					if (typeof vx.description !== 'undefined') {
						o += ' - ' + vx.description;
					}
				}
				o += '</li>';

				// for single long tables we'll break in the list itself
				if (use_columns && breakpoint && t_tables === 1) {
					if (ct >= breakpoint) {
						o += '</ol></div><div class="col-xs-6"><ol class="list-unstyled">';
						breakpoint = false;
					}
				}
			}, this);
			o += '</ol>';
		}, this);

		if (use_columns) {
			o += '</div></div>';
		}

		o += '</div>';
		return o;
	};
	/**
  * outputs the json data for the table (import/export)
  * @param {Boolean} [editmode=false] if false empty attributes will be stripped out
  * @returns {Object} table attributes
  */
	this.outputObject = function (editmode) {
		if (typeof editmode === 'undefined') {
			editmode = false;
		}
		var att = _.clone(this.attributes);
		var props = Object.keys(att);
		props.forEach(function (k) {
			if (!editmode && _.isEmpty(att[k])) {
				delete att[k];
			}
		});
		delete att.id;
		return att;
	};
	/**
  * outputs the json data for the table (import/export)
  * @param {Boolean} [editmode=false] if false empty attributes will be stripped out
  * @param {Boolean} [compress=false] if true JSON will not have indentation, etc.
  * @returns {String} table attributes in JSON
  */
	this.outputCode = function (editmode, compress) {
		if (typeof editmode === 'undefined') {
			editmode = false;
		}
		if (typeof compress === 'undefined') {
			compress = false;
		}

		var obj = this.outputObject(editmode);

		if (compress) {
			return JSON.stringify(obj);
		}
		return JSON.stringify(obj, null, 2);
	};
	/**
  * Show the table options as an array suitable for iteration
  * @param {String} table the table to list
  * @returns {Array} array of objects to iterate over, normalized to label...?
  */
	this.selectList = function (table) {
		table = this.get('tables')[table];
		var o = [];
		// @todo this may be broken
		if (Array.isArray(table)) {
			table.forEach(function (v, k) {
				var e = {};
				// account for tables that are just arrays of strings
				if (_.isString(k)) {
					e.label = k;
				} else {
					e.label = v.label;
				}
				o.push(e);
			});
		} else if ((typeof table === 'undefined' ? 'undefined' : _typeof(table)) === 'object' && table !== null) {
			var props = Object.keys(table);
			props.forEach(function (k) {
				var v = table[k];
				var e = {};
				// account for tables that are just arrays of strings
				if (_.isString(k)) {
					e.label = k;
				} else {
					e.label = v.label;
				}
				o.push(e);
			});
		}
		return o;
	};
	/**
  * Get an object result in case we only have the label and need other data from it
  * @param {String} label The item we are looking for
  * @param {String} [table=default] the table to search
  * @returns {Object} the object associated with the label
  */
	this.findObject = function (label, table) {
		if (typeof table === 'undefined' || table === '') {
			table = 'default';
		}
		var t = this.get('tables')[table];
		if (typeof t[label] === 'undefined') {
			return _.findWhere(t, { label: label });
		}
		return t[label];
	};
	/**
   * find the result element for a specific table/subtable
   * @param {String} table The table to look for
   * @returns {Object} result element for specified table (or empty)
   */
	this.findResultElem = function (table) {
		if (typeof table === 'undefined' || table === '') {
			table = 'default';
		}
		return _.findWhere(this.get('result'), { table: table });
	};
	// initialize the table
	this.initialize();
};

// RTable_Collection
var RTable_Collection = function RTable_Collection() {

	//	sortAttribute: "title",
	//	sortDirection: 1,

	/**
  * A collection of RandomTables
  * Tables are added via appdata.tables (converted to an array of objects in AppRouter)
  *
  * @augments external:Backbone.Collection
  * @constructs
  */
	/*
 	initialize: function(){
 		
 	},
 */

	/**
  * Add a RandomTable to the collection, trigger refresh so view updates
  * @param {Object} [model] A RandomTable model to add to the collection
  */
	/*
 	import: function (model) {
 		this.add(model);
 		this.trigger('refresh');
 	},
 */

	/**
  * trigger a refresh on the collection
  */
	/*
 	refresh: function() {
 		this.trigger('refresh')
 	},
 */

	/**
  * Sort the collection's Tables
  * @param {String} attr The field to sort by
  */
	/*
 	sortTables: function (attr) {
 		if (typeof attr == 'undefined') { attr = 'title'; this.sortDirection = 1; }
 		this.sortAttribute = attr;
 		this.sort();
 	},
 */

	/**
  * Comparator function for sorting
  */
	/*
 	comparator: function(a, b) {
 		var a = a.get(this.sortAttribute),
 		b = b.get(this.sortAttribute);
 		
 		if (_.isString(a)) {
 			a = a.toLowerCase();
 		}
 		if (_.isString(b)) {
 			b = b.toLowerCase();
 		}
 		
 		if (a == b) return 0;
 		
 		//1 is ascending
 		if (this.sortDirection == 1) {
 			return a > b ? 1 : -1;
 		} else {
 			return a < b ? 1 : -1;
 		}
 	},
 */

	/**
  * Search the collection
  * @param {String} query words to look for
  * @param {Function} callback function to perform with the matching models
  */
	/*
 	search: function( query, callback ){
 		var pattern = new RegExp( $.trim( query ).replace( / /gi, '|' ), "i");
 		callback.call( this, this.filter(function( model ){
 			if (pattern.test(model.attributes.title) || pattern.test(model.attributes.description) || pattern.test(model.attributes.author) || pattern.test(model.attributes.source)) {
 				return true;
 			}
 		}));
 	},
 */

	/**
  * Returns a table from the collection based on ID
  * @Param {String} id which random table to get
  * @returns {Object} the randomtable model
  */
	/*
 	getById: function(id) {
 		if (typeof id == 'undefined' || _.isEmpty(id) || id == '0') {
 			return {};
 		}
 		
 		var t = this.findWhere({ id: id });
 		if (typeof t == 'undefined') {
 			return {};
 		}
 		return t;
 	},
 */

	/**
  * Return a table from the collection
  * @Param {String} title which random table to get
  * @returns {Object} the randomtable model
  */
	/*
 	getByTitle: function(title) {
 		if (typeof title == 'undefined' || title == '') {
 			return {};
 		}
 		//console.log(title);
 		//console.log(this.findWhere({ key: title }));
 		
 		var t = this.findWhere({ key: title });
 		if (typeof t == 'undefined') {
 			t = this.findWhere({ title: title });
 		}
 		if (typeof t == 'undefined') {
 			return {};
 		}
 		return t;
 	},
 */

	/**
  * Return an array of tables from the collection
  * @Param {String} tag a tag to search on
  * @returns {Array} of randomtable models
  */
	/*
 	getByTags: function(tag) {
 		if (typeof tag == 'undefined' || tag == '') {
 			return [];
 		}
 		//console.log(tag);
 		var t = this.filter(function(model){
 			return ( _.indexOf(model.get('tags'), tag) >= 0 );
 		});
 		//console.log(t);
 		if (typeof t == 'undefined') {
 			return [];
 		}
 		return t;
 	},
 */

	/**
  * Export the user saved custom tables
  * @param {String} [which=user] user will only output user saved tables, all will output all tables
  * @param {Boolean} [compress=false] if true JSON will not be indented with tabs/lines
  * @returns {Array} Array of table objects ?
  */
	/*
 	exportOutput: function(which, compress) {
 		if (typeof which == 'undefined') {
 			which = 'user';
 		}
 		if (typeof compress == 'undefined') {
 			compress = false;
 		}
 		var t = this.filter(function(model){
 			if (which == 'user') {
 				return ( typeof model.get('id') !== 'undefined' );
 			}
 			return true;
 		});
 		
 		_.each(t, function(v,k,l){
 			l[k] = v.outputObject(false);
 		}, this);
 		
 		return t;
 	}
 */
};

module.exports = RandomTable;

},{"./randomizer.js":4,"underscore":1}],4:[function(require,module,exports){
'use strict';

/**
 * Randomizer - handles app randomization functions
 * Module exports a single instance of Randomizer...
 * @constructor
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var Randomizer = function Randomizer() {
	var _this2 = this;

	/**
  * Store the token types/processing
  */
	this.token_types = {};
	/**
  * Random integer between two numbers (stolen from underscorejs)
  * @param {Number} min mininum value
  * @param {Number} max maximum value
  * @return {Number} random value
  */
	this.random = function (min, max) {
		if (max == null) {
			max = min;
			min = 0;
		}
		return min + Math.floor(Math.random() * (max - min + 1));
	};
	/**
  * Random value selection
  * @param {Array} values an array of strings from which to choose
  * @param {Array} weights a matching array of integers to weight the values (i.e. values and weights are in the same order)
  * @returns {String} the randomly selected Array element from values param
  */
	this.getWeightedRandom = function (values, weights) {
		var n = 0;
		var num = this.random(1, this.arraySum(weights));
		for (var i = 0; i < values.length; i++) {
			n = n + weights[i];
			if (n >= num) {
				break;
			}
		}
		return values[i];
	};
	/**
  * Random value selection, wrapper for getWeightedRandom that processes the data into values/weights arrays
  * @param {Object|Array} data An object or array of data
  * @returns {String} the randomly selected Object property name, Array element, or value of the "label" property
  */
	this.rollRandom = function (data) {
		var values = [];
		var weights = [];

		if (Array.isArray(data)) {
			data.forEach(function (v, k, l) {
				if ((typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object') {
					if (typeof v.weight !== 'undefined') {
						weights.push(v.weight);
					} else {
						weights.push(1);
					}
					values.push(v.label);
				} else if (typeof v === 'string') {
					// nothing
					weights.push(1);
					values.push(v);
				}
			});
		} else if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && data !== null) {
			var props = Object.keys(data);
			props.forEach(function (k) {
				var v = data[k];
				if (typeof v.weight !== 'undefined') {
					weights.push(v.weight);
				} else {
					weights.push(1);
				}
				values.push(k);
			});
		}
		return this.getWeightedRandom(values, weights);
	};
	/**
  * Dice rolling simulator
  * @param {Number} [die=6] Die type
  * @param {Number} [number=1] Number of times to roll the die
  * @param {Number} [modifier=0] Numeric modifier to dice total
  * @param {String} [mod_op=+] Operator for the modifier (+,-,/,*)
  * @returns {Number} Number rolled (die*number [mod_op][modifier])
  */
	this.roll = function (die, number, modifier, mod_op) {
		modifier = typeof modifier === 'undefined' ? 0 : parseInt(modifier, 10);
		die = typeof die === 'undefined' ? 6 : parseInt(die, 10);
		mod_op = typeof mod_op === 'undefined' ? '+' : mod_op;

		if (typeof number === 'undefined' || number === 0) {
			number = 1;
		} else {
			number = parseInt(number, 10);
		}

		var sum = 0;
		for (var i = 1; i <= number; i++) {
			sum = sum + this.random(1, die);
		}
		if (modifier === 0) {
			return sum;
		}

		switch (mod_op) {
			case '*':
				sum = sum * modifier;
				break;
			case '-':
				sum = sum - modifier;
				break;
			case '/':
				sum = sum / modifier;
				break;
			case '+':
			default:
				sum = sum + modifier;
				break;
		}
		return Math.round(sum);
	};
	/**
  * Sum an array
  * @param {Array} arr an array of numbers
  * @returns {Number} Total value of numbers in array
  */
	this.arraySum = function (arr) {
		var total = 0;
		for (var i = 0; i < arr.length; i++) {
			var v = parseFloat(arr[i]);
			if (!isNaN(v)) {
				total += v;
			}
		}
		return total;
	};
	/**
  * Perform token replacement.  Only table and roll actions are accepted
  * @param {String} token A value passed from findToken containing a token(s) {{SOME OPERATION}} Tokens are {{table:SOMETABLE}} {{table:SOMETABLE:SUBTABLE}} {{table:SOMETABLE*3}} (roll that table 3 times) {{roll:1d6+2}} (etc) (i.e. {{table:colonial_occupations:laborer}} {{table:color}} also generate names with {{name:flemish}} (surname only) {{name:flemish:male}} {{name:dutch:female}}
  * @returns {String} The value with the token(s) replaced by the operation or else just the token (in case it was a mistake or at least to make the error clearer)
  */
	this.convertToken = function (token, curtable) {
		var parts = token.replace('{{', '').replace('}}', '').split(':');
		if (parts.length === 0) {
			return token;
		}

		// look for a token type we can run
		if (this.token_types[parts[0]]) {
			return this.token_types[parts[0]](parts, token, curtable);
		} else {
			return token;
		}

		// Only table and roll actions are accepted
		/*
  		switch (parts[0]) {
  			case 'table':
  				let multiplier = 1;
  				if (parts[1].indexOf('*') !== -1) {
  					var x = parts[1].split('*');
  					parts[1] = x[0];
  					multiplier = x[1];
  				}
  				
  				// what table do we roll on
  				let t = null;
  				if (parts[1] === 'this') {
  					// reroll on same table
  					t = this.getTableByTitle(curtable);
  				} else {
  					t = this.getTableByTitle(parts[1]);
  				}
  				if (t !== null && typeof t !== 'object') {
  					return token;
  				}
  				if (typeof parts[2] !== 'undefined' && parts[2].indexOf('*') !== -1) {
  					const x = parts[2].split('*');
  					parts[2] = x[0];
  					multiplier = x[1];
  				}
  				let subtable = (typeof parts[2] === 'undefined') ? '' : parts[2];
  				
  				for (var i = 1; i <= multiplier; i++) {
  					t.generateResult(subtable);
  					string += t.niceString(true) + ', ';
  				}
  				string = string.trim();
  				string = string.replace(/,$/, '');
  				
  				break;
  			case 'roll':
  				string = this.parseDiceNotation(parts[1]);
  				break;
  			case 'name':
  				var n = new Names();
  				if (typeof parts[1] === 'undefined' || parts[1] === '' || parts[1] === 'random') {
  					parts[1] = '';
  				}
  				if (typeof parts[3] === 'undefined' || parts[3] !== 'first') {
  					parts[3] = '';
  				}
  				if (typeof parts[2] === 'undefined') {
  					string = n.generateSurname(parts[1]);
  				} else if (parts[2] === 'male') {
  					string = n.generateName(parts[1], 'male', parts[3]);
  				} else if (parts[2] === 'female') {
  					string = n.generateName(parts[1], 'female', parts[3]);
  				} else if (parts[2] === 'random') {
  					string = n.generateName(parts[1], 'random', parts[3]);
  				}
  				break;
  			default:
  				string = '';
  		}
  
  		return string;
  		*/
	};
	/**
  * Look for tokens to perform replace action in convertToken
  * @param {String} string usually a result from a RandomTable
  * @returns {String} String with tokens replaced (if applicable)
  */
	this.findToken = function (string, curtable) {
		var _this = this;

		if (typeof curtable === 'undefined') {
			curtable = '';
		}
		var regexp = new RegExp('({{2}.+?}{2})', 'g');
		var newstring = string.replace(regexp, function (token) {
			return _this.convertToken(token, curtable);
		});
		return newstring;
	};
	/**
  * takes a string like '3d6+2', 'd6', '2d6', parses it, and puts it through roll
  * @params {String} string a die roll notation
  * @returns {Number} the result of the roll
  */
	this.parseDiceNotation = function (string) {
		var m = string.match(/^([0-9]*)d([0-9]+)(?:([\+\-\*\/])([0-9]+))*$/);
		if (m) {
			if (typeof m[4] === 'undefined') {
				m[4] = 0;
			}
			if (m[1] !== '') {
				return this.roll(parseInt(m[2], 10), parseInt(m[1], 10), parseInt(m[4], 10), m[3]);
			} else {
				return this.roll(parseInt(m[2], 10), '1', parseInt(m[4], 10), m[3]);
			}
		}
		return '';
	};
	/**
  * Since tables are stored outside of this module, this function allows for the setting of a function which will be used to lookup a table by it's name
  * @param {Function} lookup a function that takes a table name and returns the table data object
  * @return {null} nothing
  */
	this.setTableTitleLookup = function (lookup) {
		this.getTableByTitle = lookup;
	};
	/**
  * Placeholder that should be replaced by a function outside this module
  * @param {String} name table name identifier
  * @return {null} nothing, when replaced this function should return a table object
  */
	this.getTableByTitle = function (name) {
		return null;
	};
	/**
  * Add a token variable
  * @param {String} name Name of the token (used as first element
  * @param {Function} process Function to return token replacement value function is passed the token_parts (token split by ":"),  original full_token, current table name
  */
	this.registerTokenType = function (name, process) {
		this.token_types[name] = process;
	};
	/**
  * Dice roll token.
  */
	this.registerTokenType('roll', function (token_parts, full_token, curtable) {
		return _this2.parseDiceNotation[token_parts[1]];
	});
	/**
  * Table token lookup in the form:
  * {{table:SOMETABLE}} {{table:SOMETABLE:SUBTABLE}} {{table:SOMETABLE*3}} (roll that table 3 times) {{table:SOMETABLE:SUBTABLE*2}} (roll subtable 2 times)
  */
	this.registerTokenType('table', function (token_parts, full_token, curtable) {
		var string = '';
		// console.log(token_parts);
		if (typeof token_parts[1] === 'undefined') {
			return full_token;
		}
		var multiplier = 1;
		if (token_parts[1].indexOf('*') !== -1) {
			var x = token_parts[1].split('*');
			token_parts[1] = x[0];
			multiplier = x[1];
		}

		// what table do we roll on
		var t = null;
		if (token_parts[1] === 'this') {
			// reroll on same table
			//console.log('this..'+curtable);
			t = _this2.getTableByTitle(curtable);
			//console.log(t);
		} else {
			t = _this2.getTableByTitle(token_parts[1]);
		}
		if (t === null || (typeof t === 'undefined' ? 'undefined' : _typeof(t)) !== 'object') {
			return full_token;
		}
		if (typeof token_parts[2] !== 'undefined' && token_parts[2].indexOf('*') !== -1) {
			var _x = token_parts[2].split('*');
			token_parts[2] = _x[0];
			multiplier = _x[1];
		}
		var subtable = typeof token_parts[2] === 'undefined' ? '' : token_parts[2];

		for (var i = 1; i <= multiplier; i++) {
			t.generateResult(subtable);
			string += t.niceString(true) + ', ';
		}
		string = string.trim();
		string = string.replace(/,$/, '');
		return string;
	});
};

module.exports = new Randomizer();

},{}],5:[function(require,module,exports){
'use strict';

var _ = require('underscore');

/**
 * Take some data and normalize it into a config object for RandomTable
 * Module exports a constructor function
 */
var TableNormalizer = function TableNormalizer(data) {
	this.orig_data = typeof data !== 'undefined' ? data : ''; // save this for later if necessary
	this.normalized_data = {}; // normalized config object for RandomTable
	this.data_type = '';

	/**
  * Set the data
  * @param {String|Object|Array} data the data to normalize
  */
	this.setData = function (data) {
		this.orig_data = data;
	};
	/**
  * Decide what type of data it is so we can treat it appropriately.
  */
	this.checkType = function () {
		var data = this.orig_data;
		if (_.isEmpty(data)) {
			this.data_type = '';
		} else if (_.isString(data)) {
			// html should start with a tag.... right?
			// @todo I'm sure there's a better way
			try {
				JSON.parse(data);
				this.data_type = 'json';
				return this.data_type;
			} catch (e) {
				// not json
			}
			if (data.substring(0, 1) === '<') {
				this.data_type = 'html';
				return this.data_type;
			}
			this.data_type = 'text';
		} else if (_.isObject(data)) {
			this.data_type = 'object';
		}
		return this.data_type;
	};
	/**
  * Try to parse HTML into table object data
  * @return {Array} table options
  */
	this.parseHtml = function () {
		var html = this.orig_data;
		// strip linebreaks cause we'll be making new ones based on the tags
		html = html.replace(/[\n\r]+/g, '');
		// add line breaks for specific end tags li tr p br
		// @todo really <tr> leaves you with some weird data.
		html = html.replace(/<\/(p|tr|li|div)>|<\/?br\/?>/g, '\n').replace(/\t/g, '');

		html = html.replace(/<\/?[^>]+>/g, '').replace(/[\n\r]+$/g, '');
		// console.log(html);
		var text = html.split(/[\n\r]+/g);
		// console.log(text);

		var ct = 0;

		text.forEach(function (v, k, l) {
			v = v.trim(); // trim spaces from ends
			// parse out the pre-post ## data (if it's there)
			var parse = v.match(/^(?:(?:[0-9]+\-)?([0-9]+)(##)?(?:\.\s*|:\s*|,\s*|\t+|\s*))?(.+?)(?:##(.+))?$/);

			if (parse) {
				l[k] = { label: parse[3].trim() };

				if (typeof parse[1] !== 'undefined') {
					var weight = 1;
					if (typeof parse[2] === 'undefined') {
						weight = parseFloat(parse[1]) - ct;
						if (weight < 1) {
							weight = 1;
						}
						ct = ct + weight;
					} else {
						weight = parseFloat(parse[1]);
					}
					if (weight > 1) {
						l[k].weight = weight;
					}
				} else {
					ct++;
				}

				if (typeof parse[4] !== 'undefined') {
					l[k].subtable = parse[4].trim();
				}
			} else {
				delete l[k];
			}
		});
		return text;
	};
	/**
  * Try to parse text into table data
  * @returns {Object} parsed table data
  */
	this.parseText = function () {
		var text = this.orig_data;
		// split it into an array of lines
		text = text.split(/[\n\r]+/g);

		var ct = 0; // the cumulative 'die' count we'll use to calculate the weight
		text.forEach(function (v, k, l) {
			v = v.trim();

			// parse numbers off front and subtables off back
			var parse = v.match(/^(?:(?:[0-9]+\-)?([0-9]+)(##)?(?:\.\s*|:\s*|,\s*|\t+|\s*))?(.+?)(?:##(.+))?$/);
			console.log(parse);
			if (parse) {
				// console.log(parse);
				l[k] = { label: parse[3].trim() };

				if (typeof parse[1] !== 'undefined') {
					var weight = 1;
					if (typeof parse[2] === 'undefined') {
						weight = parseFloat(parse[1]) - ct;
						// console.log(weight);
						if (weight < 1) {
							weight = 1;
						}
						ct = ct + weight;
					} else {
						weight = parseFloat(parse[1]);
					}
					if (weight > 1) {
						l[k].weight = weight;
					}
				} else {
					ct++;
				}

				if (typeof parse[4] !== 'undefined') {
					l[k].subtable = parse[4].trim();
				}
			} else {
				delete l[k];
			}
		});
		return text;
	};
	/**
  * Process the data and try to do something
  */
	this.normalizeData = function () {
		var type = this.checkType();
		if (type === '') {
			return false;
		}
		var parse_data = null;
		switch (type) {
			case 'html':
				parse_data = this.parseHtml();
				this.normalized_data = {
					table: {
						default: parse_data
					}
				};
				break;
			case 'text':
				parse_data = this.parseText();
				this.normalized_data = {
					tables: {
						default: parse_data
					}
				};
				break;
			case 'json':
				parse_data = JSON.parse(this.orig_data);
				this.normalized_data = parse_data;
				break;
		}

		// ?
		return this.normalized_data;
	};
};

module.exports = TableNormalizer;

},{"underscore":1}]},{},[2])(2)
});