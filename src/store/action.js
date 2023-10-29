import { reduserTypes } from "./reduser"

export const sidebarToggle = (payload) => {
    return {
        type : reduserTypes.sidebarToggle,
        payload : payload
    }
}

export const setIsLoading = (payload) => {
    return {
        type : reduserTypes.setIsLoading,
        payload : payload
    }
}

export const getAllCategories = (payload) => {
    return {
        type : reduserTypes.getAllCategories,
        payload : payload
    }
}

export const selectCategory = (payload) => {
    return {
        type : reduserTypes.setSelectCategory,
        payload : payload
    }
}

export const selectCategorySub = (payload) => {
    return {
        type : reduserTypes.setSelectCategorySub,
        payload : payload
    }
}

export const getSelectMenus = (payload) => {
    return {
        type : reduserTypes.getSelectMenus,
        payload : payload
    }
}

export const getSelectSubcategories = (payload) => {
    return {
        type : reduserTypes.getSelectSubcategories,
        payload : payload
    }
}

export const setLangSite = (payload) => {
    return {
        type : reduserTypes.setLangSite,
        payload : payload
    }
}

export const productDetailsShow = (payload) => {
    return {
        type : reduserTypes.productDetailsShow,
        payload : payload
    }
}

export const setSelectMenu = (payload) => {
    return {
        type : reduserTypes.setSelectMenu,
        payload : payload
    }
}

export const deleteSelectMenu = (payload) => {
    return {
        type : reduserTypes.deleteSelectMenu,
        payload : payload
    }
}

export const setMenuProducts = (payload) => {
    return {
        type : reduserTypes.setMenuProducts,
        payload : payload
    }
}

export const toggleSidebar = () => {
    return {
        type: reduserTypes.toogleSidebar
    }
}