import React, { Component, ReactNode } from 'react';
import {connect} from "react-redux";
import {REDUX_STATE} from "../../ducks";
import {Dispatch} from "redux";
import {Table, TableCell, TableHeader, TableHeaderRow, TableRow} from "../../components/ui/Table";
import {RewardType} from "../../ducks/user";
import {AssetType} from "../../ducks/assets";
import "./style/balance-table.scss";

type StateProps = {
  balances: {
    [assetId: string]: RewardType
  }
  assets: {
    [assetId: string]: AssetType
  }
}

type DispatchProps = {

}

type Props = StateProps & DispatchProps

class RewardTable extends Component<Props> {
  render () {
    return (
      <Table className="wallet__balance-table">
        { this.renderHeaderRow() }
        { this.renderTableBody() }
      </Table>
    );
  }

  renderHeaderRow (): ReactNode {
    return (
      <TableHeaderRow>
        <TableHeader>Asset</TableHeader>
        <TableHeader>Balance</TableHeader>
      </TableHeaderRow>
    );
  }

  renderTableBody (): ReactNode {
    return (
      <div className="wallet__content__table__body">
        {
          Object.entries(this.props.balances)
            .map(([_, balance]) => this.renderTableRow(balance))
        }
      </div>
    );
  }

  renderTableRow (balance: RewardType): ReactNode {
    const { assets } = this.props;
    const { assetId, unlocked } = balance;
    const { symbol, decimals, name } = assets[assetId];

    return (
      <TableRow key={symbol}>
        <TableCell>{symbol} - {name}</TableCell>
        <TableCell>{unlocked.dividedBy(10 ** decimals).toFixed(4)}</TableCell>
      </TableRow>
    )
  }
}

function mapStateToProps(state: REDUX_STATE): StateProps {
  return {
    balances: state.user.rewards,
    assets: state.assets.assets,
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RewardTable);