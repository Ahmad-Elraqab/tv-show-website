// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RES_PER_PAGE = exports.TIMEOUT_SEC = exports.API_URL = void 0;
var API_URL = 'http://api.tvmaze.com/shows';
exports.API_URL = API_URL;
var TIMEOUT_SEC = 10;
exports.TIMEOUT_SEC = TIMEOUT_SEC;
var RES_PER_PAGE = 6; // export const KEY = '<YOUR_KEY>';
// export const MODAL_CLOSE_SEC = 2.5;

exports.RES_PER_PAGE = RES_PER_PAGE;
},{}],"node_modules/regenerator-runtime/runtime.js":[function(require,module,exports) {
var define;
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

},{}],"js/helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getJsonData = void 0;

var _config = require("./config.js");

var _regeneratorRuntime = require("regenerator-runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var timeout = function timeout(s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error("Request took too long! Timeout after ".concat(s, " second")));
    }, s * 1000);
  });
};

var getJsonData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
    var fetchPro, res, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            fetchPro = fetch(url);
            _context.next = 4;
            return Promise.race([fetchPro, timeout(_config.TIMEOUT_SEC)]);

          case 4:
            res = _context.sent;
            _context.next = 7;
            return res.json();

          case 7:
            data = _context.sent;

            if (res.ok) {
              _context.next = 10;
              break;
            }

            throw new Error("".concat(data.message, " (").concat(res.status, ")"));

          case 10:
            return _context.abrupt("return", data);

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 13]]);
  }));

  return function getJsonData(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.getJsonData = getJsonData;
},{"./config.js":"js/config.js","regenerator-runtime":"node_modules/regenerator-runtime/runtime.js"}],"js/model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeMovieStatus = exports.getSearchResultsPage = exports.loadShows = exports.state = void 0;

var _config = require("./config.js");

var _helpers = require("./helpers.js");

var _regeneratorRuntime = require("regenerator-runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var state = {
  TvShows: [],
  pagination: {
    results: [],
    page: 1,
    pageGrid: 1,
    currGridPage: 1,
    resultsPerPage: _config.RES_PER_PAGE
  },
  lists: {
    myList: [],
    myWatchLater: [],
    myFavourite: []
  }
};
exports.state = state;

var loadShows = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _helpers.getJsonData)("".concat(_config.API_URL));

          case 2:
            data = _context.sent;
            _context.prev = 3;
            // console.log(data);
            state.TvShows = data; // console.log(state.TvShows);

            _context.next = 11;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](3);
            console.log("".concat(_context.t0));
            throw _context.t0;

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 7]]);
  }));

  return function loadShows() {
    return _ref.apply(this, arguments);
  };
}();

exports.loadShows = loadShows;

var getSearchResultsPage = function getSearchResultsPage() {
  var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : state.pagination.page;
  var type = arguments.length > 1 ? arguments[1] : undefined;
  var start = (page - 1) * state.pagination.resultsPerPage;
  var end = page * state.pagination.resultsPerPage;

  if (type == 'slider') {
    state.pagination.page = page;
    state.pagination.results = state.TvShows.slice(start, end);
    return state.pagination.results;
  }

  if (type == 'grid') {
    state.pagination.currGridPage = page;
    state.pagination.pageGrid = page;
    start = 0;
    state.pagination.results = state.TvShows.slice(start, end);
    return state.pagination.results;
  }
};

exports.getSearchResultsPage = getSearchResultsPage;

var changeMovieStatus = function changeMovieStatus(type, id) {
  _checkData(id, type);
};

exports.changeMovieStatus = changeMovieStatus;

