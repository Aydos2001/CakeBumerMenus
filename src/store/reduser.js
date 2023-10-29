import { categories } from "../constants/categories"
import { products } from "../constants/products"

export const initialState = {
    sidebarMenues: false,
    categories: categories,
    products: products,
    subcategories: [],
    allImages: null,
    isLoading: true,
    selectCategory: null,
    selectCategorySub: null,
    selectCategoryName: "MENUS",
    lang: true,
    productDetails: null,
    productDetailsShow: false,
    selectAllMenu: [],
    menuProducts: null,
    openSidebar: true,
}

export const reduserTypes = {
    sidebarToggle: "SIDEBAR_TOGGLE",
    getAllCategories: "GET_ALL_CATEGORIES",
    setIsLoading: "SET_IS_LOADING",
    setSelectCategory: "SET_SELECT_CATEGORY",
    setSelectCategorySub: "SET_SELECT_CATEGORY_SUB",
    getSelectMenus: "GET_SELECT_MENUS",
    getSelectSubcategories: "GET_SELECT_SUBCATEGORIES",
    setLangSite: "SET_LANG_SITE",
    productDetailsShow: "PRODUCT_DETAILS_SHOW",
    setSelectMenu: "SET_SELECT_MENU",
    deleteSelectMenu: "DELETE_SELECT_MENU",
    setMenuProducts: "SET_MENU_PRODUCTS",
    toogleSidebar: "TOOGLE_SIDEBAR",
}

export const reduser = (state, action) => {
    switch (action.type) {
        case (reduserTypes.sidebarToggle):
            return {
                ...state,
                sidebarMenues: !state.sidebarMenues
            };
        case (reduserTypes.getAllCategories):
            return {
                ...state,
                categories: action.payload.data.data,
                allImages: action.payload.image.data

            };
        case (reduserTypes.setIsLoading):
            return {
                ...state,
                isLoading: action.payload
            };
        case (reduserTypes.setSelectCategory):
            return {
                ...state,
                selectCategory: action.payload
            };
        case (reduserTypes.setSelectCategorySub):
            return {
                ...state,
                selectCategorySub: action.payload
            };
        case (reduserTypes.getSelectMenus):
            return {
                ...state,
                products: action.payload
            };
        case (reduserTypes.getSelectSubcategories):
            return {
                ...state,
                subcategories: action.payload
            };
        case (reduserTypes.setLangSite):
            return {
                ...state,
                lang: !state.lang
            };
        case (reduserTypes.productDetailsShow):
            return {
                ...state,
                productDetailsShow: action.payload ? true : false,
                productDetails: action.payload
            };
        case (reduserTypes.setSelectMenu):
            return {
                ...state,
                selectAllMenu: [action.payload, ...state.selectAllMenu]
            };
        case (reduserTypes.deleteSelectMenu):
            const index = state.selectAllMenu.findIndex(item => item.id === action.payload.id && item.ru === action.payload.ru);
            if (index !== -1) {
                state.selectAllMenu.splice(index, 1);
            }
            return {
                ...state,

            };
        case (reduserTypes.setMenuProducts):
            return {
                ...state,
                menuProducts: action.payload
            };
        case (reduserTypes.toogleSidebar):
            return {
                ...state,
                openSidebar: !state.openSidebar
            };
    }
}