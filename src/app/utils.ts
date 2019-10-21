
export const handleNoCordovaError = (error: any, alternative: (error: any) => void) => {
    // perhaps multiple ways to check for same error are needed
    if (error === "cordova_not_available") {
        alternative(error);
    }
};