var _checkData = function _checkData(id, type) {
  // console.log(type);
  var card = state.TvShows.find(function (e) {
    return e.id == id;
  });
  var data = state.lists["".concat(type)].find(function (el) {
    return el.id == id;
  });
  console.log(data); // && data.parentE == `.bookmark .${type}`

  if (data) {
    if (data["".concat(type)] == true) {
      data["".concat(type)] = false;
      state.lists["".concat(type)].splice(state.lists["".concat(type)].indexOf(data), 1);
    }
  } else {
    card["".concat(type)] = true;
    state.lists["".concat(type)].push(card);
  }
}; // Archive.
// if (state.lists.finished.find((e) => e.id == id)) {
//     if (e.myList == true) {
//         e.myList = false;
//     } else {
//         parentE = ".finished";
//         card.myList = true;
//         state.lists.finished.push(card);
//     }
// }
// switch (type) {
//     case "myList":
//         break;
//     case "myWatchLater":
//         _checkData(id, ".watch-later")
//         break;
//     case "myFavourite":
//         _checkData(id, ".favourite")
//         break;
//     default:
//         break;
// }
// switch (type) {
//     case "myList":
//         let data = state.lists.finished.find((el) => el.id == id);
//         if (data) {
//             if (data.myList == true) {
//                 data.myList = false;
//                 state.lists.favourite.splice(state.lists.finished.indexOf(data), 1);
//             }
//         } else {
//             card.parentE = ".finished";
//             card.myList = true;
//             state.lists.finished.push(card);
//         }
//         break;
//     case "myWatchLater":
//         data = state.lists.watchLater.find((el) => el.id == id);
//         if (data) {
//             if (data.myWatchLater == true) {
//                 data.myWatchLater = false;
//                 state.lists.favourite.splice(state.lists.watchLater.indexOf(data), 1);
//             }
//         } else {
//             card.parentE = ".watch-later";
//             card.myWatchLater = true;
//             state.lists.watchLater.push(card);
//         }
//         break;
//     case "myFavourite":
//         data = state.lists.favourite.find((el) => el.id == id);
//         // console.log(data);
//         if (data) {
//             if (data.myFavourite == true) {
//                 data.myFavourite = false;
//                 state.lists.favourite.splice(state.lists.favourite.indexOf(data), 1);
//             }
//         } else {
//             card.parentE = ".favourite";
//             card.myFavourite = true;
//             state.lists.favourite.push(card);
//         }
//         break;
//     default:
//         break;
// }
// console.log(state.lists);
},{"./config.js":"js/config.js","./helpers.js":"js/helpers.js","regenerator-runtime":"node_modules/regenerator-runtime/runtime.js"}],"image/exit.png":[function(require,module,exports) {
module.exports = "/exit.ec9ccb2d.png";
},{}],"js/view/view.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _exit = _interopRequireDefault(require("/image/exit.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var View = /*#__PURE__*/function () {
  function View() {
    _classCallCheck(this, View);
  }

  _createClass(View, [{
    key: "render",
    value: function render(data) {
      var _this = this;

      this._data = data;

      this._clear();

      this._data.map(function (element) {
        var markup = _this._generateMarkup(element); // this._clear();


        _this._parentElement.insertAdjacentHTML('beforeend', markup);
      });
    }
  }, {
    key: "_clear",
    value: function _clear() {
      this._parentElement.innerHTML = '';
    }
  }, {
    key: "addHandlerCardView",
    value: function addHandlerCardView(handler) {
      this._parentElement.addEventListener('click', function (element) {
        var btn = element.target; // console.log(element.target.className);

        if (btn.className == "main-img") {
          handler(btn.parentNode.dataset.id);
        }
      });
    }
  }, {
    key: "viewDetailsCard",
    value: function viewDetailsCard(data) {
      document.querySelector('.card-view').innerHTML = '';
      console.log(data);

      var markup = this._generateCardMarkup(data); // this._clear();


      document.querySelector('.card-view').insertAdjacentHTML('afterbegin', markup);
    }
  }, {
    key: "addHandlerRemoveCardView",
    value: function addHandlerRemoveCardView(handler) {
      document.querySelector('.card-view').addEventListener('click', function (element) {
        var btn = element.target.closest('.exit');
        handler();
      });
    }
  }, {
    key: "removeDetailsCard",
    value: function removeDetailsCard() {
      document.querySelector('.card-view').innerHTML = '';
    }
  }, {
    key: "_generateCardMarkup",
    value: function _generateCardMarkup(data) {
      return "\n        <div class=\"left-container\">\n            <img class=\"movie\" src=\"".concat(data.image.original, "\" alt=\"\">\n            <img class=\"exit\" src=\"").concat(_exit.default, "\" alt=\"\">\n\n        </div>\n\n        <div class=\"right-container\">\n\n            <h1>").concat(data.name, "</h1>\n            <div class=\"divider-h\"></div>\n            <div class=\"info-flexbox\">\n\n                <div class=\"div-top\">\n                    <h1>Release date: </h1><p>").concat(data.premiered, "</p>\n                    <h1>type / language: </h1><p>").concat(data.type, " / ").concat(data.language, "</p>\n\n                    \n                    <h1>Days: </h1><p>").concat(data.genres.map(function (e) {
        return e;
      }).join(', '), "</p>\n\n\n                    </div>\n                    <div class=\"div-top\">\n                    <h1>Genres: </h1><p>").concat(data.genres.map(function (e) {
        return e;
      }).join(', '), "</p>\n                    <h1>Synopsis:</h1>\n                    <div class=\"text\"><p>").concat(data.summary, ".</p></div>\n\n                    <button class=\"btn\"> See More</button>\n                </div>\n            </div>\n            <div class=\"divider-h\"></div>\n            <div class=\"info-flexbox\">\n                <div class=\"div-bottom\">\n                    <h1>7/10</h1>\n                    <h1>Rating by IMDb</h1>\n                </div>\n                <div class=\"divider-v\"></div>\n                <div class=\"div-bottom\">\n                    <h1>67%</h1>\n                    <h1>MetaCrittic</h1>\n                </div>\n                <div class=\"divider-v\"></div>\n                <div class=\"div-bottom\">\n                    <h1>*****</h1>\n                    <h1>From blu users</h1>\n                </div>\n            </div>\n        </div>\n        ");
    }
  }, {
    key: "showCard",
    value: function showCard() {
      document.querySelector('.card-view').classList.remove('animate-card-reverse');
      document.querySelector('.right-container').classList.remove('animate-card-content-reverse');
      document.querySelector('.card-view').classList.add('animate-card');
      document.querySelector('.right-container').classList.add('animate-card-content');
    }
  }, {
    key: "hideCard",
    value: function hideCard() {
      document.querySelector('.right-container').classList.remove('animate-card-content');
      document.querySelector('.right-container').classList.add('animate-card-content-reverse');
      setTimeout(function () {
        document.querySelector('.card-view').classList.remove('animate-card');
        document.querySelector('.card-view').classList.add('animate-card-reverse');
      }, 700);
    }
  }, {
    key: "addHandlerHoverCardView",
    value: function addHandlerHoverCardView(handler) {
      var card; // parent element is movie-list

      this._parentElement.addEventListener("mouseover", function (e) {
        // console.log(e);
        card = e.target.closest(".card");

        if (card != null) {
          handler(card, 'show');
          console.log("Card is hovered");
        }
      });

      this._parentElement.addEventListener('mouseout', function (e) {
        try {
          var data = e.target.closest('.card');
          var className = data.children[0].className.split(" "); // console.log(className[0]);

          if (className[0] != "hover-div" && data != null) {
            console.log("out card but inside bottom card");
            handler(data, 'hide');
          }
        } catch (error) {
          console.log("data is null"); // handler(card, 'hide');
        }
      });
    }
  }]);

  return View;
}(); // Archive.
// showBottomCard(card) {
//     try {
//         card.children[0].classList.remove('animate-div-reverse');
//         card.children[0].classList.add('animate-div');
//         card.children[0].classList.add('not-hover');
//         card.children[0].children[0].classList.remove('animate-content-div-reverse');
//         setTimeout(() => {
//             card.children[0].children[0].classList.add('animate-content-div');
//         }, 150)
//     } catch (error) {
//         console.log("Null Element!");
//     }
// }
// hideBottomCard(card) {
//     try {
//         card.children[0].children[0].classList.remove('animate-content-div');
//         card.children[0].children[0].classList.add('animate-content-div-reverse');
//         card.children[0].classList.remove('animate-div');
//         card.children[0].classList.add('animate-div-reverse');
//     } catch (error) {
//         console.log("Null Element!");
//     }
// }


