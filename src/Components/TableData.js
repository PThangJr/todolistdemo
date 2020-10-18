import React, { Component } from 'react';
import ListItem from './ListItem';

class TableData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      database: null,
      fieldName: "",
      fieldStatus: -1,
      sort: {
        sortName: "",
        sortStatus: -1
      },
      resetQuickSearch: false
    }
  }
  updateDataBase = () => {
    const { database } = this.props;
    if (database) {
      this.setState({
        database
      })
    }
  }
  onChange = (e) => {
    const { fieldName, fieldStatus, resetQuickSearch} = this.state;
    const { filterItem } = this.props;

    const target = e.target;
    const name = target.name;
    
    let  value = target.value;
    // console.log("value:" + value);
    
    // console.log(resetQuickSearch);
    this.setState({
      [name]:  value,
      resetQuickSearch: false
    })

      filterItem(
        name === "fieldName" ? value : fieldName,
        name === "fieldStatus" ? value : fieldStatus
      )
    
    
    // console.log(this.state)
  }


  renderListItem = () => {
    const { database, onDelete, onChangeStatus, showUpdateTask } = this.props;
    if (database) {
      // console.log(database);
      return database.map((item, index) => {
        return (
          <ListItem
            key={index}
            stt={index + 1}
            listItem={item}
            onDelete={(id) => onDelete(id)}
            onChangeStatus={(id) => onChangeStatus(id)}
            showUpdateTask={(id) => showUpdateTask(id)}
          ></ListItem>
        )
      })

    }
  } 
  onDeleteQuickSearch = () => {
    const {fieldStatus} = this.state;
    const {filterItem} = this.props;
    this.setState({
      fieldName: "",
      resetQuickSearch: true
    })
    filterItem("", fieldStatus);
  }
  render() {
    // console.log(this.props.database);
    // console.log(this.state.database);
    // const {db} = this.props;
    // console.log(db);
    // console.log(this.state);
    
    const { onHandleSort, sort, resetQuickSearch} = this.props;
    const {fieldName} = this.state;
    // console.log(sort);

    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th
              className="text-center table-header"
              onClick={(e) => onHandleSort(e, "sttSort", -1)}
            >
              STT
                    <span
                className="sort-box"

              ></span>
            </th>
            <th
              className="text-center table-header"
              onClick={(e) => onHandleSort(e, "nameSort", -1)}
            >
              Tên công việc
                    <span
                className="sort-box"
                style={(sort["nameSort"].status === -1) ? { display: "inline-block" } : (sort["nameSort"].status === 0) ? { display: "none" } : { display: "none" }}
              >
                <i className="fas fa-sort"></i>

              </span>
              <span
                className="sort-box"
                style={(sort["nameSort"].status === 0) ? { display: "inline-block" } : (sort["nameSort"].status === -1) ? { display: "none" } : { display: "none" }}
              >
                <i className="fas fa-sort-amount-down"></i>


              </span>
              <span

                className="sort-box"
                style={(sort["nameSort"].status === 1) ? { display: "inline-block" } : (sort["nameSort"].status === 0) ? { display: "none" } : { display: "none" }}

              >
                <i className="fas fa-sort-amount-up"></i>

              </span>
            </th>
            <th
              className="text-center table-header"
              onClick={(e) => onHandleSort(e, "statusSort", -1)}
            >
              Trạng Thái
                    <span
                className="sort-box"
                style={(sort["statusSort"].status === -1) ? { display: "inline-block" } : (sort["statusSort"].status === 0) ? { display: "none" } : { display: "none" }}
              >
                <i className="fas fa-sort"></i>

              </span>
              <span
                className="sort-box"
                style={(sort["statusSort"].status === 0) ? { display: "inline-block" } : (sort["statusSort"].status === -1) ? { display: "none" } : { display: "none" }}
              >
                <i className="far fa-check-circle"></i>
              </span>
              <span

                className="sort-box"
                style={(sort["statusSort"].status === 1) ? { display: "inline-block" } : (sort["statusSort"].status === 0) ? { display: "none" } : { display: "none" }}

              >
                <i className="far fa-times-circle"></i>
              </span>
            </th>
            <th
              className="text-center table-header"

            >
              Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>

            </td>
            <td className="quick-search">
              <input
                type="text"
                className="form-control"
                name="fieldName"
                value={resetQuickSearch ? "" :fieldName}
                onChange={this.onChange}
                placeholder="Tìm kiếm nhanh...."
              />
              <span 
                className="icon-close"
                onClick={() => this.onDeleteQuickSearch()}
                >
                <i
                  className="far fa-times-circle"
                ></i>
              </span>
            </td>
            <td>
              <select
                className="form-control"
                name="fieldStatus"
                onChange={this.onChange}
              >
                <option value={-1}>Tất Cả</option>
                <option value={0}>Đã hoàn thành</option>
                <option value={1}>Chưa hoàn thành</option>
              </select>
            </td>
            <td />
          </tr>
          {
            this.renderListItem()
          }

        </tbody>
      </table>
    );
  }
}

export default TableData;