export interface MenuItem {
    name: string
    url: string
    icon: string
}

export const menuItems: MenuItem[] = [
    {
        name: 'Home',
        url: '/',
        icon: 'icon-park-solid:green-house'
    },

    {
        name: 'Family',
        url: '/customers',
        icon: 'fluent:accessibility-16-regular'
    },


]