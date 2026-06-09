# ECOCO 智慧回收機申請設置 — 招募平台 PRD

> [!NOTE]
> **功能優化提案 (Feature Refinement)**
> 針對您提出的「更改案例展示圖片」與「更動表單內容與選項」兩項需求，為避免過度設計並確保符合您的實際情境，我們需要先釐清方向。請見下方 [User Review Required] 區塊。

## User Review Required

### 1. 關於「更動表單內容與選項」
（How Might We：如何讓非技術人員能輕鬆更改前台表單選項，同時保持系統穩定且不需巨大重構？）

**請評估以下哪個方向最符合您的需求：**
- **方向 A（最簡單 / 建議）：直接修改程式碼。** 如果表單的欄位跟選項久久才改一次，建議直接告知我您想改什麼（例如幫您增減「機型需求」的選項），由我直接在程式碼中幫您修改。這是最快、最不會出錯的方式。
- **方向 B（中等難度）：後台編輯「現有下拉選單」的選項。** 我們在後台「內容編輯器」中新增設定區塊，讓您可以隨時自由輸入選項（例如將機型需求改為 `A機型, B機型, C機型`），前台的下拉選單就會跟著變。但表單的「基本架構（需要填寫哪些問題）」是固定的。
- **方向 C（極高難度 / 暫不建議）：全動態表單建置器。** 在後台可以隨意新增文字框、單選題、刪除既有問題等。這需要徹底改寫資料庫結構、Google Sheets API 和前台渲染邏輯，開發成本極高且容易產生 Bug。

### 2. 關於「更改案例展示的圖片」
目前後台的「案例展示」只有文字編輯，確實缺少了圖片上傳功能。
**確認問題：**
我們預計為後台的「每一筆案例資料（Case Study）」新增一個獨立的「上傳圖片」按鈕與圖片網址欄位，上傳後會透過 Vercel Blob 儲存並直接更新到前台網頁上。這部分是否完全符合您的期待？

---
本專案為 ECOCO 智慧回收機建立一個招募平台，用於收集場域合作夥伴的申請設置資料。平台分為**前台公開頁面**（首頁、案例展示、申請表單）與**後台管理系統**（內容編輯、儀表板、名單管理），使用 Google Sheets 作為資料庫，部署於 Vercel。

---

## 1. 技術架構

### 1.1 技術選型

| 項目 | 方案 |
|---|---|
| **框架** | Next.js 15 (App Router) |
| **語言** | TypeScript |
| **樣式** | Vanilla CSS（CSS Variables 建立 Design Token System） |
| **資料庫** | Google Sheets API v4 + Service Account |
| **驗證** | NextAuth.js — Credentials Provider（帳號密碼登入） |
| **部署** | Vercel |
| **圖片儲存** | Vercel Blob（後台替換圖片用） |

### 1.2 專案結構

```
friendly-mendel/
├── app/
│   ├── (public)/                 # 前台路由群組
│   │   ├── page.tsx              # 首頁（Hero + 案例 + 表單）
│   │   └── layout.tsx            # 前台 Layout（Nav + Footer）
│   ├── (admin)/                  # 後台路由群組
│   │   ├── layout.tsx            # 後台 Layout（Sidebar + Header）
│   │   ├── dashboard/page.tsx    # 儀表板
│   │   ├── leads/page.tsx        # 客戶名單管理
│   │   └── editor/page.tsx       # 前台內容編輯器
│   ├── api/
│   │   ├── auth/[...nextauth]/   # 驗證 API
│   │   ├── leads/                # 名單 CRUD API (Google Sheets)
│   │   ├── content/              # 內容讀寫 API
│   │   └── upload/               # 圖片上傳 API
│   ├── layout.tsx                # Root Layout
│   └── globals.css               # 設計系統 CSS Variables
├── components/
│   ├── public/                   # 前台元件
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── CaseStudies.tsx
│   │   ├── ApplicationForm.tsx
│   │   └── Footer.tsx
│   ├── admin/                    # 後台元件
│   │   ├── Sidebar.tsx
│   │   ├── StatsCard.tsx
│   │   ├── BarChart.tsx
│   │   ├── DonutChart.tsx
│   │   ├── LeadsTable.tsx
│   │   └── ContentEditor.tsx
│   └── ui/                       # 共用 UI 元件
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Select.tsx
│       ├── Badge.tsx
│       └── Modal.tsx
├── lib/
│   ├── google-sheets.ts          # Google Sheets API 封裝
│   ├── auth.ts                   # NextAuth 設定
│   └── constants.ts              # 縣市列表、進度狀態等常數
├── types/
│   └── index.ts                  # TypeScript 型別定義
└── public/
    └── images/                   # 靜態圖片
```

