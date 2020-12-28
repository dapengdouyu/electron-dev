const { autoUpdater } = require("electron-updater");
const { dialog } = require("electron");

// 检测更新，在你想要检查更新的时候执行，renderer事件触发后的操作自行编写
module.exports = function updateHandle() {
  autoUpdater.autoDownload = false; // 将自动下载包设置为false，产品的需求是让用户自己点击更新下载
  let message = {
    error: "检查更新出错",
    checking: "正在检查更新……",
    updateAva: "检测到新版本，正在下载……",
    updateNotAva: "现在使用的就是最新版本，不用更新",
  };

  autoUpdater.on("error", function (error) {
    console.log(message.error);
  });
  autoUpdater.on("checking-for-update", function () {
    dialog
      .showMessageBox({
        type: "none",
        title: "版本更新",
        message: "是否进行版本更新",
        buttons: ["确定", "忽视"],
      })
      .then((res) => {
        console.log(res);
        autoUpdater.downloadUpdate();
      });
    console.log(message.checking);
  });
  autoUpdater.on("update-available", function (info) {
    console.log(message.updateAva);
  });
  autoUpdater.on("update-not-available", function (info) {
    console.log(updateNotAva);
  });

  // 更新下载进度事件
  autoUpdater.on("download-progress", function (progressObj) {
    console.log("下载进度", progressObj);
  });
  autoUpdater.on(
    "update-downloaded",
    function (
      event,
      releaseNotes,
      releaseName,
      releaseDate,
      updateUrl,
      quitAndUpdate
    ) {
      console.log("更新完成");
      autoUpdater.quitAndInstall();
    }
  );

  //执行自动更新检查
  autoUpdater.checkForUpdates();
};
