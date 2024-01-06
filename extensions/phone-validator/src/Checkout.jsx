import {
  reactExtension,
  useSettings,
  useShippingAddress,
  useBuyerJourneyIntercept,
  usePhone,
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'purchase.checkout.delivery-address.render-before',
  () => <Extension />,
);

function Extension() {
  const {starting_digits, max_length, country_code } = useSettings();
  const address = useShippingAddress();
  const phone = address?.phone
  
  console.log({phone})
  
  if (address.countryCode !== country_code?.toUpperCase() && !phone) {
    return null
  }
  
  const startingDigits = starting_digits ?? "44";
  const maxLength = max_length ?? 11;
  console.log({startingDigits, maxLength, country_code, code: address.countryCode})
  
  const SHOW_STARTING_ERROR_AND_BLOCK_PROGRESS = {
    behavior: "block",
    reason: `Phone number must start with ${startingDigits}`,
    errors: [
      {
        message: `Phone number must start with ${startingDigits}`,
        target: "$.cart.deliveryGroups[0].deliveryAddress.phone",
      },
      {
        message: `Phone number must start with ${startingDigits}`,
      },
    ],
  };
  
  const SHOW_LENGTH_ERROR_AND_BLOCK_PROGRESS = {
    behavior: "block",
    reason: `Phone number must be ${maxLength} long`,
    errors: [
      {
        message: `Phone number must be ${maxLength} long`,
        target: "$.cart.deliveryGroups[0].deliveryAddress.phone",
      },
      {
        message: `Phone number must be ${maxLength} long`,
      },
    ],
  };
  const ALLOW = { behavior: "allow" };
  
  useBuyerJourneyIntercept(({ canBlockProgress }) => {
    if (phone && !phone?.startsWith(startingDigits)) {
      return canBlockProgress && SHOW_STARTING_ERROR_AND_BLOCK_PROGRESS
    }
    
    if (phone && phone?.length !== maxLength) {
      return canBlockProgress && SHOW_LENGTH_ERROR_AND_BLOCK_PROGRESS
    }
    
    return ALLOW
  });
}