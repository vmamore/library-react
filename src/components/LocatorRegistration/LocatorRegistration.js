import { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router";
import { createLocator } from "../../services/library-api";

export function LocatorRegistration(props) {
  const history = useHistory();
  const [firstName, setFirstName] = useState(null);
  const [password, setPassword] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [cpf, setCpf] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [street, setStreet] = useState(null);
  const [city, setCity] = useState(null);
  const [number, setNumber] = useState(null);
  const [district, setDistrict] = useState(null);
  const [birthDate, setBirthDate] = useState(null);

  function createLocatorSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    createLocator({
      firstName,
      lastName,
      cpf,
      username,
      email,
      street,
      city,
      number,
      district,
      birthDate,
      password,
    }).then((response) => {
      history.go(0);
      props.onHide();
    });
  }

  function onChange(input, setState) {
    setState(input.target.value);
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form onSubmit={createLocatorSubmit}>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  onChange={(e) => onChange(e, setFirstName)}
                  value={firstName}
                  type="text"
                  placeholder="First Name"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  onChange={(e) => onChange(e, setLastName)}
                  value={lastName}
                  type="text"
                  placeholder="Last Name"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicCpf">
                <Form.Label>CPF</Form.Label>
                <Form.Control
                  onChange={(e) => onChange(e, setCpf)}
                  value={cpf}
                  type="text"
                  placeholder="CPF"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col xs={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  onChange={(e) => onChange(e, setEmail)}
                  value={email}
                  type="text"
                  placeholder="Email"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  onChange={(e) => onChange(e, setUsername)}
                  value={username}
                  type="text"
                  placeholder="Username"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={(e) => onChange(e, setPassword)}
                  value={password}
                  type="password"
                  placeholder="Password"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicStreet">
                <Form.Label>Street</Form.Label>
                <Form.Control
                  onChange={(e) => onChange(e, setStreet)}
                  value={street}
                  type="text"
                  placeholder="Street"
                  required
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3" controlId="formBasicCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  onChange={(e) => onChange(e, setCity)}
                  value={city}
                  type="text"
                  placeholder="City"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="g-3">
            <Col>
              <Form.Group className="mb-3" controlId="formBasicNumber">
                <Form.Label>Number</Form.Label>
                <Form.Control
                  onChange={(e) => onChange(e, setNumber)}
                  value={number}
                  type="text"
                  placeholder="Number"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicDistrict">
                <Form.Label>District</Form.Label>
                <Form.Control
                  onChange={(e) => onChange(e, setDistrict)}
                  value={district}
                  type="text"
                  placeholder="District"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicBirthDate">
                <Form.Label>Birth Date</Form.Label>
                <Form.Control
                  onChange={(e) => onChange(e, setBirthDate)}
                  value={birthDate}
                  type="date"
                  placeholder="Birth Date"
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" type="submit">
            Create
          </Button>
          <Button variant="outline-danger" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