exports.default = View;
},{"/image/exit.png":"image/exit.png"}],"js/view/sliderView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _view = _interopRequireDefault(require("./view"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SliderView = /*#__PURE__*/function (_View) {
  _inherits(SliderView, _View);

  var _super = _createSuper(SliderView);

  function SliderView() {
    var _this;

    _classCallCheck(this, SliderView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_parentElement", document.querySelectorAll('.slider-box'));

    _defineProperty(_assertThisInitialized(_this), "_data", void 0);

    return _this;
  }

  _createClass(SliderView, [{
    key: "_generateMarkup",
    value: function _generateMarkup(element) {
      return "                \n        <div class=\"movie-details\"><div class=\"card\" data-id=\"".concat(element.id, "\"><img class=\"main-img\" src=\"").concat(element.image.medium, "\" alt=\"\"></div></div>\n\n        ");
    }
  }]);

  return SliderView;
}(_view.default);

var _default = new SliderView();

exports.default = _default;
},{"./view":"js/view/view.js"}],"image/active-my-list.png":[function(require,module,exports) {
module.exports = "/active-my-list.10c11f74.png";
},{}],"image/active-favourite.png":[function(require,module,exports) {
module.exports = "/active-favourite.7c22a893.png";
},{}],"image/active-watch-later.png":[function(require,module,exports) {
module.exports = "/active-watch-later.d6a143f0.png";
},{}],"image/my-list.png":[function(require,module,exports) {
module.exports = "/my-list.2650c271.png";
},{}],"image/my-favourite.png":[function(require,module,exports) {
module.exports = "/my-favourite.915d4b58.png";
},{}],"image/my-watch-later.png":[function(require,module,exports) {
module.exports = "/my-watch-later.1de21633.png";
},{}],"js/view/gridView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _view = _interopRequireDefault(require("./view"));

