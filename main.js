// ==UserScript==
// @name         PKU-Thesis-Download 北大论文平台下载工具
// @namespace    https://greasyfork.org/zh-CN/scripts/442310-pku-thesis-download
// @supportURL   https://github.com/xiaotianxt/PKU-Thesis-Download
// @supportURL   https://github.com/beerDuc/PKU-Thesis-Download
// @supportURL   https://github.com/xmp4660/PKU-Thesis-Download
// @homepageURL  https://github.com/xiaotianxt/PKU-Thesis-Download
// @version      1.1
// @description  北大论文平台下载工具，请勿传播下载的文件，否则后果自负。
// @author       xiaotianxt, modified by beerDuc，xmp4660 has been modified twice
// @match        https://drm.lib.pku.edu.cn/pdfindex1.jsp?fid=*
// @match        http://162.105.134.201/pdfindex.jsp?fid=*
// @match        https://drm.lib.pku.edu.cn/pdfindex.jsp?fid=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pku.edu.cn
// @require      https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/notify/0.4.2/notify.min.js
// @license      GNU GPLv3
// ==/UserScript==

(function () {
    "use strict";
    const fid = $("#fid").val();
    const totalPage = parseInt($("#totalPages").html().replace(/ \/ /, ""));
    const baseUrl1 = `https://drm.lib.pku.edu.cn/jumpServlet?fid=${fid}`;
    const baseUrl ='https://drm.lib.pku.edu.cn/jumpServlet?';
    const userid ='' ;
    const visitid = '';
    const msgBox = initUI();
    let filename;

    function initUI() {
        // 下载按钮
        const downloadButton = document.querySelector("#thumbtab").cloneNode(true);
        downloadButton.innerHTML = `
    <div class="panel-bg" style="background: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAAAXNSR0IArs4c6QAAAMZlWElmTU0AKgAAAAgABgESAAMAAAABAAEAAAEaAAUAAAABAAAAVgEbAAUAAAABAAAAXgEoAAMAAAABAAIAAAExAAIAAAAVAAAAZodpAAQAAAABAAAAfAAAAAAAAAEsAAAAAQAAASwAAAABUGl4ZWxtYXRvciBQcm8gMi4zLjQAAAAEkAQAAgAAABQAAACyoAEAAwAAAAEAAQAAoAIABAAAAAEAAAAdoAMABAAAAAEAAAAdAAAAADIwMjI6MDM6MjkgMTk6MTQ6MTYADQUkCgAAAAlwSFlzAAAuIwAALiMBeKU/dgAAA7JpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDYuMC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+Mjk8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+Mjk8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8eG1wOkNyZWF0b3JUb29sPlBpeGVsbWF0b3IgUHJvIDIuMy40PC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDIyLTAzLTI5VDE5OjE0OjE2KzA4OjAwPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAyMi0wMy0yOVQxOToxODowMSswODowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+MzAwMDAwMC8xMDAwMDwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+MzAwMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CjhvUtkAAAGiSURBVEgNY2QgEUyaNOkSUIsumrYneXl5smhiOLlMOGVoKDFqKQ0Dl4FhNHiHX/AyEvLShAkT1BkZGQ1h6oDsLiAbvSD4AhSbBVPDxMS0Jicn5ziMj06zoAug85mZmdn+//8/GyjOgy6HxAfJFYH4QLVv/v37148kh8EkmHpzc3MvAw2KAZmHoRtTAKQmFlgkPsGUQogQtBSkND8/fyPQ4mqENpysVqDaHThloRJEWQpSCzSsHWjxMjwG7nv37l09Hnm4FNGWgnTw8fElA6lTcN0IxjNWVtbIhoaGfwgh3CySLE1MTPzx9+/fAKCPnyIZ+RvID83MzHyFJIaXSZKlIJMKCwufAyl/IP4O4gNBETDoj0GYNCYnT57sB6zQa8ixhnHixIlFwAyfi6R5CjDJ9yLxKWYCHVgBjIJ0mEGgwkEAiBVgAlA+EpdyJrCwEAR6TAFmEslxCtNICT1qKSWhR1AvRi0DjHBmYMnCRlAnCQpAZiIrx7AUmLQrhYSEKpEVUZs9MAkJ6PXH1PYJIfNAPl0EDNK1QPyLkGIqyP8EmrESAOSDcPfT979hAAAAAElFTkSuQmCC&quot;) center center no-repeat;"></div>
    <span class="panel-name">下载</span>
    `;
        document.querySelector("#btnList").appendChild(downloadButton);
        downloadButton.addEventListener("click", download);

        // msgBox
        const msgBox = downloadButton.querySelector("span");
        return msgBox;
    }

    async function download(e) {
        e.preventDefault();
        e.target.disabled = true;
        filename = prompt("请输入文件名:", "默认文件名");
        if (filename === null || filename.trim() === "") {
            alert("您没有输入文件名。");
            e.target.disabled = false;
            return; // 用户没有输入文件名，终止下载操作
        }
        const urls = await solveSrc();
        const base64s = await solveImg(urls);
        solvePDF(base64s);
        e.target.disabled = false;
    }

    /**
     * 解析pdf图片链接
     */
    async function solveSrc() {
        async function downloadSrcInfo(url) {
            return fetch(url)
                .then((res) => res.json())
                .then((json) => {
                finished+3;
                msgBox.innerHTML = finished + "/" + page;
                return json.list;
            });
        }
        let urlPromise = [];
        let page = 0;
        let finished = 0;
        for (; page < totalPage; page+=3) {
            const url = baseUrl + "page=" + page+"&fid="+fid+"&userid="+userid+"&filename="+filename+"&visitid=";
            urlPromise.push(downloadSrcInfo(url));
            msgBox.innerHTML = finished + "/" + page;
        }

        if(page==totalPage){
            const url = baseUrl + "page=" + (page-1)+"&fid="+fid+"&userid="+userid+"&filename="+filename+"&visitid=";
            urlPromise.push(downloadSrcInfo(url));
            msgBox.innerHTML = finished + "/" + page;
        }
        return Promise.all(urlPromise);
    }

    /**
     * 下载图片
     */
    async function solveImg(urls) {
        // 下载图片函数
        async function downloadPdf(url) {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
                    'Accept-Encoding': 'gzip, deflate, br, zstd',
                    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
                    'Connection': 'keep-alive',
                    'Dnt': '1',
                    'Host': 'drm.lib.pku.edu.cn',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 Edg/123.0.0.0'
                },
                // mode: 'no-cors' // 如果需要的话，可以添加这个选项，但请注意这会限制响应的类型和内容
            });
            const blob = await response.blob();
            const objectURL = URL.createObjectURL(blob);
            return new Promise((resolve) => {
                resolve(objectURL);
            });
        }

        const base64Promise = [];
        let numTotal = 0;

        for (const triple of urls) {
            for (const item of triple) {
                try {
                    const base64 = await downloadPdf(item.src);
                    base64Promise.push(base64);
                    numTotal++;
                    msgBox.innerHTML = numTotal;
                } catch (error) {
                    console.error("Failed to download image:", error);
                }
            }
        }

        return Promise.all(base64Promise);
    }

    /**
     * 拼接为pdf
     * @param {*} base64s
     */
    async function solvePDF(base64s) {
        msgBox.innerHTML = "拼接中";
        const doc = new jspdf.jsPDF();
        base64s.forEach((base64, index) => {
            doc.addImage(base64, "JPEG", 0, 0, 210, 297);
            index + 1 == base64s.length || doc.addPage();
        });
        msgBox.innerHTML = "保存中";
        doc.save(document.title + ".pdf");
        msgBox.innerHTML = "完成！";
    }
})();
