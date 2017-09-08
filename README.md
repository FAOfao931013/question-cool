## 答题专用程序开发文档

### 第一部分 概览
整个项目 基于 微信小程序+LeanCloud 进行前后端的开发。
使用的语言为采用ES6标准的<code>Javascript</code> 。
主要功能为让学生与老师能够进行线上的答题解疑互动操作，包括了出题、答题和反馈等功能。
参考文档
1、[微信小程序开发文档](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/MINA.html)
2、[LeanCloud数据存储开发指南 · JavaScript](https://leancloud.cn/docs/leanstorage_guide-js.html)

### 第二部分 后端设计与开发
后端采用LeanCloud数据存储，特色为方便、简单和高效，并且统一了前后端语言都为<code>Javascript</code>，减少了开发的阻碍。
后端数据主要分为五大部分：

#### 1、用户部分
用户主要分为老师和学生两大部分，通过登录页面进行登录或注册，数据将保存在后台数据库中，不同的用户将进入不同的首页，进行相应的操作。
#### 2、出题部分
只限老师能够使用的出题功能，问题类型可是文字或者图片。
#### 3、答题部分
只限学生能够使用的答题功能，同样可以用文字或者图片进行答题。
#### 4、反馈部分
只限老师能够使用的反馈功能，对于学生提交的答案进行评价与反馈，学生可以在首页查看到自己的答题反馈。
#### 5、文件存储
对于上传的一系列图片进行统一存储和调用，可自行在数据库中进行管理。

参考
1、[LeanCloud](https://leancloud.cn/)

### 第三部分 前端设计与开发
前端UI采用[weui的小程序设计](https://github.com/Tencent/weui-wxss)。
前端语言 采用ES6标准的<code>Javascript</code>，同时还引入了<code>Promise</code>对原生微信小程序<code>API</code>进行封装，使得开发更加便捷。
同样引入的库还有<code>moment.js</code>，可以更加便捷的操作时间日期。
页面主要分为三部分：
#### 1、注册登录页面
进行注册与登录操作，同时还增加了重置密码的页面。
#### 2、学生页面
主要包括学生首页、答题页面和查看反馈页面。
#### 3、老师页面
主要包括老师首页、出题页面、修改问题页面、查看学生列表页面和评论反馈页面。

参考
1、[JavaScript Promise迷你书（中文版）](http://liubin.org/promises-book/#chapter1-what-is-promise)
2、[Moment.js](https://momentjs.com/)

### 第四部分 项目结构
<p>. <br>
├── app.js <br>
├── app.json <br>
├── app.wxss <br>
├── img <br>
├── lib <br>
├── model <br>
├── pages <br>
│   ├── login <br>
│   ├── register <br>
│   ├── reset <br>
│   ├── student <br>
│   │   ├── answer <br>
│   │   ├── comment <br>
│   │   └── index <br>
│   └── teacher <br>
│       ├── detail <br>
│       ├── edit <br>
│       ├── index <br>
│       ├── questions <br>
│       └── students <br>
├── style <br>
└── utils <br>

项目目录与文件释义：
#### 1、小程序文件
<code>app.js</code>小程序全局逻辑文件
<code>app.json</code>小程序公共设置文件
<code>app.wxss</code>小程序全局样式文件
<code>index.wxml</code>、<code>index.js</code>、<code>index.json</code>、<code>index.wxss</code>分别为各个页面的页面结构、逻辑、设置和样式文件。
参考：[小程序目录结构](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/structure.html)
#### 2、图片目录
<code>img</code>目录为页面所用到的图片文件目录，引用时的路径为相对路径。
#### 3、库目录
<code>lib</code>目录为项目所使用的库目录，包括数据库连接文件、<code>Promise</code>库和<code>moment.js</code>时间日期库。
#### 4、模型目录
<code>model</code>目录为数据库存储模型目录，包括用户模型、问题模型、答题模型和反馈模型。
#### 5、页面目录
<code>pages</code>目录为项目页面文件目录，包括了登录注册页面、重置密码页面、学生页面和老师页面。
#### 6、样式目录
<code>style</code>目录为全局引用的样式目录，只包括weui小程序的样式。
#### 7、工具目录
<code>utils</code>目录为常用函数页面，包括了封装微信小程序API的方法等一系列常用方法。