import { ThemeProvider } from "next-themes";
import Layout from "@blog/components/Layout";
import "@blog/styles/globals.css";
import "@blog/styles/navigation.css";
import "@blog/styles/footer.css";
import "@blog/styles/toggle.css";
import "@blog/styles/prism.css";

export const metadata = {
  title: "Onur - Home",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
