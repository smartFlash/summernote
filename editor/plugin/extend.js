/**
 * Created by sec on 16-1-6.
 */
var qix=(
    function(){

        function msgBox(option,callback){

            var msg = option.hasOwnProperty("msg")?option.msg:"";
            var timeout = option.hasOwnProperty("timeout")?option.timeout:2000;
            var className=option.hasOwnProperty("className")?option.className:"default";

            var msgElement=document.createElement("div");
            msgElement.className="e-msg-bar animated fadeInDown alert-"+className;
            msgElement.innerHTML=msg;
            document.getElementsByTagName("body")[0].appendChild(msgElement);
            setTimeout((function(){
                return function(){
                    msgElement.className="e-msg-bar animated fadeOutUp alert-"+className;
                }
            })(this),timeout);
            setTimeout((function(){

                return function(){
                    if(typeof callback==="function") callback();
                    msgElement.parentNode.removeChild(msgElement);
                }
            })(this),timeout+1000)

        };

        function uploadFile(option) {
          return new Promise(function(resolve, reject) {
            var audioUploadUrl = "http://up.qiniu.com";
            if (!(option instanceof Object)) throw new Error("Arguments is not object!");
            if (option.file.length > 0 && option.token != "") throw new Error("form input error!");
            var xhr = new XMLHttpRequest();
            xhr.open('POST', audioUploadUrl, true);
            var formData, startDate;
            formData = new FormData();
            if (option.key !== null && option.key !== undefined) formData.append('key', option.key);
            formData.append('token', option.token);
            formData.append('file', option.file);
            var taking;
            //进度条dom
            var progressWrapDiv = document.createElement("div");
            progressWrapDiv.style = "opacity: 1;position: fixed;top: 0;left: 0;z-index: 9999;-webkit-transition: opacity 0.4s linear 0.4s;transition: opacity 0.4s linear 0.4s"
            var progressInnerDiv = document.createElement("div");
            progressInnerDiv.style = "position: fixed;top: 0;left: 0;color:#fff;height: 3px;z-index: 9999;background: #77b6ff;box-shadow: 0 0 10px rgba(119,182,255,0.7);-webkit-transition: width 0.4s ease;transition: width 0.4s ease";
            progressWrapDiv.appendChild(progressInnerDiv)
            document.body.appendChild(progressWrapDiv);
            //上传进度事件
            xhr.upload.addEventListener("progress", function(event) {

              if (event.lengthComputable) {
                //计算上传速率:已经完成文件大小/1024/(当前时间－开始上传时间)
                //(loaded)/1024/(nowDate - startDate)
                var nowDate = new Date().getTime();
                taking = nowDate - startDate;
                var x = (event.loaded) / 1024;
                var y = taking / 1000;
                var uploadSpeed = (x / y);
                var formatSpeed;
                if (uploadSpeed > 1024) {
                  formatSpeed = (uploadSpeed / 1024).toFixed(2) + "Mb\/s";
                } else {
                  formatSpeed = uploadSpeed.toFixed(2) + "Kb\/s";
                }
                //event.loaded已经完成上传的大小
                var percentComplete = Math.round(event.loaded * 100 / event.total);
                progressInnerDiv.style.width = percentComplete + "%";
                progressInnerDiv.style.padding="0 0 0 "+percentComplete + "%";
                progressInnerDiv.innerHTML=percentComplete + "%";
              }
            }, false);

            xhr.onreadystatechange = function(response) {
              if (xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != "") {
                //var blkRet = JSON.parse(xhr.responseText);
                resolve(xhr.responseText)
                progressWrapDiv.remove();
              } else if (xhr.status != 200 && xhr.responseText) {
                reject(JSON.parse(xhr.responseText).error);
                progressWrapDiv.remove();
              }
            };
            startDate = new Date().getTime();
            xhr.send(formData);
          })
        }
        return {
            msgBox:msgBox,
            uploadFile:uploadFile
        }
    }
)();
