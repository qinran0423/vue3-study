var extend = Object.assign;
var isObject = function (val) {
    return val !== null && typeof val === 'object';
};
var hasOwn = function (val, key) { return Object.prototype.hasOwnProperty.call(val, key); };
var camelize = function (str) {
    return str.replace(/-(\w)/g, function (_, c) {
        return c ? c.toUpperCase() : '';
    });
};
var capitalize = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
var toHandlerKey = function (str) {
    return str ? 'on' + capitalize(str) : '';
};

var targetMap = new Map();
function trigger(target, key) {
    var depsMap = targetMap.get(target);
    var dep = depsMap.get(key);
    triggerEffects(dep);
}
function triggerEffects(dep) {
    for (var _i = 0, dep_1 = dep; _i < dep_1.length; _i++) {
        var effect_1 = dep_1[_i];
        if (effect_1.scheduler) {
            effect_1.scheduler();
        }
        else {
            effect_1.run();
        }
    }
}

var get = createGetter();
var set = createSetter();
var readonlyGet = createGetter(true);
var shallowReadonlyGet = createGetter(true, true);
function createGetter(isReadonly, shallow) {
    if (isReadonly === void 0) { isReadonly = false; }
    if (shallow === void 0) { shallow = false; }
    return function get(target, key) {
        if (key === "__v_isReactive" /* IS_REACTIVE */) {
            return !isReadonly;
        }
        else if (key === "__v_isReadonly" /* IS_READONLY */) {
            return isReadonly;
        }
        var res = Reflect.get(target, key);
        if (shallow) {
            return res;
        }
        if (isObject(res)) {
            return isReadonly ? readonly(res) : reactive(res);
        }
        return res;
    };
}
function createSetter() {
    return function set(target, key, value) {
        var res = Reflect.set(target, key, value);
        trigger(target, key);
        return res;
    };
}
var mutableHandlers = {
    get: get,
    set: set
};
var readonlyHandlers = {
    get: readonlyGet,
    set: function (target, key, value) {
        console.warn("key: ".concat(key, "set \u5931\u8D25 \u56E0\u4E3Atarget\u662Freadonly:").concat(target));
        return true;
    }
};
var shallowReadonlyHandlers = extend({}, readonlyHandlers, {
    get: shallowReadonlyGet
});

function reactive(raw) {
    return createActiveObject(raw, mutableHandlers);
}
function readonly(raw) {
    return createActiveObject(raw, readonlyHandlers);
}
function shallowReadonly(raw) {
    return createActiveObject(raw, shallowReadonlyHandlers);
}
function createActiveObject(raw, baseHandlers) {
    if (!isObject(raw)) {
        console.warn('target 必须是一个对象');
        return new Proxy(raw, baseHandlers);
    }
}

function emit(instance, event) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    console.log(event);
    var props = instance.props;
    console.log(props);
    var handlerName = toHandlerKey(camelize(event));
    var handler = props[handlerName];
    handler && handler.apply(void 0, args);
}

function initProps(instance, rawProps) {
    instance.props = rawProps || {};
}

var publicPropertiesMap = {
    $el: function (i) { return i.vnode.el; },
    $slots: function (i) { return i.slots; }
};
var PublicInstanceProxyHandlers = {
    get: function (_a, key) {
        var instance = _a._;
        var setupState = instance.setupState, props = instance.props;
        if (key in setupState) {
            return setupState[key];
        }
        if (hasOwn(setupState, key)) {
            return setupState[key];
        }
        else if (hasOwn(props, key)) {
            return props[key];
        }
        var publicGetter = publicPropertiesMap[key];
        if (publicGetter) {
            return publicGetter(instance);
        }
    }
};

function initSlots(instance, children) {
    // slots
    var vnode = instance.vnode;
    if (vnode.shapeFlag & 16 /* SLOT_CHILDREN */) {
        normalizeObjectSlots(children, instance.slots);
    }
}
function normalizeObjectSlots(children, slots) {
    var _loop_1 = function (key) {
        var value = children[key];
        slots[key] = function (props) { return normalSlotValue(value(props)); };
    };
    for (var key in children) {
        _loop_1(key);
    }
}
function normalSlotValue(value) {
    return Array.isArray(value) ? value : [value];
}

