import React, { Component } from 'react';
import ListItem from './ListItem';

class TableData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      database: null
    }
  }
  updateDataBase = () => {
    const {database} = this.props;
    if(database) {
      this.setState({
        database
      })
    }
  }
  
  componentDidMount() {
    const {database} = this.props;
    if(database) {
      this.setState({
        database
      })
    }
  }
  
  renderListItem = () => {
    const {database, onDelete, onChangeStatus, showUpdateTask} = this.props;
    // console.log(database);
    if(database) {
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
  
  
  

  
    render() {
      // console.log(this.props.database);
      // console.log(this.state.database);
      // const {db} = this.props;
      // console.log(db);
    
      
  
        return (
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th className="text-center">STT</th>
                  <th className="text-center">Tên</th>
                  <th className="text-center">Trạng Thái</th>
                  <th className="text-center">Hành Động</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td />
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                  <td>
                    <select className="form-control">
                      <option value={-1}>Tất Cả</option>
                      <option value={0}>Ẩn</option>
                      <option value={1}>Kích Hoạt</option>
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