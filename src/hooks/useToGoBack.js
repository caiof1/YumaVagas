
export const useToGoBack = () => {

    const toGoBack = (e, changeStateMenu) => {
        changeStateMenu(e)
    }

    return {toGoBack}

}