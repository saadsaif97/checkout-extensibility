import {
  Banner,
  useApi,
  useTranslate,
  reactExtension,
  useSettings,
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'purchase.checkout.delivery-address.render-before',
  () => <Extension />,
);

function Extension() {
  const {starting_digits, max_length, country } = useSettings();
  
  const startingDigits = starting_digits ?? "44";
  const maxLength = max_length ?? 11;
  const countryCode = country ?? "PK";

  console.log({startingDigits, maxLength, countryCode})
  
  return (
    <Banner>
      Test
    </Banner>
  );
}