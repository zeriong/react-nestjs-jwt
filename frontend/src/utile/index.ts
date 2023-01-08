export const getCookie = (name: string) => {
    let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value ? decodeURI(value[2]) : undefined;
}

export const setCookie = (name: string, val: string) => {
    const maxAge = 30 * 24 * 60 * 60 * 1000;
    document.cookie = `${name}=${val}; path=/; max-age=${maxAge}; SameSite=Strict;`;
}

export const deleteCookie = (name: string) => {
    document.cookie = name+"=; max-age=0;";
}

export const existToken = () => {
    if (getCookie('rt')) {
        console.log(String(getCookie('rt')))
    } else { console.log(null); }
}