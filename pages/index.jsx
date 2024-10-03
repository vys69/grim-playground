import {
  BlockStack,
  Button,
  Card,
  InlineStack,
  Layout,
  Page,
  Text,
} from "@shopify/polaris";
import isInitialLoad from "@/utils/middleware/isInitialLoad";
import { useRouter } from "next/router";

//On first install, check if the store is installed and redirect accordingly
export async function getServerSideProps(context) {
  return await isInitialLoad(context);
}
const Index = () => {
  const router = useRouter();
  return (
    <>
      <Page>
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="200">
                <Text variant="headingMd">Welcome to the Playground</Text>
                <Text>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et recusandae esse libero neque debitis quasi excepturi magnam provident aperiam numquam voluptatem laboriosam dolorum exercitationem aspernatur nobis, laborum harum. Eaque, placeat.
                </Text>
                <Text>
                 lol Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut porro, corporis eveniet rem voluptatibus repellendus blanditiis eum quia! Voluptates magnam eveniet autem sint assumenda doloremque. Necessitatibus harum corrupti at voluptatibus!
                </Text>
                <InlineStack align="end">
                  <Button
                    variant="primary"
                    onClick={() => {
                      router.push('/online-store/themes');
                    }}
                  >
                    Customize themes
                  </Button>
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
};

export default Index;
