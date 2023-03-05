import {PROCUCTS} from "./mocks";

export const getProductData = (
    productId
) => {
    return PROCUCTS.find((product) => product.id == productId);
};
