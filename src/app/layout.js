import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import './styles/App.css';
import './styles/Base.css';
import './styles/themes/LucidDream.css';
import './styles/themes/PurpleRain.css';
import './styles/themes/Sandy.css';
import './styles/themes/Light.css';
import './styles/themes/Rosy.css';

export const metadata = {
  title: "FlipBio: Sharing made easy...",
  description: "FlipBio: Sharing made easy...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="base-theme lucid-dream">
        {children}
      </body>
    </html>
  );
}
