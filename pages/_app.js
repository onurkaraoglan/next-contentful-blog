import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import "../styles/navigation.css";
import "../styles/footer.css";
import "../styles/toggle.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
