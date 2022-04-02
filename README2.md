## README2

主体内容： 针对项目的总结和思考

1 父子通信的层级架构问题

- 1 纯组件 CSS 问题：不要在组件外围写 CSS 样式。哪里使用，就在父组件处包裹这个组件写即可。 另外组件的 CSS 样式最好还是维护 Css 文件。 因为一旦需要适应新的设备。 我们只需要增加一份 CSS 文件即可。 而不用改变组件内部的样式

- 2 层级机构只能 2 个。page 的 index 作为 数据的处理核心。 下面是 纯组件。 这样数据的传输就不会变得复杂。层级的结构并非页面的划分， 而是数据层面上的整体和细节。 保证每一个大块部分： 1 index 核心 2 子组件 纯组件。出现多个复杂层级。就是用数据中心的库。

- 3 纯组件的样板: 一个 data 传进来的数据。 handleA 处理传出去的数据. 若是需要父需要获取子多个值。可以利用一个对象：subStatus 包裹属性值，而不是单独写。

```
import React from 'react';

const A = (props) => {
  // subStatus = {A: '', B: ''}
  const { data,handleA, subStatus } = props;
  return (
    <div>
        {data ? (
            123
        ) : null}
    </div>
  );
};

export default A;
```

2 对于 form 表单。缺少 label，而需要对其的情况。 策略是：可以设置 label = '1' 然后隐藏可见。

```
ant-form-item-label {
visibility: hidden;
}
```
