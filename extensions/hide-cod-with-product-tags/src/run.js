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

  return NO_CHANGES;
}
