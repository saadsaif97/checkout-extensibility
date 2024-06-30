import {
  reactExtension,
  Select,
  useApplyShippingAddressChange,
  useBuyerJourneyIntercept,
  useSettings,
  useShippingAddress,
} from "@shopify/ui-extensions-react/checkout";
import { useEffect, useState } from "react";

export default reactExtension(
  "purchase.checkout.delivery-address.render-before",
  () => <Extension />
);

function Extension() {
  const address = useShippingAddress();
  const [city, setCity] = useState("");
  const updateShippingAddress = useApplyShippingAddressChange();
  const { pakistan_cities, uk_cities } = useSettings();
  const PAKISTAN_CITIES =
    pakistan_cities ||
    "Karachi,Lahore,Kotla Qasim Khan,Faisalabad,Rawalpindi,Gujranwala,Peshawar,Multan,Hyderabad City,Islamabad,Quetta,Cantonment,Eminabad";
  const UK_CITIES =
    uk_cities ||
    "London,Birmingham,Glasgow,Liverpool,Manchester,Sheffield,Leeds,Edinburgh,Bristol,Cardiff";

  const handleSelect = async (value) => {
    try {
      console.log(value, address);
      setCity(value);
      updateShippingAddress({
        address: {
          city: value,
        },
        type: "updateShippingAddress",
      });
    } catch (error) {
      console.log({ error });
    }
  };
  
  useBuyerJourneyIntercept(
    ({canBlockProgress}) => {
      console.log("canBlockProgress && city != address.city: ", canBlockProgress && city != address.city)
      return canBlockProgress &&
        city != address.city
        ? {
            behavior: 'block',
            reason: 'Please select city from dropdown',
            errors: [
              {
                message:
                  'Please select city from dropdown',
                // Show an error underneath the city field
                target:
                  '$.cart.deliveryGroups[0].deliveryAddress.city',
              },
              {
                message: 'Please select city from dropdown',
              }
            ],
          }
        : {
            behavior: 'allow',
          };
    },
  );

  if (address?.countryCode == "PK") {
    return (
      <Select
        label="Select city"
        value={city}
        error={city != address.city ? "Please select city from dropdown" : null}
        onChange={(value) => handleSelect(value)}
        options={PAKISTAN_CITIES?.split(",")?.map((city) => ({
          value: city,
          label: city,
        }))}
      />
    );
  }

  if (address?.countryCode == "GB") {
    return (
      <Select
        label="Select city"
        value={city}
        error={city != address.city ? "Please select city from dropdown" : null}
        onChange={(value) => handleSelect(value)}
        options={UK_CITIES?.split(",")?.map((city) => ({
          value: city,
          label: city,
        }))}
      />
    );
  }
}
