const { app, BrowserWindow } = require("electron");
const updateHandle = require("./update");
const isDev = require("electron-is-dev");
require("./menu/index");
let mainWindow = null;
app.on("ready", () => {
  mainWindow = new BrowserWindow({
    // 创建和控制浏览器窗口
    width: 600, // 窗口宽度
    height: 600, // 窗口高度
    webPreferences: {
      // 网页功能设置
      nodeIntegration: true, // 是否在node工作器中启用工作集成默认false
      enableRemoteModule: true, // 是否启用remote模块默认false
    },
  });
  if (isDev) {
    mainWindow.loadURL("http://localhost:3000"); //加载网址页面
  } else {
    //后面会调节好
    mainWindow.loadFile(
      path.resolve(__dirname, "../renderer/demo/build/index.html")
    ); //加载文件页面
  }
  mainWindow.on("close", () => {
    // 监听窗口关闭
    mainWindow = null; //销毁mainWindow
  });
  updateHandle();
});
