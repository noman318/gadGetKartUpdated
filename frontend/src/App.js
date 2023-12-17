import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";

function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container className="App-header">
          <h1>Welcome to MyShop</h1>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
