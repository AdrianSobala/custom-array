const getRoute = (name, isRoute) => {
    const appUrl = `${process.env.PUBLIC_URL}`;
    const apiUrl = `${process.env.REACT_APP_API_MAIN}`;

    switch (name) {
        case "api":
            return apiUrl;
            break;

        case "main":
            return appUrl + "/";
            break;
        case "material":
            return appUrl + "/materialuiarray";
            break;

        case "":
            return appUrl;
            break;
        default:
            console.log(`Route not found`);
    }

    return appUrl;
};

export default getRoute;
