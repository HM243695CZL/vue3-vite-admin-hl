/**
 * 判断两数组是否相同
 * @param news 新数据
 * @param old 源数据
 * @returns 两数组相同返回 `true`，反之则反
 */
export function judementSameArr(news: unknown[] | string[], old: string[]): boolean {
	let count = 0;
	const leng = old.length;
	for (let i in old) {
		for (let j in news) {
			if (old[i] === news[j]) count++;
		}
	}
	return count === leng ? true : false;
}

/**
 * 判断两个对象是否相同
 * @param a 要比较的对象一
 * @param b 要比较的对象二
 * @returns 相同返回 true，反之则反
 */
export function isObjectValueEqual(a: { [key: string]: any }, b: { [key: string]: any }) {
	if (!a || !b) return false;
	let aProps = Object.getOwnPropertyNames(a);
	let bProps = Object.getOwnPropertyNames(b);
	if (aProps.length != bProps.length) return false;
	for (let i = 0; i < aProps.length; i++) {
		let propName = aProps[i];
		let propA = a[propName];
		let propB = b[propName];
		if (!b.hasOwnProperty(propName)) return false;
		if (propA instanceof Object) {
			if (!isObjectValueEqual(propA, propB)) return false;
		} else if (propA !== propB) {
			return false;
		}
	}
	return true;
}
/**
 * 将后台返回的菜单转成需要的数据格式
 */
export function menuTree2menuMeta (menuList: any) {
	if (!menuList) return []
	const arr: any = [];
	menuList.map((menu: any) => {
		let obj = {
			path: menu.path,
			name: menu.name,
			component: menu.component,
			children:  [] as any,
			meta: {
				title: menu.title,
				isLink: menu.isLink,
				isHide: menu.isHide,
				isKeepAlive: menu.isKeepAlive,
				isAffix: menu.isAffix,
				isIframe: menu.isIframe,
				roles: menu.roles,
				icon: menu.icon
			}
		};
		if (menu.children && menu.children.length) {
			menu.children.map((ele: any) => {

				obj.children.push({
					path: ele.path,
					name: ele.name,
					component: ele.component,
					children: [],
					meta: {
						title: ele.title,
						isLink: ele.isLink,
						isHide: ele.isHide,
						isKeepAlive: ele.isKeepAlive,
						isAffix: ele.isAffix,
						isIframe: ele.isIframe,
						roles: ele.roles,
						icon: ele.icon
					}
				})
			})
		}
		arr.push(obj);
	})
	return arr;
}