---

## 2. 設計系統

### 2.1 品牌色彩

依照官方品牌規範，所有 UI 元素使用以下色彩體系：

| 角色 | 色碼 | 用途 |
|---|---|---|
| **核心行動色** | `#FF5000` (Pantone Orange 021 C) | CTA 按鈕、強調標籤、Active 狀態、Focus 框線 |
| **品牌結構色** | `#060E9F` (Pantone Blue 072 C) | 導覽列、Footer 背景、表格圖表結構色 |
| **輔助黃** | `#FFCE00` | 警告狀態、Highlight 提示 |
| **深藍** | `#0076A9` | 次要 UI 元素、圖表輔色 |
| **淺藍灰** | `#8EB8C9` | 輸入框邊框、分隔線、Chip 背景 |
| **米色** | `#FAE0B8` | 卡片背景（Featured）、區塊底色 |
| **背景白** | `#FFFFFF` | 主背景，維持最大可讀性 |
| **文字深色** | `#001E2F` | 主要文字色 |

### 2.2 字體系統

```css
/* globals.css */
--font-heading: 'Futura', 'Montserrat', sans-serif;   /* 英文標題 */
--font-body-en: 'Helvetica Neue', 'Inter', sans-serif; /* 英文內文 */
--font-cjk: 'Noto Sans TC', sans-serif;                /* 中文全站 */
```

> [!NOTE]
> 由於 Futura 為付費字體，實際使用 **Montserrat Bold** 作為替代（與參考模板一致）。英文內文使用 **Inter** 替代 Helvetica Neue。中文全站使用 **Noto Sans TC** Regular / Bold。

### 2.3 統一視覺語言

| 項目 | 規格 |
|---|---|
| **圓角** | 按鈕/輸入框 `8px`、卡片/容器 `16px`、Pill/Badge `9999px` |
| **陰影** | Level 1: `0 1px 3px rgba(0,0,0,0.04)`、Level 2: `0 4px 20px rgba(0,0,0,0.06)` |
| **動畫** | 統一 `transition: all 0.2s ease`，hover 縮放 `scale(1.02)`，點擊 `scale(0.95)` |
| **間距** | 基於 4px 基準單位，常用 `8px / 16px / 24px / 32px / 64px` |

---

## 3. 前台頁面規格

### 3.1 導覽列 (Navbar)

- **背景色**：`#060E9F`（品牌深藍）
- **Logo**：白色 ECOCO 文字
- **連結**：首頁、案例展示、關於我們、後台管理（僅登入後顯示）
- **CTA 按鈕**：「立即申請」— `#FF5000` 橘色填滿，Pill 形狀
- **Sticky 置頂**，捲動後加深陰影
- **行動版**：漢堡選單展開

### 3.2 Hero 區塊

- **主標題**：「讓 ECOCO 智慧回收機進駐您的場域」（可後台編輯）
- **副標題**：品牌說明文案（可後台編輯）
- **CTA 按鈕**：「立即開始」— `#FF5000`，連結至表單區塊
- **次要按鈕**：「觀看介紹」— `#060E9F` 外框按鈕
- **主視覺圖片**：右側大圖（可後台替換）
- **數據標籤**：玻璃效果覆蓋層，顯示滿意度等數據（可後台編輯）
- **裝飾效果**：模糊漸層圓形背景

### 3.3 案例展示區塊

- **區塊標題**：「攜手推動改變」（可後台編輯）
- **卡片網格**：3 欄（桌面）/ 1 欄（手機）
- 每張卡片包含：
  - 主圖片（可後台替換）
  - 分類標籤（如「零售店家」「企業辦公」「社區活動」）
  - 標題 + 描述文字（可後台編輯）
  - 「了解更多」連結
