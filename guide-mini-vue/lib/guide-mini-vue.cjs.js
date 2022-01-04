'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function createComponentInstance(vnode) {
    var component = {
        vnode: vnode,
        type: vnode.type,
        setupState: {}
    };
    return component;
}
function setupComponent(instance) {
    // TODO
    // initProps
    // TODO
    // initSlots
    setupStatefulComponent(instance);
}
function setupStatefulComponent(instance) {
    var Component = instance.vnode.type;
    instance.proxy = new Proxy({}, {
        get: function (target, key) {
            var setupState = instance.setupState;
            if (key in setupState) {
                return setupState[key];
            }
            if (key === '$el') {
                return instance.vnode.el;
            }
        }
    });
    var setup = Component.setup;
    if (setup) {
        var setupResult = setup();
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
    if (typeof vnode.type === 'string') {
        processElement(vnode, container);
    }
    else {
        processComponent(vnode, container);
    }
    // processElement() 
}
function processElement(vnode, container) {
    mountElement(vnode, container);
}
function mountElement(vnode, container) {
    var el = (vnode.el = document.createElement(vnode.type));
    var children = vnode.children, props = vnode.props;
    if (typeof children === 'string') {
        el.textContent = children;
    }
    else if (Array.isArray(children)) {
        children.forEach(function (v) { return patch(v, el); });
    }
    for (var key in props) {
        var val = props[key];
        el.setAttribute(key, val);
    }
    container.append(el);
}
function processComponent(vnode, container) {
    mountComponent(vnode, container);
}
function mountComponent(vnode, container) {
    var instance = createComponentInstance(vnode);
    setupComponent(instance);
    setupRenderEffect(instance, vnode, container);
}
function setupRenderEffect(instance, vnode, container) {
    var proxy = instance.proxy;
    var subTree = instance.render.call(proxy);
    patch(subTree, container);
    vnode.el = subTree.el;
}

function createVNode(type, props, children) {
    var vnode = {
        type: type,
        props: props,
        children: children,
        el: null
    };
    return vnode;
}

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

exports.createApp = createApp;
exports.h = h;