var _activeMyList = _interopRequireDefault(require("/image/active-my-list.png"));

var _activeFavourite = _interopRequireDefault(require("/image/active-favourite.png"));

var _activeWatchLater = _interopRequireDefault(require("/image/active-watch-later.png"));

var _myList = _interopRequireDefault(require("/image/my-list.png"));

var _myFavourite = _interopRequireDefault(require("/image/my-favourite.png"));

var _myWatchLater = _interopRequireDefault(require("/image/my-watch-later.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GridView = /*#__PURE__*/function (_View) {
  _inherits(GridView, _View);

  var _super = _createSuper(GridView);

  function GridView() {
    var _this;

    _classCallCheck(this, GridView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_parentElement", document.querySelector('.movie-list'));

    _defineProperty(_assertThisInitialized(_this), "_data", void 0);

    return _this;
  }

  _createClass(GridView, [{
    key: "_generateMarkup",
    value: function _generateMarkup(element) {
      return "                \n        <div class=\"movie-details\">\n        <div class=\"card\" data-id=\"".concat(element.id, "\">\n        <div class=\"hover-div\">\n            <div class=\"item\">\n                <img class=\"sub-img myList\" src=\"").concat(element.myList == true ? _activeMyList.default : _myList.default, "\" alt=\"\">\n                <img class=\"sub-img myFavourite\" src=\"").concat(element.myFavourite == true ? _activeFavourite.default : _myFavourite.default, "\" alt=\"\">\n                <img class=\"sub-img myWatchLater\" src=\"").concat(element.myWatchLater == true ? _activeWatchLater.default : _myWatchLater.default, "\" alt=\"\">\n            </div>\n        </div>\n        <img class=\"main-img\" src=\"").concat(element.image == '' ? "/image/movie.jpg" : element.image.medium, "\" alt=\"\">\n        </div>\n        <h5>").concat(element.genres.map(this._genres).join(', '), "</h5>            \n        <h4>").concat(element.name, "</h4>\n    </div>\n        ");
    }
  }, {
    key: "_genres",
    value: function _genres(e) {
      return e;
    }
  }]);

  return GridView;
}(_view.default);

var _default = new GridView();

exports.default = _default;
},{"./view":"js/view/view.js","/image/active-my-list.png":"image/active-my-list.png","/image/active-favourite.png":"image/active-favourite.png","/image/active-watch-later.png":"image/active-watch-later.png","/image/my-list.png":"image/my-list.png","/image/my-favourite.png":"image/my-favourite.png","/image/my-watch-later.png":"image/my-watch-later.png"}],"image/right-arrow.png":[function(require,module,exports) {
module.exports = "/right-arrow.53b83d3e.png";
},{}],"image/left-arrow.png":[function(require,module,exports) {
module.exports = "/left-arrow.6b5ee7fa.png";
},{}],"js/view/paginationView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _view = _interopRequireDefault(require("./view"));

