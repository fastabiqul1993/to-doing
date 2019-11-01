import React, { Component, Fragment } from "react";
import {
  Row,
  Col,
  Alert,
  InputGroup,
  Button,
  FormControl,
  Modal,
  ModalBody,
  ButtonGroup,
  Spinner
} from "react-bootstrap";
import Swal from "sweetalert2";

export default class Todos extends Component {
  state = {
    todos: [],
    realTodos: [],
    value: "",
    editValue: "",
    show: false,
    isloading: false,
    id: ""
  };

  onChange = e => {
    this.setState({ value: e.target.value });
  };

  onChangeEdit = e => {
    this.setState({ editValue: e.target.value });
  };

  onShow = (id, editValue) => {
    console.log(editValue);
    this.setState({ show: true, id: id, editValue: editValue });
  };

  onClose = () => {
    this.setState({ show: false, id: "", editValue: "" });
  };

  submitTodo = () => {
    const newTodo = {
      id: (this.state.todos.length += 1),
      name: this.state.value,
      status: "doing"
    };
    const todolist = this.state.todos;
    todolist.push(newTodo);
    const realTodos = this.state.realTodos;
    realTodos.push(newTodo);

    this.setState({
      todos: todolist,
      realTodos: realTodos,
      value: "",
      id: ""
    });
  };

  updateTodo = () => {
    let todolist = this.state.todos;
    let realTodos = this.state.realTodos;

    todolist.map(todo => {
      if (todo.id === this.state.id) {
        todo.name = this.state.editValue;
      }
    });

    realTodos.map(todo => {
      if (todo.id === this.state.id) {
        todo.name = this.state.editValue;
      }
    });

    this.setState({
      todos: todolist,
      realTodos: realTodos,
      editValue: "",
      id: "",
      show: false
    });
  };

  markAsDone = () => {
    let todolist = this.state.todos;
    let realTodos = this.state.realTodos;

    todolist.map(todo => {
      if (todo.id === this.state.id) {
        todo.status = false;
      }
    });

    realTodos.map(todo => {
      if (todo.id === this.state.id) {
        todo.status = false;
      }
    });

    this.setState({
      todos: todolist,
      realTodos: realTodos,
      editValue: "",
      id: "",
      show: false
    });
  };

  deleteTodo = id => {
    const deleted = this.state.todos.filter(todo => todo.id !== id);
    const deleted2 = this.state.realTodos.filter(todo => todo.id !== id);

    this.setState({
      todos: deleted,
      realTodos: deleted2,
      id: ""
    });
  };

  filterDone = () => {
    this.setState({
      isloading: true
    });

    let todolist = this.state.realTodos;
    let mutated = todolist.filter(todo => todo.status === false);

    setTimeout(
      function() {
        this.setState({ todos: mutated, isloading: false });
      }.bind(this),
      1000
    );
  };

  filterUndone = () => {
    this.setState({
      isloading: true
    });

    let todolist = this.state.realTodos;
    let mutated = todolist.filter(todo => todo.status === true);

    setTimeout(
      function() {
        this.setState({ todos: mutated, isloading: false });
      }.bind(this),
      1000
    );
  };

  removeFilter = () => {
    this.setState({
      isloading: true
    });

    setTimeout(
      function() {
        this.setState({ todos: this.state.realTodos, isloading: false });
      }.bind(this),
      1000
    );
  };

  componentDidMount = () => {
    const dummyTodo = [
      { id: 1, name: "Eating", status: true },
      { id: 4, name: "Sleeping", status: true },
      { id: 3, name: "Fighting", status: true }
    ];

    this.setState({ todos: dummyTodo, realTodos: dummyTodo });
  };

  render() {
    const { todos, value, show, editValue, isloading } = this.state;

    return (
      <Fragment>
        <Row>
          <Col md={6}>
            <h1>To-doing</h1>
          </Col>
          <Col md={6} style={{ paddingLeft: "10%", paddingTop: 5 }}>
            <ButtonGroup aria-label="Basic example">
              <Button
                onClick={() => this.removeFilter()}
                variant="outline-primary"
              >
                All
              </Button>
              <Button
                onClick={() => this.filterDone()}
                variant="outline-success"
              >
                Done
              </Button>
              <Button
                onClick={() => this.filterUndone()}
                variant="outline-success"
              >
                Undone
              </Button>
            </ButtonGroup>
          </Col>
        </Row>

        {isloading ? (
          <Row style={{ height: "70vh" }}>
            <Col md={5}></Col>
            <Col md={2}>
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </Col>
            <Col md={5}></Col>
          </Row>
        ) : (
          <Fragment>
            {todos.length > 0 ? (
              <div style={{ height: "70vh", padding: 0, overflow: "auto" }}>
                <Row style={{ maxWidth: "103%" }}>
                  {todos.map((todo, index) => (
                    <Col key={index} md={12} style={{ paddingRight: 0 }}>
                      <Alert variant="primary">
                        <Row>
                          {todo.status ? (
                            <Col
                              md={10}
                              onClick={() => this.onShow(todo.id, todo.name)}
                            >
                              {todo.name}
                            </Col>
                          ) : (
                            <Col
                              md={10}
                              onClick={() => this.onShow(todo.id, todo.name)}
                              style={{ textDecoration: "line-through" }}
                            >
                              {todo.name}
                            </Col>
                          )}
                          <Col md={2}>
                            <button
                              type="button"
                              className="close"
                              onClick={() => this.deleteTodo(todo.id)}
                            >
                              &times;
                            </button>
                          </Col>
                        </Row>
                      </Alert>
                    </Col>
                  ))}
                </Row>
              </div>
            ) : (
              <Row style={{ height: "70vh" }}>
                <Col style={{ marginTop: "10vh" }}>
                  <h3 style={{ color: "#bdc3c7", textAlign: "center" }}>
                    Task not found!
                  </h3>
                </Col>
              </Row>
            )}
          </Fragment>
        )}

        <Row style={{ marginTop: "5vh" }}>
          <Col md={12}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Create new todo!"
                aria-label="New todo"
                aria-describedby="basic-addon2"
                type="text"
                value={value}
                onChange={this.onChange}
              />
              <InputGroup.Append>
                <Button variant="primary" onClick={this.submitTodo}>
                  Add todo
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>

        <Modal show={show} onHide={this.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Hi what do you want?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormControl
              placeholder="Edit todo!"
              aria-label="Edit todo"
              aria-describedby="basic-addon2"
              type="text"
              value={editValue}
              onChange={this.onChangeEdit}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.updateTodo}>
              Edit
            </Button>
            <Button variant="primary" onClick={this.markAsDone}>
              Mark as done
            </Button>
          </Modal.Footer>
        </Modal>
      </Fragment>
    );
  }
}
