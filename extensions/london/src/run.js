// @ts-check

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 * @typedef {import("../generated/api").Operation} Operation
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
  const selectedArea = input.cart.attribute;
  console.log(JSON.stringify({selectedArea}));
  
  
  let toHide = input.cart.deliveryGroups[0].deliveryOptions
  .filter(option => option.title?.toLocaleLowerCase() != selectedArea?.value?.toLocaleLowerCase())
  .map(option => /** @type {Operation} */({
     hide: {
      deliveryOptionHandle: option.handle
     }
  }))
  
  return {
    operations: toHide
  }
  

  return NO_CHANGES;
};