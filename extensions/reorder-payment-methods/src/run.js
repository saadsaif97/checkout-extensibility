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
  let paymentMethods = {};
  let operations = [];

  input.paymentMethods.forEach((method) => {
    let methodName = method.name.toUpperCase();
    if (methodName.includes("COD")) {
      paymentMethods.COD = method;
    } else if (methodName.includes("CARD")) {
      paymentMethods.CARD = method;
    } else if (methodName.includes("PAYPAL")) {
      paymentMethods.PAYPAL = method;
    }
  });

  if (paymentMethods.PAYPAL) {
    operations.push({
      move: {
        index: operations.length,
        paymentMethodId: paymentMethods.PAYPAL.id,
      },
    });
  }

  if (paymentMethods.CARD) {
    operations.push({
      move: {
        index: operations.length,
        paymentMethodId: paymentMethods.CARD.id,
      },
    });
  }

  if (paymentMethods.COD) {
    operations.push({
      move: {
        index: operations.length,
        paymentMethodId: paymentMethods.COD.id,
      },
    });
  }

  return { operations };
}
