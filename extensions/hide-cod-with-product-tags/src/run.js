// @ts-check

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

/**
 * @type {FunctionRunResult}
 */
const NO_CHANGES = {
  operations: [],
};

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  const NO_COD_PRODUCT_IS_AVAILABLE = input.cart.lines.some(
    (item) =>
      item.merchandise.__typename == "ProductVariant" &&
      item.merchandise.product.hasAnyTag
  );

  console.log(JSON.stringify(NO_COD_PRODUCT_IS_AVAILABLE));
  
  if (NO_COD_PRODUCT_IS_AVAILABLE) {
    // Find the payment method to hide
    const hidePaymentMethod = input.paymentMethods.find((method) =>
      method.name.toUpperCase().includes("COD")
    );

    if (!hidePaymentMethod) {
      return NO_CHANGES;
    }

    return {
      operations: [
        {
          hide: {
            paymentMethodId: hidePaymentMethod.id,
          },
        },
      ],
    };
  }

  return NO_CHANGES;
}
