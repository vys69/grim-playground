import React from 'react';
import {
    Page,
    Layout,
    Card,
    Popover,
    ActionList,
    Button,
    ButtonGroup,
    Text,
    InlineStack,
    BlockStack,
    Box,
    Divider,
    Thumbnail,
    Badge,
} from '@shopify/polaris';
import { ViewIcon, MenuHorizontalIcon, StoreMajor, UploadMajor, GitHubMajor, ThemeIcon, MagicIcon } from '@shopify/polaris-icons';
import { useCallback, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDates } from '../../../hooks/useDates';
import { getInitialDates } from '../../../utils/dateUtils';

export async function getServerSideProps() {
    return {
        props: {
            initialDates: getInitialDates()
        }
    };
}

const ThemeItem = ({ theme }) => {
    const [moreActionsActive, setMoreActionsActive] = useState(false);

    const toggleMoreActions = useCallback(() => setMoreActionsActive((active) => !active), []);

    const moreActionsPopover = (
        <Popover
            active={moreActionsActive}
            activator={<Button onClick={toggleMoreActions} icon={MenuHorizontalIcon} />}
            onClose={toggleMoreActions}
        >
            <ActionList
                actionRole="menuitem"
                items={[
                    { content: 'Preview', onAction: () => { } },
                    { content: 'Rename', onAction: () => { } },
                    { content: 'Duplicate', onAction: () => { } },
                    { content: 'Download theme file', onAction: () => { } },
                    { content: 'Edit code', onAction: () => { } },
                    { content: 'Edit default theme content', onAction: () => { } },
                    { content: 'Disconnect from GitHub', onAction: () => { } },
                    { content: 'Reset to latest commit', onAction: () => { } },
                    { content: 'Remove', onAction: () => { } },
                ]}
            />
        </Popover>
    );

    return (
        <Box padding="400">
            <InlineStack align="space-between">
                <InlineStack gap="400">
                    <Thumbnail
                        // source={theme.image}
                        source={MagicIcon}
                        alt={`${theme.name} preview`}
                        size="large"
                    />
                    {/* <img
                        alt="Theme thumbnail"
                        src={theme.image}
                        height="72px"
                        width="90px"
                        style={{ borderRadius: '6px' }}
                    /> */}
                    <BlockStack gap="100">
                        <InlineStack gap="200" align="center">
                            <Text variant="headingMd" as="h3">{theme.name}</Text>
                            <Badge tone={theme.isCurrent ? "success" : "subdued"}>{theme.isCurrent ? "Current theme" : `${theme.status}`}</Badge>
                        </InlineStack>
                        <Text variant="bodySm" as="p" color="subdued">
                            {theme.isCurrent ? `Last saved: ${theme.lastSaved}` : `Added: ${theme.added}`}
                        </Text>
                        <Text variant="bodySm" as="p" color="subdued">
                            {theme.version}
                        </Text>
                    </BlockStack>
                </InlineStack>
                <ButtonGroup>
                    {moreActionsPopover}
                    <Button>Publish</Button>
                    <Button disabled={theme.disabled} variant="primary">Customize</Button>
                </ButtonGroup>
            </InlineStack>
        </Box>
    );
};

