(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom'], factory) :
  (global = global || self, factory(global.headlessui = {}, global.React, global.reactDom));
}(this, (function (exports, React, reactDom) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _createForOfIteratorHelperLoose(o, allowArrayLike) {
    var it;

    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;
        return function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    it = o[Symbol.iterator]();
    return it.next.bind(it);
  }

  function match(value, lookup) {
    if (value in lookup) {
      var returnValue = lookup[value];

      for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      return typeof returnValue === 'function' ? returnValue.apply(void 0, args) : returnValue;
    }

    var error = new Error("Tried to handle \"" + value + "\" but there is no handler defined. Only defined handlers are: " + Object.keys(lookup).map(function (key) {
      return "\"" + key + "\"";
    }).join(', ') + ".");
    if (Error.captureStackTrace) Error.captureStackTrace(error, match);
    throw error;
  }

  var Features;

  (function (Features) {
    /** No features at all */
    Features[Features["None"] = 0] = "None";
    /**
     * When used, this will allow us to use one of the render strategies.
     *
     * **The render strategies are:**
     *    - **Unmount**   _(Will unmount the component.)_
     *    - **Hidden**    _(Will hide the component using the [hidden] attribute.)_
     */

    Features[Features["RenderStrategy"] = 1] = "RenderStrategy";
    /**
     * When used, this will allow the user of our component to be in control. This can be used when
     * you want to transition based on some state.
     */

    Features[Features["Static"] = 2] = "Static";
  })(Features || (Features = {}));

  var RenderStrategy;

  (function (RenderStrategy) {
    RenderStrategy[RenderStrategy["Unmount"] = 0] = "Unmount";
    RenderStrategy[RenderStrategy["Hidden"] = 1] = "Hidden";
  })(RenderStrategy || (RenderStrategy = {}));

  function render(props, propsBag, defaultTag, features, visible) {
    if (visible === void 0) {
      visible = true;
    }

    // Visible always render
    if (visible) return _render(props, propsBag, defaultTag);
    var featureFlags = features != null ? features : Features.None;

    if (featureFlags & Features.Static) {
      var _props$static = props["static"],
          isStatic = _props$static === void 0 ? false : _props$static,
          rest = _objectWithoutPropertiesLoose(props, ["static"]); // When the `static` prop is passed as `true`, then the user is in control, thus we don't care about anything else


      if (isStatic) return _render(rest, propsBag, defaultTag);
    }

    if (featureFlags & Features.RenderStrategy) {
      var _match;

      var _props$unmount = props.unmount,
          unmount = _props$unmount === void 0 ? true : _props$unmount,
          _rest = _objectWithoutPropertiesLoose(props, ["unmount"]);

      var strategy = unmount ? RenderStrategy.Unmount : RenderStrategy.Hidden;
      return match(strategy, (_match = {}, _match[RenderStrategy.Unmount] = function () {
        return null;
      }, _match[RenderStrategy.Hidden] = function () {
        return _render(_extends({}, _rest, {
          hidden: true,
          style: {
            display: 'none'
          }
        }), propsBag, defaultTag);
      }, _match));
    } // No features enabled, just render


    return _render(props, propsBag, defaultTag);
  }

  function _render(props, bag, tag) {
    var _ref;

    var _omit = omit(props, ['unmount', 'static']),
        _omit$as = _omit.as,
        Component = _omit$as === void 0 ? tag : _omit$as,
        children = _omit.children,
        _omit$refName = _omit.refName,
        refName = _omit$refName === void 0 ? 'ref' : _omit$refName,
        passThroughProps = _objectWithoutPropertiesLoose(_omit, ["as", "children", "refName"]); // This allows us to use `<HeadlessUIComponent as={MyComopnent} refName="innerRef" />`


    var refRelatedProps = props.ref !== undefined ? (_ref = {}, _ref[refName] = props.ref, _ref) : {};
    var resolvedChildren = typeof children === 'function' ? children(bag) : children; // Allow for className to be a function with the bag as the contents

    if (passThroughProps.className && typeof passThroughProps.className === 'function') {
      passThroughProps.className = passThroughProps.className(bag);
    }

    if (Component === React.Fragment) {
      if (Object.keys(passThroughProps).length > 0) {
        if (Array.isArray(resolvedChildren) && resolvedChildren.length > 1) {
          var err = new Error('You should only render 1 child');
          if (Error.captureStackTrace) Error.captureStackTrace(err, _render);
          throw err;
        }

        if (!React.isValidElement(resolvedChildren)) {
          var _err = new Error("You should render an element as a child. Did you forget the as=\"...\" prop?");

          if (Error.captureStackTrace) Error.captureStackTrace(_err, _render);
          throw _err;
        }

        return React.cloneElement(resolvedChildren, Object.assign({}, // Filter out undefined values so that they don't override the existing values
        mergeEventFunctions(compact(omit(passThroughProps, ['ref'])), resolvedChildren.props, ['onClick']), refRelatedProps));
      }
    }

    return React.createElement(Component, Object.assign({}, omit(passThroughProps, ['ref']), Component !== React.Fragment && refRelatedProps), resolvedChildren);
  }
  /**
   * We can use this function for the following useCase:
   *
   * <Menu.Item> <button onClick={console.log} /> </Menu.Item>
   *
   * Our `Menu.Item` will have an internal `onClick`, if you passthrough an `onClick` to the actual
   * `Menu.Item` component we will call it correctly. However, when we have an `onClick` on the actual
   * first child, that one should _also_ be called (but before this implementation, it was just
   * overriding the `onClick`). But it is only when we *render* that we have access to the existing
   * props of this component.
   *
   * It's a bit hacky, and not that clean, but it is something internal and we have tests to rely on
   * so that we can refactor this later (if needed).
   */


  function mergeEventFunctions(passThroughProps, existingProps, functionsToMerge) {
    var clone = Object.assign({}, passThroughProps);

    var _loop = function _loop() {
      var func = _step.value;

      if (passThroughProps[func] !== undefined && existingProps[func] !== undefined) {
        var _Object$assign;

        Object.assign(clone, (_Object$assign = {}, _Object$assign[func] = function (event) {
          // Props we control
          if (!event.defaultPrevented) passThroughProps[func](event); // Existing props on the component

          if (!event.defaultPrevented) existingProps[func](event);
        }, _Object$assign));
      }
    };

    for (var _iterator = _createForOfIteratorHelperLoose(functionsToMerge), _step; !(_step = _iterator()).done;) {
      _loop();
    }

    return clone;
  }
  /**
   * This is a hack, but basically we want to keep the full 'API' of the component, but we do want to
   * wrap it in a forwardRef so that we _can_ passthrough the ref
   */


  function forwardRefWithAs(component) {
    var _component$displayNam;

    return Object.assign(React.forwardRef(component), {
      displayName: (_component$displayNam = component.displayName) != null ? _component$displayNam : component.name
    });
  }

  function compact(object) {
    var clone = Object.assign({}, object);

    for (var key in clone) {
      if (clone[key] === undefined) delete clone[key];
    }

    return clone;
  }

  function omit(object, keysToOmit) {
    if (keysToOmit === void 0) {
      keysToOmit = [];
    }

    var clone = Object.assign({}, object);

    for (var _iterator2 = _createForOfIteratorHelperLoose(keysToOmit), _step2; !(_step2 = _iterator2()).done;) {
      var key = _step2.value;
      if (key in clone) delete clone[key];
    }

    return clone;
  }

  var DEFAULT_ALERT_TAG = 'div';
  function Alert(props) {
    var _props$importance = props.importance,
        importance = _props$importance === void 0 ? 'polite' : _props$importance,
        passThroughProps = _objectWithoutPropertiesLoose(props, ["importance"]);

    var propsWeControl = match(importance, {
      polite: function polite() {
        return {
          role: 'status'
        };
      },
      assertive: function assertive() {
        return {
          role: 'alert'
        };
      }
    });
    var bag = React.useMemo(function () {
      return {
        importance: importance
      };
    }, [importance]);
    return render(_extends({}, passThroughProps, propsWeControl), bag, DEFAULT_ALERT_TAG);
  }

  function useSyncRefs() {
    for (var _len = arguments.length, refs = new Array(_len), _key = 0; _key < _len; _key++) {
      refs[_key] = arguments[_key];
    }

    var cache = React.useRef(refs);
    React.useEffect(function () {
      cache.current = refs;
    }, [refs]);
    return React.useCallback(function (value) {
      for (var _iterator = _createForOfIteratorHelperLoose(cache.current), _step; !(_step = _iterator()).done;) {
        var ref = _step.value;
        if (ref == null) continue;
        if (typeof ref === 'function') ref(value);else ref.current = value;
      }
    }, [cache]);
  }

  // TODO: This must already exist somewhere, right? ????
  // Ref: https://www.w3.org/TR/uievents-key/#named-key-attribute-values
  var Keys;

  (function (Keys) {
    Keys["Space"] = " ";
    Keys["Enter"] = "Enter";
    Keys["Escape"] = "Escape";
    Keys["Backspace"] = "Backspace";
    Keys["ArrowLeft"] = "ArrowLeft";
    Keys["ArrowUp"] = "ArrowUp";
    Keys["ArrowRight"] = "ArrowRight";
    Keys["ArrowDown"] = "ArrowDown";
    Keys["Home"] = "Home";
    Keys["End"] = "End";
    Keys["PageUp"] = "PageUp";
    Keys["PageDown"] = "PageDown";
    Keys["Tab"] = "Tab";
  })(Keys || (Keys = {}));

  // See: https://github.com/facebook/react/issues/7711
  // See: https://github.com/facebook/react/pull/20612
  // See: https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#concept-fe-disabled (2.)
  function isDisabledReactIssue7711(element) {
    var _ref, _parent;

    var parent = element.parentElement;
    var legend = null;

    while (parent && !(parent instanceof HTMLFieldSetElement)) {
      if (parent instanceof HTMLLegendElement) legend = parent;
      parent = parent.parentElement;
    }

    var isParentDisabled = (_ref = ((_parent = parent) == null ? void 0 : _parent.getAttribute('disabled')) === '') != null ? _ref : false;
    if (isParentDisabled && isFirstLegend(legend)) return false;
    return isParentDisabled;
  }

  function isFirstLegend(element) {
    if (!element) return false;
    var previous = element.previousElementSibling;

    while (previous !== null) {
      if (previous instanceof HTMLLegendElement) return false;
      previous = previous.previousElementSibling;
    }

    return true;
  }

  var useIsoMorphicEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

  // didn't take care of the Suspense case. To fix this we used the approach the @reach-ui/auto-id
  // uses.
  //
  // Credits: https://github.com/reach/reach-ui/blob/develop/packages/auto-id/src/index.tsx

  var state = {
    serverHandoffComplete: false
  };
  var id = 0;

  function generateId() {
    return ++id;
  }

  function useId() {
    var _useState = React.useState(state.serverHandoffComplete ? generateId : null),
        id = _useState[0],
        setId = _useState[1];

    useIsoMorphicEffect(function () {
      if (id === null) setId(generateId());
    }, [id]);
    React.useEffect(function () {
      if (state.serverHandoffComplete === false) state.serverHandoffComplete = true;
    }, []);
    return id != null ? '' + id : undefined;
  }

  //  - https://stackoverflow.com/a/30753870

  var focusableSelector = /*#__PURE__*/['[contentEditable=true]', '[tabindex]', 'a[href]', 'area[href]', 'button:not([disabled])', 'iframe', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])'].map( function (selector) {
    return selector + ":not([tabindex='-1'])";
  }).join(',');
  var Focus;

  (function (Focus) {
    /** Focus the first non-disabled element */
    Focus[Focus["First"] = 1] = "First";
    /** Focus the previous non-disabled element */

    Focus[Focus["Previous"] = 2] = "Previous";
    /** Focus the next non-disabled element */

    Focus[Focus["Next"] = 4] = "Next";
    /** Focus the last non-disabled element */

    Focus[Focus["Last"] = 8] = "Last";
    /** Wrap tab around */

    Focus[Focus["WrapAround"] = 16] = "WrapAround";
    /** Prevent scrolling the focusable elements into view */

    Focus[Focus["NoScroll"] = 32] = "NoScroll";
  })(Focus || (Focus = {}));

  var FocusResult;

  (function (FocusResult) {
    FocusResult[FocusResult["Error"] = 0] = "Error";
    FocusResult[FocusResult["Overflow"] = 1] = "Overflow";
    FocusResult[FocusResult["Success"] = 2] = "Success";
    FocusResult[FocusResult["Underflow"] = 3] = "Underflow";
  })(FocusResult || (FocusResult = {}));

  var Direction;

  (function (Direction) {
    Direction[Direction["Previous"] = -1] = "Previous";
    Direction[Direction["Next"] = 1] = "Next";
  })(Direction || (Direction = {}));

  function getFocusableElements(container) {
    if (container === void 0) {
      container = document.body;
    }

    if (container == null) return [];
    return Array.from(container.querySelectorAll(focusableSelector));
  }
  var FocusableMode;

  (function (FocusableMode) {
    /** The element itself must be focusable. */
    FocusableMode[FocusableMode["Strict"] = 0] = "Strict";
    /** The element should be inside of a focusable element. */

    FocusableMode[FocusableMode["Loose"] = 1] = "Loose";
  })(FocusableMode || (FocusableMode = {}));

  function isFocusableElement(element, mode) {
    var _match;

    if (mode === void 0) {
      mode = FocusableMode.Strict;
    }

    if (element === document.body) return false;
    return match(mode, (_match = {}, _match[FocusableMode.Strict] = function () {
      return element.matches(focusableSelector);
    }, _match[FocusableMode.Loose] = function () {
      var next = element;

      while (next !== null) {
        if (next.matches(focusableSelector)) return true;
        next = next.parentElement;
      }

      return false;
    }, _match));
  }
  function focusElement(element) {
    element == null ? void 0 : element.focus({
      preventScroll: true
    });
  }
  function focusIn(container, focus) {
    var elements = Array.isArray(container) ? container : getFocusableElements(container);
    var active = document.activeElement;

    var direction = function () {
      if (focus & (Focus.First | Focus.Next)) return Direction.Next;
      if (focus & (Focus.Previous | Focus.Last)) return Direction.Previous;
      throw new Error('Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last');
    }();

    var startIndex = function () {
      if (focus & Focus.First) return 0;
      if (focus & Focus.Previous) return Math.max(0, elements.indexOf(active)) - 1;
      if (focus & Focus.Next) return Math.max(0, elements.indexOf(active)) + 1;
      if (focus & Focus.Last) return elements.length - 1;
      throw new Error('Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last');
    }();

    var focusOptions = focus & Focus.NoScroll ? {
      preventScroll: true
    } : {};
    var offset = 0;
    var total = elements.length;
    var next = undefined;

    do {
      var _next;

      // Guard against infinite loops
      if (offset >= total || offset + total <= 0) return FocusResult.Error;
      var nextIdx = startIndex + offset;

      if (focus & Focus.WrapAround) {
        nextIdx = (nextIdx + total) % total;
      } else {
        if (nextIdx < 0) return FocusResult.Underflow;
        if (nextIdx >= total) return FocusResult.Overflow;
      }

      next = elements[nextIdx]; // Try the focus the next element, might not work if it is "hidden" to the user.

      (_next = next) == null ? void 0 : _next.focus(focusOptions); // Try the next one in line

      offset += direction;
    } while (next !== document.activeElement);

    return FocusResult.Success;
  }

  function contains(containers, element) {
    for (var _iterator = _createForOfIteratorHelperLoose(containers), _step; !(_step = _iterator()).done;) {
      var container = _step.value;
      if (container.contains(element)) return true;
    }

    return false;
  }

  function useFocusTrap(containers, enabled, options) {
    if (enabled === void 0) {
      enabled = true;
    }

    if (options === void 0) {
      options = {};
    }

    var restoreElement = React.useRef(typeof window !== 'undefined' ? document.activeElement : null);
    var previousActiveElement = React.useRef(null);
    var mounted = React.useRef(false); // Handle initial focus

    useIsoMorphicEffect(function () {
      var _options$initialFocus, _options$initialFocus3;

      if (!enabled) return;
      if (containers.current.size !== 1) return;
      mounted.current = true;
      var activeElement = document.activeElement;

      if ((_options$initialFocus = options.initialFocus) == null ? void 0 : _options$initialFocus.current) {
        var _options$initialFocus2;

        if (((_options$initialFocus2 = options.initialFocus) == null ? void 0 : _options$initialFocus2.current) === activeElement) {
          return; // Initial focus ref is already the active element
        }
      } else if (contains(containers.current, activeElement)) {
        return; // Already focused within Dialog
      }

      restoreElement.current = activeElement; // Try to focus the initialFocus ref

      if ((_options$initialFocus3 = options.initialFocus) == null ? void 0 : _options$initialFocus3.current) {
        focusElement(options.initialFocus.current);
      } else {
        var couldFocus = false;

        for (var _iterator = _createForOfIteratorHelperLoose(containers.current), _step; !(_step = _iterator()).done;) {
          var container = _step.value;
          var result = focusIn(container, Focus.First);

          if (result === FocusResult.Success) {
            couldFocus = true;
            break;
          }
        }

        if (!couldFocus) throw new Error('There are no focusable elements inside the <FocusTrap />');
      }

      previousActiveElement.current = document.activeElement;
      return function () {
        mounted.current = false;
        focusElement(restoreElement.current);
        restoreElement.current = null;
        previousActiveElement.current = null;
      };
    }, [enabled, containers, mounted, options.initialFocus]); // Handle Tab & Shift+Tab keyboard events

    useIsoMorphicEffect(function () {
      if (!enabled) return;

      function handler(event) {
        if (event.key !== Keys.Tab) return;
        if (!document.activeElement) return;
        if (containers.current.size !== 1) return;
        event.preventDefault();

        for (var _iterator2 = _createForOfIteratorHelperLoose(containers.current), _step2; !(_step2 = _iterator2()).done;) {
          var element = _step2.value;
          var result = focusIn(element, (event.shiftKey ? Focus.Previous : Focus.Next) | Focus.WrapAround);

          if (result === FocusResult.Success) {
            previousActiveElement.current = document.activeElement;
            break;
          }
        }
      }

      window.addEventListener('keydown', handler);
      return function () {
        return window.removeEventListener('keydown', handler);
      };
    }, [enabled, containers]); // Prevent programmatically escaping

    useIsoMorphicEffect(function () {
      if (!enabled) return;
      if (containers.current.size !== 1) return;

      function handler(event) {
        var previous = previousActiveElement.current;
        if (!previous) return;
        if (!mounted.current) return;
        var toElement = event.target;

        if (toElement && toElement instanceof HTMLElement) {
          if (!contains(containers.current, toElement)) {
            event.preventDefault();
            event.stopPropagation();
            focusElement(previous);
          } else {
            previousActiveElement.current = toElement;
            focusElement(toElement);
          }
        } else {
          focusElement(previousActiveElement.current);
        }
      }

      window.addEventListener('focus', handler, true);
      return function () {
        return window.removeEventListener('focus', handler, true);
      };
    }, [enabled, mounted, containers]);
  }

  var interactables = /*#__PURE__*/new Set();
  var originals = /*#__PURE__*/new Map();

  function inert(element) {
    element.setAttribute('aria-hidden', 'true'); // @ts-expect-error `inert` does not exist on HTMLElement (yet!)

    element.inert = true;
  }

  function restore(element) {
    var original = originals.get(element);
    if (!original) return;
    if (original['aria-hidden'] === null) element.removeAttribute('aria-hidden');else element.setAttribute('aria-hidden', original['aria-hidden']); // @ts-expect-error `inert` does not exist on HTMLElement (yet!)

    element.inert = original.inert;
  }

  function useInertOthers(container, enabled) {
    if (enabled === void 0) {
      enabled = true;
    }

    useIsoMorphicEffect(function () {
      if (!enabled) return;
      if (!container.current) return;
      var element = container.current; // Mark myself as an interactable element

      interactables.add(element); // Restore elements that now contain an interactable child

      for (var _iterator = _createForOfIteratorHelperLoose(originals.keys()), _step; !(_step = _iterator()).done;) {
        var original = _step.value;

        if (original.contains(element)) {
          restore(original);
          originals["delete"](original);
        }
      } // Collect direct children of the body


      document.querySelectorAll('body > *').forEach(function (child) {
        if (!(child instanceof HTMLElement)) return; // Skip non-HTMLElements
        // Skip the interactables, and the parents of the interactables

        for (var _iterator2 = _createForOfIteratorHelperLoose(interactables), _step2; !(_step2 = _iterator2()).done;) {
          var interactable = _step2.value;
          if (child.contains(interactable)) return;
        } // Keep track of the elements


        if (interactables.size === 1) {
          originals.set(child, {
            'aria-hidden': child.getAttribute('aria-hidden'),
            // @ts-expect-error `inert` does not exist on HTMLElement (yet!)
            inert: child.inert
          }); // Mutate the element

          inert(child);
        }
      });
      return function () {
        // Inert is disabled on the current element
        interactables["delete"](element); // We still have interactable elements, therefore this one and its parent
        // will become inert as well.

        if (interactables.size > 0) {
          // Collect direct children of the body
          document.querySelectorAll('body > *').forEach(function (child) {
            if (!(child instanceof HTMLElement)) return; // Skip non-HTMLElements
            // Skip already inert parents

            if (originals.has(child)) return; // Skip the interactables, and the parents of the interactables

            for (var _iterator3 = _createForOfIteratorHelperLoose(interactables), _step3; !(_step3 = _iterator3()).done;) {
              var interactable = _step3.value;
              if (child.contains(interactable)) return;
            }

            originals.set(child, {
              'aria-hidden': child.getAttribute('aria-hidden'),
              // @ts-expect-error `inert` does not exist on HTMLElement (yet!)
              inert: child.inert
            }); // Mutate the element

            inert(child);
          });
        } else {
          for (var _iterator4 = _createForOfIteratorHelperLoose(originals.keys()), _step4; !(_step4 = _iterator4()).done;) {
            var _element = _step4.value;
            // Restore
            restore(_element); // Cleanup

            originals["delete"](_element);
          }
        }
      };
    }, [enabled]);
  }

  var StackContext = /*#__PURE__*/React.createContext(function () {});
  StackContext.displayName = 'StackContext';
  var StackMessage;

  (function (StackMessage) {
    StackMessage[StackMessage["AddElement"] = 0] = "AddElement";
    StackMessage[StackMessage["RemoveElement"] = 1] = "RemoveElement";
  })(StackMessage || (StackMessage = {}));

  function useStackContext() {
    return React.useContext(StackContext);
  }
  function useElemenStack(element) {
    var notify = useStackContext();
    useIsoMorphicEffect(function () {
      if (!element) return;
      notify(StackMessage.AddElement, element);
      return function () {
        return notify(StackMessage.RemoveElement, element);
      };
    }, [element]);
  }
  function StackProvider(_ref) {
    var children = _ref.children,
        onUpdate = _ref.onUpdate;
    var parentUpdate = useStackContext();
    var notify = React.useCallback(function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // Notify our layer
      onUpdate == null ? void 0 : onUpdate.apply(void 0, args); // Notify the parent

      parentUpdate.apply(void 0, args);
    }, [parentUpdate, onUpdate]);
    return React__default.createElement(StackContext.Provider, {
      value: notify
    }, children);
  }

  var ForcePortalRootContext = /*#__PURE__*/React.createContext(false);
  function usePortalRoot() {
    return React.useContext(ForcePortalRootContext);
  }
  function ForcePortalRoot(props) {
    return React__default.createElement(ForcePortalRootContext.Provider, {
      value: props.force
    }, props.children);
  }

  function usePortalTarget() {
    var forceInRoot = usePortalRoot();
    var groupTarget = React.useContext(PortalGroupContext);

    var _useState = React.useState(function () {
      // Group context is used, but still null
      if (!forceInRoot && groupTarget !== null) return null; // No group context is used, let's create a default portal root

      if (typeof window === 'undefined') return null;
      var existingRoot = document.getElementById('headlessui-portal-root');
      if (existingRoot) return existingRoot;
      var root = document.createElement('div');
      root.setAttribute('id', 'headlessui-portal-root');
      return document.body.appendChild(root);
    }),
        target = _useState[0],
        setTarget = _useState[1];

    React.useEffect(function () {
      if (forceInRoot) return;
      if (groupTarget === null) return;
      setTarget(groupTarget.current);
    }, [groupTarget, setTarget, forceInRoot]);
    return target;
  } // ---


  var DEFAULT_PORTAL_TAG = React.Fragment;
  function Portal(props) {
    var passthroughProps = props;
    var target = usePortalTarget();

    var _useState2 = React.useState(function () {
      return typeof window === 'undefined' ? null : document.createElement('div');
    }),
        element = _useState2[0];

    useElemenStack(element);
    useIsoMorphicEffect(function () {
      if (!target) return;
      if (!element) return;
      target.appendChild(element);
      return function () {
        if (!target) return;
        if (!element) return;
        target.removeChild(element);

        if (target.childNodes.length <= 0) {
          var _target$parentElement;

          (_target$parentElement = target.parentElement) == null ? void 0 : _target$parentElement.removeChild(target);
        }
      };
    }, [target, element]);
    return React__default.createElement(StackProvider, null, !target || !element ? null : reactDom.createPortal(render(passthroughProps, {}, DEFAULT_PORTAL_TAG), element));
  } // ---

  var DEFAULT_GROUP_TAG = React.Fragment;
  var PortalGroupContext = /*#__PURE__*/React.createContext(null);

  function Group(props) {
    var target = props.target,
        passthroughProps = _objectWithoutPropertiesLoose(props, ["target"]);

    return React__default.createElement(PortalGroupContext.Provider, {
      value: target
    }, render(passthroughProps, {}, DEFAULT_GROUP_TAG));
  } // ---


  Portal.Group = Group;

  var _reducers;
  var DialogStates;

  (function (DialogStates) {
    DialogStates[DialogStates["Open"] = 0] = "Open";
    DialogStates[DialogStates["Closed"] = 1] = "Closed";
  })(DialogStates || (DialogStates = {}));

  var ActionTypes;

  (function (ActionTypes) {
    ActionTypes[ActionTypes["SetTitleId"] = 0] = "SetTitleId";
    ActionTypes[ActionTypes["SetDescriptionId"] = 1] = "SetDescriptionId";
  })(ActionTypes || (ActionTypes = {}));

  var reducers = (_reducers = {}, _reducers[ActionTypes.SetTitleId] = function (state, action) {
    if (state.titleId === action.id) return state;
    return _extends({}, state, {
      titleId: action.id
    });
  }, _reducers[ActionTypes.SetDescriptionId] = function (state, action) {
    if (state.descriptionId === action.id) return state;
    return _extends({}, state, {
      descriptionId: action.id
    });
  }, _reducers);
  var DialogContext = /*#__PURE__*/React.createContext(null);
  DialogContext.displayName = 'DialogContext';

  function useDialogContext(component) {
    var context = React.useContext(DialogContext);

    if (context === null) {
      var err = new Error("<" + component + " /> is missing a parent <" + Dialog.displayName + " /> component.");
      if (Error.captureStackTrace) Error.captureStackTrace(err, useDialogContext);
      throw err;
    }

    return context;
  }

  function stateReducer(state, action) {
    return match(action.type, reducers, state, action);
  } // ---


  var DEFAULT_DIALOG_TAG = 'div';
  var DialogRenderFeatures = Features.RenderStrategy | Features.Static;
  var DialogRoot = /*#__PURE__*/forwardRefWithAs(function Dialog(props, ref) {
    var open = props.open,
        onClose = props.onClose,
        initialFocus = props.initialFocus,
        rest = _objectWithoutPropertiesLoose(props, ["open", "onClose", "initialFocus"]);

    var containers = React.useRef(new Set());
    var internalDialogRef = React.useRef(null);
    var dialogRef = useSyncRefs(internalDialogRef, ref); // Validations

    var hasOpen = props.hasOwnProperty('open');
    var hasOnClose = props.hasOwnProperty('onClose');

    if (!hasOpen && !hasOnClose) {
      throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");
    }

    if (!hasOpen) {
      throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");
    }

    if (!hasOnClose) {
      throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");
    }

    if (typeof open !== 'boolean') {
      throw new Error("You provided an `open` prop to the `Dialog`, but the value is not a boolean. Received: " + open);
    }

    if (typeof onClose !== 'function') {
      throw new Error("You provided an `onClose` prop to the `Dialog`, but the value is not a function. Received: " + onClose);
    }

    var dialogState = open ? DialogStates.Open : DialogStates.Closed;

    var _useReducer = React.useReducer(stateReducer, {
      titleId: null,
      descriptionId: null
    }),
        state = _useReducer[0],
        dispatch = _useReducer[1];

    var close = React.useCallback(function () {
      return onClose(false);
    }, [onClose]);
    var setTitleId = React.useCallback(function (id) {
      return dispatch({
        type: ActionTypes.SetTitleId,
        id: id
      });
    }, [dispatch]);
    var setDescriptionId = React.useCallback(function (id) {
      return dispatch({
        type: ActionTypes.SetDescriptionId,
        id: id
      });
    }, [dispatch]); // Handle outside click

    React.useEffect(function () {
      function handler(event) {
        var target = event.target;
        if (dialogState !== DialogStates.Open) return;
        if (containers.current.size !== 1) return;
        if (contains(containers.current, target)) return;
        close();
      }

      window.addEventListener('mousedown', handler);
      return function () {
        return window.removeEventListener('mousedown', handler);
      };
    }, [dialogState, containers, close]); // Handle `Escape` to close

    React.useEffect(function () {
      function handler(event) {
        if (event.key !== Keys.Escape) return;
        if (dialogState !== DialogStates.Open) return;
        if (containers.current.size > 1) return; // 1 is myself, otherwise other elements in the Stack

        close();
      }

      window.addEventListener('keydown', handler);
      return function () {
        return window.removeEventListener('keydown', handler);
      };
    }, [close, dialogState]); // Scroll lock

    React.useEffect(function () {
      if (dialogState !== DialogStates.Open) return;
      var overflow = document.documentElement.style.overflow;
      var paddingRight = document.documentElement.style.paddingRight;
      var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.paddingRight = scrollbarWidth + "px";
      return function () {
        document.documentElement.style.overflow = overflow;
        document.documentElement.style.paddingRight = paddingRight;
      };
    }, [dialogState]); // Trigger close when the FocusTrap gets hidden

    React.useEffect(function () {
      if (dialogState !== DialogStates.Open) return;
      if (!internalDialogRef.current) return;
      var observer = new IntersectionObserver(function (entries) {
        for (var _iterator = _createForOfIteratorHelperLoose(entries), _step; !(_step = _iterator()).done;) {
          var entry = _step.value;

          if (entry.boundingClientRect.x === 0 && entry.boundingClientRect.y === 0 && entry.boundingClientRect.width === 0 && entry.boundingClientRect.height === 0) {
            close();
          }
        }
      });
      observer.observe(internalDialogRef.current);
      return function () {
        return observer.disconnect();
      };
    }, [dialogState, internalDialogRef, close]);
    var enabled = props["static"] ? true : dialogState === DialogStates.Open;
    useFocusTrap(containers, enabled, {
      initialFocus: initialFocus
    });
    useInertOthers(internalDialogRef, enabled);
    var id = "headlessui-dialog-" + useId();
    var contextBag = React.useMemo(function () {
      return [{
        dialogState: dialogState,
        close: close,
        setTitleId: setTitleId,
        setDescriptionId: setDescriptionId
      }, state];
    }, [dialogState, state, close, setTitleId, setDescriptionId]);
    var propsBag = React.useMemo(function () {
      return {
        open: dialogState === DialogStates.Open
      };
    }, [dialogState]);
    var propsWeControl = {
      ref: dialogRef,
      id: id,
      role: 'dialog',
      'aria-modal': dialogState === DialogStates.Open ? true : undefined,
      'aria-labelledby': state.titleId,
      'aria-describedby': state.descriptionId
    };
    var passthroughProps = rest;
    return React__default.createElement(StackProvider, {
      onUpdate: function onUpdate(message, element) {
        var _match;

        return match(message, (_match = {}, _match[StackMessage.AddElement] = function () {
          containers.current.add(element);
        }, _match[StackMessage.RemoveElement] = function () {
          containers.current["delete"](element);
        }, _match));
      }
    }, React__default.createElement(ForcePortalRoot, {
      force: true
    }, React__default.createElement(Portal, null, React__default.createElement(DialogContext.Provider, {
      value: contextBag
    }, React__default.createElement(Portal.Group, {
      target: internalDialogRef
    }, React__default.createElement(ForcePortalRoot, {
      force: false
    }, render(_extends({}, passthroughProps, propsWeControl), propsBag, DEFAULT_DIALOG_TAG, DialogRenderFeatures, dialogState === DialogStates.Open)))))));
  }); // ---

  var DEFAULT_OVERLAY_TAG = 'div';
  var Overlay = /*#__PURE__*/forwardRefWithAs(function Overlay(props, ref) {
    var _useDialogContext = useDialogContext([Dialog.displayName, Overlay.name].join('.')),
        _useDialogContext$ = _useDialogContext[0],
        dialogState = _useDialogContext$.dialogState,
        close = _useDialogContext$.close;

    var overlayRef = useSyncRefs(ref);
    var id = "headlessui-dialog-overlay-" + useId();
    var handleClick = React.useCallback(function (event) {
      if (isDisabledReactIssue7711(event.currentTarget)) return event.preventDefault();
      close();
    }, [close]);
    var propsBag = React.useMemo(function () {
      return {
        open: dialogState === DialogStates.Open
      };
    }, [dialogState]);
    var propsWeControl = {
      ref: overlayRef,
      id: id,
      'aria-hidden': true,
      onClick: handleClick
    };
    var passthroughProps = props;
    return render(_extends({}, passthroughProps, propsWeControl), propsBag, DEFAULT_OVERLAY_TAG);
  }); // ---

  var DEFAULT_TITLE_TAG = 'h2';

  function Title(props) {
    var _useDialogContext2 = useDialogContext([Dialog.displayName, Title.name].join('.')),
        _useDialogContext2$ = _useDialogContext2[0],
        dialogState = _useDialogContext2$.dialogState,
        setTitleId = _useDialogContext2$.setTitleId;

    var id = "headlessui-dialog-title-" + useId();
    React.useEffect(function () {
      setTitleId(id);
      return function () {
        return setTitleId(null);
      };
    }, [id, setTitleId]);
    var propsBag = React.useMemo(function () {
      return {
        open: dialogState === DialogStates.Open
      };
    }, [dialogState]);
    var propsWeControl = {
      id: id
    };
    var passthroughProps = props;
    return render(_extends({}, passthroughProps, propsWeControl), propsBag, DEFAULT_TITLE_TAG);
  } // ---


  var DEFAULT_DESCRIPTION_TAG = 'p';

  function Description(props) {
    var _useDialogContext3 = useDialogContext([Dialog.displayName, Description.name].join('.')),
        _useDialogContext3$ = _useDialogContext3[0],
        dialogState = _useDialogContext3$.dialogState,
        setDescriptionId = _useDialogContext3$.setDescriptionId;

    var id = "headlessui-dialog-description-" + useId();
    React.useEffect(function () {
      setDescriptionId(id);
      return function () {
        return setDescriptionId(null);
      };
    }, [id, setDescriptionId]);
    var propsBag = React.useMemo(function () {
      return {
        open: dialogState === DialogStates.Open
      };
    }, [dialogState]);
    var propsWeControl = {
      id: id
    };
    var passthroughProps = props;
    return render(_extends({}, passthroughProps, propsWeControl), propsBag, DEFAULT_DESCRIPTION_TAG);
  } // ---


  var Dialog = /*#__PURE__*/Object.assign(DialogRoot, {
    Overlay: Overlay,
    Title: Title,
    Description: Description
  });

  var _reducers$1;
  var DisclosureStates;

  (function (DisclosureStates) {
    DisclosureStates[DisclosureStates["Open"] = 0] = "Open";
    DisclosureStates[DisclosureStates["Closed"] = 1] = "Closed";
  })(DisclosureStates || (DisclosureStates = {}));

  var ActionTypes$1;

  (function (ActionTypes) {
    ActionTypes[ActionTypes["ToggleDisclosure"] = 0] = "ToggleDisclosure";
    ActionTypes[ActionTypes["SetButtonId"] = 1] = "SetButtonId";
    ActionTypes[ActionTypes["SetPanelId"] = 2] = "SetPanelId";
    ActionTypes[ActionTypes["LinkPanel"] = 3] = "LinkPanel";
    ActionTypes[ActionTypes["UnlinkPanel"] = 4] = "UnlinkPanel";
  })(ActionTypes$1 || (ActionTypes$1 = {}));

  var reducers$1 = (_reducers$1 = {}, _reducers$1[ActionTypes$1.ToggleDisclosure] = function (state) {
    var _match;

    return _extends({}, state, {
      disclosureState: match(state.disclosureState, (_match = {}, _match[DisclosureStates.Open] = DisclosureStates.Closed, _match[DisclosureStates.Closed] = DisclosureStates.Open, _match))
    });
  }, _reducers$1[ActionTypes$1.LinkPanel] = function (state) {
    if (state.linkedPanel === true) return state;
    return _extends({}, state, {
      linkedPanel: true
    });
  }, _reducers$1[ActionTypes$1.UnlinkPanel] = function (state) {
    if (state.linkedPanel === false) return state;
    return _extends({}, state, {
      linkedPanel: false
    });
  }, _reducers$1[ActionTypes$1.SetButtonId] = function (state, action) {
    if (state.buttonId === action.buttonId) return state;
    return _extends({}, state, {
      buttonId: action.buttonId
    });
  }, _reducers$1[ActionTypes$1.SetPanelId] = function (state, action) {
    if (state.panelId === action.panelId) return state;
    return _extends({}, state, {
      panelId: action.panelId
    });
  }, _reducers$1);
  var DisclosureContext = /*#__PURE__*/React.createContext(null);
  DisclosureContext.displayName = 'DisclosureContext';

  function useDisclosureContext(component) {
    var context = React.useContext(DisclosureContext);

    if (context === null) {
      var err = new Error("<" + component + " /> is missing a parent <" + Disclosure.name + " /> component.");
      if (Error.captureStackTrace) Error.captureStackTrace(err, useDisclosureContext);
      throw err;
    }

    return context;
  }

  function stateReducer$1(state, action) {
    return match(action.type, reducers$1, state, action);
  } // ---


  var DEFAULT_DISCLOSURE_TAG = React.Fragment;
  function Disclosure(props) {
    var buttonId = "headlessui-disclosure-button-" + useId();
    var panelId = "headlessui-disclosure-panel-" + useId();
    var reducerBag = React.useReducer(stateReducer$1, {
      disclosureState: DisclosureStates.Closed,
      linkedPanel: false,
      buttonId: buttonId,
      panelId: panelId
    });
    var disclosureState = reducerBag[0].disclosureState,
        dispatch = reducerBag[1];
    React.useEffect(function () {
      return dispatch({
        type: ActionTypes$1.SetButtonId,
        buttonId: buttonId
      });
    }, [buttonId, dispatch]);
    React.useEffect(function () {
      return dispatch({
        type: ActionTypes$1.SetPanelId,
        panelId: panelId
      });
    }, [panelId, dispatch]);
    var propsBag = React.useMemo(function () {
      return {
        open: disclosureState === DisclosureStates.Open
      };
    }, [disclosureState]);
    return React__default.createElement(DisclosureContext.Provider, {
      value: reducerBag
    }, render(props, propsBag, DEFAULT_DISCLOSURE_TAG));
  } // ---

  var DEFAULT_BUTTON_TAG = 'button';
  var Button = /*#__PURE__*/forwardRefWithAs(function Button(props, ref) {
    var _useDisclosureContext = useDisclosureContext([Disclosure.name, Button.name].join('.')),
        state = _useDisclosureContext[0],
        dispatch = _useDisclosureContext[1];

    var buttonRef = useSyncRefs(ref);
    var handleKeyDown = React.useCallback(function (event) {
      switch (event.key) {
        case Keys.Space:
        case Keys.Enter:
          event.preventDefault();
          dispatch({
            type: ActionTypes$1.ToggleDisclosure
          });
          break;
      }
    }, [dispatch]);
    var handleClick = React.useCallback(function (event) {
      if (isDisabledReactIssue7711(event.currentTarget)) return;
      if (props.disabled) return;
      dispatch({
        type: ActionTypes$1.ToggleDisclosure
      });
    }, [dispatch, props.disabled]);
    var propsBag = React.useMemo(function () {
      return {
        open: state.disclosureState === DisclosureStates.Open
      };
    }, [state]);
    var passthroughProps = props;
    var propsWeControl = {
      ref: buttonRef,
      id: state.buttonId,
      type: 'button',
      'aria-expanded': state.disclosureState === DisclosureStates.Open ? true : undefined,
      'aria-controls': state.linkedPanel ? state.panelId : undefined,
      onKeyDown: handleKeyDown,
      onClick: handleClick
    };
    return render(_extends({}, passthroughProps, propsWeControl), propsBag, DEFAULT_BUTTON_TAG);
  }); // ---

  var DEFAULT_PANEL_TAG = 'div';
  var PanelRenderFeatures = Features.RenderStrategy | Features.Static;
  var Panel = /*#__PURE__*/forwardRefWithAs(function Panel(props, ref) {
    var _useDisclosureContext2 = useDisclosureContext([Disclosure.name, Panel.name].join('.')),
        state = _useDisclosureContext2[0],
        dispatch = _useDisclosureContext2[1];

    var panelRef = useSyncRefs(ref, function () {
      if (state.linkedPanel) return;
      dispatch({
        type: ActionTypes$1.LinkPanel
      });
    }); // Unlink on "unmount" myself

    React.useEffect(function () {
      return function () {
        return dispatch({
          type: ActionTypes$1.UnlinkPanel
        });
      };
    }, [dispatch]); // Unlink on "unmount" children

    React.useEffect(function () {
      var _props$unmount;

      if (state.disclosureState === DisclosureStates.Closed && ((_props$unmount = props.unmount) != null ? _props$unmount : true)) {
        dispatch({
          type: ActionTypes$1.UnlinkPanel
        });
      }
    }, [state.disclosureState, props.unmount, dispatch]);
    var propsBag = React.useMemo(function () {
      return {
        open: state.disclosureState === DisclosureStates.Open
      };
    }, [state]);
    var propsWeControl = {
      ref: panelRef,
      id: state.panelId
    };
    var passthroughProps = props;
    return render(_extends({}, passthroughProps, propsWeControl), propsBag, DEFAULT_PANEL_TAG, PanelRenderFeatures, state.disclosureState === DisclosureStates.Open);
  }); // ---

  Disclosure.Button = Button;
  Disclosure.Panel = Panel;

  var DEFAULT_FOCUS_TRAP_TAG = 'div';
  function FocusTrap(props) {
    var containers = React.useRef(new Set());

    var initialFocus = props.initialFocus,
        passthroughProps = _objectWithoutPropertiesLoose(props, ["initialFocus"]);

    useFocusTrap(containers, true, {
      initialFocus: initialFocus
    });
    var propsWeControl = {
      ref: function ref(element) {
        if (!element) return;
        containers.current.add(element);
      }
    };
    return render(_extends({}, passthroughProps, propsWeControl), {}, DEFAULT_FOCUS_TRAP_TAG);
  }

  function disposables() {
    var disposables = [];
    var api = {
      requestAnimationFrame: function (_requestAnimationFrame) {
        function requestAnimationFrame() {
          return _requestAnimationFrame.apply(this, arguments);
        }

        requestAnimationFrame.toString = function () {
          return _requestAnimationFrame.toString();
        };

        return requestAnimationFrame;
      }(function () {
        var raf = requestAnimationFrame.apply(void 0, arguments);
        api.add(function () {
          return cancelAnimationFrame(raf);
        });
      }),
      nextFrame: function nextFrame() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        api.requestAnimationFrame(function () {
          api.requestAnimationFrame.apply(api, args);
        });
      },
      setTimeout: function (_setTimeout) {
        function setTimeout() {
          return _setTimeout.apply(this, arguments);
        }

        setTimeout.toString = function () {
          return _setTimeout.toString();
        };

        return setTimeout;
      }(function () {
        var timer = setTimeout.apply(void 0, arguments);
        api.add(function () {
          return clearTimeout(timer);
        });
      }),
      add: function add(cb) {
        disposables.push(cb);
      },
      dispose: function dispose() {
        for (var _iterator = _createForOfIteratorHelperLoose(disposables.splice(0)), _step; !(_step = _iterator()).done;) {
          var dispose = _step.value;
          dispose();
        }
      }
    };
    return api;
  }

  function useDisposables() {
    // Using useState instead of useRef so that we can use the initializer function.
    var _useState = React.useState(disposables),
        d = _useState[0];

    React.useEffect(function () {
      return function () {
        return d.dispose();
      };
    }, [d]);
    return d;
  }

  function useComputed(cb, dependencies) {
    var _useState = React.useState(cb),
        value = _useState[0],
        setValue = _useState[1];

    var cbRef = React.useRef(cb);
    useIsoMorphicEffect(function () {
      cbRef.current = cb;
    }, [cb]);
    useIsoMorphicEffect(function () {
      return setValue(cbRef.current);
    }, [cbRef, setValue].concat(dependencies));
    return value;
  }

  function assertNever(x) {
    throw new Error('Unexpected object: ' + x);
  }

  var Focus$1;

  (function (Focus) {
    /** Focus the first non-disabled item. */
    Focus[Focus["First"] = 0] = "First";
    /** Focus the previous non-disabled item. */

    Focus[Focus["Previous"] = 1] = "Previous";
    /** Focus the next non-disabled item. */

    Focus[Focus["Next"] = 2] = "Next";
    /** Focus the last non-disabled item. */

    Focus[Focus["Last"] = 3] = "Last";
    /** Focus a specific item based on the `id` of the item. */

    Focus[Focus["Specific"] = 4] = "Specific";
    /** Focus no items at all. */

    Focus[Focus["Nothing"] = 5] = "Nothing";
  })(Focus$1 || (Focus$1 = {}));

  function calculateActiveIndex(action, resolvers) {
    var items = resolvers.resolveItems();
    if (items.length <= 0) return null;
    var currentActiveIndex = resolvers.resolveActiveIndex();
    var activeIndex = currentActiveIndex != null ? currentActiveIndex : -1;

    var nextActiveIndex = function () {
      switch (action.focus) {
        case Focus$1.First:
          return items.findIndex(function (item) {
            return !resolvers.resolveDisabled(item);
          });

        case Focus$1.Previous:
          {
            var idx = items.slice().reverse().findIndex(function (item, idx, all) {
              if (activeIndex !== -1 && all.length - idx - 1 >= activeIndex) return false;
              return !resolvers.resolveDisabled(item);
            });
            if (idx === -1) return idx;
            return items.length - 1 - idx;
          }

        case Focus$1.Next:
          return items.findIndex(function (item, idx) {
            if (idx <= activeIndex) return false;
            return !resolvers.resolveDisabled(item);
          });

        case Focus$1.Last:
          {
            var _idx = items.slice().reverse().findIndex(function (item) {
              return !resolvers.resolveDisabled(item);
            });

            if (_idx === -1) return _idx;
            return items.length - 1 - _idx;
          }

        case Focus$1.Specific:
          return items.findIndex(function (item) {
            return resolvers.resolveId(item) === action.id;
          });

        case Focus$1.Nothing:
          return null;

        default:
          assertNever(action);
      }
    }();

    return nextActiveIndex === -1 ? currentActiveIndex : nextActiveIndex;
  }

  var _reducers$2;
  var ListboxStates;

  (function (ListboxStates) {
    ListboxStates[ListboxStates["Open"] = 0] = "Open";
    ListboxStates[ListboxStates["Closed"] = 1] = "Closed";
  })(ListboxStates || (ListboxStates = {}));

  var ActionTypes$2;

  (function (ActionTypes) {
    ActionTypes[ActionTypes["OpenListbox"] = 0] = "OpenListbox";
    ActionTypes[ActionTypes["CloseListbox"] = 1] = "CloseListbox";
    ActionTypes[ActionTypes["SetDisabled"] = 2] = "SetDisabled";
    ActionTypes[ActionTypes["GoToOption"] = 3] = "GoToOption";
    ActionTypes[ActionTypes["Search"] = 4] = "Search";
    ActionTypes[ActionTypes["ClearSearch"] = 5] = "ClearSearch";
    ActionTypes[ActionTypes["RegisterOption"] = 6] = "RegisterOption";
    ActionTypes[ActionTypes["UnregisterOption"] = 7] = "UnregisterOption";
  })(ActionTypes$2 || (ActionTypes$2 = {}));

  var reducers$2 = (_reducers$2 = {}, _reducers$2[ActionTypes$2.CloseListbox] = function (state) {
    if (state.disabled) return state;
    if (state.listboxState === ListboxStates.Closed) return state;
    return _extends({}, state, {
      activeOptionIndex: null,
      listboxState: ListboxStates.Closed
    });
  }, _reducers$2[ActionTypes$2.OpenListbox] = function (state) {
    if (state.disabled) return state;
    if (state.listboxState === ListboxStates.Open) return state;
    return _extends({}, state, {
      listboxState: ListboxStates.Open
    });
  }, _reducers$2[ActionTypes$2.SetDisabled] = function (state, action) {
    if (state.disabled === action.disabled) return state;
    return _extends({}, state, {
      disabled: action.disabled
    });
  }, _reducers$2[ActionTypes$2.GoToOption] = function (state, action) {
    if (state.disabled) return state;
    if (state.listboxState === ListboxStates.Closed) return state;
    var activeOptionIndex = calculateActiveIndex(action, {
      resolveItems: function resolveItems() {
        return state.options;
      },
      resolveActiveIndex: function resolveActiveIndex() {
        return state.activeOptionIndex;
      },
      resolveId: function resolveId(item) {
        return item.id;
      },
      resolveDisabled: function resolveDisabled(item) {
        return item.dataRef.current.disabled;
      }
    });
    if (state.searchQuery === '' && state.activeOptionIndex === activeOptionIndex) return state;
    return _extends({}, state, {
      searchQuery: '',
      activeOptionIndex: activeOptionIndex
    });
  }, _reducers$2[ActionTypes$2.Search] = function (state, action) {
    if (state.disabled) return state;
    if (state.listboxState === ListboxStates.Closed) return state;
    var searchQuery = state.searchQuery + action.value;
    var match = state.options.findIndex(function (option) {
      var _option$dataRef$curre;

      return !option.dataRef.current.disabled && ((_option$dataRef$curre = option.dataRef.current.textValue) == null ? void 0 : _option$dataRef$curre.startsWith(searchQuery));
    });
    if (match === -1 || match === state.activeOptionIndex) return _extends({}, state, {
      searchQuery: searchQuery
    });
    return _extends({}, state, {
      searchQuery: searchQuery,
      activeOptionIndex: match
    });
  }, _reducers$2[ActionTypes$2.ClearSearch] = function (state) {
    if (state.disabled) return state;
    if (state.listboxState === ListboxStates.Closed) return state;
    if (state.searchQuery === '') return state;
    return _extends({}, state, {
      searchQuery: ''
    });
  }, _reducers$2[ActionTypes$2.RegisterOption] = function (state, action) {
    return _extends({}, state, {
      options: [].concat(state.options, [{
        id: action.id,
        dataRef: action.dataRef
      }])
    });
  }, _reducers$2[ActionTypes$2.UnregisterOption] = function (state, action) {
    var nextOptions = state.options.slice();
    var currentActiveOption = state.activeOptionIndex !== null ? nextOptions[state.activeOptionIndex] : null;
    var idx = nextOptions.findIndex(function (a) {
      return a.id === action.id;
    });
    if (idx !== -1) nextOptions.splice(idx, 1);
    return _extends({}, state, {
      options: nextOptions,
      activeOptionIndex: function () {
        if (idx === state.activeOptionIndex) return null;
        if (currentActiveOption === null) return null; // If we removed the option before the actual active index, then it would be out of sync. To
        // fix this, we will find the correct (new) index position.

        return nextOptions.indexOf(currentActiveOption);
      }()
    });
  }, _reducers$2);
  var ListboxContext = /*#__PURE__*/React.createContext(null);
  ListboxContext.displayName = 'ListboxContext';

  function useListboxContext(component) {
    var context = React.useContext(ListboxContext);

    if (context === null) {
      var err = new Error("<" + component + " /> is missing a parent <" + Listbox.name + " /> component.");
      if (Error.captureStackTrace) Error.captureStackTrace(err, useListboxContext);
      throw err;
    }

    return context;
  }

  function stateReducer$2(state, action) {
    return match(action.type, reducers$2, state, action);
  } // ---


  var DEFAULT_LISTBOX_TAG = React.Fragment;
  function Listbox(props) {
    var value = props.value,
        onChange = props.onChange,
        _props$disabled = props.disabled,
        disabled = _props$disabled === void 0 ? false : _props$disabled,
        passThroughProps = _objectWithoutPropertiesLoose(props, ["value", "onChange", "disabled"]);

    var reducerBag = React.useReducer(stateReducer$2, {
      listboxState: ListboxStates.Closed,
      propsRef: {
        current: {
          value: value,
          onChange: onChange
        }
      },
      labelRef: React.createRef(),
      buttonRef: React.createRef(),
      optionsRef: React.createRef(),
      disabled: disabled,
      options: [],
      searchQuery: '',
      activeOptionIndex: null
    });
    var _reducerBag$ = reducerBag[0],
        listboxState = _reducerBag$.listboxState,
        propsRef = _reducerBag$.propsRef,
        optionsRef = _reducerBag$.optionsRef,
        buttonRef = _reducerBag$.buttonRef,
        dispatch = reducerBag[1];
    useIsoMorphicEffect(function () {
      propsRef.current.value = value;
    }, [value, propsRef]);
    useIsoMorphicEffect(function () {
      propsRef.current.onChange = onChange;
    }, [onChange, propsRef]);
    useIsoMorphicEffect(function () {
      return dispatch({
        type: ActionTypes$2.SetDisabled,
        disabled: disabled
      });
    }, [disabled]); // Handle outside click

    React.useEffect(function () {
      function handler(event) {
        var _buttonRef$current, _optionsRef$current;

        var target = event.target;
        if (listboxState !== ListboxStates.Open) return;
        if ((_buttonRef$current = buttonRef.current) == null ? void 0 : _buttonRef$current.contains(target)) return;
        if ((_optionsRef$current = optionsRef.current) == null ? void 0 : _optionsRef$current.contains(target)) return;
        dispatch({
          type: ActionTypes$2.CloseListbox
        });

        if (!isFocusableElement(target, FocusableMode.Loose)) {
          var _buttonRef$current2;

          event.preventDefault();
          (_buttonRef$current2 = buttonRef.current) == null ? void 0 : _buttonRef$current2.focus();
        }
      }

      window.addEventListener('mousedown', handler);
      return function () {
        return window.removeEventListener('mousedown', handler);
      };
    }, [listboxState, buttonRef, optionsRef, dispatch]);
    var propsBag = React.useMemo(function () {
      return {
        open: listboxState === ListboxStates.Open,
        disabled: disabled
      };
    }, [listboxState, disabled]);
    return React__default.createElement(ListboxContext.Provider, {
      value: reducerBag
    }, render(passThroughProps, propsBag, DEFAULT_LISTBOX_TAG));
  } // ---

  var DEFAULT_BUTTON_TAG$1 = 'button';
  var Button$1 = /*#__PURE__*/forwardRefWithAs(function Button(props, ref) {
    var _state$optionsRef$cur;

    var _useListboxContext = useListboxContext([Listbox.name, Button.name].join('.')),
        state = _useListboxContext[0],
        dispatch = _useListboxContext[1];

    var buttonRef = useSyncRefs(state.buttonRef, ref);
    var id = "headlessui-listbox-button-" + useId();
    var d = useDisposables();
    var handleKeyDown = React.useCallback(function (event) {
      switch (event.key) {
        // Ref: https://www.w3.org/TR/wai-aria-practices-1.2/#keyboard-interaction-13
        case Keys.Space:
        case Keys.Enter:
        case Keys.ArrowDown:
          event.preventDefault();
          dispatch({
            type: ActionTypes$2.OpenListbox
          });
          d.nextFrame(function () {
            if (!state.propsRef.current.value) dispatch({
              type: ActionTypes$2.GoToOption,
              focus: Focus$1.First
            });
          });
          break;

        case Keys.ArrowUp:
          event.preventDefault();
          dispatch({
            type: ActionTypes$2.OpenListbox
          });
          d.nextFrame(function () {
            if (!state.propsRef.current.value) dispatch({
              type: ActionTypes$2.GoToOption,
              focus: Focus$1.Last
            });
          });
          break;
      }
    }, [dispatch, state, d]);
    var handleClick = React.useCallback(function (event) {
      if (isDisabledReactIssue7711(event.currentTarget)) return event.preventDefault();

      if (state.listboxState === ListboxStates.Open) {
        dispatch({
          type: ActionTypes$2.CloseListbox
        });
        d.nextFrame(function () {
          var _state$buttonRef$curr;

          return (_state$buttonRef$curr = state.buttonRef.current) == null ? void 0 : _state$buttonRef$curr.focus({
            preventScroll: true
          });
        });
      } else {
        event.preventDefault();
        dispatch({
          type: ActionTypes$2.OpenListbox
        });
      }
    }, [dispatch, d, state]);
    var labelledby = useComputed(function () {
      if (!state.labelRef.current) return undefined;
      return [state.labelRef.current.id, id].join(' ');
    }, [state.labelRef.current, id]);
    var propsBag = React.useMemo(function () {
      return {
        open: state.listboxState === ListboxStates.Open,
        disabled: state.disabled
      };
    }, [state]);
    var passthroughProps = props;
    var propsWeControl = {
      ref: buttonRef,
      id: id,
      type: 'button',
      'aria-haspopup': true,
      'aria-controls': (_state$optionsRef$cur = state.optionsRef.current) == null ? void 0 : _state$optionsRef$cur.id,
      'aria-expanded': state.listboxState === ListboxStates.Open ? true : undefined,
      'aria-labelledby': labelledby,
      disabled: state.disabled,
      onKeyDown: handleKeyDown,
      onClick: handleClick
    };
    return render(_extends({}, passthroughProps, propsWeControl), propsBag, DEFAULT_BUTTON_TAG$1);
  }); // ---

  var DEFAULT_LABEL_TAG = 'label';

  function Label(props) {
    var _useListboxContext2 = useListboxContext([Listbox.name, Label.name].join('.')),
        state = _useListboxContext2[0];

    var id = "headlessui-listbox-label-" + useId();
    var handleClick = React.useCallback(function () {
      var _state$buttonRef$curr2;

      return (_state$buttonRef$curr2 = state.buttonRef.current) == null ? void 0 : _state$buttonRef$curr2.focus({
        preventScroll: true
      });
    }, [state.buttonRef]);
    var propsBag = React.useMemo(function () {
      return {
        open: state.listboxState === ListboxStates.Open,
        disabled: state.disabled
      };
    }, [state]);
    var propsWeControl = {
      ref: state.labelRef,
      id: id,
      onClick: handleClick
    };
    return render(_extends({}, props, propsWeControl), propsBag, DEFAULT_LABEL_TAG);
  } // ---


  var DEFAULT_OPTIONS_TAG = 'ul';
  var OptionsRenderFeatures = Features.RenderStrategy | Features.Static;
  var Options = /*#__PURE__*/forwardRefWithAs(function Options(props, ref) {
    var _state$options$state$;

    var _useListboxContext3 = useListboxContext([Listbox.name, Options.name].join('.')),
        state = _useListboxContext3[0],
        dispatch = _useListboxContext3[1];

    var optionsRef = useSyncRefs(state.optionsRef, ref);
    var id = "headlessui-listbox-options-" + useId();
    var d = useDisposables();
    var searchDisposables = useDisposables();
    useIsoMorphicEffect(function () {
      var container = state.optionsRef.current;
      if (!container) return;
      if (state.listboxState !== ListboxStates.Open) return;
      if (container === document.activeElement) return;
      container.focus({
        preventScroll: true
      });
    }, [state.listboxState, state.optionsRef]);
    var handleKeyDown = React.useCallback(function (event) {
      searchDisposables.dispose();

      switch (event.key) {
        // Ref: https://www.w3.org/TR/wai-aria-practices-1.2/#keyboard-interaction-12
        // @ts-expect-error Fallthrough is expected here
        case Keys.Space:
          if (state.searchQuery !== '') {
            event.preventDefault();
            event.stopPropagation();
            return dispatch({
              type: ActionTypes$2.Search,
              value: event.key
            });
          }

        // When in type ahead mode, fallthrough

        case Keys.Enter:
          event.preventDefault();
          event.stopPropagation();
          dispatch({
            type: ActionTypes$2.CloseListbox
          });

          if (state.activeOptionIndex !== null) {
            var dataRef = state.options[state.activeOptionIndex].dataRef;
            state.propsRef.current.onChange(dataRef.current.value);
          }

          disposables().nextFrame(function () {
            var _state$buttonRef$curr3;

            return (_state$buttonRef$curr3 = state.buttonRef.current) == null ? void 0 : _state$buttonRef$curr3.focus({
              preventScroll: true
            });
          });
          break;

        case Keys.ArrowDown:
          event.preventDefault();
          event.stopPropagation();
          return dispatch({
            type: ActionTypes$2.GoToOption,
            focus: Focus$1.Next
          });

        case Keys.ArrowUp:
          event.preventDefault();
          event.stopPropagation();
          return dispatch({
            type: ActionTypes$2.GoToOption,
            focus: Focus$1.Previous
          });

        case Keys.Home:
        case Keys.PageUp:
          event.preventDefault();
          event.stopPropagation();
          return dispatch({
            type: ActionTypes$2.GoToOption,
            focus: Focus$1.First
          });

        case Keys.End:
        case Keys.PageDown:
          event.preventDefault();
          event.stopPropagation();
          return dispatch({
            type: ActionTypes$2.GoToOption,
            focus: Focus$1.Last
          });

        case Keys.Escape:
          event.preventDefault();
          event.stopPropagation();
          dispatch({
            type: ActionTypes$2.CloseListbox
          });
          return d.nextFrame(function () {
            var _state$buttonRef$curr4;

            return (_state$buttonRef$curr4 = state.buttonRef.current) == null ? void 0 : _state$buttonRef$curr4.focus({
              preventScroll: true
            });
          });

        case Keys.Tab:
          event.preventDefault();
          event.stopPropagation();
          break;

        default:
          if (event.key.length === 1) {
            dispatch({
              type: ActionTypes$2.Search,
              value: event.key
            });
            searchDisposables.setTimeout(function () {
              return dispatch({
                type: ActionTypes$2.ClearSearch
              });
            }, 350);
          }

          break;
      }
    }, [d, dispatch, searchDisposables, state]);
    var labelledby = useComputed(function () {
      var _state$labelRef$curre, _state$labelRef$curre2, _state$buttonRef$curr5;

      return (_state$labelRef$curre = (_state$labelRef$curre2 = state.labelRef.current) == null ? void 0 : _state$labelRef$curre2.id) != null ? _state$labelRef$curre : (_state$buttonRef$curr5 = state.buttonRef.current) == null ? void 0 : _state$buttonRef$curr5.id;
    }, [state.labelRef.current, state.buttonRef.current]);
    var propsBag = React.useMemo(function () {
      return {
        open: state.listboxState === ListboxStates.Open
      };
    }, [state]);
    var propsWeControl = {
      'aria-activedescendant': state.activeOptionIndex === null ? undefined : (_state$options$state$ = state.options[state.activeOptionIndex]) == null ? void 0 : _state$options$state$.id,
      'aria-labelledby': labelledby,
      id: id,
      onKeyDown: handleKeyDown,
      role: 'listbox',
      tabIndex: 0,
      ref: optionsRef
    };
    var passthroughProps = props;
    return render(_extends({}, passthroughProps, propsWeControl), propsBag, DEFAULT_OPTIONS_TAG, OptionsRenderFeatures, state.listboxState === ListboxStates.Open);
  }); // ---

  var DEFAULT_OPTION_TAG = 'li';

  function Option(props) {
    var _props$disabled2 = props.disabled,
        disabled = _props$disabled2 === void 0 ? false : _props$disabled2,
        value = props.value,
        passthroughProps = _objectWithoutPropertiesLoose(props, ["disabled", "value"]);

    var _useListboxContext4 = useListboxContext([Listbox.name, Option.name].join('.')),
        state = _useListboxContext4[0],
        dispatch = _useListboxContext4[1];

    var id = "headlessui-listbox-option-" + useId();
    var active = state.activeOptionIndex !== null ? state.options[state.activeOptionIndex].id === id : false;
    var selected = state.propsRef.current.value === value;
    var bag = React.useRef({
      disabled: disabled,
      value: value
    });
    useIsoMorphicEffect(function () {
      bag.current.disabled = disabled;
    }, [bag, disabled]);
    useIsoMorphicEffect(function () {
      bag.current.value = value;
    }, [bag, value]);
    useIsoMorphicEffect(function () {
      var _document$getElementB, _document$getElementB2;

      bag.current.textValue = (_document$getElementB = document.getElementById(id)) == null ? void 0 : (_document$getElementB2 = _document$getElementB.textContent) == null ? void 0 : _document$getElementB2.toLowerCase();
    }, [bag, id]);
    var select = React.useCallback(function () {
      return state.propsRef.current.onChange(value);
    }, [state.propsRef, value]);
    useIsoMorphicEffect(function () {
      dispatch({
        type: ActionTypes$2.RegisterOption,
        id: id,
        dataRef: bag
      });
      return function () {
        return dispatch({
          type: ActionTypes$2.UnregisterOption,
          id: id
        });
      };
    }, [bag, id]);
    useIsoMorphicEffect(function () {
      var _document$getElementB3;

      if (state.listboxState !== ListboxStates.Open) return;
      if (!selected) return;
      dispatch({
        type: ActionTypes$2.GoToOption,
        focus: Focus$1.Specific,
        id: id
      });
      (_document$getElementB3 = document.getElementById(id)) == null ? void 0 : _document$getElementB3.focus == null ? void 0 : _document$getElementB3.focus();
    }, [state.listboxState]);
    useIsoMorphicEffect(function () {
      if (state.listboxState !== ListboxStates.Open) return;
      if (!active) return;
      var d = disposables();
      d.nextFrame(function () {
        var _document$getElementB4;

        return (_document$getElementB4 = document.getElementById(id)) == null ? void 0 : _document$getElementB4.scrollIntoView == null ? void 0 : _document$getElementB4.scrollIntoView({
          block: 'nearest'
        });
      });
      return d.dispose;
    }, [id, active, state.listboxState]);
    var handleClick = React.useCallback(function (event) {
      if (disabled) return event.preventDefault();
      select();
      dispatch({
        type: ActionTypes$2.CloseListbox
      });
      disposables().nextFrame(function () {
        var _state$buttonRef$curr6;

        return (_state$buttonRef$curr6 = state.buttonRef.current) == null ? void 0 : _state$buttonRef$curr6.focus({
          preventScroll: true
        });
      });
    }, [dispatch, state.buttonRef, disabled, select]);
    var handleFocus = React.useCallback(function () {
      if (disabled) return dispatch({
        type: ActionTypes$2.GoToOption,
        focus: Focus$1.Nothing
      });
      dispatch({
        type: ActionTypes$2.GoToOption,
        focus: Focus$1.Specific,
        id: id
      });
    }, [disabled, id, dispatch]);
    var handleMove = React.useCallback(function () {
      if (disabled) return;
      if (active) return;
      dispatch({
        type: ActionTypes$2.GoToOption,
        focus: Focus$1.Specific,
        id: id
      });
    }, [disabled, active, id, dispatch]);
    var handleLeave = React.useCallback(function () {
      if (disabled) return;
      if (!active) return;
      dispatch({
        type: ActionTypes$2.GoToOption,
        focus: Focus$1.Nothing
      });
    }, [disabled, active, dispatch]);
    var propsBag = React.useMemo(function () {
      return {
        active: active,
        selected: selected,
        disabled: disabled
      };
    }, [active, selected, disabled]);
    var propsWeControl = {
      id: id,
      role: 'option',
      tabIndex: -1,
      'aria-disabled': disabled === true ? true : undefined,
      'aria-selected': selected === true ? true : undefined,
      onClick: handleClick,
      onFocus: handleFocus,
      onPointerMove: handleMove,
      onMouseMove: handleMove,
      onPointerLeave: handleLeave,
      onMouseLeave: handleLeave
    };
    return render(_extends({}, passthroughProps, propsWeControl), propsBag, DEFAULT_OPTION_TAG);
  } // ---


  Listbox.Button = Button$1;
  Listbox.Label = Label;
  Listbox.Options = Options;
  Listbox.Option = Option;

  var _reducers$3;
  var MenuStates;

  (function (MenuStates) {
    MenuStates[MenuStates["Open"] = 0] = "Open";
    MenuStates[MenuStates["Closed"] = 1] = "Closed";
  })(MenuStates || (MenuStates = {}));

  var ActionTypes$3;

  (function (ActionTypes) {
    ActionTypes[ActionTypes["OpenMenu"] = 0] = "OpenMenu";
    ActionTypes[ActionTypes["CloseMenu"] = 1] = "CloseMenu";
    ActionTypes[ActionTypes["GoToItem"] = 2] = "GoToItem";
    ActionTypes[ActionTypes["Search"] = 3] = "Search";
    ActionTypes[ActionTypes["ClearSearch"] = 4] = "ClearSearch";
    ActionTypes[ActionTypes["RegisterItem"] = 5] = "RegisterItem";
    ActionTypes[ActionTypes["UnregisterItem"] = 6] = "UnregisterItem";
  })(ActionTypes$3 || (ActionTypes$3 = {}));

  var reducers$3 = (_reducers$3 = {}, _reducers$3[ActionTypes$3.CloseMenu] = function (state) {
    if (state.menuState === MenuStates.Closed) return state;
    return _extends({}, state, {
      activeItemIndex: null,
      menuState: MenuStates.Closed
    });
  }, _reducers$3[ActionTypes$3.OpenMenu] = function (state) {
    if (state.menuState === MenuStates.Open) return state;
    return _extends({}, state, {
      menuState: MenuStates.Open
    });
  }, _reducers$3[ActionTypes$3.GoToItem] = function (state, action) {
    var activeItemIndex = calculateActiveIndex(action, {
      resolveItems: function resolveItems() {
        return state.items;
      },
      resolveActiveIndex: function resolveActiveIndex() {
        return state.activeItemIndex;
      },
      resolveId: function resolveId(item) {
        return item.id;
      },
      resolveDisabled: function resolveDisabled(item) {
        return item.dataRef.current.disabled;
      }
    });
    if (state.searchQuery === '' && state.activeItemIndex === activeItemIndex) return state;
    return _extends({}, state, {
      searchQuery: '',
      activeItemIndex: activeItemIndex
    });
  }, _reducers$3[ActionTypes$3.Search] = function (state, action) {
    var searchQuery = state.searchQuery + action.value;
    var match = state.items.findIndex(function (item) {
      var _item$dataRef$current;

      return ((_item$dataRef$current = item.dataRef.current.textValue) == null ? void 0 : _item$dataRef$current.startsWith(searchQuery)) && !item.dataRef.current.disabled;
    });
    if (match === -1 || match === state.activeItemIndex) return _extends({}, state, {
      searchQuery: searchQuery
    });
    return _extends({}, state, {
      searchQuery: searchQuery,
      activeItemIndex: match
    });
  }, _reducers$3[ActionTypes$3.ClearSearch] = function (state) {
    if (state.searchQuery === '') return state;
    return _extends({}, state, {
      searchQuery: ''
    });
  }, _reducers$3[ActionTypes$3.RegisterItem] = function (state, action) {
    return _extends({}, state, {
      items: [].concat(state.items, [{
        id: action.id,
        dataRef: action.dataRef
      }])
    });
  }, _reducers$3[ActionTypes$3.UnregisterItem] = function (state, action) {
    var nextItems = state.items.slice();
    var currentActiveItem = state.activeItemIndex !== null ? nextItems[state.activeItemIndex] : null;
    var idx = nextItems.findIndex(function (a) {
      return a.id === action.id;
    });
    if (idx !== -1) nextItems.splice(idx, 1);
    return _extends({}, state, {
      items: nextItems,
      activeItemIndex: function () {
        if (idx === state.activeItemIndex) return null;
        if (currentActiveItem === null) return null; // If we removed the item before the actual active index, then it would be out of sync. To
        // fix this, we will find the correct (new) index position.

        return nextItems.indexOf(currentActiveItem);
      }()
    });
  }, _reducers$3);
  var MenuContext = /*#__PURE__*/React.createContext(null);
  MenuContext.displayName = 'MenuContext';

  function useMenuContext(component) {
    var context = React.useContext(MenuContext);

    if (context === null) {
      var err = new Error("<" + component + " /> is missing a parent <" + Menu.name + " /> component.");
      if (Error.captureStackTrace) Error.captureStackTrace(err, useMenuContext);
      throw err;
    }

    return context;
  }

  function stateReducer$3(state, action) {
    return match(action.type, reducers$3, state, action);
  } // ---


  var DEFAULT_MENU_TAG = React.Fragment;
  function Menu(props) {
    var reducerBag = React.useReducer(stateReducer$3, {
      menuState: MenuStates.Closed,
      buttonRef: React.createRef(),
      itemsRef: React.createRef(),
      items: [],
      searchQuery: '',
      activeItemIndex: null
    });
    var _reducerBag$ = reducerBag[0],
        menuState = _reducerBag$.menuState,
        itemsRef = _reducerBag$.itemsRef,
        buttonRef = _reducerBag$.buttonRef,
        dispatch = reducerBag[1]; // Handle outside click

    React.useEffect(function () {
      function handler(event) {
        var _buttonRef$current, _itemsRef$current;

        var target = event.target;
        if (menuState !== MenuStates.Open) return;
        if ((_buttonRef$current = buttonRef.current) == null ? void 0 : _buttonRef$current.contains(target)) return;
        if ((_itemsRef$current = itemsRef.current) == null ? void 0 : _itemsRef$current.contains(target)) return;
        dispatch({
          type: ActionTypes$3.CloseMenu
        });

        if (!isFocusableElement(target, FocusableMode.Loose)) {
          var _buttonRef$current2;

          event.preventDefault();
          (_buttonRef$current2 = buttonRef.current) == null ? void 0 : _buttonRef$current2.focus();
        }
      }

      window.addEventListener('mousedown', handler);
      return function () {
        return window.removeEventListener('mousedown', handler);
      };
    }, [menuState, buttonRef, itemsRef, dispatch]);
    var propsBag = React.useMemo(function () {
      return {
        open: menuState === MenuStates.Open
      };
    }, [menuState]);
    return React__default.createElement(MenuContext.Provider, {
      value: reducerBag
    }, render(props, propsBag, DEFAULT_MENU_TAG));
  } // ---

  var DEFAULT_BUTTON_TAG$2 = 'button';
  var Button$2 = /*#__PURE__*/forwardRefWithAs(function Button(props, ref) {
    var _state$itemsRef$curre;

    var _useMenuContext = useMenuContext([Menu.name, Button.name].join('.')),
        state = _useMenuContext[0],
        dispatch = _useMenuContext[1];

    var buttonRef = useSyncRefs(state.buttonRef, ref);
    var id = "headlessui-menu-button-" + useId();
    var d = useDisposables();
    var handleKeyDown = React.useCallback(function (event) {
      switch (event.key) {
        // Ref: https://www.w3.org/TR/wai-aria-practices-1.2/#keyboard-interaction-13
        case Keys.Space:
        case Keys.Enter:
        case Keys.ArrowDown:
          event.preventDefault();
          event.stopPropagation();
          dispatch({
            type: ActionTypes$3.OpenMenu
          });
          d.nextFrame(function () {
            return dispatch({
              type: ActionTypes$3.GoToItem,
              focus: Focus$1.First
            });
          });
          break;

        case Keys.ArrowUp:
          event.preventDefault();
          event.stopPropagation();
          dispatch({
            type: ActionTypes$3.OpenMenu
          });
          d.nextFrame(function () {
            return dispatch({
              type: ActionTypes$3.GoToItem,
              focus: Focus$1.Last
            });
          });
          break;
      }
    }, [dispatch, d]);
    var handleClick = React.useCallback(function (event) {
      if (isDisabledReactIssue7711(event.currentTarget)) return event.preventDefault();
      if (props.disabled) return;

      if (state.menuState === MenuStates.Open) {
        dispatch({
          type: ActionTypes$3.CloseMenu
        });
        d.nextFrame(function () {
          var _state$buttonRef$curr;

          return (_state$buttonRef$curr = state.buttonRef.current) == null ? void 0 : _state$buttonRef$curr.focus({
            preventScroll: true
          });
        });
      } else {
        event.preventDefault();
        event.stopPropagation();
        dispatch({
          type: ActionTypes$3.OpenMenu
        });
      }
    }, [dispatch, d, state, props.disabled]);
    var propsBag = React.useMemo(function () {
      return {
        open: state.menuState === MenuStates.Open
      };
    }, [state]);
    var passthroughProps = props;
    var propsWeControl = {
      ref: buttonRef,
      id: id,
      type: 'button',
      'aria-haspopup': true,
      'aria-controls': (_state$itemsRef$curre = state.itemsRef.current) == null ? void 0 : _state$itemsRef$curre.id,
      'aria-expanded': state.menuState === MenuStates.Open ? true : undefined,
      onKeyDown: handleKeyDown,
      onClick: handleClick
    };
    return render(_extends({}, passthroughProps, propsWeControl), propsBag, DEFAULT_BUTTON_TAG$2);
  }); // ---

  var DEFAULT_ITEMS_TAG = 'div';
  var ItemsRenderFeatures = Features.RenderStrategy | Features.Static;
  var Items = /*#__PURE__*/forwardRefWithAs(function Items(props, ref) {
    var _state$items$state$ac, _state$buttonRef$curr4;

    var _useMenuContext2 = useMenuContext([Menu.name, Items.name].join('.')),
        state = _useMenuContext2[0],
        dispatch = _useMenuContext2[1];

    var itemsRef = useSyncRefs(state.itemsRef, ref);
    var id = "headlessui-menu-items-" + useId();
    var searchDisposables = useDisposables();
    React.useEffect(function () {
      var container = state.itemsRef.current;
      if (!container) return;
      if (state.menuState !== MenuStates.Open) return;
      if (container === document.activeElement) return;
      container.focus({
        preventScroll: true
      });
    }, [state.menuState, state.itemsRef]);
    useIsoMorphicEffect(function () {
      var container = state.itemsRef.current;
      if (!container) return;
      if (state.menuState !== MenuStates.Open) return;
      var walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
        acceptNode: function acceptNode(node) {
          if (node.getAttribute('role') === 'menuitem') return NodeFilter.FILTER_REJECT;
          if (node.hasAttribute('role')) return NodeFilter.FILTER_SKIP;
          return NodeFilter.FILTER_ACCEPT;
        }
      });

      while (walker.nextNode()) {
        walker.currentNode.setAttribute('role', 'none');
      }
    }, [state.menuState, state.itemsRef]);
    var handleKeyDown = React.useCallback(function (event) {
      searchDisposables.dispose();

      switch (event.key) {
        // Ref: https://www.w3.org/TR/wai-aria-practices-1.2/#keyboard-interaction-12
        // @ts-expect-error Fallthrough is expected here
        case Keys.Space:
          if (state.searchQuery !== '') {
            event.preventDefault();
            event.stopPropagation();
            return dispatch({
              type: ActionTypes$3.Search,
              value: event.key
            });
          }

        // When in type ahead mode, fallthrough

        case Keys.Enter:
          event.preventDefault();
          event.stopPropagation();
          dispatch({
            type: ActionTypes$3.CloseMenu
          });

          if (state.activeItemIndex !== null) {
            var _document$getElementB;

            var _id = state.items[state.activeItemIndex].id;
            (_document$getElementB = document.getElementById(_id)) == null ? void 0 : _document$getElementB.click();
          }

          disposables().nextFrame(function () {
            var _state$buttonRef$curr2;

            return (_state$buttonRef$curr2 = state.buttonRef.current) == null ? void 0 : _state$buttonRef$curr2.focus({
              preventScroll: true
            });
          });
          break;

        case Keys.ArrowDown:
          event.preventDefault();
          event.stopPropagation();
          return dispatch({
            type: ActionTypes$3.GoToItem,
            focus: Focus$1.Next
          });

        case Keys.ArrowUp:
          event.preventDefault();
          event.stopPropagation();
          return dispatch({
            type: ActionTypes$3.GoToItem,
            focus: Focus$1.Previous
          });

        case Keys.Home:
        case Keys.PageUp:
          event.preventDefault();
          event.stopPropagation();
          return dispatch({
            type: ActionTypes$3.GoToItem,
            focus: Focus$1.First
          });

        case Keys.End:
        case Keys.PageDown:
          event.preventDefault();
          event.stopPropagation();
          return dispatch({
            type: ActionTypes$3.GoToItem,
            focus: Focus$1.Last
          });

        case Keys.Escape:
          event.preventDefault();
          event.stopPropagation();
          dispatch({
            type: ActionTypes$3.CloseMenu
          });
          disposables().nextFrame(function () {
            var _state$buttonRef$curr3;

            return (_state$buttonRef$curr3 = state.buttonRef.current) == null ? void 0 : _state$buttonRef$curr3.focus({
              preventScroll: true
            });
          });
          break;

        case Keys.Tab:
          event.preventDefault();
          event.stopPropagation();
          break;

        default:
          if (event.key.length === 1) {
            dispatch({
              type: ActionTypes$3.Search,
              value: event.key
            });
            searchDisposables.setTimeout(function () {
              return dispatch({
                type: ActionTypes$3.ClearSearch
              });
            }, 350);
          }

          break;
      }
    }, [dispatch, searchDisposables, state]);
    var propsBag = React.useMemo(function () {
      return {
        open: state.menuState === MenuStates.Open
      };
    }, [state]);
    var propsWeControl = {
      'aria-activedescendant': state.activeItemIndex === null ? undefined : (_state$items$state$ac = state.items[state.activeItemIndex]) == null ? void 0 : _state$items$state$ac.id,
      'aria-labelledby': (_state$buttonRef$curr4 = state.buttonRef.current) == null ? void 0 : _state$buttonRef$curr4.id,
      id: id,
      onKeyDown: handleKeyDown,
      role: 'menu',
      tabIndex: 0,
      ref: itemsRef
    };
    var passthroughProps = props;
    return render(_extends({}, passthroughProps, propsWeControl), propsBag, DEFAULT_ITEMS_TAG, ItemsRenderFeatures, state.menuState === MenuStates.Open);
  }); // ---

  var DEFAULT_ITEM_TAG = React.Fragment;

  function Item(props) {
    var _props$disabled = props.disabled,
        disabled = _props$disabled === void 0 ? false : _props$disabled,
        onClick = props.onClick,
        passthroughProps = _objectWithoutPropertiesLoose(props, ["disabled", "onClick"]);

    var _useMenuContext3 = useMenuContext([Menu.name, Item.name].join('.')),
        state = _useMenuContext3[0],
        dispatch = _useMenuContext3[1];

    var id = "headlessui-menu-item-" + useId();
    var active = state.activeItemIndex !== null ? state.items[state.activeItemIndex].id === id : false;
    useIsoMorphicEffect(function () {
      if (state.menuState !== MenuStates.Open) return;
      if (!active) return;
      var d = disposables();
      d.nextFrame(function () {
        var _document$getElementB2;

        return (_document$getElementB2 = document.getElementById(id)) == null ? void 0 : _document$getElementB2.scrollIntoView == null ? void 0 : _document$getElementB2.scrollIntoView({
          block: 'nearest'
        });
      });
      return d.dispose;
    }, [id, active, state.menuState]);
    var bag = React.useRef({
      disabled: disabled
    });
    useIsoMorphicEffect(function () {
      bag.current.disabled = disabled;
    }, [bag, disabled]);
    useIsoMorphicEffect(function () {
      var _document$getElementB3, _document$getElementB4;

      bag.current.textValue = (_document$getElementB3 = document.getElementById(id)) == null ? void 0 : (_document$getElementB4 = _document$getElementB3.textContent) == null ? void 0 : _document$getElementB4.toLowerCase();
    }, [bag, id]);
    useIsoMorphicEffect(function () {
      dispatch({
        type: ActionTypes$3.RegisterItem,
        id: id,
        dataRef: bag
      });
      return function () {
        return dispatch({
          type: ActionTypes$3.UnregisterItem,
          id: id
        });
      };
    }, [bag, id]);
    var handleClick = React.useCallback(function (event) {
      if (disabled) return event.preventDefault();
      dispatch({
        type: ActionTypes$3.CloseMenu
      });
      disposables().nextFrame(function () {
        var _state$buttonRef$curr5;

        return (_state$buttonRef$curr5 = state.buttonRef.current) == null ? void 0 : _state$buttonRef$curr5.focus({
          preventScroll: true
        });
      });
      if (onClick) return onClick(event);
    }, [dispatch, state.buttonRef, disabled, onClick]);
    var handleFocus = React.useCallback(function () {
      if (disabled) return dispatch({
        type: ActionTypes$3.GoToItem,
        focus: Focus$1.Nothing
      });
      dispatch({
        type: ActionTypes$3.GoToItem,
        focus: Focus$1.Specific,
        id: id
      });
    }, [disabled, id, dispatch]);
    var handleMove = React.useCallback(function () {
      if (disabled) return;
      if (active) return;
      dispatch({
        type: ActionTypes$3.GoToItem,
        focus: Focus$1.Specific,
        id: id
      });
    }, [disabled, active, id, dispatch]);
    var handleLeave = React.useCallback(function () {
      if (disabled) return;
      if (!active) return;
      dispatch({
        type: ActionTypes$3.GoToItem,
        focus: Focus$1.Nothing
      });
    }, [disabled, active, dispatch]);
    var propsBag = React.useMemo(function () {
      return {
        active: active,
        disabled: disabled
      };
    }, [active, disabled]);
    var propsWeControl = {
      id: id,
      role: 'menuitem',
      tabIndex: -1,
      'aria-disabled': disabled === true ? true : undefined,
      onClick: handleClick,
      onFocus: handleFocus,
      onPointerMove: handleMove,
      onMouseMove: handleMove,
      onPointerLeave: handleLeave,
      onMouseLeave: handleLeave
    };
    return render(_extends({}, passthroughProps, propsWeControl), propsBag, DEFAULT_ITEM_TAG);
  } // ---


  Menu.Button = Button$2;
  Menu.Items = Items;
  Menu.Item = Item;

  var _reducers$4;
  var PopoverStates;

  (function (PopoverStates) {
    PopoverStates[PopoverStates["Open"] = 0] = "Open";
    PopoverStates[PopoverStates["Closed"] = 1] = "Closed";
  })(PopoverStates || (PopoverStates = {}));

  var ActionTypes$4;

  (function (ActionTypes) {
    ActionTypes[ActionTypes["TogglePopover"] = 0] = "TogglePopover";
    ActionTypes[ActionTypes["ClosePopover"] = 1] = "ClosePopover";
    ActionTypes[ActionTypes["SetButton"] = 2] = "SetButton";
    ActionTypes[ActionTypes["SetButtonId"] = 3] = "SetButtonId";
    ActionTypes[ActionTypes["SetPanel"] = 4] = "SetPanel";
    ActionTypes[ActionTypes["SetPanelId"] = 5] = "SetPanelId";
  })(ActionTypes$4 || (ActionTypes$4 = {}));

  var reducers$4 = (_reducers$4 = {}, _reducers$4[ActionTypes$4.TogglePopover] = function (state) {
    var _match;

    return _extends({}, state, {
      popoverState: match(state.popoverState, (_match = {}, _match[PopoverStates.Open] = PopoverStates.Closed, _match[PopoverStates.Closed] = PopoverStates.Open, _match))
    });
  }, _reducers$4[ActionTypes$4.ClosePopover] = function (state) {
    if (state.popoverState === PopoverStates.Closed) return state;
    return _extends({}, state, {
      popoverState: PopoverStates.Closed
    });
  }, _reducers$4[ActionTypes$4.SetButton] = function (state, action) {
    if (state.button === action.button) return state;
    return _extends({}, state, {
      button: action.button
    });
  }, _reducers$4[ActionTypes$4.SetButtonId] = function (state, action) {
    if (state.buttonId === action.buttonId) return state;
    return _extends({}, state, {
      buttonId: action.buttonId
    });
  }, _reducers$4[ActionTypes$4.SetPanel] = function (state, action) {
    if (state.panel === action.panel) return state;
    return _extends({}, state, {
      panel: action.panel
    });
  }, _reducers$4[ActionTypes$4.SetPanelId] = function (state, action) {
    if (state.panelId === action.panelId) return state;
    return _extends({}, state, {
      panelId: action.panelId
    });
  }, _reducers$4);
  var PopoverContext = /*#__PURE__*/React.createContext(null);
  PopoverContext.displayName = 'PopoverContext';

  function usePopoverContext(component) {
    var context = React.useContext(PopoverContext);

    if (context === null) {
      var err = new Error("<" + component + " /> is missing a parent <" + Popover.name + " /> component.");
      if (Error.captureStackTrace) Error.captureStackTrace(err, usePopoverContext);
      throw err;
    }

    return context;
  }

  var PopoverGroupContext = /*#__PURE__*/React.createContext(null);
  PopoverGroupContext.displayName = 'PopoverGroupContext';

  function usePopoverGroupContext() {
    return React.useContext(PopoverGroupContext);
  }

  var PopoverPanelContext = /*#__PURE__*/React.createContext(null);
  PopoverPanelContext.displayName = 'PopoverPanelContext';

  function usePopoverPanelContext() {
    return React.useContext(PopoverPanelContext);
  }

  function stateReducer$4(state, action) {
    return match(action.type, reducers$4, state, action);
  } // ---


  var DEFAULT_POPOVER_TAG = 'div';
  function Popover(props) {
    var buttonId = "headlessui-popover-button-" + useId();
    var panelId = "headlessui-popover-panel-" + useId();
    var reducerBag = React.useReducer(stateReducer$4, {
      popoverState: PopoverStates.Closed,
      linkedPanel: false,
      button: null,
      buttonId: buttonId,
      panel: null,
      panelId: panelId
    });
    var _reducerBag$ = reducerBag[0],
        popoverState = _reducerBag$.popoverState,
        button = _reducerBag$.button,
        panel = _reducerBag$.panel,
        dispatch = reducerBag[1];
    React.useEffect(function () {
      return dispatch({
        type: ActionTypes$4.SetButtonId,
        buttonId: buttonId
      });
    }, [buttonId, dispatch]);
    React.useEffect(function () {
      return dispatch({
        type: ActionTypes$4.SetPanelId,
        panelId: panelId
      });
    }, [panelId, dispatch]);
    var registerBag = React.useMemo(function () {
      return {
        buttonId: buttonId,
        panelId: panelId,
        close: function close() {
          return dispatch({
            type: ActionTypes$4.ClosePopover
          });
        }
      };
    }, [buttonId, panelId, dispatch]);
    var groupContext = usePopoverGroupContext();
    var registerPopover = groupContext == null ? void 0 : groupContext.registerPopover;
    var isFocusWithinPopoverGroup = React.useCallback(function () {
      var _groupContext$isFocus;

      return (_groupContext$isFocus = groupContext == null ? void 0 : groupContext.isFocusWithinPopoverGroup()) != null ? _groupContext$isFocus : (button == null ? void 0 : button.contains(document.activeElement)) || (panel == null ? void 0 : panel.contains(document.activeElement));
    }, [groupContext, button, panel]);
    React.useEffect(function () {
      return registerPopover == null ? void 0 : registerPopover(registerBag);
    }, [registerPopover, registerBag]); // Handle focus out

    React.useEffect(function () {
      if (popoverState !== PopoverStates.Open) return;

      function handler() {
        if (isFocusWithinPopoverGroup()) return;
        if (!button) return;
        if (!panel) return;
        dispatch({
          type: ActionTypes$4.ClosePopover
        });
      }

      window.addEventListener('focus', handler, true);
      return function () {
        return window.removeEventListener('focus', handler, true);
      };
    }, [popoverState, isFocusWithinPopoverGroup, groupContext, button, panel, dispatch]); // Handle outside click

    React.useEffect(function () {
      function handler(event) {
        var target = event.target;
        if (popoverState !== PopoverStates.Open) return;
        if (button == null ? void 0 : button.contains(target)) return;
        if (panel == null ? void 0 : panel.contains(target)) return;
        dispatch({
          type: ActionTypes$4.ClosePopover
        });

        if (!isFocusableElement(target, FocusableMode.Loose)) {
          event.preventDefault();
          button == null ? void 0 : button.focus();
        }
      }

      window.addEventListener('mousedown', handler);
      return function () {
        return window.removeEventListener('mousedown', handler);
      };
    }, [popoverState, button, panel, dispatch]);
    var propsBag = React.useMemo(function () {
      return {
        open: popoverState === PopoverStates.Open
      };
    }, [popoverState]);
    return React__default.createElement(PopoverContext.Provider, {
      value: reducerBag
    }, render(props, propsBag, DEFAULT_POPOVER_TAG));
  } // ---

  var DEFAULT_BUTTON_TAG$3 = 'button';
  var Button$3 = /*#__PURE__*/forwardRefWithAs(function Button(props, ref) {
    var _usePopoverContext = usePopoverContext([Popover.name, Button.name].join('.')),
        state = _usePopoverContext[0],
        dispatch = _usePopoverContext[1];

    var internalButtonRef = React.useRef(null);
    var groupContext = usePopoverGroupContext();
    var closeOthers = groupContext == null ? void 0 : groupContext.closeOthers;
    var panelContext = usePopoverPanelContext();
    var isWithinPanel = panelContext === null ? false : panelContext === state.panelId;
    var buttonRef = useSyncRefs(internalButtonRef, ref, isWithinPanel ? null : function (button) {
      return dispatch({
        type: ActionTypes$4.SetButton,
        button: button
      });
    }); // TODO: Revisit when handling Tab/Shift+Tab when using Portal's

    var activeElementRef = React.useRef(null);
    var previousActiveElementRef = React.useRef(typeof window === 'undefined' ? null : document.activeElement);
    React.useEffect(function () {
      function handler() {
        previousActiveElementRef.current = activeElementRef.current;
        activeElementRef.current = document.activeElement;
      }

      window.addEventListener('focus', handler, true);
      return function () {
        return window.removeEventListener('focus', handler, true);
      };
    }, [previousActiveElementRef, activeElementRef]);
    var handleKeyDown = React.useCallback(function (event) {
      var _state$button;

      if (isWithinPanel) {
        if (state.popoverState === PopoverStates.Closed) return;

        switch (event.key) {
          case Keys.Space:
          case Keys.Enter:
            event.preventDefault(); // Prevent triggering a *click* event

            event.stopPropagation();
            dispatch({
              type: ActionTypes$4.ClosePopover
            });
            (_state$button = state.button) == null ? void 0 : _state$button.focus(); // Re-focus the original opening Button

            break;
        }
      } else {
        switch (event.key) {
          case Keys.Space:
          case Keys.Enter:
            event.preventDefault(); // Prevent triggering a *click* event

            event.stopPropagation();
            if (state.popoverState === PopoverStates.Closed) closeOthers == null ? void 0 : closeOthers(state.buttonId);
            dispatch({
              type: ActionTypes$4.TogglePopover
            });
            break;

          case Keys.Escape:
            if (state.popoverState !== PopoverStates.Open) return closeOthers == null ? void 0 : closeOthers(state.buttonId);
            if (!internalButtonRef.current) return;
            if (!internalButtonRef.current.contains(document.activeElement)) return;
            dispatch({
              type: ActionTypes$4.ClosePopover
            });
            break;

          case Keys.Tab:
            if (state.popoverState !== PopoverStates.Open) return;
            if (!state.panel) return;
            if (!state.button) return; // TODO: Revisit when handling Tab/Shift+Tab when using Portal's

            if (event.shiftKey) {
              var _state$button2;

              // Check if the last focused element exists, and check that it is not inside button or panel itself
              if (!previousActiveElementRef.current) return;
              if ((_state$button2 = state.button) == null ? void 0 : _state$button2.contains(previousActiveElementRef.current)) return;
              if (state.panel.contains(previousActiveElementRef.current)) return; // Check if the last focused element is *after* the button in the DOM

              var focusableElements = getFocusableElements();
              var previousIdx = focusableElements.indexOf(previousActiveElementRef.current);
              var buttonIdx = focusableElements.indexOf(state.button);
              if (buttonIdx > previousIdx) return;
              event.preventDefault();
              event.stopPropagation();
              focusIn(state.panel, Focus.Last);
            } else {
              event.preventDefault();
              event.stopPropagation();
              focusIn(state.panel, Focus.First);
            }

            break;
        }
      }
    }, [dispatch, state.popoverState, state.buttonId, state.button, state.panel, internalButtonRef, closeOthers, isWithinPanel]);
    var handleKeyUp = React.useCallback(function (event) {
      var _state$button3;

      if (isWithinPanel) return;
      if (state.popoverState !== PopoverStates.Open) return;
      if (!state.panel) return;
      if (!state.button) return; // TODO: Revisit when handling Tab/Shift+Tab when using Portal's

      switch (event.key) {
        case Keys.Tab:
          // Check if the last focused element exists, and check that it is not inside button or panel itself
          if (!previousActiveElementRef.current) return;
          if ((_state$button3 = state.button) == null ? void 0 : _state$button3.contains(previousActiveElementRef.current)) return;
          if (state.panel.contains(previousActiveElementRef.current)) return; // Check if the last focused element is *after* the button in the DOM

          var focusableElements = getFocusableElements();
          var previousIdx = focusableElements.indexOf(previousActiveElementRef.current);
          var buttonIdx = focusableElements.indexOf(state.button);
          if (buttonIdx > previousIdx) return;
          event.preventDefault();
          event.stopPropagation();
          focusIn(state.panel, Focus.Last);
          break;
      }
    }, [state.popoverState, state.panel, state.button, isWithinPanel]);
    var handleClick = React.useCallback(function (event) {
      if (isDisabledReactIssue7711(event.currentTarget)) return;
      if (props.disabled) return;

      if (isWithinPanel) {
        var _state$button4;

        dispatch({
          type: ActionTypes$4.ClosePopover
        });
        (_state$button4 = state.button) == null ? void 0 : _state$button4.focus(); // Re-focus the original opening Button
      } else {
        if (state.popoverState === PopoverStates.Closed) closeOthers == null ? void 0 : closeOthers(state.buttonId);
        dispatch({
          type: ActionTypes$4.TogglePopover
        });
      }
    }, [dispatch, state.button, state.popoverState, state.buttonId, props.disabled, closeOthers, isWithinPanel]);
    var propsBag = React.useMemo(function () {
      return {
        open: state.popoverState === PopoverStates.Open
      };
    }, [state]);
    var passthroughProps = props;
    var propsWeControl = isWithinPanel ? {
      type: 'button',
      onKeyDown: handleKeyDown,
      onClick: handleClick
    } : {
      ref: buttonRef,
      id: state.buttonId,
      type: 'button',
      'aria-expanded': state.popoverState === PopoverStates.Open ? true : undefined,
      'aria-controls': state.panel ? state.panelId : undefined,
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp,
      onClick: handleClick
    };
    return render(_extends({}, passthroughProps, propsWeControl), propsBag, DEFAULT_BUTTON_TAG$3);
  }); // ---

  var DEFAULT_OVERLAY_TAG$1 = 'div';
  var Overlay$1 = /*#__PURE__*/forwardRefWithAs(function Overlay(props, ref) {
    var _usePopoverContext2 = usePopoverContext([Popover.name, Overlay.name].join('.')),
        popoverState = _usePopoverContext2[0].popoverState,
        dispatch = _usePopoverContext2[1];

    var overlayRef = useSyncRefs(ref);
    var id = "headlessui-popover-overlay-" + useId();
    var handleClick = React.useCallback(function (event) {
      if (isDisabledReactIssue7711(event.currentTarget)) return event.preventDefault();
      dispatch({
        type: ActionTypes$4.ClosePopover
      });
    }, [dispatch]);
    var propsBag = React.useMemo(function () {
      return {
        open: popoverState === PopoverStates.Open
      };
    }, [popoverState]);
    var propsWeControl = {
      ref: overlayRef,
      id: id,
      'aria-hidden': true,
      onClick: handleClick
    };
    var passthroughProps = props;
    return render(_extends({}, passthroughProps, propsWeControl), propsBag, DEFAULT_OVERLAY_TAG$1);
  }); // ---

  var DEFAULT_PANEL_TAG$1 = 'div';
  var PanelRenderFeatures$1 = Features.RenderStrategy | Features.Static;
  var Panel$1 = /*#__PURE__*/forwardRefWithAs(function Panel(props, ref) {
    var _props$focus = props.focus,
        focus = _props$focus === void 0 ? false : _props$focus,
        passthroughProps = _objectWithoutPropertiesLoose(props, ["focus"]);

    var _usePopoverContext3 = usePopoverContext([Popover.name, Panel.name].join('.')),
        state = _usePopoverContext3[0],
        dispatch = _usePopoverContext3[1];

    var internalPanelRef = React.useRef(null);
    var panelRef = useSyncRefs(internalPanelRef, ref, function (panel) {
      dispatch({
        type: ActionTypes$4.SetPanel,
        panel: panel
      });
    });
    var handleKeyDown = React.useCallback(function (event) {
      var _state$button5;

      switch (event.key) {
        case Keys.Escape:
          if (state.popoverState !== PopoverStates.Open) return;
          if (!internalPanelRef.current) return;
          if (!internalPanelRef.current.contains(document.activeElement)) return;
          event.preventDefault();
          dispatch({
            type: ActionTypes$4.ClosePopover
          });
          (_state$button5 = state.button) == null ? void 0 : _state$button5.focus();
          break;
      }
    }, [state, internalPanelRef, dispatch]); // Unlink on "unmount" myself

    React.useEffect(function () {
      return function () {
        return dispatch({
          type: ActionTypes$4.SetPanel,
          panel: null
        });
      };
    }, [dispatch]); // Unlink on "unmount" children

    React.useEffect(function () {
      var _props$unmount;

      if (state.popoverState === PopoverStates.Closed && ((_props$unmount = props.unmount) != null ? _props$unmount : true)) {
        dispatch({
          type: ActionTypes$4.SetPanel,
          panel: null
        });
      }
    }, [state.popoverState, props.unmount, dispatch]); // Move focus within panel

    React.useEffect(function () {
      if (!focus) return;
      if (state.popoverState !== PopoverStates.Open) return;
      if (!internalPanelRef.current) return;
      var activeElement = document.activeElement;
      if (internalPanelRef.current.contains(activeElement)) return; // Already focused within Dialog

      focusIn(internalPanelRef.current, Focus.First);
    }, [focus, internalPanelRef, state.popoverState]); // Handle Tab / Shift+Tab focus positioning

    React.useEffect(function () {
      if (state.popoverState !== PopoverStates.Open) return;
      if (!internalPanelRef.current) return;

      function handler(event) {
        if (event.key !== Keys.Tab) return;
        if (!document.activeElement) return;
        if (!internalPanelRef.current) return;
        if (!internalPanelRef.current.contains(document.activeElement)) return; // We will take-over the default tab behaviour so that we have a bit
        // control over what is focused next. It will behave exactly the same,
        // but it will also "fix" some issues based on wether you are using a
        // Portal or not.

        event.preventDefault();
        var result = focusIn(internalPanelRef.current, event.shiftKey ? Focus.Previous : Focus.Next);

        if (result === FocusResult.Underflow) {
          var _state$button6;

          return (_state$button6 = state.button) == null ? void 0 : _state$button6.focus();
        } else if (result === FocusResult.Overflow) {
          if (!state.button) return;
          var elements = getFocusableElements();
          var buttonIdx = elements.indexOf(state.button);
          var nextElements = elements.splice(buttonIdx + 1) // Elements after button
          .filter(function (element) {
            var _internalPanelRef$cur;

            return !((_internalPanelRef$cur = internalPanelRef.current) == null ? void 0 : _internalPanelRef$cur.contains(element));
          }); // Ignore items in panel
          // Try to focus the next element, however it could fail if we are in a
          // Portal that happens to be the very last one in the DOM. In that
          // case we would Error (because nothing after the button is
          // focusable). Therefore we will try and focus the very first item in
          // the document.body.

          if (focusIn(nextElements, Focus.First) === FocusResult.Error) {
            focusIn(document.body, Focus.First);
          }
        }
      }

      window.addEventListener('keydown', handler);
      return function () {
        return window.removeEventListener('keydown', handler);
      };
    }, [focus, internalPanelRef, state.popoverState, state.button]); // Handle focus out when we are in special "focus" mode

    React.useEffect(function () {
      if (!focus) return;
      if (state.popoverState !== PopoverStates.Open) return;
      if (!internalPanelRef.current) return;

      function handler() {
        var _internalPanelRef$cur2;

        if ((_internalPanelRef$cur2 = internalPanelRef.current) == null ? void 0 : _internalPanelRef$cur2.contains(document.activeElement)) return;
        dispatch({
          type: ActionTypes$4.ClosePopover
        });
      }

      window.addEventListener('focus', handler, true);
      return function () {
        return window.removeEventListener('focus', handler, true);
      };
    }, [focus, state.popoverState, dispatch]);
    var propsBag = React.useMemo(function () {
      return {
        open: state.popoverState === PopoverStates.Open
      };
    }, [state]);
    var propsWeControl = {
      ref: panelRef,
      id: state.panelId,
      onKeyDown: handleKeyDown
    };
    return React__default.createElement(PopoverPanelContext.Provider, {
      value: state.panelId
    }, render(_extends({}, passthroughProps, propsWeControl), propsBag, DEFAULT_PANEL_TAG$1, PanelRenderFeatures$1, state.popoverState === PopoverStates.Open));
  }); // ---

  var DEFAULT_GROUP_TAG$1 = 'div';

  function Group$1(props) {
    var groupRef = React.useRef(null);

    var _useState = React.useState([]),
        popovers = _useState[0],
        setPopovers = _useState[1];

    var unregisterPopover = React.useCallback(function (registerbag) {
      setPopovers(function (existing) {
        var idx = existing.indexOf(registerbag);

        if (idx !== -1) {
          var clone = existing.slice();
          clone.splice(idx, 1);
          return clone;
        }

        return existing;
      });
    }, [setPopovers]);
    var registerPopover = React.useCallback(function (registerbag) {
      setPopovers(function (existing) {
        return [].concat(existing, [registerbag]);
      });
      return function () {
        return unregisterPopover(registerbag);
      };
    }, [setPopovers, unregisterPopover]);
    var isFocusWithinPopoverGroup = React.useCallback(function () {
      var _groupRef$current;

      var element = document.activeElement;
      if ((_groupRef$current = groupRef.current) == null ? void 0 : _groupRef$current.contains(element)) return true; // Check if the focus is in one of the button or panel elements. This is important in case you are rendering inside a Portal.

      return popovers.some(function (bag) {
        var _document$getElementB, _document$getElementB2;

        return ((_document$getElementB = document.getElementById(bag.buttonId)) == null ? void 0 : _document$getElementB.contains(element)) || ((_document$getElementB2 = document.getElementById(bag.panelId)) == null ? void 0 : _document$getElementB2.contains(element));
      });
    }, [groupRef, popovers]);
    var closeOthers = React.useCallback(function (buttonId) {
      for (var _iterator = _createForOfIteratorHelperLoose(popovers), _step; !(_step = _iterator()).done;) {
        var popover = _step.value;
        if (popover.buttonId !== buttonId) popover.close();
      }
    }, [popovers]);
    var contextBag = React.useMemo(function () {
      return {
        registerPopover: registerPopover,
        unregisterPopover: unregisterPopover,
        isFocusWithinPopoverGroup: isFocusWithinPopoverGroup,
        closeOthers: closeOthers
      };
    }, [registerPopover, unregisterPopover, isFocusWithinPopoverGroup, closeOthers]);
    var propsBag = React.useMemo(function () {
      return {};
    }, []);
    var propsWeControl = {
      ref: groupRef
    };
    var passthroughProps = props;
    return React__default.createElement(PopoverGroupContext.Provider, {
      value: contextBag
    }, render(_extends({}, passthroughProps, propsWeControl), propsBag, DEFAULT_GROUP_TAG$1));
  } // ---


  Popover.Button = Button$3;
  Popover.Overlay = Overlay$1;
  Popover.Panel = Panel$1;
  Popover.Group = Group$1;

  function useFlags(initialFlags) {
    if (initialFlags === void 0) {
      initialFlags = 0;
    }

    var _useState = React.useState(initialFlags),
        flags = _useState[0],
        setFlags = _useState[1];

    var addFlag = React.useCallback(function (flag) {
      return setFlags(function (flags) {
        return flags | flag;
      });
    }, [setFlags]);
    var hasFlag = React.useCallback(function (flag) {
      return Boolean(flags & flag);
    }, [flags]);
    var removeFlag = React.useCallback(function (flag) {
      return setFlags(function (flags) {
        return flags & ~flag;
      });
    }, [setFlags]);
    var toggleFlag = React.useCallback(function (flag) {
      return setFlags(function (flags) {
        return flags ^ flag;
      });
    }, [setFlags]);
    return {
      addFlag: addFlag,
      hasFlag: hasFlag,
      removeFlag: removeFlag,
      toggleFlag: toggleFlag
    };
  }

  var LabelContext = /*#__PURE__*/React.createContext({
    register: function register() {
      return function () {};
    }
  });

  function useLabelContext() {
    return React.useContext(LabelContext);
  }

  function useLabels(id) {
    var _useState = React.useState([]),
        labelIds = _useState[0],
        setLabelIds = _useState[1];

    return [// The actual id's as string or undefined. If there are labels defined and
    // we got an id passed in, let's add it as well!
    labelIds.length > 0 ? id ? [id].concat(labelIds).join(' ') : labelIds.join(' ') : undefined, // The provider component
    React.useMemo(function () {
      return function LabelProvider(props) {
        var register = React.useCallback(function (value) {
          setLabelIds(function (existing) {
            return [].concat(existing, [value]);
          });
          return function () {
            return setLabelIds(function (existing) {
              var clone = existing.slice();
              var idx = clone.indexOf(value);
              if (idx !== -1) clone.splice(idx, 1);
              return clone;
            });
          };
        }, []);
        var contextBag = React.useMemo(function () {
          return {
            register: register
          };
        }, [register]);
        return React__default.createElement(LabelContext.Provider, {
          value: contextBag
        }, props.children);
      };
    }, [setLabelIds])];
  } // ---

  var DEFAULT_LABEL_TAG$1 = 'label';
  function Label$1(props) {
    var _useLabelContext = useLabelContext(),
        register = _useLabelContext.register;

    var id = "headlessui-label-" + useId();
    useIsoMorphicEffect(function () {
      return register(id);
    }, [id, register]);
    var passThroughProps = props;
    var propsWeControl = {
      id: id
    };
    var bag = React.useMemo(function () {
      return {};
    }, []);
    return render(_extends({}, passThroughProps, propsWeControl), bag, DEFAULT_LABEL_TAG$1);
  }

  var DescriptionContext = /*#__PURE__*/React.createContext({
    register: function register() {
      return function () {};
    }
  });

  function useDescriptionContext() {
    return React.useContext(DescriptionContext);
  }

  function useDescriptions() {
    var _useState = React.useState([]),
        descriptionIds = _useState[0],
        setDescriptionIds = _useState[1];

    return [// The actual id's as string or undefined
    descriptionIds.length > 0 ? descriptionIds.join(' ') : undefined, // The provider component
    React.useMemo(function () {
      return function DescriptionProvider(props) {
        var register = React.useCallback(function (value) {
          setDescriptionIds(function (existing) {
            return [].concat(existing, [value]);
          });
          return function () {
            return setDescriptionIds(function (existing) {
              var clone = existing.slice();
              var idx = clone.indexOf(value);
              if (idx !== -1) clone.splice(idx, 1);
              return clone;
            });
          };
        }, []);
        var contextBag = React.useMemo(function () {
          return {
            register: register
          };
        }, [register]);
        return React__default.createElement(DescriptionContext.Provider, {
          value: contextBag
        }, props.children);
      };
    }, [setDescriptionIds])];
  } // ---

  var DEFAULT_DESCRIPTION_TAG$1 = 'p';
  function Description$1(props) {
    var _useDescriptionContex = useDescriptionContext(),
        register = _useDescriptionContex.register;

    var id = "headlessui-description-" + useId();
    useIsoMorphicEffect(function () {
      return register(id);
    }, [id, register]);
    var passThroughProps = props;
    var propsWeControl = {
      id: id
    };
    var bag = React.useMemo(function () {
      return {};
    }, []);
    return render(_extends({}, passThroughProps, propsWeControl), bag, DEFAULT_DESCRIPTION_TAG$1);
  }

  var _reducers$5;
  var ActionTypes$5;

  (function (ActionTypes) {
    ActionTypes[ActionTypes["RegisterOption"] = 0] = "RegisterOption";
    ActionTypes[ActionTypes["UnregisterOption"] = 1] = "UnregisterOption";
  })(ActionTypes$5 || (ActionTypes$5 = {}));

  var reducers$5 = (_reducers$5 = {}, _reducers$5[ActionTypes$5.RegisterOption] = function (state, action) {
    return _extends({}, state, {
      options: [].concat(state.options, [{
        id: action.id,
        element: action.element,
        propsRef: action.propsRef
      }])
    });
  }, _reducers$5[ActionTypes$5.UnregisterOption] = function (state, action) {
    var options = state.options.slice();
    var idx = state.options.findIndex(function (radio) {
      return radio.id === action.id;
    });
    if (idx === -1) return state;
    options.splice(idx, 1);
    return _extends({}, state, {
      options: options
    });
  }, _reducers$5);
  var RadioGroupContext = /*#__PURE__*/React.createContext(null);
  RadioGroupContext.displayName = 'RadioGroupContext';

  function useRadioGroupContext(component) {
    var context = React.useContext(RadioGroupContext);

    if (context === null) {
      var err = new Error("<" + component + " /> is missing a parent <" + RadioGroup.name + " /> component.");
      if (Error.captureStackTrace) Error.captureStackTrace(err, useRadioGroupContext);
      throw err;
    }

    return context;
  }

  function stateReducer$5(state, action) {
    return match(action.type, reducers$5, state, action);
  } // ---


  var DEFAULT_RADIO_GROUP_TAG = 'div';
  function RadioGroup(props) {
    var value = props.value,
        onChange = props.onChange,
        passThroughProps = _objectWithoutPropertiesLoose(props, ["value", "onChange"]);

    var reducerBag = React.useReducer(stateReducer$5, {
      propsRef: {
        current: {
          value: value,
          onChange: onChange
        }
      },
      options: []
    });
    var _reducerBag$ = reducerBag[0],
        propsRef = _reducerBag$.propsRef,
        options = _reducerBag$.options;

    var _useLabels = useLabels(),
        labelledby = _useLabels[0],
        LabelProvider = _useLabels[1];

    var _useDescriptions = useDescriptions(),
        describedby = _useDescriptions[0],
        DescriptionProvider = _useDescriptions[1];

    var id = "headlessui-radiogroup-" + useId();
    var radioGroupRef = React.useRef(null);
    useIsoMorphicEffect(function () {
      propsRef.current.value = value;
    }, [value, propsRef]);
    useIsoMorphicEffect(function () {
      propsRef.current.onChange = onChange;
    }, [onChange, propsRef]);
    var triggerChange = React.useCallback(function (nextValue) {
      if (nextValue === value) return;
      return onChange(nextValue);
    }, [onChange, value]);
    useIsoMorphicEffect(function () {
      var container = radioGroupRef.current;
      if (!container) return;
      var walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
        acceptNode: function acceptNode(node) {
          if (node.getAttribute('role') === 'radio') return NodeFilter.FILTER_REJECT;
          if (node.hasAttribute('role')) return NodeFilter.FILTER_SKIP;
          return NodeFilter.FILTER_ACCEPT;
        }
      });

      while (walker.nextNode()) {
        walker.currentNode.setAttribute('role', 'none');
      }
    }, [radioGroupRef]);
    React.useEffect(function () {
      var container = radioGroupRef.current;
      if (!container) return;

      function handler(event) {
        switch (event.key) {
          case Keys.ArrowLeft:
          case Keys.ArrowUp:
            {
              event.preventDefault();
              event.stopPropagation();
              var result = focusIn(options.map(function (radio) {
                return radio.element.current;
              }), Focus.Previous | Focus.WrapAround);

              if (result === FocusResult.Success) {
                var activeOption = options.find(function (option) {
                  return option.element.current === document.activeElement;
                });
                if (activeOption) triggerChange(activeOption.propsRef.current.value);
              }
            }
            break;

          case Keys.ArrowRight:
          case Keys.ArrowDown:
            {
              event.preventDefault();
              event.stopPropagation();

              var _result = focusIn(options.map(function (option) {
                return option.element.current;
              }), Focus.Next | Focus.WrapAround);

              if (_result === FocusResult.Success) {
                var _activeOption = options.find(function (option) {
                  return option.element.current === document.activeElement;
                });

                if (_activeOption) triggerChange(_activeOption.propsRef.current.value);
              }
            }
            break;

          case Keys.Space:
            {
              event.preventDefault();
              event.stopPropagation();

              var _activeOption2 = options.find(function (option) {
                return option.element.current === document.activeElement;
              });

              if (_activeOption2) triggerChange(_activeOption2.propsRef.current.value);
            }
            break;
        }
      }

      container.addEventListener('keydown', handler);
      return function () {
        return container.removeEventListener('keydown', handler);
      };
    }, [radioGroupRef, options, triggerChange]);
    var propsWeControl = {
      ref: radioGroupRef,
      id: id,
      role: 'radiogroup',
      'aria-labelledby': labelledby,
      'aria-describedby': describedby
    };
    var bag = React.useMemo(function () {
      return {};
    }, []);
    return React__default.createElement(DescriptionProvider, null, React__default.createElement(LabelProvider, null, React__default.createElement(RadioGroupContext.Provider, {
      value: reducerBag
    }, render(_extends({}, passThroughProps, propsWeControl), bag, DEFAULT_RADIO_GROUP_TAG))));
  } // ---

  var OptionState;

  (function (OptionState) {
    OptionState[OptionState["Empty"] = 1] = "Empty";
    OptionState[OptionState["Active"] = 2] = "Active";
  })(OptionState || (OptionState = {}));

  var DEFAULT_OPTION_TAG$1 = 'div';

  function Option$1(props) {
    var _options$;

    var optionRef = React.useRef(null);
    var id = "headlessui-radiogroup-option-" + useId();

    var _useLabels2 = useLabels(id),
        labelledby = _useLabels2[0],
        LabelProvider = _useLabels2[1];

    var _useDescriptions2 = useDescriptions(),
        describedby = _useDescriptions2[0],
        DescriptionProvider = _useDescriptions2[1];

    var _useFlags = useFlags(OptionState.Empty),
        addFlag = _useFlags.addFlag,
        removeFlag = _useFlags.removeFlag,
        hasFlag = _useFlags.hasFlag;

    var value = props.value,
        passThroughProps = _objectWithoutPropertiesLoose(props, ["value"]);

    var propsRef = React.useRef({
      value: value
    });
    useIsoMorphicEffect(function () {
      propsRef.current.value = value;
    }, [value, propsRef]);

    var _useRadioGroupContext = useRadioGroupContext([RadioGroup.name, Option$1.name].join('.')),
        _useRadioGroupContext2 = _useRadioGroupContext[0],
        radioGroupPropsRef = _useRadioGroupContext2.propsRef,
        options = _useRadioGroupContext2.options,
        dispatch = _useRadioGroupContext[1];

    useIsoMorphicEffect(function () {
      dispatch({
        type: ActionTypes$5.RegisterOption,
        id: id,
        element: optionRef,
        propsRef: propsRef
      });
      return function () {
        return dispatch({
          type: ActionTypes$5.UnregisterOption,
          id: id
        });
      };
    }, [id, dispatch, optionRef, props]);
    var handleClick = React.useCallback(function () {
      var _optionRef$current;

      if (radioGroupPropsRef.current.value === value) return;
      addFlag(OptionState.Active);
      radioGroupPropsRef.current.onChange(value);
      (_optionRef$current = optionRef.current) == null ? void 0 : _optionRef$current.focus();
    }, [addFlag, radioGroupPropsRef, value]);
    var handleFocus = React.useCallback(function () {
      return addFlag(OptionState.Active);
    }, [addFlag]);
    var handleBlur = React.useCallback(function () {
      return removeFlag(OptionState.Active);
    }, [removeFlag]);
    var firstRadio = (options == null ? void 0 : (_options$ = options[0]) == null ? void 0 : _options$.id) === id;
    var checked = radioGroupPropsRef.current.value === value;
    var propsWeControl = {
      ref: optionRef,
      id: id,
      role: 'radio',
      'aria-checked': checked ? 'true' : 'false',
      'aria-labelledby': labelledby,
      'aria-describedby': describedby,
      tabIndex: checked ? 0 : radioGroupPropsRef.current.value === undefined && firstRadio ? 0 : -1,
      onClick: handleClick,
      onFocus: handleFocus,
      onBlur: handleBlur
    };
    var bag = React.useMemo(function () {
      return {
        checked: checked,
        active: hasFlag(OptionState.Active)
      };
    }, [checked, hasFlag]);
    return React__default.createElement(DescriptionProvider, null, React__default.createElement(LabelProvider, null, render(_extends({}, passThroughProps, propsWeControl), bag, DEFAULT_OPTION_TAG$1)));
  } // ---


  RadioGroup.Option = Option$1;
  RadioGroup.Label = Label$1;
  RadioGroup.Description = Description$1;

  var GroupContext = /*#__PURE__*/React.createContext(null);
  GroupContext.displayName = 'GroupContext';

  function useGroupContext(component) {
    var context = React.useContext(GroupContext);

    if (context === null) {
      var err = new Error("<" + component + " /> is missing a parent <Switch.Group /> component.");
      if (Error.captureStackTrace) Error.captureStackTrace(err, useGroupContext);
      throw err;
    }

    return context;
  } // ---


  var DEFAULT_GROUP_TAG$2 = React.Fragment;

  function Group$2(props) {
    var _useState = React.useState(null),
        switchElement = _useState[0],
        setSwitchElement = _useState[1];

    var _useState2 = React.useState(null),
        labelElement = _useState2[0],
        setLabelElement = _useState2[1];

    var _useState3 = React.useState(null),
        descriptionElement = _useState3[0],
        setDescriptionElement = _useState3[1];

    var context = React.useMemo(function () {
      return {
        "switch": switchElement,
        setSwitch: setSwitchElement,
        label: labelElement,
        setLabel: setLabelElement,
        description: descriptionElement,
        setDescription: setDescriptionElement
      };
    }, [switchElement, setSwitchElement, labelElement, setLabelElement, descriptionElement, setDescriptionElement]);
    return React__default.createElement(GroupContext.Provider, {
      value: context
    }, render(props, {}, DEFAULT_GROUP_TAG$2));
  } // ---


  var DEFAULT_SWITCH_TAG = 'button';
  function Switch(props) {
    var _groupContext$label, _groupContext$descrip;

    var checked = props.checked,
        onChange = props.onChange,
        passThroughProps = _objectWithoutPropertiesLoose(props, ["checked", "onChange"]);

    var id = "headlessui-switch-" + useId();
    var groupContext = React.useContext(GroupContext);
    var toggle = React.useCallback(function () {
      return onChange(!checked);
    }, [onChange, checked]);
    var handleClick = React.useCallback(function (event) {
      if (isDisabledReactIssue7711(event.currentTarget)) return event.preventDefault();
      event.preventDefault();
      toggle();
    }, [toggle]);
    var handleKeyUp = React.useCallback(function (event) {
      if (event.key !== Keys.Tab) event.preventDefault();
      if (event.key === Keys.Space) toggle();
    }, [toggle]); // This is needed so that we can "cancel" the click event when we use the `Enter` key on a button.

    var handleKeyPress = React.useCallback(function (event) {
      return event.preventDefault();
    }, []);
    var propsBag = React.useMemo(function () {
      return {
        checked: checked
      };
    }, [checked]);
    var propsWeControl = {
      id: id,
      ref: groupContext === null ? undefined : groupContext.setSwitch,
      role: 'switch',
      tabIndex: 0,
      'aria-checked': checked,
      'aria-labelledby': groupContext == null ? void 0 : (_groupContext$label = groupContext.label) == null ? void 0 : _groupContext$label.id,
      'aria-describedby': groupContext == null ? void 0 : (_groupContext$descrip = groupContext.description) == null ? void 0 : _groupContext$descrip.id,
      onClick: handleClick,
      onKeyUp: handleKeyUp,
      onKeyPress: handleKeyPress
    };

    if (passThroughProps.as === 'button') {
      Object.assign(propsWeControl, {
        type: 'button'
      });
    }

    return render(_extends({}, passThroughProps, propsWeControl), propsBag, DEFAULT_SWITCH_TAG);
  } // ---

  var DEFAULT_LABEL_TAG$2 = 'label';

  function Label$2(props) {
    var state = useGroupContext([Switch.name, Label$2.name].join('.'));
    var id = "headlessui-switch-label-" + useId();
    var handleClick = React.useCallback(function () {
      if (!state["switch"]) return;
      state["switch"].click();
      state["switch"].focus({
        preventScroll: true
      });
    }, [state["switch"]]);
    var propsWeControl = {
      ref: state.setLabel,
      id: id,
      onClick: handleClick
    };
    return render(_extends({}, props, propsWeControl), {}, DEFAULT_LABEL_TAG$2);
  } // ---


  var DEFAULT_DESCRIPTIONL_TAG = 'p';

  function Description$2(props) {
    var state = useGroupContext([Switch.name, Description$2.name].join('.'));
    var id = "headlessui-switch-description-" + useId();
    var propsWeControl = {
      ref: state.setDescription,
      id: id
    };
    return render(_extends({}, props, propsWeControl), {}, DEFAULT_DESCRIPTIONL_TAG);
  } // ---


  Switch.Group = Group$2;
  Switch.Label = Label$2;
  Switch.Description = Description$2;

  function useIsInitialRender() {
    var initial = React.useRef(true);
    React.useEffect(function () {
      initial.current = false;
    }, []);
    return initial.current;
  }

  function useIsMounted() {
    var mounted = React.useRef(true);
    React.useEffect(function () {
      return function () {
        mounted.current = false;
      };
    }, []);
    return mounted;
  }

  function once(cb) {
    var state = {
      called: false
    };
    return function () {
      if (state.called) return;
      state.called = true;
      return cb.apply(void 0, arguments);
    };
  }

  function addClasses(node) {
    var _node$classList;

    for (var _len = arguments.length, classes = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      classes[_key - 1] = arguments[_key];
    }

    node && classes.length > 0 && (_node$classList = node.classList).add.apply(_node$classList, classes);
  }

  function removeClasses(node) {
    var _node$classList2;

    for (var _len2 = arguments.length, classes = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      classes[_key2 - 1] = arguments[_key2];
    }

    node && classes.length > 0 && (_node$classList2 = node.classList).remove.apply(_node$classList2, classes);
  }

  var Reason;

  (function (Reason) {
    Reason["Finished"] = "finished";
    Reason["Cancelled"] = "cancelled";
  })(Reason || (Reason = {}));

  function waitForTransition(node, done) {
    var d = disposables();
    if (!node) return d.dispose; // Safari returns a comma separated list of values, so let's sort them and take the highest value.

    var _getComputedStyle = getComputedStyle(node),
        transitionDuration = _getComputedStyle.transitionDuration,
        transitionDelay = _getComputedStyle.transitionDelay;

    var _map = [transitionDuration, transitionDelay].map(function (value) {
      var _value$split$filter$m = value.split(',') // Remove falseys we can't work with
      .filter(Boolean) // Values are returned as `0.3s` or `75ms`
      .map(function (v) {
        return v.includes('ms') ? parseFloat(v) : parseFloat(v) * 1000;
      }).sort(function (a, z) {
        return z - a;
      }),
          _value$split$filter$m2 = _value$split$filter$m[0],
          resolvedValue = _value$split$filter$m2 === void 0 ? 0 : _value$split$filter$m2;

      return resolvedValue;
    }),
        durationMs = _map[0],
        delaysMs = _map[1]; // Waiting for the transition to end. We could use the `transitionend` event, however when no
    // actual transition/duration is defined then the `transitionend` event is not fired.
    //
    // TODO: Downside is, when you slow down transitions via devtools this timeout is still using the
    // full 100% speed instead of the 25% or 10%.


    if (durationMs !== 0) {
      d.setTimeout(function () {
        done(Reason.Finished);
      }, durationMs + delaysMs);
    } else {
      // No transition is happening, so we should cleanup already. Otherwise we have to wait until we
      // get disposed.
      done(Reason.Finished);
    } // If we get disposed before the timeout runs we should cleanup anyway


    d.add(function () {
      return done(Reason.Cancelled);
    });
    return d.dispose;
  }

  function transition(node, base, from, to, done) {
    var d = disposables();

    var _done = done !== undefined ? once(done) : function () {};

    addClasses.apply(void 0, [node].concat(base, from));
    d.nextFrame(function () {
      removeClasses.apply(void 0, [node].concat(from));
      addClasses.apply(void 0, [node].concat(to));
      d.add(waitForTransition(node, function (reason) {
        removeClasses.apply(void 0, [node].concat(to, base));
        return _done(reason);
      }));
    }); // Once we get disposed, we should ensure that we cleanup after ourselves. In case of an unmount,
    // the node itself will be nullified and will be a no-op. In case of a full transition the classes
    // are already removed which is also a no-op. However if you go from enter -> leave mid-transition
    // then we have some leftovers that should be cleaned.

    d.add(function () {
      return removeClasses.apply(void 0, [node].concat(base, from, to));
    }); // When we get disposed early, than we should also call the done method but switch the reason.

    d.add(function () {
      return _done(Reason.Cancelled);
    });
    return d.dispose;
  }

  function useSplitClasses(classes) {
    if (classes === void 0) {
      classes = '';
    }

    return React.useMemo(function () {
      return classes.split(' ').filter(function (className) {
        return className.trim().length > 1;
      });
    }, [classes]);
  }

  var TransitionContext = /*#__PURE__*/React.createContext(null);
  TransitionContext.displayName = 'TransitionContext';
  var TreeStates;

  (function (TreeStates) {
    TreeStates["Visible"] = "visible";
    TreeStates["Hidden"] = "hidden";
  })(TreeStates || (TreeStates = {}));

  function useTransitionContext() {
    var context = React.useContext(TransitionContext);

    if (context === null) {
      throw new Error('A <Transition.Child /> is used but it is missing a parent <Transition />.');
    }

    return context;
  }

  function useParentNesting() {
    var context = React.useContext(NestingContext);

    if (context === null) {
      throw new Error('A <Transition.Child /> is used but it is missing a parent <Transition />.');
    }

    return context;
  }

  var NestingContext = /*#__PURE__*/React.createContext(null);
  NestingContext.displayName = 'NestingContext';

  function hasChildren(bag) {
    if ('children' in bag) return hasChildren(bag.children);
    return bag.current.filter(function (_ref) {
      var state = _ref.state;
      return state === TreeStates.Visible;
    }).length > 0;
  }

  function useNesting(done) {
    var doneRef = React.useRef(done);
    var transitionableChildren = React.useRef([]);
    var mounted = useIsMounted();
    React.useEffect(function () {
      doneRef.current = done;
    }, [done]);
    var unregister = React.useCallback(function (childId, strategy) {
      var _match;

      if (strategy === void 0) {
        strategy = RenderStrategy.Hidden;
      }

      var idx = transitionableChildren.current.findIndex(function (_ref2) {
        var id = _ref2.id;
        return id === childId;
      });
      if (idx === -1) return;
      match(strategy, (_match = {}, _match[RenderStrategy.Unmount] = function () {
        transitionableChildren.current.splice(idx, 1);
      }, _match[RenderStrategy.Hidden] = function () {
        transitionableChildren.current[idx].state = TreeStates.Hidden;
      }, _match));

      if (!hasChildren(transitionableChildren) && mounted.current) {
        doneRef.current == null ? void 0 : doneRef.current();
      }
    }, [doneRef, mounted, transitionableChildren]);
    var register = React.useCallback(function (childId) {
      var child = transitionableChildren.current.find(function (_ref3) {
        var id = _ref3.id;
        return id === childId;
      });

      if (!child) {
        transitionableChildren.current.push({
          id: childId,
          state: TreeStates.Visible
        });
      } else if (child.state !== TreeStates.Visible) {
        child.state = TreeStates.Visible;
      }

      return function () {
        return unregister(childId, RenderStrategy.Unmount);
      };
    }, [transitionableChildren, unregister]);
    return React.useMemo(function () {
      return {
        children: transitionableChildren,
        register: register,
        unregister: unregister
      };
    }, [register, unregister, transitionableChildren]);
  }

  function noop() {}

  var eventNames = ['beforeEnter', 'afterEnter', 'beforeLeave', 'afterLeave'];

  function ensureEventHooksExist(events) {
    var result = {};

    for (var _iterator = _createForOfIteratorHelperLoose(eventNames), _step; !(_step = _iterator()).done;) {
      var _events$name;

      var name = _step.value;
      result[name] = (_events$name = events[name]) != null ? _events$name : noop;
    }

    return result;
  }

  function useEvents(events) {
    var eventsRef = React.useRef(ensureEventHooksExist(events));
    React.useEffect(function () {
      eventsRef.current = ensureEventHooksExist(events);
    }, [events]);
    return eventsRef;
  } // ---


  var DEFAULT_TRANSITION_CHILD_TAG = 'div';
  var TransitionChildRenderFeatures = Features.RenderStrategy;

  function TransitionChild(props) {
    var beforeEnter = props.beforeEnter,
        afterEnter = props.afterEnter,
        beforeLeave = props.beforeLeave,
        afterLeave = props.afterLeave,
        enter = props.enter,
        enterFrom = props.enterFrom,
        enterTo = props.enterTo,
        leave = props.leave,
        leaveFrom = props.leaveFrom,
        leaveTo = props.leaveTo,
        rest = _objectWithoutPropertiesLoose(props, ["beforeEnter", "afterEnter", "beforeLeave", "afterLeave", "enter", "enterFrom", "enterTo", "leave", "leaveFrom", "leaveTo"]);

    var container = React.useRef(null);

    var _useState = React.useState(TreeStates.Visible),
        state = _useState[0],
        setState = _useState[1];

    var strategy = rest.unmount ? RenderStrategy.Unmount : RenderStrategy.Hidden;

    var _useTransitionContext = useTransitionContext(),
        show = _useTransitionContext.show,
        appear = _useTransitionContext.appear;

    var _useParentNesting = useParentNesting(),
        register = _useParentNesting.register,
        unregister = _useParentNesting.unregister;

    var initial = useIsInitialRender();
    var id = useId();
    var isTransitioning = React.useRef(false);
    var nesting = useNesting(function () {
      // When all children have been unmounted we can only hide ourselves if and only if we are not
      // transitioning ourserlves. Otherwise we would unmount before the transitions are finished.
      if (!isTransitioning.current) {
        setState(TreeStates.Hidden);
        unregister(id);
        events.current.afterLeave();
      }
    });
    useIsoMorphicEffect(function () {
      if (!id) return;
      return register(id);
    }, [register, id]);
    useIsoMorphicEffect(function () {
      var _match2;

      // If we are in another mode than the Hidden mode then ignore
      if (strategy !== RenderStrategy.Hidden) return;
      if (!id) return; // Make sure that we are visible

      if (show && state !== TreeStates.Visible) {
        setState(TreeStates.Visible);
        return;
      }

      match(state, (_match2 = {}, _match2[TreeStates.Hidden] = function () {
        return unregister(id);
      }, _match2[TreeStates.Visible] = function () {
        return register(id);
      }, _match2));
    }, [state, id, register, unregister, show, strategy]);
    var enterClasses = useSplitClasses(enter);
    var enterFromClasses = useSplitClasses(enterFrom);
    var enterToClasses = useSplitClasses(enterTo);
    var leaveClasses = useSplitClasses(leave);
    var leaveFromClasses = useSplitClasses(leaveFrom);
    var leaveToClasses = useSplitClasses(leaveTo);
    var events = useEvents({
      beforeEnter: beforeEnter,
      afterEnter: afterEnter,
      beforeLeave: beforeLeave,
      afterLeave: afterLeave
    });
    React.useEffect(function () {
      if (state === TreeStates.Visible && container.current === null) {
        throw new Error('Did you forget to passthrough the `ref` to the actual DOM node?');
      }
    }, [container, state]); // Skipping initial transition

    var skip = initial && !appear;
    useIsoMorphicEffect(function () {
      var node = container.current;
      if (!node) return;
      if (skip) return;
      isTransitioning.current = true;
      if (show) events.current.beforeEnter();
      if (!show) events.current.beforeLeave();
      return show ? transition(node, enterClasses, enterFromClasses, enterToClasses, function (reason) {
        isTransitioning.current = false;
        if (reason === Reason.Finished) events.current.afterEnter();
      }) : transition(node, leaveClasses, leaveFromClasses, leaveToClasses, function (reason) {
        isTransitioning.current = false;
        if (reason !== Reason.Finished) return; // When we don't have children anymore we can safely unregister from the parent and hide
        // ourselves.

        if (!hasChildren(nesting)) {
          setState(TreeStates.Hidden);
          unregister(id);
          events.current.afterLeave();
        }
      });
    }, [events, id, isTransitioning, unregister, nesting, container, skip, show, enterClasses, enterFromClasses, enterToClasses, leaveClasses, leaveFromClasses, leaveToClasses]);
    var propsBag = {};
    var propsWeControl = {
      ref: container
    };
    var passthroughProps = rest;
    return React__default.createElement(NestingContext.Provider, {
      value: nesting
    }, render(_extends({}, passthroughProps, propsWeControl), propsBag, DEFAULT_TRANSITION_CHILD_TAG, TransitionChildRenderFeatures, state === TreeStates.Visible));
  }

  function Transition(props) {
    // @ts-expect-error
    var show = props.show,
        _props$appear = props.appear,
        appear = _props$appear === void 0 ? false : _props$appear,
        unmount = props.unmount,
        passthroughProps = _objectWithoutPropertiesLoose(props, ["show", "appear", "unmount"]);

    if (![true, false].includes(show)) {
      throw new Error('A <Transition /> is used but it is missing a `show={true | false}` prop.');
    }

    var _useState2 = React.useState(show ? TreeStates.Visible : TreeStates.Hidden),
        state = _useState2[0],
        setState = _useState2[1];

    var nestingBag = useNesting(function () {
      setState(TreeStates.Hidden);
    });
    var initial = useIsInitialRender();
    var transitionBag = React.useMemo(function () {
      return {
        show: show,
        appear: appear || !initial
      };
    }, [show, appear, initial]);
    React.useEffect(function () {
      if (show) {
        setState(TreeStates.Visible);
      } else if (!hasChildren(nestingBag)) {
        setState(TreeStates.Hidden);
      }
    }, [show, nestingBag]);
    var sharedProps = {
      unmount: unmount
    };
    var propsBag = {};
    return React__default.createElement(NestingContext.Provider, {
      value: nestingBag
    }, React__default.createElement(TransitionContext.Provider, {
      value: transitionBag
    }, render(_extends({}, sharedProps, {
      as: React.Fragment,
      children: React__default.createElement(TransitionChild, Object.assign({}, sharedProps, passthroughProps))
    }), propsBag, React.Fragment, TransitionChildRenderFeatures, state === TreeStates.Visible)));
  }
  Transition.Child = TransitionChild;

  exports.Alert = Alert;
  exports.Dialog = Dialog;
  exports.Disclosure = Disclosure;
  exports.FocusTrap = FocusTrap;
  exports.Listbox = Listbox;
  exports.Menu = Menu;
  exports.Popover = Popover;
  exports.Portal = Portal;
  exports.RadioGroup = RadioGroup;
  exports.Switch = Switch;
  exports.Transition = Transition;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=headlessui.umd.development.js.map
