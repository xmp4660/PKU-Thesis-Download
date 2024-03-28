# PKU Thesis Download 北大论文平台下载工具

<div style="display: flex; align-items: center; margin: 2em 0; gap: 1em">
  <a href="https://github.com/xiaotianxt/PKU-Thesis-Download" style="text-decoration: none;">
    <img alt="Static Badge" src="https://img.shields.io/github/stars/xiaotianxt/PKU-Thesis-Download">
  </a>
  <a href="https://github.com/xiaotianxt/PKU-Thesis-Download" style="text-decoration: none;">
    <img src="https://img.shields.io/greasyfork/v/442310" alt="version">
  </a>
  <a href="https://github.com/xiaotianxt/PKU-Thesis-Download" style="text-decoration: none;">
    <img src="https://img.shields.io/greasyfork/dt/442310" alt="total installs">
  </a>
  <a href="https://github.com/xiaotianxt/PKU-Thesis-Download" style="text-decoration: none;">
    <img src="https://img.shields.io/greasyfork/l/442310" alt="license">
  </a>
</div>


## 用途

本工具可以：

1. 下载[北京大学学位论文库](https://thesis.lib.pku.edu.cn/)中可查看的论文。
2. 调整论文清晰度。

本工具不能：

1. 下载未公开的论文。
2. 为**无访问权限**的用户提供权限。
3. 将论文转化为可选中/编辑的格式。

**本脚本仅作为学术工具使用，下载的文件如果泄露，可能会被追究法律责任，本人不承担使用此脚本的一切后果。**

## 用法

1. 安装[tampermonkey](https://www.tampermonkey.net/index.php?ext=dhdg)，无法科学上网可以参考[这里](https://zhuanlan.zhihu.com/p/128453110)。
2. 安装[此脚本](https://greasyfork.org/zh-CN/scripts/442310-pku-thesis-download)。
3. 打开某篇论文在线阅读，在左侧列表可以调整清晰度、下载文件，根据需要点击即可。

## 原理

脚本会首先请求所有 pdf 图片链接，随后异步请求图片，最后调用 jsPDF 渲染 pdf 文件并导出。

## 我想获得可编辑的文本，怎么办？

北京大学论文平台接口只提供图片下载，因此只能间接获得可编辑的文本。可以使用 OCR 工具识别文本。

如果为了获得整篇文章文本，可以考虑使用学校免费提供的 Adobe Acrobat（[北京大学软件平台](https://software.w.pku.edu.cn/) > 使用帮助 > ADOBE ID）, 福昕（[北京大学软件平台](https://software.w.pku.edu.cn/) > 福昕 PDF 编辑软件） 等进行扫描。

如果只需要获得某一段落或部分文本，考虑使用如 [白描](https://baimiao.uzero.cn/)、[Bob](https://github.com/ripperhe/Bob) 等 OCR 工具进行小段落内容识别。

# 新的修改
学位论文库添加了水印，包含了下载者的IP地址与访问时间，传播有风险。去除水印的方法可通过调节亮度与对比度的方式，但是可能会损失部分信息。

修改后的脚本要求提供`filename`参数，获取方式如下：

进入阅读界面后，打开开发人员工具（Ctrl+shift+I），转到网络（network），刷新页面后，会出现一系列如下请求：
![image](https://github.com/xmp4660/PKU-Thesis-Download/assets/62226429/d47fbbf7-a70e-4544-9eef-5777ccfcdfaf)
点击红框中的以`jumpServlet?`开头的请求，如下：
![image](https://github.com/xmp4660/PKU-Thesis-Download/assets/62226429/4b09088c-d5a0-478b-b777-968114031a16)
`xxxxxxxxx.pdf`即为`filename`参数，复制下来，粘贴进如下界面：
![image](https://github.com/xmp4660/PKU-Thesis-Download/assets/62226429/78eefcb9-937a-4891-b5b1-92f74eed7d26)

# 如何安装？
修改后的插件未发布于GreasyFork，所有无法一键安装。点击添加新脚本后，将`main.js`中的全部内容复制进去即可
![image](https://github.com/xmp4660/PKU-Thesis-Download/assets/62226429/42c1ff4b-d3f7-4aa6-87a3-1845af5da352)
![image](https://github.com/xmp4660/PKU-Thesis-Download/assets/62226429/5fb9d17d-bc32-40bf-b994-035ee0929990)

