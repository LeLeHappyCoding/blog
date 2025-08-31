/**
 * @Description: url query 处理方法
 * @Author: lele
 * @Date: 2025-08-30 16:55:25
 */
/**
 * 获取指定 query 参数
 * @param key 参数名
 * @param url 可选，默认取当前 window.location.href
 */
export function getQueryParam(
    key: string,
    url: string = window.location.href
): string | null {
    const params = new URL(url).searchParams;
    return params.get(key);
}

/**
 * 获取所有 query 参数（对象形式）
 * @param url 可选，默认取当前 window.location.href
 */
export function getAllQueryParams(
    url: string = window.location.href
): Record<string, string> {
    const params = new URL(url).searchParams;
    const result: Record<string, string> = {};
    params.forEach((value, key) => {
        result[key] = value;
    });
    return result;
}
