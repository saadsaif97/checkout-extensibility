import {
  reactExtension,
  Select,
  useApplyShippingAddressChange,
  useShippingAddress,
} from '@shopify/ui-extensions-react/checkout';
import { useEffect, useState } from 'react';

export default reactExtension(
  'purchase.checkout.delivery-address.render-before',
  () => <Extension />,
);

function Extension() {
  const address = useShippingAddress();
  const [city, setCity] = useState('');
  const updateShippingAddress = useApplyShippingAddressChange();
  
  const handleSelect = async (value) => {
    try {
      console.log(value, address)
      setCity(value)
      updateShippingAddress({
        address: {
          city: value
        },
        type: "updateShippingAddress"
      })
    } catch (error) {
      console.log({error})
    }
  }
  
  const PAKISTAN_CITIES = "Karachi,Lahore,Kotla Qasim Khan,Faisalabad,Rawalpindi,Gujranwala,Peshawar,Multan,Hyderabad City,Islamabad,Quetta,Cantonment,Eminabad";
  if (address?.countryCode == "PK") {
    return (
      <Select
        label="Select city"
        value={city}
        onChange={(value) => handleSelect(value)}
        options={
          PAKISTAN_CITIES.split(',').map(city => ({
            value: city,
            label: city
          }))
        }
      />
    );
  }
  
  const UK_CITIES = "London,Birmingham,Glasgow,Liverpool,Manchester,Sheffield,Leeds,Edinburgh,Bristol,Cardiff";
  if (address?.countryCode == "GB") {
    return (
      <Select
        label="Select city"
        value={city}
        onChange={(value) => handleSelect(value)}
        options={
          UK_CITIES.split(',').map(city => ({
            value: city,
            label: city
          }))
        }
      />
    );
  }
  


  
}