const ThemesPage = ({ initialDates }) => {
    const router = useRouter();
    const dates = useDates();

    const [mainTheme, setMainTheme] = useState([
        {
            name: "GRIM'S LAB | WINXP",
            lastSaved: dates.current,
            version: "SYNICAL | Live Theme version 1.0.0",
            isCurrent: true,
            desktopImage: "/desktopImage.png",
            mobileImage: "/mobileImage.png"
        }
    ]);

    const [themes, setThemes] = useState([
        {
            name: "Theme 1",
            status: "In Development",
            added: dates.yesterday,
            disabled: true,
            version: "Version 1.0.0",
            image: "https://cdn.shopify.com/screenshots/shopify/s1drh40m8v5le96u9lksxiacip329ni-47831449763.shopifypreview.com?height=1080&version=357d54c586a211efa8abe8258c8beb1f794ee8abb786f8d5e20a21a32f18c28b&width=1350&resize_width=180&resize_height=144"
        },
        {
            name: "Theme 2",
            status: "Coming soon",
            disabled: true,
            added: dates.monthAgo,
            version: "Version 1.0.0",
            image: "https://cdn.shopify.com/screenshots/shopify/s1drh40m8v5le96u9lksxiacip329ni-47831449763.shopifypreview.com?height=1080&version=357d54c586a211efa8abe8258c8beb1f794ee8abb786f8d5e20a21a32f18c28b&width=1350&resize_width=180&resize_height=144"
        }
    ]);

    const [addThemeActive, setAddThemeActive] = useState(false);

    const toggleAddTheme = useCallback(() => setAddThemeActive((active) => !active), []);

    return (
        <Page
            title="Hi chat"
            primaryAction={<Button icon={ViewIcon} variant="secondary">View your store</Button>}
        >
            <Layout>
                <Layout.Section>
                    <Card padding="0">
                        {mainTheme.map((theme) => (
                            <div key={theme.name} className="themePreviewContainer">
                                <div className="mockupsContainer">
                                    <div className="desktopMockup">
                                        <img
                                            alt="Desktop Theme preview"
                                            src={theme.desktopImage}
                                        />
                                    </div>
                                    <div className="mobileMockup">
                                        <img
                                            alt="Mobile Theme preview"
                                            src={theme.mobileImage}
                                        />
                                    </div>
                                </div>
                                <div className="themeDetailsOverlay">
                                    <InlineStack align="space-between">
                                        <InlineStack gap="400">
                                            {/* <Thumbnail
                                                source={MagicIcon}
                                                alt={`${theme.name} thumbnail`}
                                                size="large"
                                            /> */}
                                            <img
                                                alt="Theme thumbnail"
                                                src={theme.desktopImage}
                                                height="72px"
                                                width="90px"
                                                style={{ borderRadius: '6px' }}
                                            />
                                            <BlockStack gap="100">
                                                <InlineStack gap="200" align="center">
                                                    <Text variant="headingMd" as="h3">{theme.name}</Text>
                                                    {theme.isCurrent && <Badge tone="success">Current theme</Badge>}
                                                </InlineStack>
                                                <Text variant="bodySm" as="p" color="subdued">
                                                    Last saved: {theme.lastSaved}
                                                </Text>
                                                <Text variant="bodySm" as="p" color="subdued">
                                                    {theme.version}
                                                </Text>
                                            </BlockStack>
                                        </InlineStack>
                                        <ButtonGroup>
                                            <Button icon={MenuHorizontalIcon}></Button>
                                            <Button
                                                variant="primary"
                                                onClick={() => {
                                                    router.push('/customize');
                                                }}
                                            >
                                                Customize
                                            </Button>
                                        </ButtonGroup>
                                    </InlineStack>
                                </div>
                            </div>
                        ))}
                    </Card>
                </Layout.Section>
                <Layout.Section>
                    <Card>
                        <Box padding="400">
                            <InlineStack align="space-between">
                                <BlockStack gap="100">
                                    <Text variant="headingMd" as="h3">Theme library</Text>
                                    <Text variant="bodyMd" as="p">
                                        These themes are only visible to you. You can switch to another theme by publishing it to your store.
                                    </Text>
                                </BlockStack>
                                <Popover
                                    active={addThemeActive}
                                    activator={
                                        <Button onClick={toggleAddTheme} disclosure="down">
                                            Add theme
                                        </Button>
                                    }
                                    onClose={toggleAddTheme}
                                >
                                    <ActionList
                                        actionRole="menuitem"
                                        items={[
                                            {
                                                content: 'Visit Theme Store',
                                                icon: StoreMajor,
                                                onAction: () => { }
                                            },
                                            {
                                                content: 'Upload zip file',
                                                icon: UploadMajor,
                                                onAction: () => { }
                                            },
                                            {
                                                content: 'Connect from GitHub',
                                                icon: GitHubMajor,
                                                onAction: () => { }
                                            }
                                        ]}
                                    />
                                </Popover>
                            </InlineStack>
                        </Box>
                        <Divider />
                        {themes.map((theme, index) => (
                            <React.Fragment key={theme.name}>
                                {index > 0 && <Divider />}
                                <ThemeItem theme={theme} />
                            </React.Fragment>
                        ))}
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );
};

export default ThemesPage;