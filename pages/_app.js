import {
  ActionList,
  Frame,
  Icon,
  Navigation,
  AppProvider as PolarisProvider,
  TopBar,
  Page,
  Layout,
  Text,
  Card,
  Modal,
  TextContainer,
  Button,
} from "@shopify/polaris";
import {
  AppsIcon,
  ChevronRightIcon,
  HomeIcon,
  TargetIcon,
  NotificationIcon,
  OrderIcon,
  ProductIcon,
  StoreIcon,
  ChartVerticalIcon,
  ContentIcon,
  PersonIcon,
  DiscountIcon,
  BankIcon,
  SearchIcon,
} from "@shopify/polaris-icons";
import "@shopify/polaris/build/esm/styles.css";
import translations from "@shopify/polaris/locales/en.json";
import { useCallback, useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react"
import { useRouter } from "next/router";
import '@/assets/globals.css';

const MobileContent = ({ topBarMarkup, logo }) => {
  const [active, setActive] = useState(true);

  const handleChange = useCallback(() => setActive(!active), [active]);

  const activator = <Button onClick={() => setActive(true)}>View message again</Button>;

  return (
    <Frame topBar={topBarMarkup} logo={logo}>
      <div style={{
        position: 'relative',
        width: '100vw',
        height: 'calc(100vh - 56px)', // Subtracting top bar height
        overflow: 'hidden'
      }}>
        <img
          src="https://media.tenor.com/fEgws0QEUxQAAAAM/no-nope.gif"
          alt="No access on mobile"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.7)',
          }}
        />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          width: '80%',
          color: 'white',
        }}>
          <Text as="h2" variant="headingXl" color="white">
            Whoa! You can't access this page on mobile.
          </Text>
          <div style={{ marginTop: '20px' }}>
            {activator}
          </div>
        </div>
      </div>

      <Modal
        open={active}
        onClose={handleChange}
        title="Sorry 😬"
        primaryAction={{
          content: 'Ok 😔',
          onAction: handleChange,
        }}
      >
        <Modal.Section>
          <TextContainer>
            <p>
              This app is not available on mobile (yet?). Please either switch to a desktop device, or DM expletives to me on Twitter.
            </p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </Frame>
  );
};

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isCustomizePage = router.pathname.startsWith('/customize');

  if (isCustomizePage) {
    return <Component {...pageProps} />;
  }

  const [isMobile, setIsMobile] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchResultsDismiss = useCallback(() => {
    setIsSearchActive(false);
    setSearchValue("");
  }, []);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust this breakpoint as needed
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleSearchChange = useCallback((value) => {
    setSearchValue(value);
    setIsSearchActive(value.length > 0);
  }, []);

  const handleNavigationToggle = useCallback(() => {
    console.log("toggle navigation visibility");
  }, []);

  useEffect(() => {
    const currentPath = router.pathname;
    if (currentPath.startsWith('/online-store')) {
      setExpandedItems(prev => ({ ...prev, onlineStore: true }));
    }
  }, [router.pathname]);

  const logo = {
    width: 35,
    topBarSource: "/grim-bag.png",
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
      <TopBar.UserMenu name="User" detail="Playground" initials="U" />
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

  const isSelected = (path) => router.pathname === path;
  const [ordersCount, setOrdersCount] = useState(0);

  useEffect(() => {
    setOrdersCount(Math.floor(Math.random() * 1000) + 1);
  }, []);

  const onlineStoreSelected = router.pathname.startsWith('/online-store');

  const AppNavigation = (
    <Navigation location="/">
      <Navigation.Section
        items={[
          {
            url: '/',
            excludePaths: ['/'],
            label: 'Home',
            icon: HomeIcon,
            disabled: false,
            selected: isSelected('/'),
          },
          {
            url: '#',
            excludePaths: ['#'],
            label: 'Orders',
            icon: OrderIcon,
            badge: ordersCount,
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
          {
            url: '#',
            excludePaths: ['#'],
            label: 'Customers',
            icon: PersonIcon,
            disabled: true,
            selected: isSelected('#'),
          },
          {
            url: '#',
            excludePaths: ['#'],
            label: 'Content',
            icon: ContentIcon,
            disabled: true,
            selected: isSelected('#'),
          },
          {
            url: '#',
            excludePaths: ['#'],
            label: 'Finances',
            icon: BankIcon,
            disabled: true,
            selected: isSelected('#'),
          },
          {
            url: '#',
            excludePaths: ['#'],
            label: 'Analytics',
            icon: ChartVerticalIcon,
            disabled: true,
            selected: isSelected('#'),
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
            label: 'Discounts',
            icon: DiscountIcon,
            disabled: true,
            selected: isSelected('#'),
          },
        ]}
      />
      <Navigation.Section
        title="Sales channels"
        items={[
          {
            url: '/online-store/themes',
            label: "Online Store",
            icon: StoreIcon,
            selected: onlineStoreSelected,
            expanded: router.pathname.startsWith('/online-store'),
            subNavigationItems: [
              {
                url: '/online-store/themes',
                label: 'Themes',
                selected: isSelected('/online-store/themes'),
              },
              {
                url: '/online-store/blog-posts',
                label: 'Blog Posts',
                disabled: true,
                selected: isSelected('/online-store/blog-posts'),
              },
              {
                url: '/online-store/pages',
                label: 'Pages',
                disabled: true,
                selected: isSelected('/online-store/pages'),
              },
              {
                url: '/online-store/navigation',
                label: 'Navigation',
                disabled: true,
                selected: isSelected('/online-store/navigation'),
              },
              {
                url: '/online-store/preferences',
                label: 'Preferences',
                disabled: true,
                selected: isSelected('/online-store/preferences'),
              },
            ],
          },
        ]}
        action={{
          icon: ChevronRightIcon,
          accessibilityLabel: "Add",
          onClick: () => {
            console.log('clicked');
          },
        }}
      />
      <Navigation.Section
        title="Apps"
        items={[
          {
            url: '/debug',
            label: "Tools",
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
        {isMobile ? (
          <MobileContent topBarMarkup={topBarMarkup} logo={logo} />
        ) : (
          <Frame navigation={AppNavigation} topBar={topBarMarkup} logo={logo}>
            <div style={{ paddingBottom: "35px" }} />
            <hr style={{ border: "0.8px solid #E1E3E5" }} />
            <Component {...pageProps} />
            <Analytics />
          </Frame>
        )}
      </PolarisProvider>
    </>
  );
}