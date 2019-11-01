import React, { Component, Fragment } from "react";
import {
  Row,
  Col,
  Alert,
  InputGroup,
  Button,
  FormControl,
  Modal,
  ButtonGroup,
  Spinner
} from "react-bootstrap";

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
    this.setState({ show: true, id: id, editValue: editValue });
  };

  onClose = () => {
    this.setState({ show: false, id: "", editValue: "" });
  };

  submitTodo = async () => {
    let newId = await (this.state.todos.length += 1);
    let newTodo = {
      id: newId,
      name: this.state.value,
      isNotDone: true,
      isUrgent: false
    };

    let todolist = await this.state.todos;

    await todolist.push(newTodo);

    this.setState({
      todos: todolist,
      realTodos: [...this.state.realTodos, newTodo],
      value: "",
      id: ""
    });

    // setTimeout(
    //   function() {
    //     this.setState({
    //       todos: todolist,
    //       realTodos: realTodos,
    //       value: "",
    //       id: ""
    //     });
    //   }.bind(this),
    //   1000
    // );
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
        todo.isNotDone = false;
      }
    });

    realTodos.map(todo => {
      if (todo.id === this.state.id) {
        todo.isNotDone = false;
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

  setToUrgent = () => {
    let todolist = this.state.todos;
    let realTodos = this.state.realTodos;

    todolist.map(todo => {
      if (todo.id === this.state.id) {
        todo.isUrgent = true;
      }
    });

    realTodos.map(todo => {
      if (todo.id === this.state.id) {
        todo.isUrgent = true;
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
    let realTodos = this.state.realTodos.filter(todo => todo !== undefined);
    let deleted = this.state.todos.filter(todo => todo.id !== id);
    let deleted2 = realTodos.filter(todo => todo.id !== id);

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

    let todolist = this.state.realTodos.filter(todo => todo !== undefined);
    let mutated = todolist.filter(todo => todo.isNotDone === false);

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

    let todolist = this.state.realTodos.filter(todo => todo !== undefined);
    let mutated = todolist.filter(todo => todo.isNotDone === true);

    setTimeout(
      function() {
        this.setState({ todos: mutated, isloading: false });
      }.bind(this),
      1000
    );
  };

  filterUrgent = () => {
    this.setState({
      isloading: true
    });

    let todolist = this.state.realTodos.filter(todo => todo !== undefined);
    let mutated = todolist.filter(todo => todo.isUrgent === true);

    setTimeout(
      function() {
        this.setState({ todos: mutated, isloading: false });
      }.bind(this),
      1000
    );
  };

  filterSlow = () => {
    this.setState({
      isloading: true
    });

    let todolist = this.state.realTodos.filter(todo => todo !== undefined);
    let mutated = todolist.filter(todo => todo.isUrgent === false);

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
        this.setState({
          todos: this.state.realTodos.filter(todo => todo !== undefined),
          isloading: false
        });
      }.bind(this),
      1000
    );
  };

  componentDidMount = () => {
    const dummyTodo = [
      { id: 1, name: "Eating", isNotDone: true, isUrgent: false },
      { id: 2, name: "Sleeping", isNotDone: true, isUrgent: false },
      { id: 3, name: "Fighting", isNotDone: true, isUrgent: false }
    ];

    this.setState({ todos: dummyTodo, realTodos: dummyTodo });
  };

  render() {
    const { todos, realTodos, value, show, editValue, isloading } = this.state;

    return (
      <Fragment>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 5
          }}
        >
          <h1 style={{ color: "#34495e" }}>To-doing</h1>
          <ButtonGroup
            style={{ height: "10%", paddingTop: 5 }}
            aria-label="Basic example"
          >
            <Button onClick={() => this.removeFilter()} variant="outline-info">
              All
            </Button>
            <Button onClick={() => this.filterDone()} variant="outline-info">
              Done
            </Button>
            <Button onClick={() => this.filterUndone()} variant="outline-info">
              Undone
            </Button>
          </ButtonGroup>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 15
          }}
        >
          <div style={{ width: "10px" }}></div>
          <ButtonGroup
            style={{ height: "10%", paddingTop: 5 }}
            aria-label="Basic example"
          >
            <Button onClick={() => this.filterSlow()} variant="info">
              Slowly
            </Button>
            <Button onClick={() => this.filterUrgent()} variant="info">
              Urgent
            </Button>
          </ButtonGroup>
        </div>

        {isloading ? (
          <Row style={{ height: "60vh" }}>
            <Col md={5}></Col>
            <Col md={2}>
              <Spinner animation="border" role="status" variant="info">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </Col>
            <Col md={5}></Col>
          </Row>
        ) : (
          <Fragment>
            {todos.length > 0 ? (
              <div style={{ height: "60vh", padding: 0, overflow: "auto" }}>
                <Row style={{ maxWidth: "102%" }}>
                  {todos.map((todo, index) => (
                    <Col key={index} md={12} style={{ paddingRight: 0 }}>
                      <Alert variant="info">
                        <Row>
                          {todo.isNotDone ? (
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
              <Row style={{ height: "60vh" }}>
                <Col style={{ marginTop: "10vh" }}>
                  <h3 style={{ color: "#95a5a6", textAlign: "center" }}>
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
                <Button variant="info" onClick={() => this.submitTodo()}>
                  Add todo
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>

        <Modal show={show} onHide={this.onClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Hi, what do you want?</Modal.Title>
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
            <Button variant="outline-info" onClick={this.setToUrgent}>
              Set to urgent
            </Button>
            <Button variant="info" onClick={this.markAsDone}>
              Mark as done
            </Button>
          </Modal.Footer>
        </Modal>
      </Fragment>
    );
  }
}
