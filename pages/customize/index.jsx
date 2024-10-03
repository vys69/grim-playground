import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import {
  AppProvider,
  Page,
  FullscreenBar,
  Button,
  ButtonGroup,
  Tooltip,
  Text,
  Badge,
  Icon,
} from "@shopify/polaris";
import {
  ArrowLeftMinor,
  DesktopMajor,
  MobileMajor,
  ViewportWideMajor,
  UndoMajor,
  RedoMajor,
  MagicMajor,
  GlobeMinor,
  HomeMinor,
  ChevronDownMinor,
  MenuHorizontalIcon,
} from '@shopify/polaris-icons';
import isInitialLoad from "@/utils/middleware/isInitialLoad";

export async function getServerSideProps(context) {
  return await isInitialLoad(context);
}

const CustomizePage = () => {
  const [selectedMode, setSelectedMode] = useState('desktop');
  const [isFullscreen, setFullscreen] = useState(true);

  const handleExitAction = useCallback(() => {
    router.push('/online-store/themes');
  }, []);

  const router = useRouter();

  return (
    <AppProvider i18n={{}}>
      <Page fullWidth>
        {isFullscreen && (
          <FullscreenBar onAction={handleExitAction}>
            <div style={{
              display: 'flex',
              flexGrow: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingLeft: '1rem',
              paddingRight: '1rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Text variant="bodyMd" as="span">SYN | STL TESTING</Text>
                <Badge status="success">Live</Badge>
                <Button plain icon={MenuHorizontalIcon} accessibilityLabel="More options" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Button plain icon={GlobeMinor} disclosure>Default</Button>
                <div style={{ width: '1px', height: '20px', backgroundColor: '#e1e3e5' }} />
                <Button plain icon={HomeMinor} disclosure>Home page</Button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Tooltip content="Activate inspector">
                  <Button plain icon={MagicMajor} />
                </Tooltip>
                <ButtonGroup segmented>
                  <Tooltip content="Desktop view">
                    <Button 
                      icon={DesktopMajor} 
                      pressed={selectedMode === 'desktop'}
                      onClick={() => setSelectedMode('desktop')}
                    />
                  </Tooltip>
                  <Tooltip content="Mobile view">
                    <Button 
                      icon={MobileMajor} 
                      pressed={selectedMode === 'mobile'}
                      onClick={() => setSelectedMode('mobile')}
                    />
                  </Tooltip>
                  <Tooltip content="Full-width view">
                    <Button 
                      icon={ViewportWideMajor} 
                      pressed={selectedMode === 'full'}
                      onClick={() => setSelectedMode('full')}
                    />
                  </Tooltip>
                </ButtonGroup>
                <Tooltip content="Undo">
                  <Button plain icon={UndoMajor} disabled />
                </Tooltip>
                <Tooltip content="Redo">
                  <Button plain icon={RedoMajor} disabled />
                </Tooltip>
                <Button primary disabled>Save</Button>
              </div>
            </div>
          </FullscreenBar>
        )}
        {/* Add your theme customization UI components here */}
      </Page>
    </AppProvider>
  );
};

export default CustomizePage;