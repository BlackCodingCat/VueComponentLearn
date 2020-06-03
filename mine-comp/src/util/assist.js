
/**
 * 由一个组件，向上找到最近的指定组件
 * @date 2020-05-27
 * @param {any} context
 * @param {any} componentName
 * @returns {any}
 */
function findComponentUpward(context, componentName) {
  let parent = context.$parent;
  let name = parent.$options.name;

  while(parent && (!name || [componentName].indexOf(name) < 0)) {
    parent = parent.$parent;
    if(parent) name = parent.$options.name;
  }

  return parent;
}

/**
 * 向上找到所有的指定组件
 * @date 2020-05-27
 * @param {any} context
 * @param {any} componentName
 * @returns {any}
 */
function findComponentsUpward(context, componentName) {
  let parents = [];
  const parent = context.$parent;

  if(parent) {
    if(parent.$options.name === componentName) parents.push(parent);
    return parents.concat((findComponentsUpward(parent, componentName)));
  }else {
    return [];
  }
}

/**
 * 向下找到最近的组件
 * @date 2020-05-27
 * @param {any} context
 * @param {any} componentName
 * @returns {any}
 */
function findComponentDownWard(context, componentName) {
  const childrens = context.$children;
  let children = null;

  if(children.length) {
    for (const child of childrens) {
      const name = child.$options.name;

      if(name === componentName) {
        children = child;
        break;
      }else {
        children = findComponentDownWard(child, componentName);
        if(children) break;
      }
    }
  }
  return children;
}

export {
  findComponentUpward,
  findComponentsUpward,
  findComponentDownWard
};