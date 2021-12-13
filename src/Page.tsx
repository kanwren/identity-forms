const pages = ['about', 'names', 'genders', 'sources'] as const;

export type Page = typeof pages[number];

export function isPage(s: string): s is Page {
    return pages.findIndex((x: Page) => (x === s)) !== -1;
}

export function getPage(): Page | undefined {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');
    return (page !== null && isPage(page)) ? page : undefined;
}

// TODO: this feels hacky, should I just go back to a state hook in App?
export function redirectToPage(page: Page): void {
    const loc = window.location;
    const urlParams = new URLSearchParams(loc.search);
    urlParams.set('page', page);
    const url = loc.protocol + '//' + loc.host + loc.pathname + '?' + urlParams.toString();
    window.location.assign(url);
}