function createComponentInstance(vnode) {
    var component = {
        vnode: vnode,
        type: vnode.type,
        setupState: {},
        props: {},
        slots: {},
        emit: function () { }
    };
    component.emit = emit.bind(null, component);
    return component;
}
function setupComponent(instance) {
    // TODO
    initProps(instance, instance.vnode.props);
    // TODO
    initSlots(instance, instance.vnode.children);
    setupStatefulComponent(instance);
}
function setupStatefulComponent(instance) {
    var Component = instance.vnode.type;
    instance.proxy = new Proxy({
        _: instance
    }, PublicInstanceProxyHandlers);
    var setup = Component.setup;
    if (setup) {
        var setupResult = setup(shallowReadonly(instance.props), {
            emit: instance.emit
        });
        handleSetupResult(instance, setupResult);
    }
}
function handleSetupResult(instance, setupResult) {
    if (typeof setupResult === 'object') {
        instance.setupState = setupResult;
    }
    finishComponentSetup(instance);
}
function finishComponentSetup(instance) {
    var Component = instance.type;
    instance.render = Component.render;
}

function render(vnode, container) {
    patch(vnode, container);
}
function patch(vnode, container) {
    // TODO 判断vnode是不是一个element
    // 是element应该处理element
    var shapeFlag = vnode.shapeFlag;
    if (shapeFlag & 1 /* ELEMENT */) {
        processElement(vnode, container);
    }
    else if (shapeFlag & 2 /* STATEFUL_COMPONENT */) {
        processComponent(vnode, container);
    }
    // processElement() 
}
function processElement(vnode, container) {
    mountElement(vnode, container);
}
function mountElement(vnode, container) {
    var el = (vnode.el = document.createElement(vnode.type));
    var children = vnode.children, props = vnode.props, shapeFlag = vnode.shapeFlag;
    if (shapeFlag & 4 /* TEXT_CHILDREN */) {
        el.textContent = children;
    }
    else if (shapeFlag & 8 /* ARRAY_CHILDREN */) {
        children.forEach(function (v) { return patch(v, el); });
    }
    for (var key in props) {
        var val = props[key];
        var isOn = function (key) { return /^on[A-Z]/.test(key); };
        if (isOn(key)) {
            var event_1 = key.slice(2).toLowerCase();
            el.addEventListener(event_1, val);
        }
        else {
            el.setAttribute(key, val);
        }
    }
    container.append(el);
}
function processComponent(vnode, container) {
    mountComponent(vnode, container);
}
function mountComponent(initialVnode, container) {
    var instance = createComponentInstance(initialVnode);
    setupComponent(instance);
    setupRenderEffect(instance, initialVnode, container);
}
function setupRenderEffect(instance, initialVnode, container) {
    var proxy = instance.proxy;
    var subTree = instance.render.call(proxy);
    patch(subTree, container);
    initialVnode.el = subTree.el;
}

function createVNode(type, props, children) {
    var vnode = {
        type: type,
        props: props,
        children: children,
        shapeFlag: getShapeFlag(type),
        el: null,
    };
    if (typeof children === 'string') {
        vnode.shapeFlag |= 4 /* TEXT_CHILDREN */;
    }
    else if (Array.isArray(children)) {
        vnode.shapeFlag |= 8 /* ARRAY_CHILDREN */;
    }
    if (vnode.shapeFlag & 2 /* STATEFUL_COMPONENT */) {
        if (typeof children === 'object') {
            vnode.shapeFlag |= 16 /* SLOT_CHILDREN */;
        }
    }
    return vnode;
}
function getShapeFlag(type) {
    return typeof type === 'string' ? 1 /* ELEMENT */ : 2 /* STATEFUL_COMPONENT */;
}

// 源码中这段是由渲染器的返回的
// 渲染器中的createApp 是由createAppAPI返回的一个工厂函数
function createApp(rootComponent) {
    return {
        mount: function (rootContainer) {
            var vnode = createVNode(rootComponent);
            render(vnode, rootContainer);
        }
    };
}

function h(type, props, children) {
    return createVNode(type, props, children);
}

function renderSlots(slots, name, props) {
    var slot = slots[name];
    if (slot) {
        if (typeof slot === 'function') {
            return createVNode('div', {}, slot(props));
        }
    }
}

export { createApp, h, renderSlots };
