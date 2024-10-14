// 取消默认右键
window.oncontextmenu = function (e) {
    //取消默认的浏览器自带右键 很重要！！
    e.preventDefault();
}

/**
 * 检查并跳转到合适的语言路径
 * @param {string} browserLanguage - 浏览器的语言
 * @param {string} currentLanguagePath - 当前页面路径中的语言部分
 */
function checkAndRedirectLanguage() {
    // 默认使用中文的语言代码
    const defaultLanguage = ['zh', 'zh-CN'];
    // 默认的英文语言代码
    const defaultLanguageEn = 'en';
    // 页面支持的语言数组，目前只有英文
    const supportedLanguages = ['en', 'ja'];

    // 获取浏览器的语言（包含地区代码）
    const browserLanguage = navigator.language || navigator.userLanguage;
    // 获取当前页面的主机名
    const pageHost = window.location.host;
    // 获取当前页面的协议（http 或 https）
    const pageProtocol = window.location.protocol;
    // 获取当前页面的路径名
    const pagePathname = window.location.pathname;
    // 获取当前路径中的语言部分（假设路径格式为 /语言/其他内容）
    const currentLanguagePath = pagePathname.split('/')[1];

    console.log("浏览器语言:", browserLanguage);
    console.log("页面主机:", pageHost);
    console.log("页面协议:", pageProtocol);
    console.log("当前路径名:", pagePathname);
    console.log("当前路径语言:", currentLanguagePath);

    //如果进入的不是首页则不进行语言切换
    if (pagePathname.split('/').filter(item => item !== '').length > 1) {
        return;
    }
    // 检查当前页面路径中的语言与浏览器语言是否匹配
    if (browserLanguage !== currentLanguagePath) {
        // 如果浏览器语言为中文且路径不为空，则跳转到主路径
        if (defaultLanguage.includes(browserLanguage)) {
            if (supportedLanguages.includes(currentLanguagePath)) {
                window.location.href = `${pageProtocol}//${pageHost}`;
            }
        }
        // 如果浏览器语言在支持的语言数组中，且路径中的语言与浏览器语言不一致，则跳转到对应语言路径
        else if (supportedLanguages.includes(browserLanguage) && currentLanguagePath !== browserLanguage) {
            window.location.href = `${pageProtocol}//${pageHost}/${browserLanguage}`;
        }
        // 如果浏览器语言不在支持的语言数组中，且当前路径不是英文路径，则跳转到英文路径
        else if (!supportedLanguages.includes(browserLanguage) && currentLanguagePath !== defaultLanguageEn) {
            window.location.href = `${pageProtocol}//${pageHost}/en`;
        }
    }
}

checkAndRedirectLanguage();


