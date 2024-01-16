import {
  Banner,
  useApi,
  useTranslate,
  reactExtension,
  Select,
  useApplyAttributeChange,
  useApplyNoteChange,
} from '@shopify/ui-extensions-react/checkout';
import { useState } from 'react';

export default reactExtension(
  'purchase.checkout.block.render',
  () => <Extension />,
);

function Extension() {
  const [location, setLocation] = useState('');
  const attributeChange = useApplyAttributeChange();
  const noteChange = useApplyNoteChange()
  
  const handleSelect = async (value) => {
    console.log({value})
    setLocation(value)
    try {
      await attributeChange({
        type: 'updateAttribute',
        key: "shippingArea",
        value: value
      })
      await noteChange({
        note: value,
        type: 'updateNote'
      })
    } catch (error) {
      console.log({error})
    }
  }

  return (
    <Select
      label="Shipping Area"
      value={location}
      onChange={(value) => handleSelect(value)}
      options={[
        {
          value: 'West london',
          label: 'West london',
        },
        {
          value: 'East london',
          label: 'East london',
        },
        {
          value: 'Central london',
          label: 'Central london',
        }
      ]}
    />
  );
}