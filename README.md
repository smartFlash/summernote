# Summernote
Summernote是一个非常强大的WYSIWYG富文本编辑器,默认视频是支持优酷、Instagram、 DailyMotion、Youtube等

修改Summernote的原因是因为它默认的图片上传是转换成base64的编码,如何这个写入数据库就是完了。尤其是对于一个图片比较多的平台。用户使用一次我们的产品，几本上要花完大部分的流量。

修改部分:
- 图片上传定制化，集成[七牛云存储](http://qiniu.com).支持批量上传，修改了默认的图片上传代码
- 新增视频上传与音频上传.也是集成的[七牛云存储](http://qiniu.com)
- 扩展默认外链视频,新增腾讯视频.现在很多产品都是基于微信公众平台开发的。而微信公众平台只支持腾讯视频。所以你懂的.(这一项需要修改summernote.js源码,具体代码如自定义代码部分)
- 暂时只有这么多，打算下一步集成emoji表情。但是目前项目中用不到，具体时间不确定。如果有人需要可以发起issue

### Demo
![example](https://github.com/smartFlash/summernote/blob/develop/images/example.jpg)

![example2](https://github.com/smartFlash/summernote/blob/develop/images/example2.jpg)

##自定义代码

editor/plugin/extend.js为扩展js。原生javascript写的上传封装
editor/plugin/extend.css 为编辑器css样式
如果是想增加腾讯视频支持，就不能使用公共CDN 的，需要使用`editor/summernote.js`


##测试方法

所有的例子均保存在editor目录下面.如果你安装有Python。在项目目录下面执行
```
 python -m SimpleHTTPServer 8000
```

打开浏览器输入:`http://localhost:8000/editor/`即可测试

腾讯视频测试代码：
```
<iframe frameborder="0" width="640" height="498" src="http://v.qq.com/iframe/player.html?vid=y0184s9x0i3&tiny=0&auto=0" allowfullscreen></iframe>

得到视频地址：http://v.qq.com/iframe/player.html?vid=y0184s9x0i3&tiny=0&auto=0
```

## 官方介绍
[![Build Status](https://secure.travis-ci.org/summernote/summernote.svg)](http://travis-ci.org/summernote/summernote) [![npm version](https://badge.fury.io/js/summernote.svg)](http://badge.fury.io/js/summernote) [![Dependency Status](https://gemnasium.com/summernote/summernote.svg)](https://gemnasium.com/summernote/summernote) [![Coverage Status](https://coveralls.io/repos/summernote/summernote/badge.svg?branch=develop&service=github)](https://coveralls.io/github/summernote/summernote?branch=develop)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/summernoteis.svg)](https://saucelabs.com/u/summernoteis)

## Summernote
Summernote is a JavaScript library that helps you create WYSIWYG editors online.

官方主页: [http://summernote.org](http://summernote.org)

## Why Summernote?
部分特点:
- 直接复制粘贴剪切板图片
- 实现图片base64编码.（已经被我用七牛的重写了，此优点又爱又恨）
- UI简单
- 交互性强
- 不是花瓶、它可以与服务端集成

## Summernote依赖包
- [jQuery](http://jquery.com/)
- [Bootstrap](http://getbootstrap.com).

For [Meteor](http://github.com/meteor/meteor), just run `meteor add summernote:summernote`. More info in the [Meteor README](meteor/README.md).

For other/no frameworks:

### 1. 引入 JS/CSS
Include the following code in the `<head>` tag of your HTML:

```html
<!-- include libraries(jQuery, bootstrap) -->
  <link href="//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet"/>
  <script src="//cdn.bootcss.com/jquery/2.1.4/jquery.min.js"></script>
  <script src="//cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>

<!-- include summernote css/js-->
  <link href="//cdn.bootcss.com/summernote/0.8.1/summernote.css" rel="stylesheet">
  <script src="summernote.js"></script>
  <!--中文汉化-->
  <script src="//cdn.bootcss.com/summernote/0.8.1/lang/summernote-zh-CN.min.js"></script>
```

### 2. target a element
Then place a `div` tag somewhere in the `body` tag. This element will be replaced with the summernote editor.

```html
<div id="summernote">Hello Summernote</div>
```

### 3. summernote
Finally, run this script after the DOM is ready:

```javascript
$(document).ready(function() {
  $('#summernote').summernote();
});
```

具体例子, please visit to [homepage](http://summernote.org/examples).

## API
`code` - 获取文本内容的html源码:

```javascript
var html = $('#summernote').summernote('code');
```

For more detail about API, please refer to [document](http://summernote.org/getting-started/#basic-api).

### Warning - code injection
The code view allows the user to enter script contents. Make sure to filter/[sanitize the HTML on the server](https://github.com/search?l=JavaScript&q=sanitize+html). Otherwise, an attacker can inject arbitrary JavaScript code into clients.

### document structure

```
 - body container: <div class="note-editable">, <td>, <blockquote>, <ul>
 - block node: <div>, <p>, <li>, <h1>, <table>
 - void block node: <hr>
 - inline node: <span>, <b>, <font>, <a>, ...
 - void inline node: <img>
 - text node: #text
```

1. A body container has block node, but `<ul>` has only `<li>` nodes.
2. A body container also has inline nodes sometimes. This inline nodes will be wraped with `<p>` when enter key pressed.
3. A block node only has inline nodes.
4. A inline nodes has another inline nodes
5. `#text` and void inline node doesn't have children.

### build summernote

```bash
# grunt-cli is need by grunt; you might have this installed already
npm install -g grunt-cli
npm install

# build full version of summernote: dist/summernote.js
grunt build

# generate minified copy: dist/summernote.min.js, dist/summernote.css
grunt dist
```

At this point, you should now have a `build/` directory populated with everything you need to use summernote.

### test summernote
run tests with Karma and PhantomJS

```bash
grunt test
```

If you want run tests on other browser, change the values for `broswers` properties in `Gruntfile.js`.

```
karma: {
  all: {
    browsers: ['PhantomJS'],
    reporters: ['progress']
  }
}
```

You can use `Chrome`, `ChromeCanary`, `Firefox`, `Opera`, `Safari`, `PhantomJS` and `IE` beside `PhantomJS`. Once you run `grunt test`, it will watch all javascript file. Therefore karma run tests every time you chage code.

### start local server for developing summernote.
run local server with connect and watch.

```bash
grunt server
# Open a browser on http://localhost:3000.
# If you change source code, automatically reload your page.
```

### Coding convention
- JSHint: [http://www.jshint.com/about/](http://www.jshint.com/about/)
- JSHint rule: [https://github.com/summernote/summernote/blob/master/.jshintrc](https://github.com/summernote/summernote/blob/master/.jshintrc)

### Contribution guide
- Please read [CONTRIBUTING.md](https://github.com/summernote/summernote/blob/develop/CONTRIBUTING.md) before sending pull requests.

## Contacts
- Email: susukang98@gmail.com
- Twitter: [http://twitter.com/hackerwins](http://twitter.com/hackerwins)
- Chat with us:
- [![Join the chat at https://gitter.im/summernote/summernote](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/summernote/summernote?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## License
summernote may be freely distributed under the MIT license.
