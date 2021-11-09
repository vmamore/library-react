import { useCallback, useState } from 'react'
import { LocatorRegistration } from '../../components/LocatorRegistration/LocatorRegistration'
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import { Redirect } from "react-router";
import { useKeycloak } from '@react-keycloak/web'
import logo from "../../assets/logo.png";

export function Home() {
  const { keycloak } = useKeycloak()
  const [modalShow, setModalShow] = useState(false);

  const login = useCallback(() => {
    keycloak?.login()
  }, [keycloak])

  if (keycloak?.authenticated)
    return <Redirect to={"/catalog"} />

  return (
    <>
    <Container fluid style={{ height: "100%" }}>
      <Row style={{ height: "100%" }}>
        <Col style={{ background: "black" }}></Col>
        <Col style={{ background: "black" }}></Col>
        <Col className="d-flex align-items-center justify-content-center">
          <div className="d-grid gap-2">
            <Image src={logo} rounded />
            <Button variant="outline-dark" 
              size="lg" 
              onClick={login}>
              See Catalog
            </Button>
            <Button variant="outline-secondary" 
              size="lg"
              onClick={() => setModalShow(true)}>
              Create Account
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
    <LocatorRegistration show={modalShow}
        onHide={() => setModalShow(false)} />
    </>
  );
}
