# Gene Atlas: Morin Khuur 马头琴文化基因图谱

[![GitHub license](https://img.shields.io/github/license/JiangLai999/matouqin?color=blue)]()
[![GitHub stars](https://img.shields.io/github/stars/JiangLai999/matouqin?style=social)](https://github.com/JiangLai999/matouqin/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/JiangLai999/matouqin?style=social)](https://github.com/JiangLai999/matouqin/network/members)
[![GitHub last commit](https://img.shields.io/github/last-commit/JiangLai999/matouqin?color=green)](https://github.com/JiangLai999/matouqin/commits/master)
[![GitHub repo size](https://img.shields.io/github/repo-size/JiangLai999/matouqin?color=orange)](https://github.com/JiangLai999/matouqin)
[![Languages](https://img.shields.io/github/languages/top/JiangLai999/matouqin?color=yellow)](https://github.com/JiangLai999/matouqin)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

> 拨动时间的琴弦，解码马头琴的文化基因。从草原神话的远古回响，到跨界融合的 renewed 歌声。

## 项目简介

**Gene Atlas: Morin Khuur** 是一个以马头琴（Morin Khuur）为主题的交互式文化基因图谱网站。通过现代化的网页设计与滚动动画技术，系统性地展示马头琴的历史渊源、器型结构、制作工艺、纹样艺术、音乐分类及传承发展等文化内容。

## 功能板块

| 板块 | 内容 |
|------|------|
| 首页 | 沉浸式 Hero 区域，引入马头琴文化主题 |
| 结构与器型 | 马头琴解剖学 SVG 图示，标注各部件名称与功能 |
| 历史脉络 | 从唐宋奚琴到现代马头琴的演变时间线 |
| 制作工艺 | 选材、雕刻、蒙皮、上漆等十二道工序展示 |
| 样本展示 | 多种马头琴样本图片与器型对比 |
| 马头琴纹样 | 云纹、回纹、犄纹、盘肠纹等传统纹样解析 |
| 文化与故事 | 马头琴相关的蒙古族神话与民间故事 |
| 音乐分类 | 宫廷音乐、民间音乐、叙事音乐、说唱音乐等分类 |
| 演奏 | 演奏姿势、指法、手法图解 |
| 传承与发展 | 传承树状图，展示马头琴的传承脉络 |
| 应用场景 | 马头琴在现代生活中的应用 |
| 终章 | 尾声与展望 |

## 技术栈

- **HTML5 / CSS3 / JavaScript** — 纯静态网站
- [GSAP](https://greensock.com/gsap/) + [ScrollTrigger](https://greensock.com/scrolltrigger/) — 滚动动画
- [Lenis](https://github.com/darkroomengineering/lenis) — 平滑滚动
- [D3.js](https://d3js.org/) — 数据可视化
- [Google Fonts](https://fonts.google.com/) — Cormorant Garamond, Noto Sans SC, Noto Serif SC

## 项目结构

```
matouqin/
├── index.html                  # 主页面（单页滚动）
├── history.html                # 历史脉络独立页面
├── style.css                   # 基础样式
├── style.appfix.css            # 应用修复样式
├── history-style.css           # 历史页面样式
├── history-page.js             # 历史页面脚本
├── css/
│   ├── patterns-section.css    # 纹样部分样式
│   └── music-classification.css # 音乐分类样式
├── js/
│   ├── gsap.min.js             # GSAP 动画库
│   ├── lenis.min.js            # 平滑滚动库
│   ├── ScrollTrigger.min.js    # GSAP 滚动触发
│   ├── main.js                 # 主脚本
│   └── main.appfix.js          # 应用修复脚本
├── assets/
│   ├── application/            # 应用场景图片
│   ├── craft/                  # 制作工艺图片
│   ├── images/                 # 通用图片
│   ├── instrument-types/       # 乐器样本
│   ├── materials/              # 材料图片
│   ├── music-classification/   # 音乐分类素材
│   ├── patterns/               # 纹样图片
│   ├── performance/            # 演奏素材
│   ├── tools/                  # 工具图片
│   └── *.svg / *.fbx / *.glb  # 3D模型和SVG解剖图
└── img/                        # 额外图片资源
```

## 本地运行

### 方式一：使用启动脚本

双击运行 `启动服务器.bat`，然后在浏览器访问 `http://localhost:8000`

### 方式二：手动启动

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (需安装 http-server)
npx http-server -p 8000
```

然后在浏览器中打开 `http://localhost:8000`

## 浏览器兼容性

推荐使用现代浏览器访问：
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 许可证

本项目仅供学习与文化交流使用。

---

<p align="center">Made with ❤️ for Morin Khuur Culture</p>
