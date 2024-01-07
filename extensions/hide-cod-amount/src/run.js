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
  const CONFIGURED_AMOUNT = input?.paymentCustomization?.metafield?.value
    ? JSON.parse(input.paymentCustomization.metafield.value)
    : {};

  const cartValue = input.cart.cost.totalAmount.amount;

  if (cartValue > CONFIGURED_AMOUNT) {
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
