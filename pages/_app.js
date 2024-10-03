import {
  ActionList,
  Frame,
  Icon,
  Navigation,
  AppProvider as PolarisProvider,
  TopBar,
} from "@shopify/polaris";
import {
  ChartVerticalIcon,
  AppsIcon,
  ChevronRightIcon,
  ContentIcon,
  PersonIcon,
  DiscountIcon,
  BankIcon,
  HomeIcon,
  TargetIcon,
  NotificationIcon,
  OrderIcon,
  ProductIcon,
  StoreIcon,
} from "@shopify/polaris-icons";
import "@shopify/polaris/build/esm/styles.css";
import translations from "@shopify/polaris/locales/en.json";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import GrimBag from "../icons/grim-bag"
export default function App({ Component, pageProps }) {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchResultsDismiss = useCallback(() => {
    setIsSearchActive(false);
    setSearchValue("");
  }, []);

  const handleSearchChange = useCallback((value) => {
    setSearchValue(value);
    setIsSearchActive(value.length > 0);
  }, []);

  const handleNavigationToggle = useCallback(() => {
    console.log("toggle navigation visibility");
  }, []);

  const isSelected = (path) => {
    return router.pathname === path;
  };

  const router = useRouter();

  const logo = {
    width: 35,
    topBarSource: GrimBag,
    accessibilityLabel: "Test Store",
  };

  const userMenuMarkup = (
    <>
      <div style={{ marginLeft: "10px" }} />
      <TopBar.Menu
        activatorContent={
          <>
            <Icon source={NotificationIcon} />
          </>
        }
      ></TopBar.Menu>
      <TopBar.UserMenu name="Kinngh" detail="Playground Test" initials="K" />
    </>
  );

  const searchResultsMarkup = <ActionList />;

  const searchFieldMarkup = (
    <TopBar.SearchField
      onChange={handleSearchChange}
      value={searchValue}
      placeholder="Search"
      showFocusBorder
    />
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      searchResultsVisible={isSearchActive}
      searchField={searchFieldMarkup}
      searchResults={searchResultsMarkup}
      onSearchResultsDismiss={handleSearchResultsDismiss}
      onNavigationToggle={handleNavigationToggle}
    />
  );

  const AppNavigation = (
    <Navigation location="/">
    <Navigation.Section
      items={[
        {
          url: '/home',
          excludePaths: ['/home'],
          label: 'Home',
          icon: HomeIcon,
          disabled: false,
          selected: isSelected('/home'),
        },
        {
          url: '#',
          excludePaths: ['#'],
          label: 'Orders',
          icon: OrderIcon,
          disabled: true,
          subNavigationItems: [
            {
              url: '#',
              excludePaths: ['#'],
              disabled: false,
              label: 'Collections',
            },
            {
              url: '#',
              excludePaths: ['#'],
              disabled: false,
              label: 'Inventory',
            },
          ],
        },
        {
          url: '#',
          excludePaths: ['#'],
          label: 'Marketing',
          disabled: true,
          icon: TargetIcon,
          subNavigationItems: [
            {
              url: '#',
              excludePaths: ['#'],
              disabled: false,
              label: 'Reports',
            },
            {
              url: '#',
              excludePaths: ['#'],
              disabled: false,
              label: 'Live view',
            },
          ],
        },
        {
          url: '#',
          excludePaths: ['#'],
          label: 'Products',
          icon: ProductIcon,
          disabled: true,
          subNavigationItems: [
            {
              url: '#',
              excludePaths: ['#'],
              disabled: false,
              label: 'Collections',
            },
            {
              url: '#',
              excludePaths: ['#'],
              disabled: false,
              label: 'Inventory',
            },
          ],
        },
      ]}
    />
    <Navigation.Section
        title="Sales channels"
        items={[
          {
            url: '/online-store',
            label: "Online Store",
            icon: StoreIcon,
            selected: isSelected('/online-store'),
          },
        ]}
        action={{
          icon: ChevronRightIcon,
          accessibilityLabel: "Add",
          onClick: () => {
            router.push("/online-store");
          },
        }}
      />
      <Navigation.Section
        title="Apps"
        items={[
          {
            url: '/debug',
            label: "Polaris Playground",
            icon: AppsIcon,
            selected: isSelected('/debug'),
          },
        ]}
        action={{
          icon: ChevronRightIcon,
          accessibilityLabel: "Add",
        }}
      />
  </Navigation>
  );
  return (
    <>
      <PolarisProvider i18n={translations}>
        <Frame navigation={AppNavigation} topBar={topBarMarkup} logo={logo}>
          <div style={{ paddingBottom: "35px" }} />
          <hr style={{ border: "0.8px solid #E1E3E5" }} />
          <Component {...pageProps} />
        </Frame>
      </PolarisProvider>
    </>
  );
}
