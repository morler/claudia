# Claudia 项目待办事项

## 🚨 高优先级任务

### 1. Windows Claude Code 路径检测修复
**状态**: ✅ 已完成  
**文件**: `src-tauri/src/claude_binary.rs`  
**问题**: Windows环境下无法正确检测Claude Code安装位置 - 已修复

#### ✅ 已修复的问题
- ✅ **环境变量修复**: Windows使用 `USERPROFILE` 替代 `HOME`
- ✅ **可执行文件扩展名**: Windows下自动添加 `.exe` 后缀
- ✅ **Windows特定路径**: 添加完整的Windows安装路径检测
- ✅ **命令修复**: Windows下使用 `where` 替代 `which`

#### ✅ 新增Windows检测路径
- `C:\Program Files\Claude Code\claude.exe`
- `C:\Program Files (x86)\Claude Code\claude.exe`  
- `%USERPROFILE%\.claude\local\claude.exe`
- `%USERPROFILE%\AppData\Roaming\npm\claude.exe`
- `%USERPROFILE%\AppData\Local\Programs\Claude Code\claude.exe`
- `%USERPROFILE%\scoop\apps\claude\current\claude.exe`
- `%USERPROFILE%\chocolatey\bin\claude.exe`
- `%USERPROFILE%\node_modules\.bin\claude.exe`
- `%USERPROFILE%\AppData\Roaming\npm\node_modules\.bin\claude.exe`

#### ✅ 实施完成
- ✅ 修改环境变量获取逻辑 (支持USERPROFILE)
- ✅ 添加Windows特定路径检查
- ✅ 处理可执行文件扩展名 (`.exe`)
- ✅ 改进 which/where 命令检测
- ✅ 通过Rust编译和语法检查测试

---

### 2. Windows 窗口样式适配修复
**状态**: 🔄 待处理  
**问题**: Windows版本仍使用macOS样式（透明背景、圆角），不符合Windows设计规范

#### 核心问题
- `tauri.conf.json`: `decorations: false`, `transparent: true`
- `main.rs`: 只有macOS毛玻璃效果处理
- `styles.css`: 强制圆角和透明背景

#### 修复方案
1. **平台特定Tauri配置**
   - Windows: `decorations: true`, `transparent: false`
   - 保持macOS现有设计

2. **动态窗口配置** (`main.rs`)
   ```rust
   #[cfg(target_os = "windows")]
   {
       window.set_decorations(true).unwrap();
       window.set_transparent(false).unwrap();
   }
   ```

3. **平台特定CSS样式**
   - Windows: 移除圆角，使用原生背景
   - macOS: 保持现有圆角透明设计

#### 实施步骤
- [ ] 修改 `tauri.conf.json` 添加平台配置
- [ ] 在 `main.rs` 添加Windows窗口初始化
- [ ] 创建平台特定CSS样式类
- [ ] 添加运行时平台检测
- [ ] 优化 `CustomTitlebar` 组件平台适配

#### 依赖需求
```json
{
  "dependencies": {
    "@tauri-apps/plugin-os": "^2.0.0"
  }
}
```

---

## 📋 中优先级任务

### 3. 改善Windows开发环境兼容性
- [ ] 在 `package.json` 中添加Windows特定脚本
- [ ] 提供 npm/yarn 备选命令文档
- [ ] 优化 `CLAUDE.md` 中的Windows开发说明

### 4. CI/CD Windows构建优化
- [ ] 确保Windows构建流水线包含正确依赖
- [ ] 验证生成的Windows安装程序 (MSI/NSIS)
- [ ] 添加Windows构建测试

---

## ✅ 已完成任务

### Windows编译问题修复
- ✅ **Bun路径修复**: 使用独立bun.exe (`D:\Dev\nodejs\bun.exe`)
- ✅ **构建验证**: 成功生成 `claudia.exe` (15.9MB)
- ✅ **配置确认**: Bundle配置包含Windows目标 (`msi`, `nsis`)
- ✅ **图标文件**: `icon.ico` 已存在且配置正确

### 构建命令
```bash
# 安装依赖
"D:\Dev\nodejs\bun.exe" install

# 构建应用
"D:\Dev\nodejs\bun.exe" run tauri build --no-bundle
```

**生成文件**: `src-tauri/target/release/claudia.exe`

---

## 🔧 技术细节

### 当前技术栈
- **前端**: React 18 + TypeScript + Vite 6
- **后端**: Rust + Tauri 2  
- **UI**: Tailwind CSS v4 + shadcn/ui
- **包管理**: Bun (Windows使用独立exe)
- **目标平台**: Linux, macOS, Windows

### 编译环境状态
- ✅ Rust编译链正常 (x86_64-pc-windows-msvc)
- ✅ Node.js v22.14.0 可用
- ✅ Bun v1.2.17 可用 (独立exe)
- ✅ Windows构建资源完整

---

## 🎯 下一步行动

**立即执行**: 
1. 修复Windows Claude Code路径检测 (阻塞核心功能)
2. 实现Windows原生窗口样式 (改善用户体验)

**后续规划**:
3. 完善Windows开发文档
4. 优化CI/CD构建流程