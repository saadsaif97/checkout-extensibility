import {
  Banner,
  useApi,
  useTranslate,
  reactExtension,
  useSettings,
  useShippingAddress,
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'purchase.checkout.delivery-address.render-before',
  () => <Extension />,
);

function Extension() {
  const {starting_digits, max_length, country_code } = useSettings();
  const address = useShippingAddress();
  
  if (address.countryCode !== country_code?.toUpperCase()) {
    return <></>
  }
  
  const startingDigits = starting_digits ?? "44";
  const maxLength = max_length ?? 11;
  console.log({startingDigits, maxLength, country_code, code: address.countryCode})
  
  return (
    <Banner>
      Test
    </Banner>
  );
}