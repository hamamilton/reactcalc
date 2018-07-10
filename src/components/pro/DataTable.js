import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from './DataTablePagination';
import filterFactory, { textFilter } from './DataTableFilter';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './DataTable.css';

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    }
    this.addRow = this.addRow.bind(this);
  }

  componentDidMount = () => {
    console.log(this.state.data);
  };

  addRow() {
    let newData = JSON.parse(JSON.stringify(this.state.data));
    let newDataLength = newData.length;
    let newRow = JSON.parse(JSON.stringify(newData[newDataLength - 1]));
    newRow[this.props.keyField] = newRow[this.props.keyField] + 1;
    newData.push(newRow);
    this.setState({
      data: newData
    })
  }

  render() {
    const {
      className,
      keyField,
      data,
      columns,
      config,
      striped,
      hover,
      editable,
      pagination,
      responsive,
      responsiveSm,
      responsiveMd,
      responsiveLg,
      responsiveXl,
      ...attributes
    } = this.props;

    const classes = classNames(
      className
    );

    const wrapperClasses = classNames(
      editable && 'table-editable',
      responsive && 'table-responsive',
      responsiveSm && 'table-responsive-sm',
      responsiveMd && 'table-responsive-md',
      responsiveLg && 'table-responsive-lg',
      responsiveXl && 'table-responsive-xl'
    );

    const customTotal = (from, to, size) => (
      <span className="react-bootstrap-table-pagination-total">
        Showing { from } to { to + 1 } of { size } entries
      </span>
    );

    const paginationConfig = paginationFactory({
      prePageText: config.prePageText || 'Previous',
      nextPageText: config.nextPageText || 'Next',
      firstPageText: config.firstPageText || 'First',
      lastPageText: config.lastPageText || 'Last',
      alwaysShowAllBtns: typeof config.alwaysShowAllBtns !== 'undefined' && config.alwaysShowAllBtns,
      showTotal: typeof config.showTotal !== 'undefined' && config.showTotal,
      hideSizePerPage: typeof config.hideSizePerPage !== 'undefined' && config.hideSizePerPage,
      paginationTotalRenderer: customTotal
    });

    let tableProps = {}
  
    if (this.props.pagination) {
      tableProps = {
        pagination: paginationConfig
      }
    }

    columns.forEach(function(entry) {
      if(entry.search) {
        entry.filter = textFilter();
      }
    });

    return (
      <div className={wrapperClasses} style={{'position': 'relative'}}>
        { editable && <span onClick={ this.addRow } className="table-add float-right mb-3 mr-2"><a href="#!" className="text-success"><i className="fa fa-plus fa-2x" aria-hidden="true"></i></a></span> }
        <BootstrapTable keyField={keyField} data={this.state.data} columns={columns} {...attributes} className={classes} striped={striped} hover={hover} {...tableProps} filter={ filterFactory() } />
      </div>
    );
  }
}

DataTable.propTypes = {
  className: PropTypes.string,
  striped: PropTypes.bool,
  hover: PropTypes.bool,
  children: PropTypes.node,
  responsive: PropTypes.bool,
  responsiveSm: PropTypes.bool,
  responsiveMd: PropTypes.bool,
  responsiveLg: PropTypes.bool,
  responsiveXl: PropTypes.bool,
  config: PropTypes.object,
  editable: PropTypes.bool,
  pagination: PropTypes.bool
};

export default DataTable;
export { DataTable as MDBDataTable };

