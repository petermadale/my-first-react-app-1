import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import fetchClientSuggestions from "../../../scripts/fetchClientSuggestions";

class DashboardNEW extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentRender = this.shouldComponentRender.bind(this);
  }

  componentWillMount() {
    const { fetchClientSuggestions } = this.props;
    fetchClientSuggestions();
  }

  shouldComponentRender() {
    const { pending } = this.props;
    if (this.pending === false) return false;
    // more tests
    return true;
  }

  render() {
    const { clientContactDetailsSuggestions, error, pending } = this.props;

    return (
      <div className="product-list-wrapper">
        {clientContactDetailsSuggestions}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  error: getProductsError(state),
  products: getProducts(state),
  pending: getProductsPending(state),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchProducts: fetchProductsAction,
    },
    dispatch
  );

export const ConnectedDashboardNEW = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardNEW);
