import {
  Box,
  Card,
  Page,
  Text,
  BlockStack,
  useBreakpoints,
  TextField,
  InlineGrid,
  Button,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useState } from "react";
import { json, useLoaderData, Form } from "@remix-run/react";

import db from "../db.server";

// Loader: Fetch settings, create default row if not exists
export async function loader() {
  let settings =await db.settings.findFirst();


  if (!settings) {
    settings = await db.settings.create({
      data: {
        id: "1",
        name: "",
        description: "",
      },
    });
  }

  return json(settings);
}

// Action: Update data in DB when form is submitted
export async function action({ request }) {
  let formData = await request.formData();
  let data = Object.fromEntries(formData);

  await db.settings.upsert({
    where: { id: "1" },
    update: {
      name: data.name,
      description: data.description,
    },
    create: {
      id: "1",
      name: data.name,
      description: data.description,
    },
  });

  return json({ success: true });
}

export default function AdditionalPage() {
  const settings = useLoaderData();
  const [formsaved, setFormSaved] = useState(settings);

  const { smUp } = useBreakpoints();

  return (
    <Page
      divider
      primaryAction={{ content: "View on your store", disabled: true }}
      secondaryActions={[
        {
          content: "Duplicate",
          accessibilityLabel: "Secondary action label",
          onAction: () => alert("Duplicate action"),
        },
      ]}
    >
      <BlockStack gap={{ xs: "800", sm: "400" }}>
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: 400, sm: 0 }}
            paddingInlineEnd={{ xs: 400, sm: 0 }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                InterJambs
              </Text>
              <Text as="p" variant="bodyMd">
                Interjambs are the rounded protruding bits of your puzzle piece
              </Text>
            </BlockStack>
          </Box>

          {/* Form for App Settings */}
          <Card roundedAbove="sm">
            <Form method="POST">
              <BlockStack gap="400">
                <TextField
                  label="App Name"
                  name="name"
                  value={formsaved?.name ?? ""}
                  onChange={(value) =>
                    setFormSaved({ ...formsaved, name: value })
                  }
                />
                <TextField
                  label="App Description"
                  name="description"
                  value={formsaved?.description ?? ""}
                  onChange={(value) =>
                    setFormSaved({ ...formsaved, description: value })
                  }
                />
                <Button submit>Submit</Button>
              </BlockStack>
            </Form>
          </Card>
        </InlineGrid>
      </BlockStack>
    </Page>
  );
}

function Code({ children }) {
  return (
    <Box
      as="span"
      padding="025"
      paddingInlineStart="100"
      paddingInlineEnd="100"
      background="bg-surface-active"
      borderWidth="025"
      borderColor="border"
      borderRadius="100"
    >
      <code>{children}</code>
    </Box>
  );
}
