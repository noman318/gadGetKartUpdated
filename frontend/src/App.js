import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";

import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          {/* <HomeScreen /> */}
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
