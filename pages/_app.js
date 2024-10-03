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
  Tooltip,

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
  ViewIcon,
} from "@shopify/polaris-icons";
import "@shopify/polaris/build/esm/styles.css";
import translations from "@shopify/polaris/locales/en.json";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";
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
    topBarSource: "https://github-production-user-asset-6210df.s3.amazonaws.com/75869731/373111702-ffa87fe1-17b4-41ca-8ac6-00940e4e5245.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20241003%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241003T040321Z&X-Amz-Expires=300&X-Amz-Signature=d39e2775b334eefeda60b36c67a5b3887a6bc8defb56347aa7f2fe7587af6795&X-Amz-SignedHeaders=host",
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
            secondaryAction: {
              icon: ViewIcon,
              accessibilityLabel: "View",
            },
            displayActionsOnHover: true,
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
