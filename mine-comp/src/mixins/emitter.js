// 父组件向子组件发出通信
function broadcast(componentName, eventName, params) {
    const children = this.$children;
    children.forEach(child => {
        const compName = child.$options.name;
        // 递归查找组件名
        if (compName === componentName) {
            child.$emit.apply(child, [eventName].concat(params));
        } else {
            broadcast.apply(child, [componentName, eventName].concat(params));
        }
    })
}

// 子组件向父组件发出通信
function dispatch(componentName, eventName, params) {
    // 父组件只有一个
    let parent = this.$parent || this.$root;
    let compName = parent.$options.name;

    while (parent && (!compName || compName !== componentName)) {
        parent = parent.$parent;

        if (parent) {
            compName = parent.$options.name;
        }
    }

    if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
    }
}

export default {
    methods: {
        dispatch(componentName, eventName, params) {
            dispatch.call(this, componentName, eventName, params);
        },
        broadcast(componentName, eventName, params) {
            broadcast.call(this, componentName, eventName, params);
        }
    },
}