import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { useRouter } from "next/router";
import languageDetector from '/lib/languageDetector'

export default function LanguageSwitchDropdown(props) {
  const i18next = props.i18next;
  let { t, i18n } = i18next;
  const router = useRouter();

  const currentLocale = router.query.locale || i18nextConfig?.i18n?.defaultLocale;
  console.log('currentLocale',currentLocale)

  const [selectedKeys, setSelectedKeys] = React.useState(new Set([currentLocale]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="bordered" 
          className="capitalize"
        >
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <DropdownItem key="th" onClick={() => languageDetector.cache('th')}>TH</DropdownItem>
        <DropdownItem key="en" onClick={() => languageDetector.cache('en')}>EN</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
