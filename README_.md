## findComponents系列方法  
适用于以下场景：  
1. 由一个组件，向上找到最近的指定组件
2. 由一个组件，向上找到所有的指定组件
3. 由一个组件，向下找到最近的指定组件
4. 由一个组件，向下找到所有的指定组件
5. 由一个组件，找到指定组件的兄弟组件

上述方法写在assists.js文件中

### Checkbox组件设计
1. 因为要在Checkbox组件上使用v-model来绑定数据，所以比不可少的一个prop就是value,还有event input
2. 扩展两个属性  trueValue + falseValue, 让用户指定value用什么值来判断是否选中。
3. disabled属性表示是否禁用

4. 自定义事件： ① input ② on-change:当选中/取消选中时触发，用于通知父级状态发生了变化。
5. slot使用默认，显示辅助文本
