export const print = (text: string, dom: HTMLDivElement | null = null) => {
    console.log(text);
    if (dom) {
        dom.innerHTML += text;
    }
};

export const clear = (dom: HTMLDivElement | null = null) => {
    console.clear();
    if (dom) {
        dom.innerHTML = '';
    }
}