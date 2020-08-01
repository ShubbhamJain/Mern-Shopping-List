import React from "react";
import { ListGroup, ListGroupItem, Button, Container } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import PropTypes from "prop-types";

class ShoppingList extends React.Component {
  componentDidMount() {
    this.props.getItems();
  }

  deleteItem = (name) => {
    this.props.deleteItem(name);
  };

  render() {
    const { items } = this.props.item;
    const itemList = items.map(({ _id, name }) => (
      <CSSTransition key={_id} timeout={500} classNames="fade">
        <ListGroupItem>
          <Button
            color="danger"
            className="remove-btn"
            size="sm"
            style={{ marginRight: "10px" }}
            onClick={this.deleteItem.bind(this, name)}
          >
            &times;
          </Button>
          {name}
        </ListGroupItem>
      </CSSTransition>
    ));
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shoppingList">{itemList}</TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
