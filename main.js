// --- DOM 元素獲取 ---
// 獲取需要操作的網頁元素
const sidenav = document.getElementById("filter-sidenav");
const contentWrapper = document.getElementById("content-wrapper");
const topBar = document.getElementById("top-bar"); // 獲取頂部標題欄
const openBtn = document.getElementById("open-nav-btn");
const closeBtn = document.getElementById("close-nav-btn");
const locationOverlay = document.getElementById("location-overlay"); // 獲取定位遮罩層
const retryLocationBtn = document.getElementById("retry-location-btn"); // 獲取重試按鈕

// --- 常數定義 ---
// 定義側邊欄的寬度，方便統一管理和修改
const sidebarWidth = "280px";
const sidebarWidthInt = 280; // 整數形式用於計算按鈕位置

// --- 側邊欄控制功能 ---

/**
 * 開啟側邊欄的函式
 * 將側邊欄寬度設為預定值，並將主內容區和頂部欄向右推移
 */
function openNav() {
    sidenav.style.width = sidebarWidth;
    contentWrapper.style.marginLeft = sidebarWidth;
    // 將整個頂部標題欄移動到側邊欄的右邊
    topBar.style.left = (sidebarWidthInt + 20) + 'px';
}

/**
 * 關閉側邊欄的函式
 * 將側邊欄寬度設為0，並將主內容區和頂部欄移回原位
 */
function closeNav() {
    sidenav.style.width = "0";
    contentWrapper.style.marginLeft = "0";
    // 將整個頂部標題欄移回原位
    topBar.style.left = "20px";
}

/**
 * 切換側邊欄狀態的函式
 * 檢查側邊欄目前是否開啟，並執行對應的開/關函式
 */
function toggleNav() {
    if (sidenav.style.width === sidebarWidth) {
        closeNav();
    } else {
        openNav();
    }
}

// --- GPS 定位功能 ---

/**
 * 顯示或隱藏定位遮罩層
 * @param {boolean} show - true 為顯示, false 為隱藏
 */
function showLocationOverlay(show) {
    // 使用 flex 來顯示，使其內容可以置中
    locationOverlay.style.display = show ? 'flex' : 'none';
}

/**
 * 請求使用者地理位置的函式
 */
function requestLocation() {
    // 檢查瀏覽器是否支援 Geolocation API
    if (navigator.geolocation) {
        // 如果支援，則呼叫 getCurrentPosition 方法
        navigator.geolocation.getCurrentPosition(
            // 成功獲取位置後的回呼函式
            (position) => {
                showLocationOverlay(false); // 成功後，隱藏遮罩層
                // 在這裡可以接續處理地圖定位等功能
            },
            // 獲取位置失敗後的回呼函式 (例如使用者拒絕)
            (error) => {
                showLocationOverlay(true); // 失敗後，顯示遮罩層鎖定畫面
            }
        );
    } else {
        // 如果瀏覽器不支援，則提示使用者並鎖定畫面
        alert("您的瀏覽器不支援GPS定位功能。");
        showLocationOverlay(true);
    }
}

// --- 事件監聽器設定 ---

// 當整個頁面DOM結構載入完成後執行
document.addEventListener('DOMContentLoaded', () => {
    // 立即請求一次GPS定位
    requestLocation();
});

// 為遮罩層中的重試按鈕新增點擊事件
retryLocationBtn.addEventListener('click', requestLocation);

// 新增鍵盤快捷鍵監聽器
document.addEventListener('keydown', (event) => {
    // 當使用者按下 Ctrl + G 時，觸發定位功能
    if (event.ctrlKey && event.key.toLowerCase() === 'g') {
        event.preventDefault(); // 防止瀏覽器預設行為 (例如: 尋找)
        alert("偵測到快捷鍵，正在重新定位...");
        requestLocation();
    }
});