- **Hover 效果**：圖片放大 `scale(1.1)`、卡片浮起加深陰影

### 3.4 申請設置表單

根據 [表單問題規格](file:///C:/Users/FLCHR0135/Desktop/ECOCO_Contact/reference/前台介面/ECOCO智慧回收機申請設置表-表單問題.md)，表單欄位如下：

#### 基本資料區段

| # | 欄位 | 類型 | 必填 | UI 元件 | 備註 |
|---|---|---|---|---|---|
| 1 | 申請身分 | 單選 | ✅ | Radio Group | 個人 / 社區活動中心 / 店家 / 企業 / 學校 / 診所 / 政府單位 |
| 2 | 聯絡人姓名 | 簡答 | ✅ | Text Input | — |
| 3 | 聯絡電話 | 簡答 | ✅ | Tel Input | 格式驗證：09XX-XXX-XXX |
| 4 | 聯絡 Email | 簡答 | ✅ | Email Input | Email 格式驗證 |
| 5 | 場域名稱/店名 | 簡答 | ✅ | Text Input | — |
| 6 | 場域地址（縣市） | 下拉 | ✅ | Select | 台灣 22 縣市列表 |
| 6b | 場域地址（詳細） | 簡答 | ✅ | Text Input | 街道門牌 |

#### 機台需求區段

| # | 欄位 | 類型 | 必填 | UI 元件 | 備註 |
|---|---|---|---|---|---|
| 7 | 申請機台類型 | 單選 | ✅ | Radio Group | 二代智慧電池機 / 智慧收瓶機 / 智慧整合機 |
| 8 | 預計擺放位置 | 單選 | ✅ | Radio Group | 室內 / 室內走廊 / 騎樓 / 室外 / 尚未確定 |
| 9 | 附近電源插座 | 單選 | ✅ | Radio Group | 有 / 目前沒有 / 不確定 |

#### 補充資料區段

| # | 欄位 | 類型 | 必填 | UI 元件 | 備註 |
|---|---|---|---|---|---|
| 10 | 其他補充 | 詳答 | — | Textarea | — |
| 11 | 方便接聽時段 | 複選 | ✅ | Checkbox Group | 平日早上 / 下午 / 晚間 / 僅周末 / 任何時段 |

#### 表單行為

- **送出後**：按鈕顯示「送出中…」→ 「送出成功！我們會盡快與您聯繫」
- **驗證**：即時前端驗證 + API 端驗證
- **資料流**：`表單 → API Route → Google Sheets 新增一列`
- **寫入欄位**：所有表單欄位 + 送出時間戳記 + 自動產生的編號 + 預設狀態「新申請」

### 3.5 Footer

- **背景色**：`#060E9F`
- 包含：隱私權政策、服務條款、聯繫我們
- 版權聲明：© 2024 ECOCO 智慧回收

---

## 4. 後台管理系統

### 4.1 登入頁面

- 簡易帳號/密碼登入
- 帳號密碼存於環境變數（`.env`）
- 登入後設定 Session Cookie
- 中央居中登入卡片，品牌 Logo + 橘色 CTA

### 4.2 後台 Layout

- **左側邊欄**（桌面 256px 寬度）：
  - ECOCO Admin 標題
  - 導航連結：儀表板、客戶名單、內容編輯器
  - 底部：說明、設定、管理者資訊
- **頂部導覽列**：
  - 頁面標題
  - 搜尋框（搜尋客戶名單）
  - 通知 + 設定圖示
- **行動版**：漢堡選單開關邊欄

### 4.3 儀表板 (Dashboard)

#### 統計卡片（3 欄）

| 指標 | 圖示 | 計算方式 |
|---|---|---|
| 總申請數 | `person_add` | Google Sheets 總列數 |
| 已完成設置 | `settings_suggest` | 狀態 = "已完成" 的數量 |
| 待場勘數 | `calendar_today` | 狀態 = "場勘中" 的數量 |

每張卡片顯示趨勢百分比（與上月比較）。

#### 視覺分析（2 欄）

1. **縣市分佈長條圖**（8 欄寬）
   - CSS 繪製的長條圖（無需 Chart.js）
   - X 軸：各縣市名稱
   - 長條：`#060E9F`，hover 變 `#FF5000`
   - 右上：時間篩選下拉（最近 30 天 / 6 個月）

2. **進度環形圖**（4 欄寬）
   - CSS `conic-gradient` 繪製
   - 三段：已完成 (`#FF5000`) / 進行中 (`#060E9F`) / 待處理 (`#FFCE00`)
   - 中心顯示完成百分比
   - 下方圖例

#### 數據來源

所有統計數據均從 Google Sheets **即時計算**而來，每次載入頁面時透過 API Route 查詢。

### 4.4 客戶名單管理 (Leads)

#### 名單表格

| 欄位 | 說明 |
|---|---|
| 日期 | 申請送出時間 |
| 聯絡人 | 姓名 |
| 場域名稱 | 店名/機構名 |
| 縣市 | 地址中的縣市 |
| 進度 | 狀態 Badge |
| 操作 | 檢視 / 更多選項 |

#### 篩選功能

- **縣市篩選**：下拉選單，可選擇特定縣市
- **進度篩選**：下拉選單，4 種狀態
- **搜尋**：模糊搜尋姓名/場域名稱

#### 進度狀態管理

| 狀態 | 顏色 | 說明 |
|---|---|---|
| 新申請 | 紅底白字 `#ba1a1a` | 剛收到的申請 |
| 已聯繫 | 紫底白字 `#434cca` | 已初步聯繫 |
| 場勘中 | 藍底白字 `#060E9F` | 安排場勘中 |
| 已完成 | 橘底白字 `#FF5000` | 機台已設置 |

- 進度更新：點擊狀態 Badge → 下拉選單選擇新狀態 → 即時寫回 Google Sheets
- 分頁：每頁 20 筆

#### 匯出功能

- **Export 按鈕**：匯出篩選後的資料為 CSV

### 4.5 前台內容編輯器 (Content Editor)

#### Hero 區塊編輯

- **主標題**：文字輸入框
- **副標題**：Textarea
- **Hero 圖片**：拖放或點擊上傳，預覽現有圖片，hover 顯示「替換圖片」覆蓋層
- 建議尺寸提示：1920×1080px，最大 2MB

#### 案例管理

- 案例卡片列表（CRUD）
- 每張卡片可編輯：標題、描述、分類標籤、圖片
- 公開/草稿 Toggle 開關
- 「新增案例」按鈕

#### Footer 編輯

- Footer 連結列表：可拖曳排序、新增/刪除
- 版權資訊 Textarea

#### 內容儲存機制

- 前台可編輯的文字和設定儲存在 Google Sheets 的獨立 `content` 工作表
- 「儲存變更」按鈕 → API 寫入 Sheets → 前台讀取時取得最新內容
- 儲存後顯示「已儲存！」成功訊息

---

## 5. Google Sheets 資料結構

### 5.1 工作表: `leads`（客戶名單）

| 欄位 | 類型 | 說明 |
|---|---|---|
| id | String | 自動產生（`L-001` 格式） |
| timestamp | DateTime | 申請送出時間 |
| applicant_type | String | 申請身分 |
| contact_name | String | 聯絡人姓名 |
| phone | String | 聯絡電話 |
| email | String | 聯絡 Email |
| venue_name | String | 場域名稱/店名 |
| city | String | 縣市 |
| address | String | 詳細地址 |
| machine_type | String | 申請機台類型 |
| placement_location | String | 預計擺放位置 |
| has_power_outlet | String | 電源插座狀況 |
| additional_notes | String | 補充說明 |
| available_time | String | 方便接聽時段（逗號分隔） |
| status | String | 進度狀態（預設：新申請） |

### 5.2 工作表: `content`（前台內容）

| 欄位 | 類型 | 說明 |
|---|---|---|
| key | String | 內容識別碼（如 `hero_title`） |
| value | String | 內容值 |
| updated_at | DateTime | 最後更新時間 |

### 5.3 工作表: `cases`（案例展示）

| 欄位 | 類型 | 說明 |
|---|---|---|
| id | String | 案例 ID |
| title | String | 標題 |
| description | String | 描述 |
| category | String | 分類標籤 |
| image_url | String | 圖片 URL |
| is_public | Boolean | 是否公開 |
| sort_order | Number | 排序順序 |

---

## 6. API 端點設計

| 方法 | 路徑 | 說明 |
|---|---|---|
| POST | `/api/auth/[...nextauth]` | NextAuth 登入/登出 |
| GET | `/api/leads` | 取得名單（支援 `?city=&status=&page=&q=` 參數） |
| POST | `/api/leads` | 新增申請（前台表單送出） |
| PATCH | `/api/leads/[id]` | 更新進度狀態 |
| GET | `/api/content` | 讀取前台內容設定 |
| PUT | `/api/content` | 更新前台內容（需登入） |
| GET | `/api/cases` | 取得案例列表 |
| POST | `/api/cases` | 新增案例（需登入） |
| PUT | `/api/cases/[id]` | 更新案例（需登入） |
| DELETE | `/api/cases/[id]` | 刪除案例（需登入） |
| POST | `/api/upload` | 上傳圖片至 Vercel Blob（需登入） |
| GET | `/api/dashboard/stats` | 儀表板統計數據 |

---

## 7. 環境變數

```env
# Google Sheets
GOOGLE_SHEETS_ID=<your-spreadsheet-id>
GOOGLE_SERVICE_ACCOUNT_EMAIL=<service-account-email>
GOOGLE_PRIVATE_KEY=<service-account-private-key>

# Auth
NEXTAUTH_SECRET=<random-secret>
NEXTAUTH_URL=https://your-domain.vercel.app
ADMIN_USERNAME=admin
ADMIN_PASSWORD=<secure-password>

# Vercel Blob
BLOB_READ_WRITE_TOKEN=<vercel-blob-token>
```

---

## 8. 實作階段規劃

### Phase 1 — 基礎建設（Day 1-2）
- [x] 初始化 Next.js 專案
- [ ] 建立設計系統（CSS Variables、全域樣式）
- [ ] 建立共用 UI 元件庫（Button, Input, Select, Badge, Modal）
- [ ] 設定 Google Sheets API 連線封裝

### Phase 2 — 前台頁面（Day 3-4）
- [ ] 前台 Layout（Navbar + Footer）
- [ ] Hero 區塊
- [ ] 案例展示區塊
- [ ] 申請表單（含前端驗證）
- [ ] 表單送出 API → Google Sheets

### Phase 3 — 後台核心（Day 5-7）
- [ ] 登入頁面 + NextAuth 設定
- [ ] 後台 Layout（Sidebar + Header）
- [ ] 儀表板頁面（統計卡片 + 圖表）
- [ ] 客戶名單頁面（表格 + 篩選 + 進度更新）
- [ ] 前台內容編輯器

### Phase 4 — 整合與最佳化（Day 8）
- [ ] 圖片上傳功能
- [ ] 前台動態讀取後台設定的內容
- [ ] 響應式設計調整
- [ ] 微動畫 & 互動細節
- [ ] 錯誤處理與 Loading 狀態

---

## 9. 驗證計畫

### 自動化驗證
- `npm run build` 確認無編譯錯誤
- `npm run dev` 本地啟動確認所有頁面正常渲染
- 手動測試所有 API Route（使用瀏覽器或 curl）

### 功能驗證清單
- [ ] 前台首頁正確顯示所有區塊
- [ ] 申請表單驗證正確、送出後資料正確寫入 Google Sheets
- [ ] 後台登入/登出正常
- [ ] 儀表板統計數據與 Sheets 資料一致
- [ ] 客戶名單篩選（縣市/進度）正常運作
- [ ] 進度狀態更新即時寫回 Sheets
- [ ] 內容編輯器修改後前台即時反映
- [ ] 圖片上傳與替換功能正常
- [ ] 行動版 RWD 顯示正常

### 手動驗證
- 請使用者於 Vercel 部署後驗證完整流程：申請 → 後台查看 → 更新進度 → 編輯內容
