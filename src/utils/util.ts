import MD5 from 'md5';

/**
 * The function exports a TypeScript implementation of the MD5 hashing algorithm for a given string.
 */
export function md5(str: string) {
  return MD5(str);
}

/**
 * The function sets the username in the local storage.
 * @param {string} username - A string representing the username that needs to be set.
 */
export function setUsername(username: string) {
  localStorage.setItem('username', username);
}

/**
 * The function `getUsername` returns the value of the 'username' key from the localStorage, or null if
 * it doesn't exist.
 * @returns a string value or null.
 */
export function getUsername(): string | null {
  return localStorage.getItem('username');
}

export function convertTreeData<T>(
  data: T[],
  convertT?: (item: T) => {
    id: string;
    name: string;
    parent_id?: string;
    disabled?: boolean;
    children: T[];
  },
): API.TreeItem[] {
  const treeData: API.TreeItem[] = [];
  data.forEach((item) => {
    const dataItem = convertT
      ? convertT(item)
      : (item as {
          id: string;
          name: string;
          parent_id?: string;
          disabled?: boolean;
          children: T[];
        });

    const treeItem: API.TreeItem = {
      id: dataItem.id,
      key: dataItem.id,
      title: dataItem.name,
      value: dataItem.id,
      label: dataItem.name,
      parent_id: dataItem.parent_id,
      children: dataItem.children ? convertTreeData(dataItem.children, convertT) : [],
    };

    if (dataItem.disabled) {
      treeItem.disabled = dataItem.disabled!;
    }
    treeData.push(treeItem);
  });
  return treeData;
}


/**
 * Returns Device Type tablet , mobile, desktop
 * @returns string
 */
export const getDeviceType = (): string => {
  const ua = typeof window !== "undefined" ? navigator.userAgent : 'desktop';
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return "mobile";
  }
  return "desktop";
};

/**
 * Returns true if desktop
 * @returns boolean
 */
export const isDesktopDevice = (): boolean => {
  if (getDeviceType() === "desktop") {
    return true;
  } else {
    return false;
  }
};

/**
 * Returns true if mobile
 * @returns boolean
 */
export const isMobileDevice = (): boolean => {
  if (getDeviceType() === "mobile") {
    return true;
  } else {
    return false;
  }
};

/**
 * Add no scroll class to body when modal isopen
 */
export const addBodyNoScroll = (): void => {
  document.body.classList.add("no-scroll");
};

/**
 * Removes no scroll class to body when modal isopen
 */
export const removeBodyNoScroll = (): void => {
  document.body.classList.remove("no-scroll");
};

export const combineClasses = function (...classes: any): string {
  return classes.join(" ");
};