var _rightArrow = _interopRequireDefault(require("/image/right-arrow.png"));

var _leftArrow = _interopRequireDefault(require("/image/left-arrow.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PaginationView = /*#__PURE__*/function (_View) {
  _inherits(PaginationView, _View);

  var _super = _createSuper(PaginationView);

  function PaginationView() {
    var _this;

    _classCallCheck(this, PaginationView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_parentElement", document.querySelector('.slider-box'));

    _defineProperty(_assertThisInitialized(_this), "_GridParentElement", document.querySelector('.btn-discover'));

    _defineProperty(_assertThisInitialized(_this), "_curPage", void 0);

    _defineProperty(_assertThisInitialized(_this), "_data", void 0);

    return _this;
  }

  _createClass(PaginationView, [{
    key: "_generateMarkup",
    value: function _generateMarkup(data) {
      // console.log(this._data);
      var numPages = Math.ceil(this._data.TvShows.length / this._data.pagination.resultsPerPage);
      this._curPage = this._data.pagination.page; // console.log(this._curPage);
      // console.log(numPages);

      if (this._curPage === 1 && numPages > 1) {
        return this._generateMarkupNextButton();
      }

      if (this._curPage === numPages && numPages > 1) {
        return this._generateMarkupBackButton();
      }

      if (this._curPage < numPages) {
        return this._generateMarkupBackButton() + this._generateMarkupNextButton();
      }
    }
  }, {
    key: "render",
    value: function render(data) {
      this._data = data;

      var markup = this._generateMarkup();

      this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
  }, {
    key: "addHandlerClick",
    value: function addHandlerClick(handler) {
      this._parentElement.addEventListener('click', function (e) {
        var btn = e.target.closest('.btn-spec'); // console.log(btn);

        if (!btn) return;
        var goToPage = +btn.dataset.goto;
        console.log(goToPage);
        handler(goToPage, 'slider');
      });
    }
  }, {
    key: "addHandlerGridClick",
    value: function addHandlerGridClick(handler) {
      this._GridParentElement.addEventListener('click', function (e) {
        var btn = e.target.closest('.see-more-btn');
        console.log(btn);
        if (!btn) return;
        var goToPage = +btn.dataset.goto;
        console.log(goToPage);
        handler(goToPage, 'grid');
      });
    }
  }, {
    key: "renderGridView",
    value: function renderGridView(data) {
      this._GridParentElement.innerHTML = '';

      this._GridParentElement.insertAdjacentHTML('beforeend', "<button data-goto=\"".concat(data.pagination.pageGrid + 1, "\" class=\"see-more-btn\">Discover More</button>"));
    }
  }, {
    key: "_generateMarkupNextButton",
    value: function _generateMarkupNextButton() {
      return "    \n        \n        <div class=\"right-btn btn-spec\" data-goto=\"".concat(this._curPage + 1, "\"><img src=\"").concat(_rightArrow.default, "\" alt=\"\"></div>\n");
    }
  }, {
    key: "_generateMarkupBackButton",
    value: function _generateMarkupBackButton() {
      return "\n        <div class=\"left-btn btn-spec\" data-goto=\"".concat(this._curPage - 1, "\"><img src=\"").concat(_leftArrow.default, "\" alt=\"\"></div>\n        ");
    }
  }]);

  return PaginationView;
}(_view.default);

var _default = new PaginationView();

exports.default = _default;
},{"./view":"js/view/view.js","/image/right-arrow.png":"image/right-arrow.png","/image/left-arrow.png":"image/left-arrow.png"}],"image/delete.png":[function(require,module,exports) {
module.exports = "/delete.7ccf8bc4.png";
},{}],"js/view/listView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _view = _interopRequireDefault(require("./view.js"));

var _delete = _interopRequireDefault(require("/image/delete.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ListView = /*#__PURE__*/function (_View) {
  _inherits(ListView, _View);

  var _super = _createSuper(ListView);

  function ListView() {
    var _this;

    _classCallCheck(this, ListView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_parentElement", void 0);

    _defineProperty(_assertThisInitialized(_this), "_data", void 0);

    return _this;
  }

  _createClass(ListView, [{
    key: "render",
    value: function render(data) {
      var _this2 = this;

      // Need to refactor this function.
      // console.log(data);
      // this._clear();
      document.querySelector('.bookmark .myFavourite').innerHTML = '';
      document.querySelector('.bookmark .myWatchLater').innerHTML = '';
      document.querySelector('.bookmark .myList').innerHTML = '';
      data.myFavourite.forEach(function (element) {
        _this2._data = element; // console.log(element);

        _this2._parentElement = document.querySelector('.bookmark .myFavourite');

        var markup = _this2._generateListMarkup();

        _this2._parentElement.insertAdjacentHTML('beforeend', markup);
      });
      data.myWatchLater.forEach(function (element) {
        _this2._data = element; // console.log(element);

        _this2._parentElement = document.querySelector('.bookmark .myWatchLater');

        var markup = _this2._generateListMarkup();

        _this2._parentElement.insertAdjacentHTML('beforeend', markup);
      });
      data.myList.forEach(function (element) {
        _this2._data = element; // console.log(element);

        _this2._parentElement = document.querySelector('.bookmark .myList');

        var markup = _this2._generateListMarkup();

        _this2._parentElement.insertAdjacentHTML('beforeend', markup);
      });
    }
  }, {
    key: "_generateListMarkup",
    value: function _generateListMarkup() {
      return "\n\n        <div class=\"row\">\n        <img src=\"".concat(this._data.image.original, "\" alt=\"\">\n        <div>\n            <h2>").concat(this._data.name, "</h2>\n            <h2>").concat(this._data.premiered, "</h2>\n\n        </div>\n        <img src=\"").concat(_delete.default, "\" data-id=\"").concat(this._data.id, "\" alt=\"\" class=\"delete\">\n        </div>\n        ");
    }
  }, {
    key: "addHandlerAddList",
    value: function addHandlerAddList(handler) {
      document.querySelector('.movie-list').addEventListener("click", function (e) {
        var data = e.target.closest(".sub-img");

        if (data != null) {
          // console.log(e.target.classList[1]);
          handler(e.target.classList[1], e.target.closest(".card").dataset.id);
        }
      });
    }
  }, {
    key: "addHandlerRemoveFromList",
    value: function addHandlerRemoveFromList(handler) {
      document.querySelector('.bookmark').addEventListener("click", function (e) {
        var data = e.target.closest(".delete");

        if (data != null) {
          console.log(e.target.parentNode.parentNode.className); // console.log(e.target.classList[1]);

          handler(e.target.parentNode.parentNode.className, data.dataset.id);
        }
      });
    }
  }]);

  return ListView;
}(_view.default);

var _default = new ListView();

exports.default = _default;
},{"./view.js":"js/view/view.js","/image/delete.png":"image/delete.png"}],"js/controller.js":[function(require,module,exports) {
"use strict";

var model = _interopRequireWildcard(require("./model.js"));

var _regeneratorRuntime = require("regenerator-runtime");

var _view = _interopRequireDefault(require("./view/view.js"));

var _sliderView = _interopRequireDefault(require("./view/sliderView.js"));

var _gridView = _interopRequireDefault(require("./view/gridView.js"));

var _paginationView = _interopRequireDefault(require("./view/paginationView.js"));

var _listView = _interopRequireDefault(require("./view/listView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var sliderController = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return model.loadShows();

          case 3:
            _sliderView.default.render(model.getSearchResultsPage(1, 'slider'));

            _paginationView.default.render(model.state);

            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function sliderController() {
    return _ref.apply(this, arguments);
  };
}();

var gridController = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return model.loadShows();

          case 3:
            _gridView.default.render(model.getSearchResultsPage(1, 'grid'));

            _paginationView.default.renderGridView(model.state);

            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function gridController() {
    return _ref2.apply(this, arguments);
  };
}();

var controlSliderPagination = function controlSliderPagination(goToPage, type) {
  _sliderView.default.render(model.getSearchResultsPage(goToPage, type));

  _paginationView.default.render(model.state);
};

var controlGridPagination = function controlGridPagination(goToPage, type) {
  _gridView.default.render(model.getSearchResultsPage(goToPage, type));

  _paginationView.default.renderGridView(model.state);
};

var cardViewController = function cardViewController(id) {
  var data = model.state.TvShows.find(function (e) {
    return e.id == id;
  }); // console.log(data);

  _sliderView.default.viewDetailsCard(data);

  _sliderView.default.showCard();
};

var removeCardViewController = function removeCardViewController() {
  _sliderView.default.hideCard();

  setTimeout(function () {
    _sliderView.default.removeDetailsCard();
  }, 1000);
};

var addToListController = function addToListController(type, id) {
  model.changeMovieStatus(type, id);

  _gridView.default.render(model.getSearchResultsPage(model.state.pagination.currGridPage, 'grid'));

  _paginationView.default.renderGridView(model.state);

  _listView.default.render(model.state.lists);
}; // const removeFromListController = function (type, id) {
//     model.changeMovieStatus(type, id);
//     listView.render(model.state.lists);
// }


var init = function init() {
  sliderController();
  gridController();

  _paginationView.default.addHandlerClick(controlSliderPagination);

  _paginationView.default.addHandlerGridClick(controlGridPagination);

  _gridView.default.addHandlerCardView(cardViewController);

  _sliderView.default.addHandlerCardView(cardViewController);

  _sliderView.default.addHandlerRemoveCardView(removeCardViewController);

  _listView.default.addHandlerAddList(addToListController);

  _listView.default.addHandlerRemoveFromList(addToListController);
};

init(); // Archive.
// const cardViewHoverController = function (card, type) {
//     if (type == 'show')
//         gridView.showBottomCard(card);
//     if (type == 'hide')
//         gridView.hideBottomCard(card);
// }
},{"./model.js":"js/model.js","regenerator-runtime":"node_modules/regenerator-runtime/runtime.js","./view/view.js":"js/view/view.js","./view/sliderView.js":"js/view/sliderView.js","./view/gridView.js":"js/view/gridView.js","./view/paginationView.js":"js/view/paginationView.js","./view/listView.js":"js/view/listView.js"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61818" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","js/controller.js"], null)
//# sourceMappingURL=/controller.f22f2928.js.map